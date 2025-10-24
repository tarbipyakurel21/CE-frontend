import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Requirements } from "@/components/requirements"
import { CourseGrid } from "@/components/course-grid"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"
import { ContactBanner } from "@/components/contact-banner"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ContactBanner />
      <Requirements />
      <CourseGrid />
      <Testimonials />
      <Footer />
    </div>
  )
}
