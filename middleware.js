// import { NextResponse } from "next/server";

// export function middleware(request) {
//     const token = request.cookies.get("token")?.value;

//     if (!token && request.nextUrl.pathname.startsWith("/admin")) {
//         return NextResponse.redirect(new URL("/login", request.url));
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: ["/admin/:path*"],
// };

import { authMiddleware } from "./lib/authMiddleware";

export function middleware(request) {
    return authMiddleware(request);
}

// Tell Next.js which routes to apply this middleware to
export const config = {
    matcher: ["/admin/:path*"],
};