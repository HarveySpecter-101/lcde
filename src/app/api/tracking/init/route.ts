import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let body;
    if (contentType.includes("application/json")) {
      body = await req.json();
    } else {
      const text = await req.text();
      body = JSON.parse(text);
    }

    if (!body?.sessionId) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "unknown";

    // Check if session already exists (page reload)
    const existing = await db.siteVisit.findUnique({
      where: { sessionId: body.sessionId },
    });

    if (existing) {
      return NextResponse.json({ ok: true, id: existing.id });
    }

    const visit = await db.siteVisit.create({
      data: {
        sessionId: body.sessionId,
        ip,
        userAgent: body.userAgent || null,
        browser: body.browser || null,
        os: body.os || null,
        device: body.device || null,
        screenWidth: body.screenWidth || null,
        screenHeight: body.screenHeight || null,
        referrer: body.referrer || null,
        entryPage: body.entryPage || "/",
      },
    });

    return NextResponse.json({ ok: true, id: visit.id });
  } catch (error) {
    console.error("[Tracking Init Error]:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
