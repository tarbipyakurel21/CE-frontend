"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Course {
  id: string
  title: string
  description: string
  stateCode: string
  hours: number
  price: number
  category: string
  imageUrl?: string
  isBestseller: boolean
}

interface CartContextType {
  cart: Course[]
  addToCart: (course: Course) => void
  removeFromCart: (courseId: string) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Course[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (course: Course) => {
    setCart((prev) => {
      // Check if course is already in cart
      if (prev.find((item) => item.id === course.id)) {
        return prev
      }
      return [...prev, course]
    })
  }

  const removeFromCart = (courseId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== courseId))
  }

  const clearCart = () => {
    setCart([])
  }

  const cartTotal = cart.reduce((sum, course) => sum + course.price, 0)
  const cartCount = cart.length

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
