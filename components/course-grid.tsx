"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart, type Course } from "@/lib/cart-context"
import { Loader2 } from "lucide-react"

export function CourseGrid() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedState, setSelectedState] = useState("MS")
  const { addToCart, cart } = useCart()

  useEffect(() => {
    async function fetchCourses() {
      try {
        // Fetch courses from MongoDB API instead of Supabase
        const response = await fetch("/api/courses")
        if (!response.ok) throw new Error("Failed to fetch courses")

        const data = await response.json()
        setCourses(data.courses || [])
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const isInCart = (courseId: string) => cart.some((item) => item.id === courseId)

  const filteredCourses = courses.filter((course) => course.stateCode === selectedState)

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-secondary">Online Continuing Education Courses</h2>

        <Tabs defaultValue="MS" className="max-w-6xl mx-auto" onValueChange={setSelectedState}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="MS">Mississippi Courses</TabsTrigger>
            <TabsTrigger value="AL">Alabama Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="MS">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="flex flex-col hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <img
                      src={
                        course.imageUrl ||
                        `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(course.title)}`
                      }
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {course.isBestseller && (
                      <Badge className="absolute top-3 right-3 bg-primary shadow-lg">Bestseller</Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{course.title}</CardTitle>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary">{course.hours} Hours</Badge>
                        <Badge variant="outline">{course.stateCode}</Badge>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => addToCart(course)}
                      disabled={isInCart(course.id)}
                    >
                      {isInCart(course.id) ? "In Cart" : "Add to Cart"}
                    </Button>
                    <span className="text-2xl font-bold text-primary">${course.price.toFixed(2)}</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="AL">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="flex flex-col hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <img
                      src={
                        course.imageUrl ||
                        `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(course.title)}`
                      }
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {course.isBestseller && (
                      <Badge className="absolute top-3 right-3 bg-primary shadow-lg">Bestseller</Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{course.title}</CardTitle>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary">{course.hours} Hours</Badge>
                        <Badge variant="outline">{course.stateCode}</Badge>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => addToCart(course)}
                      disabled={isInCart(course.id)}
                    >
                      {isInCart(course.id) ? "In Cart" : "Add to Cart"}
                    </Button>
                    <span className="text-2xl font-bold text-primary">${course.price.toFixed(2)}</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
