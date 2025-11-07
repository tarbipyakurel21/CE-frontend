import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth/jwt"
import { updateEnrollmentProgress } from "@/lib/models/enrollment"
import { createCertificate } from "@/lib/models/certificate"

export async function POST(request: Request) {
  try {
    const { courseId } = await request.json()

    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    await updateEnrollmentProgress(currentUser.userId, courseId, 100, true)

    const certificate = await createCertificate(currentUser.userId, courseId)

    return NextResponse.json({ success: true, certificateNumber: certificate.certificateNumber })
  } catch (error: any) {
    console.error("[v0] Complete course error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
