import { type NextRequest, NextResponse } from "next/server"
import { findUserByEmail, verifyPassword } from "@/lib/models/user"
import { generateToken, setAuthCookie } from "@/lib/auth/jwt"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const user = await findUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = await generateToken({
      userId: user._id!.toString(),
      email: user.email,
    })

    // Set cookie
    await setAuthCookie(token)

    return NextResponse.json({
      user: {
        id: user._id!.toString(),
        email: user.email,
        fullName: user.fullName,
      },
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
