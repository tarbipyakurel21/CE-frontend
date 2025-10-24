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
                  <path d="M12 3L2 9v2h20V9l-10-6zm-8 8v9h5v-6h6v6h5v-9H4zm8 9v-4h-2v4h2z" />
                </svg>
              </div>
              <div className="text-foreground">
                <div className="font-bold text-xl leading-tight tracking-tight">BUILDERS LICENSE</div>
                <div className="text-xs leading-tight text-muted-foreground font-medium tracking-wide">
                  TRAINING INSTITUTE
                </div>
              </div>
            </Link>
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
