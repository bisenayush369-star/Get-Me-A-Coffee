import { NextResponse } from "next/server";
import connectDB from "../../db/connectDb";
import Payment from "../../../models/Payment";

// export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json([], { status: 200 });
    }

    const payments = await Payment
  .find({ to_user: username })
  .sort({ createdAt: -1 })
  .limit(5)
  .lean();

    return NextResponse.json(payments, { status: 200 });
  } catch (err) {
    console.error("PAYMENTS API ERROR:", err);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { username, name, message, amount, razorpayPaymentId } = body;

    if (!username || !name || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const payment = await Payment.create({
      to_user: username,
      name: name || "Anonymous",
      message: message || "",
      amount: Number(amount),
      oid: razorpayPaymentId || "",
      done: true,
    });

    return NextResponse.json({ success: true, payment }, { status: 201 });
  } catch (err) {
    console.error("PAYMENTS POST ERROR:", err);
    return NextResponse.json(
      { error: "Payment save failed" },
      { status: 500 }
    );
  }
}
