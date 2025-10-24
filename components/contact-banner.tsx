import { Phone } from "lucide-react"

export function ContactBanner() {
  return (
    <div className="bg-accent text-accent-foreground py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <div className="font-semibold text-center md:text-left">We Are Here To Help!</div>
          <a
            href="tel:1-800-727-7104"
            className="flex items-center gap-2 text-xl font-bold hover:opacity-90 order-first md:order-none"
          >
            <span className="hidden md:inline">Call Us</span>
            <Phone className="h-5 w-5" />
            <span>1-800-727-7104</span>
          </a>
          <div className="text-sm text-center md:text-right">Monday–Friday 8am–6:30pm ET</div>
        </div>
      </div>
    </div>
  )
}
