import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { phoneNumber, password } = body;

        if (!phoneNumber || !password) {
            return NextResponse.json(
                {
                    message: "All fields are required!",
                },
                { status: 400 },
            );
        }

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
        return NextResponse.json(
            {
                message: "Login successful",
                data: {
                    user: {
                        id: user.id,
                        phoneNumber: user.phoneNumber,
                        fullName: user.fullName,
                    },
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
            },
            { status: 200 },
        );
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
