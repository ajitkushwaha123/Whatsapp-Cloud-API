import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import messageModel from "@/models/message.model";

export async function GET() {
  await dbConnect();

  const result = await messageModel.aggregate([
    {
      $sort: { createdAt: -1 }, 
    },
    {
      $group: {
        _id: "$from",
        lastMessage: { $first: "$message" },
        lastTime: { $first: "$createdAt" },
      },
    },
    { $sort: { lastTime: -1 } },
  ]);

  return NextResponse.json({ inbox: result });
}
