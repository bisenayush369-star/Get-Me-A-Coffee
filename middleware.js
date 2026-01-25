import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Never touch NextAuth APIs
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Public routes
  if (pathname === "/" || pathname === "/about" || pathname === "/login") {
    return NextResponse.next();
  }

  // Protected routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/profile")) {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
