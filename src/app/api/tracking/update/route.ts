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

    await db.siteVisit.update({
      where: { sessionId: body.sessionId },
      data: {
        sectionsVisited: body.sectionsVisited ?? existing.sectionsVisited,
        events: body.events ?? existing.events,
        maxScrollPercent: Math.max(body.maxScrollPercent ?? 0, existing.maxScrollPercent),
        duration: Math.max(body.duration ?? 0, existing.duration),
        totalClicks: Math.max(body.totalClicks ?? 0, existing.totalClicks),
        ...(body.isEnd ? { endedAt: new Date() } : {}),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Tracking Update Error]:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
