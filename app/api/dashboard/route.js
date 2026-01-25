import { NextResponse } from "next/server"
import connectDB from "../../../lib/mongodb"
import User from "../../../models/User"

export async function POST(req) {
  try {
    const body = await req.json()
    await connectDB()

    await User.findOneAndUpdate(
      { email: body.email },
      body,
      { upsert: true, new: true }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}
