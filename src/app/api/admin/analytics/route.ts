import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isUserAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = (date.getDay() + 6) % 7; // Monday = 0
  date.setDate(date.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date;
}

export async function GET() {
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    return NextResponse.json({ ok: false, error: "Non autorisé" }, { status: 401 });
  }

  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const mondayStart = getMonday(now);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // Total visits & period counts
    const [totalVisits, todayVisits, weekVisits, monthVisits] = await Promise.all([
      db.siteVisit.count(),
      db.siteVisit.count({ where: { startedAt: { gte: todayStart } } }),
      db.siteVisit.count({ where: { startedAt: { gte: mondayStart } } }),
      db.siteVisit.count({ where: { startedAt: { gte: monthStart } } }),
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

    // Fetch all visit timestamps for timeline aggregation
    const allVisits = await db.siteVisit.findMany({
      select: { startedAt: true },
      orderBy: { startedAt: "asc" },
    });

    // ── 1. Par jour (30 derniers jours) ──
    const dailyMap = new Map<string, number>();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const key = d.toISOString().slice(0, 10);
      dailyMap.set(key, 0);
    }
    allVisits.forEach((v) => {
      const key = v.startedAt.toISOString().slice(0, 10);
      if (dailyMap.has(key)) {
        dailyMap.set(key, (dailyMap.get(key) || 0) + 1);
      }
    });
    const visitsByDay = Array.from(dailyMap.entries()).map(([dateStr, count]) => {
      const [y, m, d] = dateStr.split("-");
      return {
        key: dateStr,
        label: `${d}/${m}`,
        fullDate: `${d}/${m}/${y}`,
        count,
      };
    });

    // ── 2. Par semaine (12 dernières semaines) ──
    const weeklyMap = new Map<string, { label: string; count: number }>();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      const mon = getMonday(d);
      const sun = new Date(mon.getTime() + 6 * 24 * 60 * 60 * 1000);
      const key = mon.toISOString().slice(0, 10);
      const label = `${mon.getDate()}/${mon.getMonth() + 1} - ${sun.getDate()}/${sun.getMonth() + 1}`;
      weeklyMap.set(key, { label, count: 0 });
    }
    allVisits.forEach((v) => {
      const mon = getMonday(v.startedAt);
      const key = mon.toISOString().slice(0, 10);
      if (weeklyMap.has(key)) {
        weeklyMap.get(key)!.count++;
      }
    });
    const visitsByWeek = Array.from(weeklyMap.entries()).map(([key, item]) => ({
      key,
      label: item.label,
      count: item.count,
    }));

    // ── 3. Par mois (12 derniers mois) ──
    const monthlyMap = new Map<string, { label: string; count: number }>();
    const monthNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`;
      monthlyMap.set(key, { label, count: 0 });
    }
    allVisits.forEach((v) => {
      const d = v.startedAt;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (monthlyMap.has(key)) {
        monthlyMap.get(key)!.count++;
      }
    });
    const visitsByMonth = Array.from(monthlyMap.entries()).map(([key, item]) => ({
      key,
      label: item.label,
      count: item.count,
    }));

    // ── 4. Overall (Évolution cumulative de toutes les visites) ──
    // Group all visits by day from earliest to latest, with cumulative running total
    let runningTotal = 0;
    const overallDayMap = new Map<string, number>();
    allVisits.forEach((v) => {
      const key = v.startedAt.toISOString().slice(0, 10);
      overallDayMap.set(key, (overallDayMap.get(key) || 0) + 1);
    });

    let visitsOverall = Array.from(overallDayMap.entries()).map(([dateStr, count]) => {
      runningTotal += count;
      const [y, m, d] = dateStr.split("-");
      return {
        key: dateStr,
        label: `${d}/${m}`,
        fullDate: `${d}/${m}/${y}`,
        count,
        total: runningTotal,
      };
    });

    // If no visits recorded yet, provide at least today's point with 0
    if (visitsOverall.length === 0) {
      const todayStr = now.toISOString().slice(0, 10);
      const [y, m, d] = todayStr.split("-");
      visitsOverall = [{
        key: todayStr,
        label: `${d}/${m}`,
        fullDate: `${d}/${m}/${y}`,
        count: 0,
        total: 0,
      }];
    }

    // ── Section stats ──
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

    // ── Device, browser, referrer distribution ──
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
        monthVisits,
        avgDuration: Math.round(avgData._avg.duration || 0),
        avgScrollDepth: Math.round(avgData._avg.maxScrollPercent || 0),
        avgClicks: Math.round(avgData._avg.totalClicks || 0),
        bounceRate,
      },
      chartData: {
        day: visitsByDay,
        week: visitsByWeek,
        month: visitsByMonth,
        overall: visitsOverall,
      },
      visitsPerDay: visitsByDay.map((d) => ({ date: d.key, count: d.count })),
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
