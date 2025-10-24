"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/")
    }
  }, [cart, router])

  const handleCheckout = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseIds: cart.map((course) => course.id),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      if (stripe && data.sessionId) {
        const { error: stripeError } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        })

        if (stripeError) {
          throw new Error(stripeError.message)
        }
      }
    } catch (err: any) {
      console.error("[v0] Checkout error:", err)
      setError(err.message)
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {cart.map((course) => (
              <Card key={course.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{course.title}</h3>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="secondary">{course.hours} Hours</Badge>
                      <Badge variant="outline">{course.state_code}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-lg font-bold text-primary">${course.price.toFixed(2)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="md:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-md">{error}</div>}

              <Button className="w-full" size="lg" onClick={handleCheckout} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Pay with Stripe"
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Secure payment powered by Stripe. Your payment information is encrypted and secure.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
