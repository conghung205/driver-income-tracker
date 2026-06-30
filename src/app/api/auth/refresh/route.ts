import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const refreshToken = request.cookies.get("refreshToken")?.value;

        if (!refreshToken) {
            return NextResponse.json(
                { message: "Invalid refresh token." },
                { status: 401 },
            );
        }

        // Generate Dual Tokens
        const accessTokenSecret = new TextEncoder().encode(
            process.env.JWT_ACCESS_SECRET,
        );
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

        // Sign AccessToken
        const accessToken = await new SignJWT({ userId: user.id })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("15m")
            .sign(accessTokenSecret);

        // Sign RefreshToken
        const newRefreshToken = await new SignJWT({ userId: user.id })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d")
            .sign(refreshTokenSecret);

        // hashedRefreshToken
        const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10);

        // update the Refresh Token to the database
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: hashedRefreshToken },
        });

        // Return success response
        const response = NextResponse.json(
            {
                message: "Token refreshed successfully!",
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
        response.cookies.set("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Invalid or expired refresh token." },
            { status: 401 },
        );
    }
}
