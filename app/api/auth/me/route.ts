import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth/jwt"
import { findUserById } from "@/lib/models/user"

export async function GET() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.json({ user: null })
    }

    const user = await findUserById(currentUser.userId)

    if (!user) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({
      user: {
        id: user._id!.toString(),
        email: user.email,
        fullName: user.fullName,
      },
    })
  } catch (error) {
    console.error("[v0] Get current user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
