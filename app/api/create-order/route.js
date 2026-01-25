import { NextResponse } from "next/server"
import { initiate } from "@/actions/useractions"

export async function POST(req) {
  try {
    const body = await req.json()
    const { amount, username, paymentform } = body

    const order = await initiate(amount, username, paymentform)

    return NextResponse.json(order)
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error)
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    )
  }
}
