import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import messageModel from "@/models/message.model";

export async function POST() {
  try {
    await dbConnect();

    const testMessage = await messageModel.create({
      from: "+919999999999",
      to: "+918888888888",
      message: "📦 Test message stored at " + new Date().toLocaleString(),
      type: "text",
      direction: "incoming",
    });

    return NextResponse.json({ success: true, data: testMessage });
  } catch (error) {
    console.error("❌ DB test error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
