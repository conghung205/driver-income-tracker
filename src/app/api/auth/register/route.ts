import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { phoneNumber, fullName, password } = body;

        if (!phoneNumber || !fullName || !password) {
            return NextResponse.json(
                { message: "All fields are required!" },
                { status: 400 },
            );
        }

        // validation phoneNumber
        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
        if (!phoneRegex.test(phoneNumber)) {
            return NextResponse.json(
                { message: "Invalid phone number!" },
                { status: 400 },
            );
        }

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
        return NextResponse.json(
            {
                message: "Driver registered successfully!",
                data: {
                    user: {
                        id: newUser.id,
                        phoneNumber: newUser.phoneNumber,
                        fullName: newUser.fullName,
                    },
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
            },
            { status: 201 },
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
