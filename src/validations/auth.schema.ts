import { z } from "zod";

export const registerSchema = z.object({
    phoneNumber: z
        .string()
        .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Invalid phone number!"),
    fullName: z.string().min(2, "Full name is too short"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
    phoneNumber: z
        .string()
        .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Invalid phone number!"),
    password: z.string().min(1, "Password is required"),
});
