import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth/jwt"
import { getCertificate } from "@/lib/models/certificate"
import { getCourseById } from "@/lib/models/course"
import { findUserById } from "@/lib/models/user"
import { Certificate } from "@/components/certificate"

export default async function CertificatePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/login")
  }

  const certificate = await getCertificate(currentUser.userId, courseId)

  if (!certificate) {
    redirect("/dashboard")
  }

  const [course, user] = await Promise.all([getCourseById(courseId), findUserById(currentUser.userId)])

  if (!course || !user) {
    redirect("/dashboard")
  }

  return (
    <Certificate
      certificateNumber={certificate.certificateNumber}
      studentName={user.fullName || user.email}
      courseName={course.title}
      hours={course.hours}
      stateCode={course.stateCode}
      completionDate={new Date(certificate.issuedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    />
  )
}
