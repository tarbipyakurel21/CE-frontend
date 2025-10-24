import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { CoursePlayer } from "@/components/course-player"

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Check if user is enrolled in this course
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", user.id)
    .eq("course_id", id)
    .single()

  if (!enrollment) {
    redirect("/dashboard")
  }

  // Fetch course details
  const { data: course } = await supabase.from("courses").select("*").eq("id", id).single()

  if (!course) {
    redirect("/dashboard")
  }

  return <CoursePlayer course={course} enrollment={enrollment} userId={user.id} />
}
