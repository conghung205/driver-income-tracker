import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { refreshToken } = body;

        const refreshTokenSecret = new TextEncoder().encode(
            process.env.JWT_REFRESH_SECRET,
        );

        // Verify signature
        const { payload } = await jwtVerify(refreshToken, refreshTokenSecret);

        // find user
        const user = await prisma.user.findUnique({
            where: { id: payload.userId as string },
        });

        if (!user || !user.refreshToken) {
            return NextResponse.json(
                { message: "Invalid refresh token." },
                { status: 400 },
            );
        }

        // compare
        const isrefreshTokenMatch = await bcrypt.compare(
            refreshToken,
            user.refreshToken,
        );

        if (!isrefreshTokenMatch) {
            return NextResponse.json(
                { message: "Invalid refresh token." },
                { status: 401 },
            );
        }

        // update the Refresh Token to the database
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: null },
        });

        // Return success response
        return NextResponse.json(
            {
                message: "Logout successfully!",
            },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Invalid or expired refresh token." },
            { status: 401 },
        );
    }
}
