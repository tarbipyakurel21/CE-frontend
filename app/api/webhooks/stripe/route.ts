import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error: any) {
    console.error("[v0] Webhook signature verification failed:", error.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = session.metadata?.userId
    const courseIds = session.metadata?.courseIds?.split(",").map((id) => Number.parseInt(id))

    if (userId && courseIds) {
      // Create enrollments for each course
      const enrollments = courseIds.map((courseId) => ({
        user_id: userId,
        course_id: courseId,
        stripe_payment_id: session.payment_intent as string,
      }))

      const { error } = await supabase.from("enrollments").insert(enrollments)

      if (error) {
        console.error("[v0] Failed to create enrollments:", error)
      } else {
        console.log("[v0] Successfully created enrollments for user:", userId)
      }
    }
  }

  return NextResponse.json({ received: true })
}
