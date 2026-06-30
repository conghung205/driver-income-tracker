import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
    phoneNumber: z
        .string()
        .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Invalid phone number!"),
    fullName: z.string().min(2, "Full name is too short"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const result = registerSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { message: result.error.issues[0].message },
                { status: 400 },
            );
        }

        const { phoneNumber, fullName, password } = result.data;

        // Check if the phone number is already registered
        const existingUser = await prisma.user.findUnique({
            where: { phoneNumber: phoneNumber },
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    message:
                        "This phone number is already registered as a driver!",
                },
                { status: 400 },
            );
        }

        // password using bcryptjs hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Persist the new driver into PostgreSQL database via Prisma
        const newUser = await prisma.user.create({
            data: {
                phoneNumber: phoneNumber,
                fullName: fullName,
                password: hashedPassword,
            },
        });

        // Generate Dual Tokens
        const accessTokenSecret = new TextEncoder().encode(
            process.env.JWT_ACCESS_SECRET,
        );
        const refreshTokenSecret = new TextEncoder().encode(
            process.env.JWT_REFRESH_SECRET,
        );

        // Sign AccessToken
        const accessToken = await new SignJWT({ userId: newUser.id })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("15m")
            .sign(accessTokenSecret);

        // Sign RefreshToken
        const refreshToken = await new SignJWT({ userId: newUser.id })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d")
            .sign(refreshTokenSecret);

        // hashedRefreshToken
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        // Save the Refresh Token to the database for validation control
        await prisma.user.update({
            where: { id: newUser.id },
            data: { refreshToken: hashedRefreshToken },
        });

        // Return success response
        const response = NextResponse.json(
            {
                message: "Driver registered successfully!",
                data: {
                    user: {
                        id: newUser.id,
                        phoneNumber: newUser.phoneNumber,
                        fullName: newUser.fullName,
                    },
                },
            },
            { status: 201 },
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
