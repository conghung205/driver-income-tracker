import { Prisma, TransactionType } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { getVNDateRange } from "@/utils/date";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const typeParams = searchParams.get("type");
    const range = searchParams.get("range");

    const rangeRegex = /^(today|week|month|last_\d+_months)$/;
    if (range && !rangeRegex.test(range)) {
        return NextResponse.json(
            {
                message:
                    "Invalid range format. Use 'week', 'month' or 'last_X_months'.",
            },
            { status: 400 },
        );
    }
    if (!typeParams) {
        return NextResponse.json(
            { message: "type must be INCOME or EXPENSE" },
            { status: 400 },
        );
    }

    const whereClause: Prisma.TransactionWhereInput = {
        userId,
        status: "APPROVED",
    };

    if (
        typeParams &&
        (Object.values(TransactionType) as string[]).includes(typeParams)
    ) {
        whereClause.type = typeParams as TransactionType;
    }

    if (range) {
        const { startDate, endDate } = getVNDateRange(range);
        whereClause.createdAt = {
            gte: startDate,
            lte: endDate,
        };
    }

    try {
        const categoryData = await prisma.transaction.groupBy({
            where: whereClause,
            by: ["category"],
            _sum: { amount: true },
            orderBy: { _sum: { amount: "desc" } },
        });

        const total = categoryData.reduce(
            (sum, item) => sum + (item._sum.amount || 0),
            0,
        );

        const result = categoryData.map((item) => ({
            category: item.category,
            amount: item._sum.amount || 0,
            percent:
                total > 0
                    ? Math.round(((item._sum.amount || 0) / total) * 1000) / 10
                    : 0,
        }));

        return NextResponse.json(
            {
                message: "Get reports categories successfully",
                data: {
                    totalAmount: total,
                    categories: result,
                },
            },
            { status: 200 },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Internal server error. Please try again later.",
            },
            { status: 500 },
        );
    }
}
