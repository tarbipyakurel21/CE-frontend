import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function POST() {
  try {
    const db = await getDatabase()
    console.log("[v0] Starting database setup...")

    // Create indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    await db.collection("courses").createIndex({ stateCode: 1 })
    await db.collection("enrollments").createIndex({ userId: 1, courseId: 1 })
    await db.collection("certificates").createIndex({ userId: 1, courseId: 1 }, { unique: true })

    // Check if courses already exist
    const existingCourses = await db.collection("courses").countDocuments()

    if (existingCourses > 0) {
      return NextResponse.json({
        success: true,
        message: "Database already set up!",
      })
    }

    // Insert course data
    const courses = [
      {
        title: "Mississippi 2 Hour Project Management",
        description:
          "This course has been approved by the Mississippi State Board of Contractors for 2 hours of continuing education credit.",
        stateCode: "MS",
        hours: 2,
        price: 29.0,
        category: "Project Management",
        isBestseller: true,
        imageUrl: "/project-management-construction.jpg",
        content: `
# Mississippi 2 Hour Project Management

## Course Overview
This comprehensive course covers the essential aspects of project management for contractors...

## Learning Objectives
- Understand the fundamentals of project management
- Learn effective project planning techniques
- Master scheduling and resource allocation
...
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Mississippi 2 Hour Roofing & Repair",
        description:
          "This course has been approved by the Mississippi State Board of Contractors for 2 hours of continuing education credit.",
        stateCode: "MS",
        hours: 2,
        price: 29.0,
        category: "Roofing",
        isBestseller: false,
        imageUrl: "/roofing-repair-construction.jpg",
        content: `
# Mississippi 2 Hour Roofing & Repair

## Course Overview
Learn about roofing systems, common repairs, and maintenance best practices...
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Mississippi 4 Hour Business Management",
        description:
          "This course covers essential business management topics for contractors including financial planning, contracts, and risk management.",
        stateCode: "MS",
        hours: 4,
        price: 49.0,
        category: "Business",
        isBestseller: false,
        imageUrl: "/business-management-office.jpg",
        content: `
# Mississippi 4 Hour Business Management

## Course Overview
Master the business side of contracting with this comprehensive course...
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Alabama 6 Hour Contractor Continuing Education",
        description:
          "Complete your Alabama contractor license renewal requirements with this comprehensive 6-hour course.",
        stateCode: "AL",
        hours: 6,
        price: 59.0,
        category: "General",
        isBestseller: true,
        imageUrl: "/construction-safety-equipment.jpg",
        content: `
# Alabama 6 Hour Contractor Continuing Education

## Course Overview
Fulfill your Alabama continuing education requirements with this approved course...
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Alabama 3 Hour Ethics & Professionalism",
        description: "Learn about professional ethics and standards for contractors in Alabama.",
        stateCode: "AL",
        hours: 3,
        price: 39.0,
        category: "Ethics",
        isBestseller: false,
        imageUrl: "/professional-handshake-business.jpg",
        content: `
# Alabama 3 Hour Ethics & Professionalism

## Course Overview
Understand professional ethics and responsibilities in the contracting industry...
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("courses").insertMany(courses)

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
