"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { XCircle } from "lucide-react"

export default function CheckoutCancelPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <XCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
          <p className="text-muted-foreground">Your payment was cancelled. No charges were made to your account.</p>
        </div>

        <div className="space-y-3">
          <Button className="w-full" onClick={() => router.push("/checkout")}>
            Try Again
          </Button>
          <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  )
}
