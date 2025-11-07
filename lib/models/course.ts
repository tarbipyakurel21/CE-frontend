import { ObjectId } from "mongodb"
import { getDatabase } from "@/lib/mongodb"

export interface Course {
  _id?: ObjectId
  title: string
  description: string
  hours: number
  price: number
  stateCode: string
  category: string
  isBestseller: boolean
  imageUrl?: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export async function getAllCourses(stateCode?: string): Promise<Course[]> {
  const db = await getDatabase()
  const coursesCollection = db.collection<Course>("courses")

  const query = stateCode ? { stateCode } : {}
  return coursesCollection.find(query).sort({ isBestseller: -1 }).toArray()
}

export async function getCourseById(courseId: string): Promise<Course | null> {
  const db = await getDatabase()
  const coursesCollection = db.collection<Course>("courses")
  return coursesCollection.findOne({ _id: new ObjectId(courseId) })
}

export async function getCoursesByIds(courseIds: string[]): Promise<Course[]> {
  const db = await getDatabase()
  const coursesCollection = db.collection<Course>("courses")
  const objectIds = courseIds.map((id) => new ObjectId(id))
  return coursesCollection.find({ _id: { $in: objectIds } }).toArray()
}
