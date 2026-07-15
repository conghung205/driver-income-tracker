import prisma from "@/lib/prisma";
import { getVNDateRange } from "@/utils/date";
import { updateGoalSchema } from "@/validations/user.schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { dailyGoal: true },
        });
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 },
            );
        }

        const { startDate, endDate } = getVNDateRange("today");

        const incomeAggregate = await prisma.transaction.aggregate({
            where: {
                userId,
                type: "INCOME",
                status: "APPROVED",
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            _sum: { amount: true },
        });

        const todayIncome = incomeAggregate._sum.amount || 0;
        const dailyGoal = user.dailyGoal || 0;

        const progressPercentage =
            dailyGoal > 0
                ? Math.min(Math.round((todayIncome / dailyGoal) * 100), 100)
                : 0;

        return NextResponse.json(
            {
                message: "Get daily goal progress successfully.",
                data: {
                    dailyGoal,
                    todayIncome,
                    progressPercentage,
                },
            },
            { status: 200 },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 },
        );
    }
}

export async function PATCH(request: NextRequest) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const resultResponse = updateGoalSchema.safeParse(body);
        if (!resultResponse.success) {
            return NextResponse.json(
                { message: resultResponse.error.issues[0].message },
                { status: 400 },
            );
        }

        const { dailyGoal } = resultResponse.data;

        const updateDailyGoal = await prisma.user.update({
            where: { id: userId },
            data: { dailyGoal },
            select: {
                id: true,
                fullName: true,
                dailyGoal: true,
                updatedAt: true,
            },
        });

        return NextResponse.json(
            {
                message: "Update daily goal successfully.",
                data: updateDailyGoal,
            },
            { status: 200 },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 },
        );
    }
}
