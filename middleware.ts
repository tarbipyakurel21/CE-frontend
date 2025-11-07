import { NextResponse, type NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth/jwt"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value

  // Verify JWT token
  const user = token ? await verifyToken(token) : null

  // Protect dashboard and course routes
  if ((request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/course")) && !user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect logged-in users away from auth pages
  if ((request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup") && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)"],
}
