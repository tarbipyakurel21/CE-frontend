import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"
const JWT_EXPIRES_IN = "7d"

export interface JWTPayload {
  userId: string
  email: string
}

export async function generateToken(payload: JWTPayload): Promise<string> {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    return null
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")
  return token?.value || null
}

export async function removeAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}

export async function getCurrentUser(): Promise<JWTPayload | null> {
  const token = await getAuthToken()
  if (!token) return null
  return verifyToken(token)
}
