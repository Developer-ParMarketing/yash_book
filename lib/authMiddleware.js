import { NextResponse } from "next/server";

export function authMiddleware(request) {
    const token = request.cookies.get("token")?.value;

    // Protect /admin routes
    if (!token && request.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}