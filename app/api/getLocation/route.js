import { NextResponse } from "next/server";
import Location from "@/models/Location";
import connectDB from "@/lib/mongo"; // If using a separate DB connection file

export async function GET() {
  try {
    await connectDB(); // Ensure DB is connected (if needed)
    const users = await Location.find();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
  }
}
