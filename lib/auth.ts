import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { authConfig } from "./auth.config"
import { getMongoClient } from "./mongodb"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(getMongoClient()),
})
