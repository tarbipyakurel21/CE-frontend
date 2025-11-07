import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth/jwt"
import { getEnrollment } from "@/lib/models/enrollment"
import { getCourseById } from "@/lib/models/course"
import { CoursePlayer } from "@/components/course-player"

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/login")
  }

  const enrollment = await getEnrollment(currentUser.userId, id)

  if (!enrollment) {
    redirect("/dashboard")
  }

  const course = await getCourseById(id)

  if (!course) {
    redirect("/dashboard")
  }

  return (
    <CoursePlayer
      course={{
        id: course._id!.toString(),
        title: course.title,
        content: course.content,
        hours: course.hours,
      }}
      enrollment={{
        id: enrollment._id!.toString(),
        progress: enrollment.progress,
        completed: enrollment.completed,
      }}
      userId={currentUser.userId}
    />
  )
}
