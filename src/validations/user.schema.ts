import { z } from "zod";

export const updateUserSchema = z
    .object({
        phoneNumber: z
            .string()
            .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Invalid phone number!")
            .optional(),

        fullName: z.string().min(2, "Full name is too short").optional(),
    })
    .refine(
        (data) => data.phoneNumber !== undefined || data.fullName !== undefined,
        {
            message: "At least one field is required.",
        },
    );

export const updateGoalSchema = z.object({
    dailyGoal: z
        .number()
        .nullable()
        .refine((value) => value !== null, {
            message: "Daily goal is required.",
        })
        .refine((value) => value === null || value >= 10000, {
            message: "The daily goal must be at least 10.000..",
        }),
});
