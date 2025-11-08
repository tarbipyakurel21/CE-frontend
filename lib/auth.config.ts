import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { findUserByEmail, verifyPassword } from "@/lib/models/user"

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        const user = await findUserByEmail(credentials.email as string)
        if (!user) {
          throw new Error("Invalid email or password")
        }

        const isValidPassword = await verifyPassword(credentials.password as string, user.password || "")
        if (!isValidPassword) {
          throw new Error("Invalid email or password")
        }

        return {
          id: user._id!.toString(),
          email: user.email,
          name: user.fullName,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      if (account?.provider === "google") {
        token.provider = "google"
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig
