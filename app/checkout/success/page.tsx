"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Loader2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sessionId = searchParams.get("session_id")

    if (sessionId) {
      // Clear the cart after successful payment
      clearCart()
      setLoading(false)
    } else {
      router.push("/")
    }
  }, [searchParams, clearCart, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your courses are now available in your dashboard.
          </p>
        </div>

        <div className="space-y-3">
          <Button className="w-full" onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </Button>
          <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  )
}
