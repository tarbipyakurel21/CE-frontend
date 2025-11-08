import { ObjectId } from "mongodb"
import { getDatabase } from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export interface User {
  _id?: ObjectId
  email: string
  password?: string
  fullName?: string
  name?: string
  image?: string
  emailVerified?: Date
  createdAt: Date
  updatedAt: Date
}

export async function createUser(email: string, password?: string, fullName?: string): Promise<User> {
  const db = await getDatabase()
  const usersCollection = db.collection<User>("users")

  const existingUser = await usersCollection.findOne({ email })
  if (existingUser) {
    throw new Error("User already exists")
  }

  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined

  const user: User = {
    email,
    ...(hashedPassword && { password: hashedPassword }),
    fullName,
    name: fullName,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await usersCollection.insertOne(user)
  return { ...user, _id: result.insertedId }
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const db = await getDatabase()
  const usersCollection = db.collection<User>("users")
  return usersCollection.findOne({ email })
}

export async function findUserById(userId: string): Promise<User | null> {
  const db = await getDatabase()
  const usersCollection = db.collection<User>("users")
  return usersCollection.findOne({ _id: new ObjectId(userId) })
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}
