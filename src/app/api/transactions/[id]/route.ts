import { Category, TransactionStatus } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

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

        const result = await prisma.$transaction(async (tx) => {
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

        if (!result) {
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

const updateTransactionSchema = z.object({
    amount: z.number().positive("Amount must be greater than 0"),
    category: z.enum(Category),
    description: z.string().optional(),
});

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
        if (transaction.status !== "PENDING") {
            return NextResponse.json(
                { message: "The transaction has already been approved." },
                { status: 400 },
            );
        }

        const body = await request.json();
        const result = updateTransactionSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { message: result.error.issues[0].message },
                { status: 400 },
            );
        }

        const { amount, category, description } = result.data;

        const updated = await prisma.transaction.updateMany({
            where: { id, userId, status: TransactionStatus.PENDING },
            data: {
                amount,
                category,
                description: description ?? transaction.description,
            },
        });

        if (updated.count === 0) {
            return NextResponse.json(
                {
                    message: "Transaction already approved",
                },
                { status: 400 },
            );
        }

        return NextResponse.json(
            {
                message: "Updated successfully.",
                data: {
                    ...transaction,
                    amount,
                    category,
                    description: description ?? transaction.description,
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
