import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

const loginSchema = z.object({
    phoneNumber: z
        .string()
        .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Invalid phone number!"),
    password: z.string().min(1, "Password is required"),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const result = loginSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { message: result.error.issues[0].message },
                { status: 400 },
            );
        }

        const { phoneNumber, password } = result.data;

        // get User from phone number
        const user = await prisma.user.findUnique({
            where: { phoneNumber: phoneNumber },
        });

        if (!user || !user.password) {
            return NextResponse.json(
                { message: "Invalid phone number or password." },
                { status: 400 },
            );
        }

        // Compare the password from the database with the password passed from the client.
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json(
                { message: "Invalid phone number or password." },
                { status: 400 },
            );
        }

        // Generate Dual Tokens
        const accessTokenSecret = new TextEncoder().encode(
            process.env.JWT_ACCESS_SECRET,
        );
        const refreshTokenSecret = new TextEncoder().encode(
            process.env.JWT_REFRESH_SECRET,
        );

        // Sign AccessToken
        const accessToken = await new SignJWT({ userId: user.id })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("15m")
            .sign(accessTokenSecret);

        // Sign RefreshToken
        const refreshToken = await new SignJWT({ userId: user.id })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d")
            .sign(refreshTokenSecret);

        // hashedRefreshToken
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        // Save the Refresh Token to the database for validation control
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: hashedRefreshToken },
        });

        // Return success response
        const response = NextResponse.json(
            {
                message: "Login successfully",
                data: {
                    user: {
                        id: user.id,
                        phoneNumber: user.phoneNumber,
                        fullName: user.fullName,
                    },
                },
            },
            { status: 200 },
        );

        // set cookies
        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 15,
        });
        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
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
