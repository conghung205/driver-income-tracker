import { z } from "zod";
import {
    TransactionType,
    PaymentMethod,
    Category,
} from "@/generated/prisma/client";

export const createTransactionSchema = z.object({
    amount: z.number().positive("Amount must be greater than 0"),
    type: z.enum(TransactionType),
    category: z.enum(Category),
    paymentMethod: z.enum(PaymentMethod),
    description: z.string().optional(),
});

export const updateTransactionSchema = z.object({
    amount: z.number().positive("Amount must be greater than 0"),
    category: z.enum(Category),
    description: z.string().optional(),
});
