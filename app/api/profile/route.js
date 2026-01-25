import { NextResponse } from "next/server";
import connectDB from "../../db/connectDb";
import User from "../../../models/User";

export const dynamic = 'force-dynamic'

// ✅ GET PROFILE (public page)
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json({}, { status: 400 });
    }

    const user = await User.findOne({ username }).lean();

    return NextResponse.json(user || {}, { status: 200 });
  } catch (error) {
    console.error("PROFILE GET ERROR:", error);
    return NextResponse.json({}, { status: 500 });
  }
}

// ✅ SAVE / UPDATE PROFILE (dashboard)
export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    const user = await User.findOneAndUpdate(
      { email: body.email },
      {
        name: body.name,
        username: body.username,
        profilePic: body.profilePic,
        coverPic: body.coverPic,
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("PROFILE POST ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
