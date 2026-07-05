import { z } from "zod";

export const createTransactionSchema = z.object({
    amount: z
        .number()
        .nullable()
        .refine((value) => value !== null, {
            message: "Amount is required.",
        })
        .refine((value) => value === null || value >= 1000, {
            message: "Amount must be at least 1.000.",
        }),
    type: z.enum(["INCOME", "EXPENSE"]),
    category: z
        .enum([
            "GRAB_BIKE",
            "GRAB_EXPRESS",
            "GRAB_CAR",
            "BE_BIKE",
            "BE_CAR",
            "XANH_SM",
            "OTHER_INCOME",
            "FUEL",
            "MAINTENANCE",
            "INSURANCE",
            "FOOD",
            "OTHER_EXPENSE",
        ])
        .nullable()
        .refine((value) => value !== null, {
            message: "Please select a category.",
        }),
    paymentMethod: z.enum(["CASH", "E_WALLET"]),
    description: z.string().optional(),
});

export const updateTransactionSchema = z.object({
    amount: z
        .number()
        .nullable()
        .refine((value) => value !== null, {
            message: "Amount is required.",
        })
        .refine((value) => value === null || value >= 1000, {
            message: "Amount must be at least 1.000.",
        }),
    category: z
        .enum([
            "GRAB_BIKE",
            "GRAB_EXPRESS",
            "GRAB_CAR",
            "BE_BIKE",
            "BE_CAR",
            "XANH_SM",
            "OTHER_INCOME",
            "FUEL",
            "MAINTENANCE",
            "INSURANCE",
            "FOOD",
            "OTHER_EXPENSE",
        ])
        .nullable()
        .refine((value) => value !== null, {
            message: "Please select a category.",
        }),
    description: z.string().optional(),
});
