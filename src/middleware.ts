import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    // Lấy access Token từ header
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.split(" ")[1];

    if (!accessToken) {
        return NextResponse.json(
            { message: "Token missing!" },
            { status: 401 },
        );
    }

    try {
        const accessTokenSecret = new TextEncoder().encode(
            process.env.JWT_ACCESS_SECRET,
        );
        const { payload } = await jwtVerify(accessToken, accessTokenSecret);

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user-id", payload.userId as string);

        return NextResponse.next({
            request: { headers: requestHeaders },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Invalid or expired access token.!" },
            { status: 401 },
        );
    }
}
export const config = {
    matcher: [
        "/api/transactions/:path*",
        "/api/user/:path*",
        "/api/dashboard/:path*",
    ],
};
