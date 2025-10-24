"use client"

import { ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export function CartSheet() {
  const { cart, removeFromCart, cartTotal, cartCount } = useCart()
  const router = useRouter()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="text-secondary-foreground hover:bg-white/10 relative">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart ({cartCount})
          {cartCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary">
              {cartCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {cartCount === 0 ? "Your cart is empty" : `${cartCount} course${cartCount > 1 ? "s" : ""} in your cart`}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No courses in cart yet</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {cart.map((course) => (
                  <div key={course.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">{course.title}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {course.hours} Hours
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {course.state_code}
                        </Badge>
                      </div>
                      <p className="text-lg font-bold text-primary">${course.price.toFixed(2)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(course.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">${cartTotal.toFixed(2)}</span>
                </div>
                <Button className="w-full" size="lg" onClick={() => router.push("/checkout")}>
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
