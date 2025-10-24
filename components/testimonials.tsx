import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    text: "You guys have been just great! I will be using you for all my continuing education as well. My education has been seamless. I've called several times and everyone I've spoken to has been nice and helpful.",
    author: "Marvin W.",
    location: "Minnesota",
  },
  {
    id: 2,
    text: "Your courses are inexpensive with an easy to use platform. Much more convenient than taking time off work to go to a live course. I like that I can do it on my own time, VERY CONVENIENT!",
    author: "Adam M.",
    location: "Utah",
  },
]

export function Testimonials() {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <Quote className="h-10 w-10 text-primary mb-4" />
                <p className="text-muted-foreground italic mb-4 leading-relaxed">{testimonial.text}</p>
                <div className="text-right">
                  <p className="font-semibold text-primary">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
