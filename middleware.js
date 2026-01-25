import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip NextAuth routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Skip public routes
  if (pathname === "/" || pathname === "/about" || pathname.startsWith("/login") || pathname.match(/^\/[^/]+$/)) {
    return NextResponse.next();
  }

  // Protect dashboard and profile routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/profile")) {
    try {
      const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

      if (!token) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      console.error("Middleware auth error:", error);
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|public).*)",
  ],
};
