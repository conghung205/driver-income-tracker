import { TransactionStatus } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const hasTransaction = await prisma.transaction.findFirst({
            where: { id, userId },
        });

        if (!hasTransaction) {
            return NextResponse.json(
                {
                    message: "transaction not found",
                },
                { status: 404 },
            );
        }

        if (hasTransaction.status !== TransactionStatus.PENDING) {
            return NextResponse.json(
                {
                    message: "Transaction is already approved.",
                },
                { status: 400 },
            );
        }

        const result = await prisma.$transaction(async (tx) => {
            const transaction = await tx.transaction.findFirst({
                where: {
                    id,
                    userId,
                },
            });

            if (!transaction) {
                throw new Error("Transaction not found");
            }

            const updated = await tx.transaction.updateMany({
                where: {
                    id,
                    userId,
                    status: TransactionStatus.PENDING,
                },
                data: {
                    status: TransactionStatus.APPROVED,
                },
            });

            if (updated.count === 0) {
                throw new Error("Transaction already approved");
            }

            const changeValue =
                transaction.type === "INCOME"
                    ? transaction.amount
                    : -transaction.amount;

            await tx.user.update({
                where: { id: userId },
                data: {
                    balance: {
                        increment: changeValue,
                    },
                },
            });

            return transaction;
        });

        return NextResponse.json(
            {
                message: "Approve transaction successfully",
                data: result,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            if (
                error.message === "Transaction already approved" ||
                error.message === "Transaction not found"
            ) {
                return NextResponse.json(
                    { message: error.message },
                    {
                        status:
                            error.message === "Transaction not found"
                                ? 404
                                : 400,
                    },
                );
            }
        }
        return NextResponse.json(
            {
                message: "Internal server error. Please try again later.",
            },
            { status: 500 },
        );
    }
}
