"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Award, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface Course {
  id: number
  title: string
  description: string
  hours: number
  state_code: string
  topics: string[]
}

interface Enrollment {
  id: number
  completed_at: string | null
}

interface CoursePlayerProps {
  course: Course
  enrollment: Enrollment
  userId: string
}

export function CoursePlayer({ course, enrollment, userId }: CoursePlayerProps) {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set())
  const [isCompleting, setIsCompleting] = useState(false)

  // Sample course content sections
  const sections = [
    {
      title: "Introduction",
      content: `
        <h2>Welcome to ${course.title}</h2>
        <p>This ${course.hours}-hour continuing education course has been approved for ${course.state_code} contractors.</p>
        <p>In this course, you will learn about:</p>
        <ul>
          ${course.topics.map((topic) => `<li>${topic}</li>`).join("")}
        </ul>
        <p>Please read through all sections carefully. You must complete all sections to receive your certificate.</p>
      `,
      estimatedMinutes: 10,
    },
    ...course.topics.map((topic, index) => ({
      title: `Section ${index + 1}: ${topic}`,
      content: `
        <h2>${topic}</h2>
        <p>This section covers important information about ${topic.toLowerCase()}.</p>
        
        <h3>Key Points</h3>
        <ul>
          <li>Understanding the fundamentals of ${topic.toLowerCase()}</li>
          <li>Best practices and industry standards</li>
          <li>Common challenges and solutions</li>
          <li>Regulatory requirements and compliance</li>
        </ul>

        <h3>Learning Objectives</h3>
        <p>By the end of this section, you will be able to:</p>
        <ul>
          <li>Identify key concepts related to ${topic.toLowerCase()}</li>
          <li>Apply best practices in real-world scenarios</li>
          <li>Recognize potential issues and implement solutions</li>
          <li>Ensure compliance with relevant regulations</li>
        </ul>

        <h3>Detailed Content</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      `,
      estimatedMinutes: Math.floor((course.hours * 60) / course.topics.length),
    })),
    {
      title: "Course Summary & Quiz",
      content: `
        <h2>Course Summary</h2>
        <p>Congratulations on completing all sections of this course!</p>
        
        <h3>What You've Learned</h3>
        <ul>
          ${course.topics.map((topic) => `<li>${topic}</li>`).join("")}
        </ul>

        <h3>Final Quiz</h3>
        <p>To complete this course and receive your certificate, please answer the following questions:</p>
        
        <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <p><strong>1. What is the primary purpose of this course?</strong></p>
          <p>Answer: To provide continuing education for ${course.state_code} contractors.</p>
          
          <p style="margin-top: 20px;"><strong>2. How many hours of credit does this course provide?</strong></p>
          <p>Answer: ${course.hours} hours</p>
          
          <p style="margin-top: 20px;"><strong>3. What are the key topics covered?</strong></p>
          <p>Answer: ${course.topics.join(", ")}</p>
        </div>

        <p>Click "Complete Course" below to finish and receive your certificate.</p>
      `,
      estimatedMinutes: 15,
    },
  ]

  const progress = (completedSections.size / sections.length) * 100
  const isLastSection = currentSection === sections.length - 1
  const allSectionsCompleted = completedSections.size === sections.length

  const handleMarkComplete = () => {
    setCompletedSections((prev) => new Set([...prev, currentSection]))
  }

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleCompleteCourse = async () => {
    setIsCompleting(true)

    try {
      const response = await fetch("/api/complete-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: course.id,
          enrollmentId: enrollment.id,
        }),
      })

      if (response.ok) {
        router.push(`/certificate/${course.id}`)
      } else {
        alert("Failed to complete course. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Error completing course:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsCompleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="flex gap-2">
              <Badge variant="secondary">{course.hours} Hours</Badge>
              <Badge variant="outline">{course.state_code}</Badge>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              Progress: {completedSections.size} / {sections.length} sections
            </span>
            <Progress value={progress} className="w-48" />
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Course Outline */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-4">
              <h3 className="font-semibold mb-4">Course Outline</h3>
              <div className="space-y-2">
                {sections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSection(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentSection === index ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {completedSections.has(index) ? (
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{section.title}</p>
                        <p className="text-xs opacity-70 flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {section.estimatedMinutes} min
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="p-8">
              <div
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: sections[currentSection].content }}
              />

              <div className="mt-8 pt-8 border-t flex items-center justify-between">
                <Button variant="outline" onClick={handlePrevious} disabled={currentSection === 0}>
                  Previous
                </Button>

                <div className="flex gap-3">
                  {!completedSections.has(currentSection) && (
                    <Button variant="outline" onClick={handleMarkComplete}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Complete
                    </Button>
                  )}

                  {isLastSection && allSectionsCompleted ? (
                    <Button onClick={handleCompleteCourse} disabled={isCompleting}>
                      <Award className="mr-2 h-4 w-4" />
                      {isCompleting ? "Completing..." : "Complete Course"}
                    </Button>
                  ) : (
                    <Button onClick={handleNext} disabled={isLastSection}>
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
