import { type NextRequest, NextResponse } from "next/server"
import { createUser } from "@/lib/models/user"
import { generateToken, setAuthCookie } from "@/lib/auth/jwt"

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Create user
    const user = await createUser(email, password, fullName)

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
  } catch (error: any) {
    console.error("[v0] Signup error:", error)
    if (error.message === "User already exists") {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
