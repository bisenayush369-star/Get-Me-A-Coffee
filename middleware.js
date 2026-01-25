import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req) {
  const token = await getToken({ req })
  const { pathname } = req.nextUrl

  // Always allow API & auth routes
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/login") ||
    pathname === "/"
  ) {
    return NextResponse.next()
  }

  // Block protected routes if NOT logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
}
