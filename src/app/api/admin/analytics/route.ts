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

const SECTION_ALIASES: Record<string, string> = {
  hero: "accueil",
  stats: "statistiques",
  "hiring-companies": "entreprises",
  modules: "formations",
  "what-you-gain": "ce-que-vous-gagnez",
  "before-after": "avant-apres",
  "success-stories": "resultats",
};

const SECTION_METADATA: Record<string, { label: string; order: number; depth: string; color: string }> = {
  accueil: { label: "1. Accueil / Hero", order: 1, depth: "Début (0%)", color: "#8b5cf6" },
  statistiques: { label: "2. Chiffres Clés", order: 2, depth: "10% scroll", color: "#6366f1" },
  entreprises: { label: "3. Entreprises Partenaires", order: 3, depth: "25% scroll", color: "#3b82f6" },
  formations: { label: "4. Modules & Formations", order: 4, depth: "40% scroll", color: "#06b6d4" },
  intervenants: { label: "5. Intervenants & Experts", order: 5, depth: "55% scroll", color: "#14b8a6" },
  "ce-que-vous-gagnez": { label: "6. Ce que vous gagnez", order: 6, depth: "68% scroll", color: "#10b981" },
  "avant-apres": { label: "7. Avant / Après", order: 7, depth: "78% scroll", color: "#84cc16" },
  resultats: { label: "8. Témoignages & Résultats", order: 8, depth: "88% scroll", color: "#eab308" },
  fondateurs: { label: "9. Fondateurs", order: 9, depth: "93% scroll", color: "#f97316" },
  contact: { label: "10. Inscription & Formulaire", order: 10, depth: "Fin (100%)", color: "#ef4444" },
};

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

    // ── Section stats : normalisation et calcul d'entonnoir de scroll ──
    const allVisitsWithSections = await db.siteVisit.findMany({
      where: { sectionsVisited: { not: null } },
      select: { sectionsVisited: true },
    });

    const sectionAgg: Record<string, { views: number; totalTime: number }> = {};
    allVisitsWithSections.forEach((v) => {
      const sections = v.sectionsVisited as Array<{ name: string; totalTime: number }> | null;
      if (!Array.isArray(sections)) return;
      sections.forEach((s) => {
        const canonicalName = SECTION_ALIASES[s.name] || s.name;
        if (!sectionAgg[canonicalName]) {
          sectionAgg[canonicalName] = { views: 0, totalTime: 0 };
        }
        sectionAgg[canonicalName].views++;
        sectionAgg[canonicalName].totalTime += s.totalTime || 0;
      });
    });

    const sectionStats = Object.entries(sectionAgg)
      .map(([name, data]) => {
        const meta = SECTION_METADATA[name] || {
          label: name,
          order: 99,
          depth: "Section",
          color: "#a855f7",
        };
        const percentage = totalVisits > 0 ? Math.min(100, Math.round((data.views / totalVisits) * 100)) : 0;
        return {
          name,
          label: meta.label,
          order: meta.order,
          depth: meta.depth,
          color: meta.color,
          views: data.views,
          percentage,
          avgTime: data.views > 0 ? Math.round(data.totalTime / data.views) : 0,
        };
      })
      .sort((a, b) => a.order - b.order); // Natural scroll progression from top to bottom

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
