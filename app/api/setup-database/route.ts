import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    console.log("[v0] Starting database setup...")

    // Insert course data directly
    const courses = [
      {
        title: "Mississippi 2 Hour Project Management",
        description:
          "This course has been approved by the Mississippi State Board of Contractors for 2 hours of continuing education credit.",
        state_code: "MS",
        hours: 2,
        price: 29.0,
        topics: [
          "Purpose of project management",
          "Project management concerns",
          "Useful systems for project management",
        ],
        is_bestseller: true,
        image_url: "/project-management-construction.jpg",
      },
      {
        title: "Mississippi 2 Hour Roofing & Repair",
        description:
          "This course has been approved by the Mississippi State Board of Contractors for 2 hours of continuing education credit.",
        state_code: "MS",
        hours: 2,
        price: 29.0,
        topics: ["Sources of damage", "Leaks", "Intensive care"],
        is_bestseller: false,
        image_url: "/roofing-repair-construction.jpg",
      },
      {
        title: "Mississippi 4 Hour Business Management",
        description:
          "This course covers essential business management topics for contractors including financial planning, contracts, and risk management.",
        state_code: "MS",
        hours: 4,
        price: 49.0,
        topics: ["Financial planning", "Contract management", "Risk assessment", "Business operations"],
        is_bestseller: false,
        image_url: "/business-management-office.jpg",
      },
      {
        title: "Alabama 6 Hour Contractor Continuing Education",
        description:
          "Complete your Alabama contractor license renewal requirements with this comprehensive 6-hour course.",
        state_code: "AL",
        hours: 6,
        price: 59.0,
        topics: ["Building codes", "Safety regulations", "Contract law", "Business practices"],
        is_bestseller: true,
        image_url: "/construction-safety-equipment.jpg",
      },
      {
        title: "Alabama 3 Hour Ethics & Professionalism",
        description: "Learn about professional ethics and standards for contractors in Alabama.",
        state_code: "AL",
        hours: 3,
        price: 39.0,
        topics: ["Professional ethics", "Industry standards", "Legal responsibilities"],
        is_bestseller: false,
        image_url: "/professional-handshake-business.jpg",
      },
    ]

    // Check if courses already exist
    const { data: existingCourses } = await supabase.from("courses").select("id").limit(1)

    if (existingCourses && existingCourses.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Database already set up!",
      })
    }

    // Insert courses
    const { error: insertError } = await supabase.from("courses").insert(courses)

    if (insertError) {
      console.error("[v0] Insert courses error:", insertError)
      return NextResponse.json(
        {
          error: `Failed to insert courses: ${insertError.message}`,
          details: insertError,
        },
        { status: 500 },
      )
    }

    console.log("[v0] Database setup complete!")

    return NextResponse.json({
      success: true,
      message: "Database setup complete! Courses have been added.",
    })
  } catch (error: any) {
    console.error("[v0] Setup error:", error)
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 },
    )
  }
}
