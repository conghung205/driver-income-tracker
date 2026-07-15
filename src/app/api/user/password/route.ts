import prisma from "@/lib/prisma";
import { changePasswordSchema } from "@/validations/user.schema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const resultResponse = changePasswordSchema.safeParse(body);
        if (!resultResponse.success) {
            return NextResponse.json(
                { message: resultResponse.error.issues[0].message },
                { status: 400 },
            );
        }

        const { currentPassword, newPassword } = resultResponse.data;
        if (newPassword === currentPassword) {
            return NextResponse.json(
                {
                    message:
                        "New password must be different from current password.",
                },
                { status: 400 },
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return NextResponse.json(
                { message: "User not found or unauthorized." },
                { status: 404 },
            );
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: "Current password is incorrect." },
                { status: 400 },
            );
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashPassword },
        });

        return NextResponse.json(
            {
                message: "Change password successfully.",
            },
            { status: 200 },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 },
        );
    }
}
