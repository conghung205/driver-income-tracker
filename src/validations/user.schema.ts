import { z } from "zod";

export const updateUserSchema = z.object({
    phoneNumber: z
        .string()
        .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Invalid phone number!"),
    fullName: z.string().min(2, "Full name is too short"),
});
