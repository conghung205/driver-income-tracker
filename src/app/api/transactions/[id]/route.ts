import prisma from "@/lib/prisma";
import { updateTransactionSchema } from "@/validations/transaction.schema";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json(
            { message: "Invalid or expired access token." },
            { status: 401 },
        );
    }

    try {
        const { id } = await params;

        const resultValidate = await prisma.$transaction(async (tx) => {
            const transaction = await tx.transaction.findFirst({
                where: { id, userId },
            });

            if (!transaction) return null;

            if (transaction.status === "APPROVED") {
                const changeValue =
                    transaction.type === "INCOME"
                        ? -transaction.amount
                        : transaction.amount;

                await tx.user.update({
                    where: { id: userId },
                    data: { balance: { increment: changeValue } },
                });
            }

            await tx.transaction.delete({ where: { id } });

            return transaction;
        });

        if (!resultValidate) {
            return NextResponse.json(
                { message: "Transaction not found or unauthorized" },
                { status: 404 },
            );
        }

        return NextResponse.json(
            {
                message: "Delete transaction successfully",
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

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json(
            { message: "Invalid or expired access token." },
            { status: 401 },
        );
    }

    try {
        const { id } = await params;

        const transaction = await prisma.transaction.findFirst({
            where: { id, userId },
        });
        if (!transaction) {
            return NextResponse.json(
                { message: "Transaction not found or unauthorized." },
                { status: 404 },
            );
        }

        const body = await request.json();
        const resultValidate = updateTransactionSchema.safeParse(body);

        if (!resultValidate.success) {
            return NextResponse.json(
                { message: resultValidate.error.issues[0].message },
                { status: 400 },
            );
        }

        const { amount, type, category, paymentMethod, status, description } =
            resultValidate.data;

        const result = await prisma.$transaction(async (tx) => {
            const oldEffect =
                transaction.status === "APPROVED"
                    ? transaction.type === "INCOME"
                        ? transaction.amount
                        : -transaction.amount
                    : 0;

            const newEffect =
                status === "APPROVED"
                    ? type === "INCOME"
                        ? amount
                        : -amount
                    : 0;

            const delta = newEffect - oldEffect;

            if (delta !== 0) {
                await tx.user.update({
                    where: { id: userId },
                    data: {
                        balance: {
                            increment: delta,
                        },
                    },
                });
            }

            return tx.transaction.update({
                where: { id, userId },
                data: {
                    amount,
                    type,
                    category,
                    paymentMethod,
                    description,
                    status,
                },
            });
        });

        return NextResponse.json(
            {
                message: "Updated successfully.",
                data: result,
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
