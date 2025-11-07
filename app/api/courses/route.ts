import { type NextRequest, NextResponse } from "next/server"
import { getAllCourses } from "@/lib/models/course"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const stateCode = searchParams.get("state")

    const coursesData = await getAllCourses(stateCode || undefined)

    const courses = coursesData.map((course) => ({
      id: course._id!.toString(),
      title: course.title,
      description: course.description,
      stateCode: course.stateCode,
      hours: course.hours,
      price: course.price,
      category: course.category,
      imageUrl: course.imageUrl,
      isBestseller: course.isBestseller,
    }))

    return NextResponse.json({ courses })
  } catch (error) {
    console.error("[v0] Error fetching courses:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}
