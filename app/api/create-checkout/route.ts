import { NextResponse } from "next/server"
import Stripe from "stripe"
import { getCurrentUser } from "@/lib/auth/jwt"
import { getCoursesByIds } from "@/lib/models/course"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(request: Request) {
  try {
    const { courseIds } = await request.json()

    if (!courseIds || courseIds.length === 0) {
      return NextResponse.json({ error: "No courses provided" }, { status: 400 })
    }

    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const courses = await getCoursesByIds(courseIds)

    if (!courses || courses.length === 0) {
      return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: courses.map((course) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: course.title,
            description: `${course.hours} Hour Course - ${course.stateCode}`,
          },
          unit_amount: Math.round(course.price * 100), // Convert to cents
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || request.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || request.headers.get("origin")}/checkout/cancel`,
      customer_email: currentUser.email,
      metadata: {
        userId: currentUser.userId,
        courseIds: courseIds.join(","),
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error("[v0] Checkout error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
