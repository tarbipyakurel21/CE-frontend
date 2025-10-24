import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { Certificate } from "@/components/certificate"

export default async function CertificatePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch certificate
  const { data: certificate } = await supabase
    .from("certificates")
    .select(
      `
      *,
      courses (
        title,
        hours,
        state_code
      )
    `,
    )
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .single()

  if (!certificate) {
    redirect("/dashboard")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("full_name, email").eq("id", user.id).single()

  return (
    <Certificate
      certificateNumber={certificate.certificate_number}
      studentName={profile?.full_name || profile?.email || "Student"}
      courseName={certificate.courses.title}
      hours={certificate.courses.hours}
      stateCode={certificate.courses.state_code}
      completionDate={new Date(certificate.issued_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    />
  )
}
