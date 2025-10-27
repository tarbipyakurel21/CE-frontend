import { Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartSheet } from "@/components/cart-sheet"
import { createServerClient } from "@/lib/supabase/server"
import Link from "next/link"
import { UserMenu } from "@/components/user-menu"

export async function Header() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="bg-white border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center gap-6 text-sm">
            <div>
              <div className="font-semibold text-foreground">We're Here To Help</div>
              <div className="text-xs text-muted-foreground">Monday–Friday 8am–6:30pm ET</div>
            </div>
            <a
              href="tel:1-800-727-7104"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="font-semibold">1-800-727-7104</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <CartSheet />
            {user ? (
              <UserMenu user={user} />
            ) : (
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Main navigation */}
        <nav className="py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-primary p-2.5 rounded-lg group-hover:bg-primary/90 transition-colors">
                <svg className="h-8 w-8 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z" />
                </svg>
              </div>
              <div className="text-foreground">
                <div className="font-bold text-xl leading-tight tracking-tight">CLOUD CRUST</div>
                <div className="text-xs leading-tight text-muted-foreground font-medium tracking-wide">
                  CONTINUING EDUCATION
                </div>
              </div>
            </Link>
            {/* </CHANGE> */}
            <div className="flex items-center gap-8 text-sm font-medium">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Courses
              </Link>
              {user && (
                <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                  My Dashboard
                </Link>
              )}
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Get Licensed
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Renew A License
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                About
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
