import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { getVNDateRange } from "@/utils/date";
import { formatLastMonthsChart } from "@/utils/report/formatLastMonthsChart";
import { formatMonthChart } from "@/utils/report/formatMonthChart";
import { formatTodayChart } from "@/utils/report/formatTodayChart";
import { formatWeekChart } from "@/utils/report/formatWeekChart";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
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

    const whereClause: Prisma.TransactionWhereInput = {
        userId,
        status: "APPROVED",
    };

    try {
        let startDate: Date | undefined;
        if (range) {
            const dateRange = getVNDateRange(range);
            whereClause.createdAt = {
                gte: dateRange.startDate,
                lte: dateRange.endDate,
            };
            startDate = dateRange.startDate;
        }
        const transactions = await prisma.transaction.findMany({
            where: whereClause,
            select: {
                type: true,
                amount: true,
                createdAt: true,
            },
        });

        // result
        let result;
        if (range === "today") {
            result = formatTodayChart(transactions);
        } else if (range === "week") {
            result = formatWeekChart(transactions);
        } else if (range === "month") {
            result = formatMonthChart(transactions);
        } else if (range?.startsWith("last_")) {
            const months = Number(range.match(/\d+/)?.[0]);
            if (startDate) {
                result = formatLastMonthsChart(transactions, months, startDate);
            }
        }

        return NextResponse.json(
            {
                message: "Get revenue chart successfully.",
                data: result,
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
