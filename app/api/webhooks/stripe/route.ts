import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createEnrollments } from "@/lib/models/enrollment"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

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
    const courseIds = session.metadata?.courseIds?.split(",")

    if (userId && courseIds) {
      try {
        await createEnrollments(userId, courseIds)
        console.log("[v0] Successfully created enrollments for user:", userId)
      } catch (error) {
        console.error("[v0] Failed to create enrollments:", error)
      }
    }
  }

  return NextResponse.json({ received: true })
}
