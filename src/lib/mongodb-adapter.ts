import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./db"

export const mongodbAdapter = MongoDBAdapter(clientPromise)
