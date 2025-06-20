import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import messageModel from "@/models/message.model";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN) {
      return new Response(challenge, { status: 200 });
    } else {
      return new Response("Verification failed", { status: 403 });
    }
  } catch (err) {
    return new Response("Error during verification", { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    console.log("body", body);

    const entry = body?.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const msg = value?.messages?.[0];

    if (msg && msg.text?.body) {
      const from = msg.from;
      const to = value.metadata.display_phone_number;
      const message = msg.text.body;

      await messageModel.create({
        from,
        to,
        message,
        type: msg.type || "text",
        direction: "incoming",
        profileName: msg?.profile?.name || null,
      });

      console.log("✅ Message saved from", from);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
