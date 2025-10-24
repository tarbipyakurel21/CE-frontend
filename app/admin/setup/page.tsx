"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const runSetup = async () => {
    setLoading(true)
    setMessage("")
    setError("")

    try {
      const response = await fetch("/api/setup-database", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
      } else {
        setError(data.error || "Setup failed")
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-6">
        <h1 className="text-2xl font-bold mb-4">Database Setup</h1>
        <p className="text-muted-foreground mb-6">
          Click the button below to set up your database tables and seed initial data.
        </p>

        <Button onClick={runSetup} disabled={loading} className="w-full">
          {loading ? "Setting up..." : "Run Database Setup"}
        </Button>

        {message && <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-md">{message}</div>}

        {error && <div className="mt-4 p-4 bg-red-50 text-red-800 rounded-md">{error}</div>}
      </Card>
    </div>
  )
}
