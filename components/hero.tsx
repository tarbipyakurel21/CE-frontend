"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function Hero() {
  const [selectedState, setSelectedState] = useState("MS")

  return (
    <section className="relative bg-gradient-to-br from-secondary/5 via-background to-accent/5 py-24">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
              <label className="text-sm font-semibold text-foreground mb-3 block">Select Your State</label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-[240px] h-11">
                  <SelectValue placeholder="Choose state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MS">Mississippi (MS)</SelectItem>
                  <SelectItem value="AL">Alabama (AL)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
            {selectedState === "MS" ? "Mississippi" : "Alabama"} Contractor Continuing Education
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Online Courses • On-Demand • Available 24/7 • Mobile Friendly
          </p>
          <Button size="lg" className="h-12 px-8 text-base font-semibold">
            View {selectedState === "MS" ? "Mississippi" : "Alabama"} Courses
          </Button>
        </div>
      </div>
    </section>
  )
}
