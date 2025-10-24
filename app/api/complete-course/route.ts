import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { courseId, enrollmentId } = await request.json()

    const supabase = await createServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Update enrollment as completed
    const { error: updateError } = await supabase
      .from("enrollments")
      .update({ completed_at: new Date().toISOString() })
      .eq("id", enrollmentId)
      .eq("user_id", user.id)

    if (updateError) {
      console.error("[v0] Error updating enrollment:", updateError)
      return NextResponse.json({ error: "Failed to complete course" }, { status: 500 })
    }

    // Generate certificate number
    const certificateNumber = `CERT-${Date.now()}-${user.id.slice(0, 8).toUpperCase()}`

    // Create certificate
    const { error: certError } = await supabase.from("certificates").insert({
      user_id: user.id,
      course_id: courseId,
      enrollment_id: enrollmentId,
      certificate_number: certificateNumber,
    })

    if (certError) {
      console.error("[v0] Error creating certificate:", certError)
      return NextResponse.json({ error: "Failed to generate certificate" }, { status: 500 })
    }

    return NextResponse.json({ success: true, certificateNumber })
  } catch (error: any) {
    console.error("[v0] Complete course error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
