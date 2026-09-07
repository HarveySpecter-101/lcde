import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isUserAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    return NextResponse.json({ ok: false, error: "Non autorisé" }, { status: 401 });
  }

  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Total visits
    const [totalVisits, todayVisits, weekVisits] = await Promise.all([
      db.siteVisit.count(),
      db.siteVisit.count({ where: { startedAt: { gte: todayStart } } }),
      db.siteVisit.count({ where: { startedAt: { gte: weekAgo } } }),
    ]);

    // Averages
    const avgData = await db.siteVisit.aggregate({
      _avg: {
        duration: true,
        maxScrollPercent: true,
        totalClicks: true,
      },
    });

    // Bounce rate (users who scrolled < 10%)
    const bounceCount = await db.siteVisit.count({
      where: { maxScrollPercent: { lt: 10 } },
    });
    const bounceRate = totalVisits > 0 ? Math.round((bounceCount / totalVisits) * 100) : 0;

    // Visits per day (last 30 days)
    const recentVisits = await db.siteVisit.findMany({
      where: { startedAt: { gte: monthAgo } },
      select: { startedAt: true },
      orderBy: { startedAt: "asc" },
    });

    const visitsPerDay: Record<string, number> = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const key = d.toISOString().split("T")[0];
      visitsPerDay[key] = 0;
    }
    recentVisits.forEach((v) => {
      const key = v.startedAt.toISOString().split("T")[0];
      if (visitsPerDay[key] !== undefined) {
        visitsPerDay[key]++;
      }
    });

    const visitsPerDayArray = Object.entries(visitsPerDay).map(([date, count]) => ({
      date,
      count,
    }));

    // Section stats — aggregate from JSON field
    const allVisitsWithSections = await db.siteVisit.findMany({
      where: { sectionsVisited: { not: null } },
      select: { sectionsVisited: true },
    });

    const sectionAgg: Record<string, { views: number; totalTime: number }> = {};
    allVisitsWithSections.forEach((v) => {
      const sections = v.sectionsVisited as Array<{ name: string; totalTime: number }> | null;
      if (!Array.isArray(sections)) return;
      sections.forEach((s) => {
        if (!sectionAgg[s.name]) {
          sectionAgg[s.name] = { views: 0, totalTime: 0 };
        }
        sectionAgg[s.name].views++;
        sectionAgg[s.name].totalTime += s.totalTime || 0;
      });
    });

    const sectionStats = Object.entries(sectionAgg)
      .map(([name, data]) => ({
        name,
        views: data.views,
        avgTime: data.views > 0 ? Math.round(data.totalTime / data.views) : 0,
      }))
      .sort((a, b) => b.views - a.views);

    // Device, browser, referrer distribution
    const allVisitsForDist = await db.siteVisit.findMany({
      select: { device: true, browser: true, referrer: true },
    });

    const devices: Record<string, number> = {};
    const browsers: Record<string, number> = {};
    const referrers: Record<string, number> = {};

    allVisitsForDist.forEach((v) => {
      const dev = v.device || "Unknown";
      devices[dev] = (devices[dev] || 0) + 1;

      const br = v.browser || "Unknown";
      browsers[br] = (browsers[br] || 0) + 1;

      let ref = "Direct";
      if (v.referrer) {
        try {
          ref = new URL(v.referrer).hostname;
        } catch {
          ref = v.referrer.slice(0, 50);
        }
      }
      referrers[ref] = (referrers[ref] || 0) + 1;
    });

    return NextResponse.json({
      ok: true,
      summary: {
        totalVisits,
        todayVisits,
        weekVisits,
        avgDuration: Math.round(avgData._avg.duration || 0),
        avgScrollDepth: Math.round(avgData._avg.maxScrollPercent || 0),
        avgClicks: Math.round(avgData._avg.totalClicks || 0),
        bounceRate,
      },
      visitsPerDay: visitsPerDayArray,
      sectionStats,
      devices,
      browsers,
      referrers,
    });
  } catch (error) {
    console.error("[Admin Analytics Error]:", error);
    return NextResponse.json(
      { ok: false, error: "Erreur lors du calcul des analytics" },
      { status: 500 }
    );
  }
}
