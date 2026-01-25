import mongoose from "mongoose"

let isConnected = false

export default async function connectDb() {
  if (isConnected) return

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "getmeacoffee",
    })

    isConnected = true
    console.log("MongoDB connected")
  } catch (error) {
    console.error("MongoDB error", error)
  }
}
