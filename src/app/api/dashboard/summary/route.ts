import prisma from "@/lib/prisma";
import { getVNDateRange } from "@/utils/date";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const range = searchParams.get("range");

        const rangeRegex = /^(today|week|month|last_\d+_months)$/;

        if (range && !rangeRegex.test(range)) {
            return NextResponse.json(
                {
                    message:
                        "Invalid range format. Use 'today', 'week', 'month' or 'last_X_months'.",
                },
                { status: 400 },
            );
        }

        let timeFilter: { gte?: Date; lte?: Date } = {};

        if (range) {
            const { startDate, endDate } = getVNDateRange(range);
            timeFilter = {
                gte: startDate,
                lte: endDate,
            };
        }

        const baseWhereCondition = {
            userId,
            status: "APPROVED" as const,
            ...(range ? { createdAt: timeFilter } : {}),
        };

        const [incomeAggregate, expenseAggregate, user] = await Promise.all([
            // calculate total INCOME
            prisma.transaction.aggregate({
                where: {
                    ...baseWhereCondition,
                    type: "INCOME",
                },
                _sum: { amount: true },
                _count: true,
            }),
            // calculate total EXPENSE
            prisma.transaction.aggregate({
                where: {
                    ...baseWhereCondition,
                    type: "EXPENSE",
                },
                _sum: { amount: true },
                _count: true,
            }),
            // Retrieve the user's current wallet balance.
            prisma.user.findUnique({
                where: { id: userId },
                select: { balance: true },
            }),
        ]);

        if (!user) {
            return NextResponse.json(
                { message: "User not found." },
                { status: 404 },
            );
        }

        // Extract data
        const totalIncome = incomeAggregate._sum.amount || 0;
        const totalExpense = expenseAggregate._sum.amount || 0;
        const netIncome = totalIncome - totalExpense;
        const incomeCount = incomeAggregate._count || 0;
        const expenseCount = expenseAggregate._count || 0;
        const expenseRatio =
            totalIncome > 0
                ? Math.round((totalExpense / totalIncome) * 100)
                : 0;

        return NextResponse.json(
            {
                message: "Get dashboard summary successfully.",
                data: {
                    balance: user.balance,
                    totalIncome,
                    totalExpense,
                    netIncome,
                    incomeCount,
                    expenseCount,
                    expenseRatio,
                    range: range || "all",
                },
            },
            { status: 200 },
        );
    } catch (error) {
        console.error("Dashboard Summary Error:", error);
        return NextResponse.json(
            { message: "Internal server error. Please try again later." },
            { status: 500 },
        );
    }
}
