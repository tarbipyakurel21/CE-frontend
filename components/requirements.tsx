"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Requirements() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="MS" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="MS">Mississippi</TabsTrigger>
            <TabsTrigger value="AL">Alabama</TabsTrigger>
          </TabsList>

          <TabsContent value="MS">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">CE Requirement:</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">2 Hours</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Renewal Deadline:</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Last day of the 12th month from issuance.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="AL">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">CE Requirement:</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">6 Hours</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Renewal Deadline:</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">September 30th annually.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
