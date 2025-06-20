import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import messageModel from "@/models/message.model";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");

  const filter = from ? { from } : {};

  const messages = await messageModel
    .find(filter)
    .sort({ createdAt: 1 })
    .limit(100);

  return NextResponse.json({ messages });
}
