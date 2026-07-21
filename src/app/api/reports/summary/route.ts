import prisma from "@/lib/prisma";
import { getVNDateRange } from "@/utils/date";
import { caculateBestDay } from "@/utils/report/caculateBestDay";
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
        let startDate: Date | undefined;
        let endDate: Date | undefined;

        if (range) {
            const dateRange = getVNDateRange(range);
            startDate = dateRange.startDate;
            endDate = dateRange.endDate;

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

        const [
            incomeAggregate,
            expenseAggregate,
            topCategoryData,
            allIncomeTransactions,
        ] = await Promise.all([
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

            // top category
            prisma.transaction.groupBy({
                by: ["category"],
                where: { ...baseWhereCondition, type: "INCOME" },
                _sum: { amount: true },
                orderBy: { _sum: { amount: "desc" } },
                take: 1,
            }),

            // all income transactions
            prisma.transaction.findMany({
                where: { ...baseWhereCondition, type: "INCOME" },
                select: { amount: true, createdAt: true },
            }),
        ]);

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
        const totalCount = incomeCount + expenseCount;
        const bestDay = caculateBestDay(allIncomeTransactions);

        const topCategory = topCategoryData[0]
            ? {
                  category: topCategoryData[0].category,
                  amount: topCategoryData[0]._sum.amount || 0,
              }
            : null;

        let avgDailyIncome = 0;

        if (startDate && endDate) {
            const diffMs = endDate.getTime() - startDate.getTime();
            const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
            avgDailyIncome = Math.round(netIncome / diffDays);
        }

        return NextResponse.json(
            {
                message: "Get dashboard summary successfully.",
                data: {
                    totalIncome,
                    totalExpense,
                    netIncome,
                    incomeCount,
                    expenseCount,
                    totalCount,
                    topCategory,
                    avgDailyIncome,
                    bestDay,
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
