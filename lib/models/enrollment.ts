import type { ObjectId } from "mongodb"
import { getDatabase } from "@/lib/mongodb"

export interface Enrollment {
  _id?: ObjectId
  userId: string
  courseId: string
  progress: number
  completed: boolean
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export async function createEnrollment(userId: string, courseId: string): Promise<Enrollment> {
  const db = await getDatabase()
  const enrollmentsCollection = db.collection<Enrollment>("enrollments")

  const enrollment: Enrollment = {
    userId,
    courseId,
    progress: 0,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await enrollmentsCollection.insertOne(enrollment)
  return { ...enrollment, _id: result.insertedId }
}

export async function createEnrollments(userId: string, courseIds: string[]): Promise<void> {
  const db = await getDatabase()
  const enrollmentsCollection = db.collection<Enrollment>("enrollments")

  const enrollments = courseIds.map((courseId) => ({
    userId,
    courseId,
    progress: 0,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))

  await enrollmentsCollection.insertMany(enrollments)
}

export async function getUserEnrollments(userId: string): Promise<Array<Enrollment & { course: any }>> {
  const db = await getDatabase()
  const enrollmentsCollection = db.collection<Enrollment>("enrollments")

  const enrollments = await enrollmentsCollection
    .aggregate([
      { $match: { userId } },
      {
        $addFields: {
          courseObjectId: { $toObjectId: "$courseId" },
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "courseObjectId",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },
      { $sort: { createdAt: -1 } },
    ])
    .toArray()

  return enrollments as Array<Enrollment & { course: any }>
}

export async function getEnrollment(userId: string, courseId: string): Promise<Enrollment | null> {
  const db = await getDatabase()
  const enrollmentsCollection = db.collection<Enrollment>("enrollments")
  return enrollmentsCollection.findOne({ userId, courseId })
}

export async function updateEnrollmentProgress(
  userId: string,
  courseId: string,
  progress: number,
  completed: boolean,
): Promise<void> {
  const db = await getDatabase()
  const enrollmentsCollection = db.collection<Enrollment>("enrollments")

  const update: any = {
    progress,
    completed,
    updatedAt: new Date(),
  }

  if (completed) {
    update.completedAt = new Date()
  }

  await enrollmentsCollection.updateOne({ userId, courseId }, { $set: update })
}
