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
    dailyGoal: z.number().min(10000, "The minimum target is 10.000 VND."),
});

export const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(6, "Current password must be at least 6 characters"),

    newPassword: z
        .string()
        .min(6, "New password must be at least 6 characters"),
});
