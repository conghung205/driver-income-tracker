import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get("accessToken")?.value;

    const isAuthPage =
        pathname.startsWith("/login") || pathname.startsWith("/register");
    const isApiRoute = pathname.startsWith("/api");

    if (isAuthPage && accessToken) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!isAuthPage && !accessToken) {
        if (isApiRoute) {
            return NextResponse.json(
                { message: "Token missing!" },
                { status: 401 },
            );
        }
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // nếu là AuthPage thì cho qua
    if (isAuthPage) {
        return NextResponse.next();
    }

    // Verify token cho các route cần bảo mật
    try {
        const accessTokenSecret = new TextEncoder().encode(
            process.env.JWT_ACCESS_SECRET,
        );
        const { payload } = await jwtVerify(accessToken!, accessTokenSecret);

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user-id", payload.userId as string);

        return NextResponse.next({
            request: { headers: requestHeaders },
        });
    } catch (error) {
        console.error(error);

        if (isApiRoute) {
            return NextResponse.json(
                { message: "Invalid or expired access token." },
                { status: 401 },
            );
        }
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: [
        "/api/transactions/:path*",
        "/api/user/:path*",
        "/api/dashboard/:path*",
        "/login",
        "/register",
        "/",
        "/transactions/:path*",
        "/profile/:path*",
        "/statistics/:path*",
        "/api/vehicles/:path*",
    ],
};
