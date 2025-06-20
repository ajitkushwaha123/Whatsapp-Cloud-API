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

    const entry = body?.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;

    const contact = value?.contacts?.[0];
    const message = value?.messages?.[0];

    if (!message || !contact) {
      return NextResponse.json({ ignored: true }, { status: 200 });
    }

    const from = message.from;
    const to = value.metadata.display_phone_number;
    const waId = contact.wa_id;
    const profileName = contact.profile?.name || null;
    const type = message.type || "text";
    const text = message?.text?.body || null;
    const timestamp = new Date(parseInt(message.timestamp) * 1000);

    const messageData = {
      messageId: message.id,
      timestamp,
      from,
      to,
      waId,
      profileName,
      type,
      text,
      direction: "incoming",
      phoneNumberId: value.metadata.phone_number_id,
      displayPhoneNumber: value.metadata.display_phone_number,
    };

    await messageModel.create(messageData);

    console.log("✅ Message saved from:", from);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
