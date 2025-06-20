import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      to,
      type = "text",
      message,
      templateName,
      languageCode = "en_US",
    } = body;

    if (
      !to ||
      (type === "text" && !message) ||
      (type === "template" && !templateName)
    ) {
      return NextResponse.json(
        { error: "Missing required fields in request body." },
        { status: 400 }
      );
    }

    const url = `${process.env.META_WA_API_URL}/${process.env.META_WA_PHONE_NUMBER_ID}/messages`;

    let payload = {
      messaging_product: "whatsapp",
      to,
      type,
    };

    if (type === "text") {
      payload.text = { body: message };
    } else if (type === "template") {
      payload.template = {
        name: templateName,
        language: { code: languageCode },
      };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.META_WA_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Meta API error", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
