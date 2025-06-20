import dbConnect from "@/lib/dbConnect";
import messageModel from "@/models/message.model";
export async function GET() {
  await dbConnect();

  const inbox = await messageModel.aggregate([
    { $sort: { timestamp: -1 } },
    {
      $group: {
        _id: "$from",
        lastMessage: { $first: "$text" },
        lastTime: { $first: "$timestamp" },
        profileName: { $first: "$profileName" },
        waId: { $first: "$waId" },
      },
    },
    { $sort: { lastTime: -1 } },
  ]);

  return Response.json({ inbox });
}
