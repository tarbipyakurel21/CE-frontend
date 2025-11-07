import { Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartSheet } from "@/components/cart-sheet"
import Link from "next/link"
import { UserMenu } from "@/components/user-menu"
import Image from "next/image"
import { getCurrentUser } from "@/lib/auth/jwt"

export async function Header() {
  const currentUser = await getCurrentUser()

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
            {currentUser ? (
              <UserMenu user={{ email: currentUser.email }} />
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
            <Link href="/" className="flex items-center group">
              <Image
                src="/cloud-crust-logo.jpg"
                alt="Cloud Crust LLC"
                width={180}
                height={80}
                className="h-16 w-auto object-contain group-hover:opacity-90 transition-opacity"
                priority
              />
            </Link>
            <div className="flex items-center gap-8 text-sm font-medium">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Courses
              </Link>
              {currentUser && (
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
