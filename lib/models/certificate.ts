import type { ObjectId } from "mongodb"
import { getDatabase } from "@/lib/mongodb"

export interface Certificate {
  _id?: ObjectId
  userId: string
  courseId: string
  certificateNumber: string
  issuedAt: Date
  createdAt: Date
}

export async function createCertificate(userId: string, courseId: string): Promise<Certificate> {
  const db = await getDatabase()
  const certificatesCollection = db.collection<Certificate>("certificates")

  // Check if certificate already exists
  const existing = await certificatesCollection.findOne({ userId, courseId })
  if (existing) {
    return existing
  }

  // Generate certificate number
  const certificateNumber = `CC-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`

  const certificate: Certificate = {
    userId,
    courseId,
    certificateNumber,
    issuedAt: new Date(),
    createdAt: new Date(),
  }

  const result = await certificatesCollection.insertOne(certificate)
  return { ...certificate, _id: result.insertedId }
}

export async function getCertificate(userId: string, courseId: string): Promise<Certificate | null> {
  const db = await getDatabase()
  const certificatesCollection = db.collection<Certificate>("certificates")
  return certificatesCollection.findOne({ userId, courseId })
}
