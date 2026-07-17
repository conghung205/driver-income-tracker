import { z } from "zod";

export const registerSchema = z.object({
    phoneNumber: z
        .string()
        .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Invalid phone number!"),
    fullName: z.string().min(2, "Full name is too short"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(
            /[A-Z]/,
            "The password must contain at least one uppercase letter!",
        )
        .regex(/[0-9]/, "The password must contain at least one digit!"),
});
export const registerFormSchema = registerSchema
    .extend({
        confirmPassword: z.string().min(1, "Please re-enter your password!"),
    })

    .refine((data) => data.password === data.confirmPassword, {
        message: "The re-entered password does not match!",
        path: ["confirmPassword"],
    });

export const loginSchema = z.object({
    phoneNumber: z
        .string()
        .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Invalid phone number!"),
    password: z.string().min(1, "Password is required"),
});

export const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(
            /[A-Z]/,
            "The password must contain at least one uppercase letter!",
        )
        .regex(/[0-9]/, "The password must contain at least one digit!"),

    newPassword: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(
            /[A-Z]/,
            "The password must contain at least one uppercase letter!",
        )
        .regex(/[0-9]/, "The password must contain at least one digit!"),
});

export const changePasswordFormSchema = changePasswordSchema
    .extend({
        confirmPassword: z.string().min(1, "Please re-enter your password!"),
    })

    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "The re-entered password does not match!",
        path: ["confirmPassword"],
    });
