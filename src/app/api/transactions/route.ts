import {
    Category,
    PaymentMethod,
    Prisma,
    TransactionStatus,
    TransactionType,
} from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { getVNDateRange } from "@/utils/date";
import { createTransactionSchema } from "@/validations/transaction.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const resultValidate = createTransactionSchema.safeParse(body);

        if (!resultValidate.success) {
            return NextResponse.json(
                { message: resultValidate.error.issues[0].message },
                { status: 400 },
            );
        }
        const { amount, type, category, paymentMethod, description } =
            resultValidate.data;

        const status = paymentMethod === "CASH" ? "APPROVED" : "PENDING";

        // create Transaction
        const result = await prisma.$transaction(async (tx) => {
            const newTransaction = await tx.transaction.create({
                data: {
                    amount,
                    type,
                    category,
                    paymentMethod,
                    description,
                    status,
                    userId,
                },
            });

            if (status === "APPROVED") {
                const changeValue = type === "INCOME" ? amount : -amount;

                await tx.user.update({
                    where: { id: userId },
                    data: {
                        balance: {
                            increment: changeValue,
                        },
                    },
                });
            }

            return newTransaction;
        });

        return NextResponse.json(
            {
                message: "create transaction successfully",
                data: result,
            },
            { status: 201 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "Internal server error. Please try again later.",
            },
            { status: 500 },
        );
    }
}

export async function GET(request: NextRequest) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        // get searchParams
        const { searchParams } = new URL(request.url);
        const typeParam = searchParams.get("type");
        const paymentMethodParam = searchParams.get("paymentMethod");
        const statusParam = searchParams.get("status");
        const range = searchParams.get("range");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const categoryParam = searchParams.get("category");

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

        // How many lines can I skip?
        const skip = (page - 1) * limit;

        const whereClause: Prisma.TransactionWhereInput = { userId };
        if (
            typeParam &&
            (Object.values(TransactionType) as string[]).includes(typeParam)
        ) {
            whereClause.type = typeParam as TransactionType;
        }

        if (
            paymentMethodParam &&
            (Object.values(PaymentMethod) as string[]).includes(
                paymentMethodParam,
            )
        ) {
            whereClause.paymentMethod = paymentMethodParam as PaymentMethod;
        }
        if (
            statusParam &&
            (Object.values(TransactionStatus) as string[]).includes(statusParam)
        ) {
            whereClause.status = statusParam as TransactionStatus;
        }
        if (categoryParam) {
            const categories = categoryParam.split(",");
            whereClause.category = { in: categories as Category[] };
        }

        if (range) {
            const { startDate, endDate } = getVNDateRange(range);
            whereClause.createdAt = {
                gte: startDate,
                lte: endDate,
            };
        }

        // find and count
        const [data, totalItems] = await Promise.all([
            prisma.transaction.findMany({
                where: whereClause,
                orderBy: { createdAt: "desc" },
                skip: skip,
                take: limit,
            }),
            prisma.transaction.count({
                where: whereClause,
            }),
        ]);

        // totalPages
        const totalPages = Math.ceil(totalItems / limit);

        return NextResponse.json(
            {
                message: "get transaction successfully",
                data: data,
                pagination: {
                    currentPage: page,
                    limit: limit,
                    totalItems: totalItems,
                    totalPages: totalPages,
                    hasNextPage: page < totalPages,
                },
            },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "Internal server error. Please try again later.",
            },
            { status: 500 },
        );
    }
}
