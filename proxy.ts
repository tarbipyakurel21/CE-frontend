import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isAuth = !!req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup")

  // Protect dashboard and course routes
  if ((req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/course")) && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Redirect logged-in users away from auth pages
  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)"],
}
