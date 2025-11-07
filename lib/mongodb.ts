import { MongoClient, type Db } from "mongodb"

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

function getMongoClient(): Promise<MongoClient> {
  // Return cached promise if available
  if (clientPromise) {
    return clientPromise
  }

  // Check for MongoDB URI only when actually connecting
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("Please add your MongoDB URI to .env.local")
  }

  const options = {}

  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable to preserve the client across hot reloads
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    // In production mode, create a new client
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }

  return clientPromise
}

export async function getDatabase(): Promise<Db> {
  const client = await getMongoClient()
  return client.db(process.env.MONGODB_DB_NAME || "cloud_crust")
}

export default getMongoClient
