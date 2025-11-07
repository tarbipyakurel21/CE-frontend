import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth/jwt"
import { getUserEnrollments } from "@/lib/models/enrollment"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Award } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/login")
  }

  const enrollments = await getUserEnrollments(currentUser.userId)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Continue your learning journey.</p>
        </div>

        {!enrollments || enrollments.length === 0 ? (
          <Card className="p-12 text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-xl font-semibold mb-2">No Courses Yet</h2>
            <p className="text-muted-foreground mb-6">You haven't enrolled in any courses yet.</p>
            <Button asChild>
              <Link href="/">Browse Courses</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment) => {
              const course = enrollment.course
              return (
                <Card key={enrollment._id!.toString()} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted relative">
                    {course.imageUrl ? (
                      <img
                        src={course.imageUrl || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    {enrollment.completedAt && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-green-500">
                          <Award className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      <Badge variant="secondary">{course.hours} Hours</Badge>
                      <Badge variant="outline">{course.stateCode}</Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

                    <Button asChild className="w-full">
                      <Link href={`/course/${course._id}`}>
                        {enrollment.completedAt ? (
                          <>
                            <Award className="mr-2 h-4 w-4" />
                            View Certificate
                          </>
                        ) : (
                          <>
                            <BookOpen className="mr-2 h-4 w-4" />
                            Continue Learning
                          </>
                        )}
                      </Link>
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
