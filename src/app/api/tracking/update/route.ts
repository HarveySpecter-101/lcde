import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let body;
    if (contentType.includes("application/json")) {
      body = await req.json();
    } else {
      const text = await req.text();
      try {
        body = JSON.parse(text);
      } catch {
        return NextResponse.json({ ok: false }, { status: 400 });
      }
    }

    if (!body?.sessionId) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const existing = await db.siteVisit.findUnique({
      where: { sessionId: body.sessionId },
    });

    if (!existing) {
      return NextResponse.json({ ok: false, error: "Session not found" }, { status: 404 });
    }

    const elapsed = Math.max(0, Date.now() - existing.startedAt.getTime());
    const finalDuration = Math.max(body.duration ?? 0, existing.duration, elapsed);
    const finalMaxScroll = Math.max(body.maxScrollPercent ?? 0, existing.maxScrollPercent);

    // Update referrer if client detected specific source (like WhatsApp)
    let referrerToSave = existing.referrer;
    if (body.referrer && body.referrer !== "Direct" && body.referrer !== "Accès direct") {
      referrerToSave = body.referrer;
    } else if (!referrerToSave && body.referrer) {
      referrerToSave = body.referrer;
    }

    await db.siteVisit.update({
      where: { sessionId: body.sessionId },
      data: {
        sectionsVisited: body.sectionsVisited ?? existing.sectionsVisited,
        events: body.events ?? existing.events,
        maxScrollPercent: finalMaxScroll,
        duration: finalDuration,
        totalClicks: Math.max(body.totalClicks ?? 0, existing.totalClicks),
        referrer: referrerToSave,
        ...(body.isEnd ? { endedAt: new Date() } : {}),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Tracking Update Error]:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
