import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isUserAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    return NextResponse.json({ ok: false, error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "50")));
    const skip = (page - 1) * limit;

    const [visits, total] = await Promise.all([
      db.siteVisit.findMany({
        orderBy: { startedAt: "desc" },
        skip,
        take: limit,
      }),
      db.siteVisit.count(),
    ]);

    return NextResponse.json({
      ok: true,
      visits: visits.map((v) => ({
        id: v.id,
        sessionId: v.sessionId,
        ip: v.ip,
        browser: v.browser,
        os: v.os,
        device: v.device,
        screenWidth: v.screenWidth,
        screenHeight: v.screenHeight,
        referrer: v.referrer,
        entryPage: v.entryPage,
        sectionsVisited: v.sectionsVisited,
        events: v.events,
        maxScrollPercent: v.maxScrollPercent,
        duration: v.duration,
        totalClicks: v.totalClicks,
        startedAt: v.startedAt.toISOString(),
        endedAt: v.endedAt?.toISOString() || null,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[Admin Visits Error]:", error);
    return NextResponse.json(
      { ok: false, error: "Erreur lors de la récupération des visites" },
      { status: 500 }
    );
  }
}
