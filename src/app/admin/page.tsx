"use client";

import { useEffect, useState, useMemo, useCallback, memo } from "react";
import {
  Search,
  Download,
  RefreshCw,
  LogOut,
  Lock,
  Mail,
  Phone,
  GraduationCap,
  Building,
  Calendar,
  User,
  FileSpreadsheet,
  BarChart3,
  Eye,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Activity,
  Sparkles,
  Users,
  MousePointerClick,
  MessageCircle,
  CheckCircle2,
  AlertOctagon,
  Share2,
  Compass,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

/* ────────────────────────────────────────────────────────────── */
/* Types                                                         */
/* ────────────────────────────────────────────────────────────── */

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: string;
  school: string;
  createdAt: string;
};

type ChartPoint = {
  key: string;
  label: string;
  fullDate?: string;
  count: number;
  total?: number;
};

type SectionStat = {
  name: string;
  label: string;
  order: number;
  depth: string;
  color: string;
  views: number;
  percentage: number;
  avgTime: number;
};

type AnalyticsData = {
  summary: {
    totalVisits: number;
    todayVisits: number;
    weekVisits: number;
    monthVisits?: number;
    avgDuration: number;
    avgScrollDepth: number;
    avgClicks: number;
    bounceRate: number;
  };
  chartData?: {
    day: ChartPoint[];
    week: ChartPoint[];
    month: ChartPoint[];
    overall: ChartPoint[];
  };
  visitsPerDay: Array<{ date: string; count: number }>;
  sectionStats: SectionStat[];
  devices: Record<string, number>;
  browsers: Record<string, number>;
  referrers: Record<string, number>;
};

type SiteVisit = {
  id: string;
  sessionId: string;
  ip: string | null;
  browser: string | null;
  os: string | null;
  device: string | null;
  screenWidth: number | null;
  screenHeight: number | null;
  referrer: string | null;
  entryPage: string;
  sectionsVisited: Array<{ name: string; totalTime: number }> | null;
  events: Array<{ type: string; target?: string; section?: string; time: number }> | null;
  maxScrollPercent: number;
  duration: number;
  totalClicks: number;
  startedAt: string;
  endedAt: string | null;
};

type Tab = "dashboard" | "submissions";
type PeriodFilter = "day" | "week" | "month" | "overall";

/* ────────────────────────────────────────────────────────────── */
/* Helpers                                                       */
/* ────────────────────────────────────────────────────────────── */

function formatDuration(ms: number): string {
  if (ms < 1000) return "< 1s";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}m ${sec}s`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const SECTION_LABELS: Record<string, string> = {
  accueil: "1. Accueil / Hero",
  hero: "1. Accueil / Hero",
  statistiques: "2. Chiffres Clés",
  stats: "2. Chiffres Clés",
  entreprises: "3. Entreprises Partenaires",
  "hiring-companies": "3. Entreprises Partenaires",
  formations: "4. Modules & Formations",
  modules: "4. Modules & Formations",
  intervenants: "5. Intervenants & Experts",
  "ce-que-vous-gagnez": "6. Ce que vous gagnez",
  "what-you-gain": "6. Ce que vous gagnez",
  "avant-apres": "7. Avant / Après",
  "before-after": "7. Avant / Après",
  resultats: "8. Témoignages & Résultats",
  "success-stories": "8. Témoignages & Résultats",
  fondateurs: "9. Fondateurs",
  founders: "9. Fondateurs",
  contact: "10. Inscription & Formulaire",
};


/* ── Traffic Source Helper ── */
type SourceInfo = {
  name: string;
  icon: "whatsapp" | "instagram" | "facebook" | "linkedin" | "tiktok" | "google" | "direct" | "other";
  color: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
};

function getSourceInfo(referrer: string | null): SourceInfo {
  const ref = (referrer || "").toLowerCase().trim();

  if (/whatsapp/i.test(ref))
    return { name: "WhatsApp", icon: "whatsapp", color: "#25D366", bgClass: "bg-emerald-500/20", textClass: "text-emerald-300", borderClass: "border-emerald-500/30" };
  if (/instagram|ig\b/i.test(ref))
    return { name: "Instagram", icon: "instagram", color: "#E1306C", bgClass: "bg-pink-500/20", textClass: "text-pink-300", borderClass: "border-pink-500/30" };
  if (/facebook|fb\.com|fbclid/i.test(ref))
    return { name: "Facebook", icon: "facebook", color: "#1877F2", bgClass: "bg-blue-500/20", textClass: "text-blue-300", borderClass: "border-blue-500/30" };
  if (/linkedin/i.test(ref))
    return { name: "LinkedIn", icon: "linkedin", color: "#0A66C2", bgClass: "bg-sky-500/20", textClass: "text-sky-300", borderClass: "border-sky-500/30" };
  if (/tiktok/i.test(ref))
    return { name: "TikTok", icon: "tiktok", color: "#000000", bgClass: "bg-white/10", textClass: "text-white", borderClass: "border-white/20" };
  if (/google/i.test(ref))
    return { name: "Google", icon: "google", color: "#4285F4", bgClass: "bg-blue-400/20", textClass: "text-blue-200", borderClass: "border-blue-400/30" };
  if (!ref || ref === "direct" || ref === "accès direct")
    return { name: "Accès direct", icon: "direct", color: "#94a3b8", bgClass: "bg-white/10", textClass: "text-white/60", borderClass: "border-white/10" };

  return { name: referrer || "Inconnu", icon: "other", color: "#94a3b8", bgClass: "bg-white/10", textClass: "text-white/60", borderClass: "border-white/10" };
}

const SOURCE_ICONS: Record<SourceInfo["icon"], React.ComponentType<{ className?: string }>> = {
  whatsapp: MessageCircle,
  instagram: Sparkles,
  facebook: Globe,
  linkedin: Globe,
  tiktok: Share2,
  google: Compass,
  direct: Globe,
  other: Globe,
};

/* ────────────────────────────────────────────────────────────── */
/* Animated Background                                           */
/* ────────────────────────────────────────────────────────────── */

const AnimatedBackground = memo(function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-[#030014]" />
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -120, 60, 0],
          y: [0, 60, -100, 0],
          scale: [1.1, 0.85, 1.15, 1.1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -right-32 h-[450px] w-[450px] rounded-full bg-blue-600/15 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, 80, -100, 0],
          y: [0, -50, 80, 0],
          scale: [0.95, 1.1, 0.85, 0.95],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 left-1/3 h-[400px] w-[400px] rounded-full bg-teal-500/15 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -60, 90, 0],
          y: [0, 100, -60, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-2/3 left-1/4 h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, 70, -40, 0],
          y: [0, -70, 50, 0],
          opacity: [0.1, 0.2, 0.08, 0.1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-0 right-1/3 h-[600px] w-[600px] rounded-full bg-rose-500/10 blur-[140px]"
      />
    </div>
  );
});

/* ────────────────────────────────────────────────────────────── */
/* Glass Panel                                                   */
/* ────────────────────────────────────────────────────────────── */

function GlassPanel({
  children,
  className = "",
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-5 ${className}`}
    >
      {title && (
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Session Timeline (parcours narratif simplifié)                 */
/* ────────────────────────────────────────────────────────────── */

function SessionTimeline({ visit }: { visit: SiteVisit }) {
  const sections = visit.sectionsVisited || [];
  const rawEvents = visit.events || [];
  const hasFormSubmit = rawEvents.some((e) => e.type === "form_submitted");

  // Identifier les sections vues dans l'ordre chronologique
  const orderedSectionsList: string[] = [];
  rawEvents.forEach((e) => {
    if ((e.type === "section_view" || e.type === "section_enter") && e.section) {
      if (!orderedSectionsList.includes(e.section)) orderedSectionsList.push(e.section);
    }
  });
  if (orderedSectionsList.length === 0 && sections.length > 0) {
    sections.forEach((s) => {
      if (s.name && !orderedSectionsList.includes(s.name)) orderedSectionsList.push(s.name);
    });
  }

  const lastSectionId = orderedSectionsList.length > 0 ? orderedSectionsList[orderedSectionsList.length - 1] : null;

  const timelineItems = useMemo(() => {
    const items: Array<{
      icon: React.ReactNode;
      title: string;
      subtitle?: string;
      badge?: string;
      badgeColor?: string;
      highlight?: boolean;
      highlightType?: "dropoff" | "conversion" | "standard";
    }> = [];

    const sourceInfo = getSourceInfo(visit.referrer);
    const SourceIcon = SOURCE_ICONS[sourceInfo.icon] || Globe;

    // 1. Arrivée sur le site
    items.push({
      icon: <SourceIcon className={`size-4 ${sourceInfo.textClass}`} />,
      title: `Arrivée sur le site via ${sourceInfo.name}`,
      subtitle: `Appareil : ${visit.browser || "Inconnu"} (${visit.os || "OS"}) · IP : ${visit.ip || "—"}`,
      badge: "Entrée",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    });

    // 2. Événements chronologiques (Vues de sections + Clics)
    if (rawEvents.length === 0 && sections.length > 0) {
      sections.forEach((s, idx) => {
        if (s.name) {
          const label = SECTION_LABELS[s.name] || s.name;
          const isLast = idx === sections.length - 1;
          const isDropOff = isLast && !hasFormSubmit;

          items.push({
            icon: isDropOff ? <AlertOctagon className="size-4 text-rose-400" /> : <Eye className="size-4 text-purple-400" />,
            title: isDropOff ? `🛑 S'est arrêté et a quitté sur "${label}"` : `A vu la section "${label}"`,
            subtitle: isDropOff ? "Point d'abandon : Dernière section consultée par le visiteur" : undefined,
            badge: isDropOff ? "POINT D'ABANDON" : `Étape ${idx + 1}`,
            badgeColor: isDropOff ? "bg-rose-500/25 text-rose-300 border-rose-500/40 font-bold" : "bg-purple-500/20 text-purple-300 border-purple-500/30",
            highlight: isDropOff,
            highlightType: isDropOff ? "dropoff" : undefined,
          });
        }
      });
    } else {
      const seenSections = new Set<string>();
      let step = 1;

      rawEvents.forEach((e) => {
        if (e.type === "section_view" || e.type === "section_enter") {
          const secId = e.section || "";
          if (secId && !seenSections.has(secId)) {
            seenSections.add(secId);
            const label = SECTION_LABELS[secId] || secId;
            const isLast = secId === lastSectionId && !hasFormSubmit;

            if (isLast) {
              items.push({
                icon: <AlertOctagon className="size-4 text-rose-400 animate-pulse" />,
                title: `🛑 S'EST ARRÊTÉ ET A QUITTÉ SUR : "${label}"`,
                subtitle: "Point d'abandon : C'est la dernière section consultée par l'utilisateur avant de quitter le site.",
                badge: "POINT D'ABANDON",
                badgeColor: "bg-rose-500/30 text-rose-200 border-rose-500/50 font-bold tracking-wider",
                highlight: true,
                highlightType: "dropoff",
              });
            } else {
              items.push({
                icon: <Eye className="size-4 text-purple-400" />,
                title: `A vu la section "${label}"`,
                badge: `Étape ${step++}`,
                badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
              });
            }
          }
        } else if (e.type === "click") {
          items.push({
            icon: <MousePointerClick className="size-4 text-sky-400" />,
            title: `A cliqué sur "${e.target || 'Bouton'}"`,
            badge: `Clic`,
            badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
          });
        }
      });
    }

    // 3. Formulaire rempli (EMPILER LA CONVERSION EN HAUTE PRIORITÉ)
    if (hasFormSubmit) {
      items.push({
        icon: <CheckCircle2 className="size-5 text-emerald-300 animate-pulse" />,
        title: "🎉 A REMPLI LE FORMULAIRE D'INSCRIPTION !",
        subtitle: "Candidature réussie : L'utilisateur a complété et validé le formulaire d'inscription.",
        badge: "CONVERSION RÉUSSIE",
        badgeColor: "bg-emerald-500/30 text-emerald-300 border-emerald-400/60 font-bold tracking-wider shadow-sm",
        highlight: true,
        highlightType: "conversion",
      });
    }

    // 4. Sortie du site
    if (visit.duration > 0 || visit.maxScrollPercent > 0) {
      items.push({
        icon: <LogOut className="size-4 text-white/50" />,
        title: hasFormSubmit ? "A quitté le site (Après avoir postulé)" : `A quitté le site sans postuler`,
        subtitle: `Durée de visite : ${formatDuration(visit.duration)} · Défilement max : ${visit.maxScrollPercent}%`,
        badge: hasFormSubmit ? "Fin (Converti)" : "Fin (Abandon)",
        badgeColor: hasFormSubmit ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-semibold" : "bg-rose-500/20 text-rose-300 border-rose-500/30",
      });
    }

    return items;
  }, [visit, sections, hasFormSubmit, lastSectionId]);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden"
    >
      <div className="border-t border-white/[0.06] bg-white/[0.02] px-4 py-5 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Informations de connexion */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">
              Informations de connexion
            </h4>
            <div className="space-y-2 text-xs text-white/80">
              <div className="flex justify-between">
                <span className="text-white/50">IP</span>
                <span className="font-mono">{visit.ip || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Navigateur</span>
                <span>{visit.browser || "—"} / {visit.os || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Appareil</span>
                <span>{visit.device || "—"} ({visit.screenWidth}×{visit.screenHeight})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/50">Source</span>
                {(() => {
                  const si = getSourceInfo(visit.referrer);
                  const SIcon = SOURCE_ICONS[si.icon] || Globe;
                  return si.icon !== "direct" && si.icon !== "other" ? (
                    <span className={`inline-flex items-center gap-1 rounded-md ${si.bgClass} border ${si.borderClass} px-2 py-0.5 text-xs font-semibold ${si.textClass}`}>
                      <SIcon className={`size-3 ${si.textClass}`} /> {si.name}
                    </span>
                  ) : (
                    <span className="truncate max-w-[200px]">{si.name}</span>
                  );
                })()}
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Durée totale</span>
                <span className="text-emerald-400 font-medium">{formatDuration(visit.duration)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Scroll max</span>
                <span>{visit.maxScrollPercent}%</span>
              </div>
            </div>

            {/* Sections visitées en résumé avec mise en valeur */}
            {sections.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                  Temps passé par section
                </h4>
                <div className="space-y-1.5">
                  {sections.map((s, i) => {
                    const isDropOff = s.name === lastSectionId && !hasFormSubmit;
                    const isConverted = (s.name === "contact" || s.name === "inscription") && hasFormSubmit;

                    return (
                      <div
                        key={i}
                        className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-all ${
                          isDropOff
                            ? "bg-rose-500/15 border border-rose-500/40 shadow-sm"
                            : isConverted
                            ? "bg-emerald-500/15 border border-emerald-500/40 shadow-sm"
                            : "bg-white/[0.04]"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={isDropOff ? "text-rose-200 font-bold" : isConverted ? "text-emerald-200 font-bold" : "text-white/80"}>
                            {SECTION_LABELS[s.name] || s.name}
                          </span>
                          {isDropOff && (
                            <span className="rounded bg-rose-500/30 px-1.5 py-0.5 text-[10px] font-bold text-rose-300 border border-rose-500/50">
                              🛑 A quitté ici
                            </span>
                          )}
                          {isConverted && (
                            <span className="rounded bg-emerald-500/30 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/50">
                              🎯 Candidature remplie
                            </span>
                          )}
                        </span>
                        <span className={`font-mono ${isDropOff ? "text-rose-300 font-bold" : isConverted ? "text-emerald-300 font-bold" : "text-white/50"}`}>
                          {formatDuration(s.totalTime)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Parcours du candidat (événements simples et narratifs avec fortes accentuations) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3 flex items-center justify-between">
              <span>Parcours chronologique du candidat</span>
              <span className="text-[10px] text-white/40">{timelineItems.length} étapes</span>
            </h4>
            <div className="space-y-3 pl-1">
              {timelineItems.map((item, i) => {
                const isDropOff = item.highlightType === "dropoff";
                const isConversion = item.highlightType === "conversion";

                return (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-3 rounded-2xl transition-all ${
                      isConversion
                        ? "bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-transparent border-2 border-emerald-400/60 ring-2 ring-emerald-500/20 shadow-xl shadow-emerald-950/40 scale-[1.01]"
                        : isDropOff
                        ? "bg-gradient-to-r from-rose-500/20 via-amber-500/10 to-transparent border-2 border-rose-500/60 ring-2 ring-rose-500/20 shadow-xl shadow-rose-950/40 scale-[1.01]"
                        : item.highlight
                        ? "bg-white/[0.06] border border-white/10 shadow-sm"
                        : "bg-white/[0.02] border border-white/5"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex size-8 flex-shrink-0 items-center justify-center rounded-xl ${
                        isConversion
                          ? "bg-emerald-500/30 text-emerald-300"
                          : isDropOff
                          ? "bg-rose-500/30 text-rose-300"
                          : "bg-white/[0.08]"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`text-xs ${
                            isConversion
                              ? "text-emerald-200 font-bold"
                              : isDropOff
                              ? "text-rose-200 font-bold"
                              : item.highlight
                              ? "text-white font-semibold"
                              : "text-white/90 font-medium"
                          }`}
                        >
                          {item.title}
                        </p>
                        {item.badge && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-lg border font-bold flex-shrink-0 ${
                              item.badgeColor || "bg-white/10 text-white/60 border-white/10"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <p
                          className={`text-[11px] mt-1 ${
                            isConversion
                              ? "text-emerald-300/80 font-medium"
                              : isDropOff
                              ? "text-rose-300/80 font-medium"
                              : "text-white/50"
                          }`}
                        >
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Main Admin Page                                               */
/* ────────────────────────────────────────────────────────────── */

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Tabs: Dashboard (Traffic & Sessions included) vs Candidatures
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  // Filter periods
  const [trafficPeriod, setTrafficPeriod] = useState<PeriodFilter>("day");
  const [submissionPeriod, setSubmissionPeriod] = useState<PeriodFilter | null>(null);


  // Submissions
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [downloadingExcel, setDownloadingExcel] = useState(false);
  const [search, setSearch] = useState("");
  const [subPage, setSubPage] = useState(1);
  const [subsPerPage, setSubsPerPage] = useState(25);

  // Analytics
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  // Traffic / Visits (integrated in Dashboard)
  const [visits, setVisits] = useState<SiteVisit[]>([]);
  const [loadingVisits, setLoadingVisits] = useState(false);
  const [expandedVisitId, setExpandedVisitId] = useState<string | null>(null);
  const [visitSearch, setVisitSearch] = useState("");
  const [visitPage, setVisitPage] = useState(1);
  const [visitsPerPage, setVisitsPerPage] = useState(25);

  /* ── Auth ── */
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoadingSubmissions(true);
    try {
      const res = await fetch("/api/admin/submissions");
      if (res.status === 401) {
        setIsAuthenticated(false);
        setSubmissions([]);
        return;
      }
      const data = await res.json();
      if (data.ok && Array.isArray(data.submissions)) {
        setSubmissions(data.submissions);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const fetchAnalytics = useCallback(async () => {
    setLoadingAnalytics(true);
    try {
      const res = await fetch("/api/admin/analytics");
      if (res.ok) {
        const data = await res.json();
        if (data.ok) setAnalytics(data);
      }
    } catch {
      toast.error("Erreur de chargement des analytics.");
    } finally {
      setLoadingAnalytics(false);
    }
  }, []);

  const fetchVisits = useCallback(async () => {
    setLoadingVisits(true);
    try {
      const res = await fetch("/api/admin/visits?limit=500");
      if (res.ok) {
        const data = await res.json();
        if (data.ok) setVisits(data.visits);
      }
    } catch {
      toast.error("Erreur de chargement des visites.");
    } finally {
      setLoadingVisits(false);
    }
  }, []);

  // When on dashboard, fetch both analytics and visits
  useEffect(() => {
    if (!isAuthenticated) return;
    if (activeTab === "dashboard") {
      if (!analytics) fetchAnalytics();
      if (visits.length === 0) fetchVisits();
    }
  }, [activeTab, isAuthenticated, analytics, visits.length, fetchAnalytics, fetchVisits]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setIsAuthenticated(true);
        toast.success("Connexion réussie !");
        fetchSubmissions();
        fetchAnalytics();
        fetchVisits();
      } else {
        toast.error(data.error || "Email ou mot de passe incorrect.");
      }
    } catch {
      toast.error("Erreur de connexion au serveur.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setIsAuthenticated(false);
      setSubmissions([]);
      setAnalytics(null);
      setVisits([]);
      setLoginEmail("");
      setLoginPassword("");
      toast.success("Déconnexion réussie.");
    } catch {
      toast.error("Erreur lors de la déconnexion.");
    }
  };

  /* ── Candidatures Stats by Period ── */
  const submissionStats = useMemo(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    const dayOfWeek = (now.getDay() + 6) % 7;
    const mondayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
    mondayStart.setHours(0, 0, 0, 0);
    const weekStartTime = mondayStart.getTime();

    const monthStartTime = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;

    submissions.forEach((s) => {
      const t = new Date(s.createdAt).getTime();
      if (t >= todayStart) todayCount++;
      if (t >= weekStartTime) weekCount++;
      if (t >= monthStartTime) monthCount++;
    });

    return {
      total: submissions.length,
      today: todayCount,
      week: weekCount,
      month: monthCount,
    };
  }, [submissions]);

  /* ── Filtered Submissions by Period & Search ── */
  const filteredSubmissions = useMemo(() => {
    if (!submissionPeriod) return [];

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    const dayOfWeek = (now.getDay() + 6) % 7;
    const mondayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
    mondayStart.setHours(0, 0, 0, 0);
    const weekStartTime = mondayStart.getTime();

    const monthStartTime = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    let list = submissions;

    if (submissionPeriod === "day") {
      list = list.filter((s) => new Date(s.createdAt).getTime() >= todayStart);
    } else if (submissionPeriod === "week") {
      list = list.filter((s) => new Date(s.createdAt).getTime() >= weekStartTime);
    } else if (submissionPeriod === "month") {
      list = list.filter((s) => new Date(s.createdAt).getTime() >= monthStartTime);
    }

    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q) ||
        s.level.toLowerCase().includes(q) ||
        s.school.toLowerCase().includes(q)
    );
  }, [submissions, submissionPeriod, search]);

  /* ── Filtered Visits ── */
  const filteredVisits = useMemo(() => {
    const q = visitSearch.trim().toLowerCase();
    if (!q) return visits;
    return visits.filter(
      (v) =>
        (v.ip || "").toLowerCase().includes(q) ||
        (v.browser || "").toLowerCase().includes(q) ||
        (v.device || "").toLowerCase().includes(q) ||
        (v.os || "").toLowerCase().includes(q) ||
        (v.referrer || "").toLowerCase().includes(q)
    );
  }, [visits, visitSearch]);

  // Reset pagination on filter changes
  useEffect(() => {
    setSubPage(1);
  }, [search, submissionPeriod]);

  useEffect(() => {
    setVisitPage(1);
  }, [visitSearch]);

  const totalSubPages = Math.max(1, Math.ceil(filteredSubmissions.length / subsPerPage));
  const paginatedSubmissions = useMemo(() => {
    const start = (subPage - 1) * subsPerPage;
    return filteredSubmissions.slice(start, start + subsPerPage);
  }, [filteredSubmissions, subPage, subsPerPage]);

  const totalVisitPages = Math.max(1, Math.ceil(filteredVisits.length / visitsPerPage));
  const paginatedVisits = useMemo(() => {
    const start = (visitPage - 1) * visitsPerPage;
    return filteredVisits.slice(start, start + visitsPerPage);
  }, [filteredVisits, visitPage, visitsPerPage]);

  /* ── Visits Chart Data by Selected Period ── */
  const currentVisitsChartData = useMemo(() => {
    if (!analytics?.chartData) {
      return analytics?.visitsPerDay?.map((d) => ({
        key: d.date,
        label: d.date.split("-").slice(1).join("/"),
        count: d.count,
      })) || [];
    }
    return analytics.chartData[trafficPeriod] || [];
  }, [analytics, trafficPeriod]);

  const exportToExcel = async () => {
    if (filteredSubmissions.length === 0) {
      toast.error("Aucune donnée à exporter pour cette sélection.");
      return;
    }
    setDownloadingExcel(true);
    try {
      toast.info("Génération du fichier Excel en cours...");
      const targetPeriod = submissionPeriod || "overall";
      const response = await fetch(`/api/admin/export?period=${targetPeriod}`);
      if (!response.ok) throw new Error("Erreur de génération.");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(
        new Blob([blob], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = `Candidatures_LCDE_${targetPeriod}_${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Fichier Excel téléchargé !");
    } catch {
      toast.error("Erreur lors du téléchargement.");
    } finally {
      setDownloadingExcel(false);
    }
  };

  const refreshAll = () => {
    fetchSubmissions();
    fetchAnalytics();
    fetchVisits();
  };

  /* ── Loading State ── */
  if (isAuthenticated === null) {
    return (
      <>
        <AnimatedBackground />
        <div className="flex min-h-screen items-center justify-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3"
          >
            <RefreshCw className="size-6 animate-spin text-purple-400" />
            <span className="text-sm font-medium">Chargement de l&apos;espace admin...</span>
          </motion.div>
        </div>
      </>
    );
  }

  /* ── Login Screen avec Logo LCDE ── */
  if (!isAuthenticated) {
    return (
      <>
        <AnimatedBackground />
        <div className="flex min-h-screen items-center justify-center px-4 py-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl"
          >
            {/* Logo officiel LCDE */}
            <div className="relative mx-auto mb-5 flex size-20 items-center justify-center overflow-hidden rounded-full bg-white p-2 shadow-2xl ring-4 ring-gold/40">
              <img
                src="/logo-lcde.png"
                alt="Logo Le Club Des Experts"
                className="size-full object-contain"
              />
            </div>

            <h1 className="text-center font-serif text-2xl font-bold text-white">
              Le Club Des Experts
            </h1>
            <p className="mt-1 text-center text-xs text-white/50">
              Portail d&apos;administration & suivi analytique
            </p>

            <form onSubmit={handleLogin} autoComplete="off" className="mt-7 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60">
                  Email administrateur
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-3 size-4 text-white/30" />
                  <Input
                    type="email"
                    required
                    autoComplete="off"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="h-11 rounded-xl border-white/10 bg-white/[0.06] pl-11 text-sm text-white placeholder:text-white/25 focus:border-purple-500/50 focus:ring-purple-500/30"
                    placeholder="admin@lcde.ma"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-3 size-4 text-white/30" />
                  <Input
                    type="password"
                    required
                    autoComplete="new-password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="h-11 rounded-xl border-white/10 bg-white/[0.06] pl-11 text-sm text-white placeholder:text-white/25 focus:border-purple-500/50 focus:ring-purple-500/30"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loggingIn}
                className="mt-3 h-12 w-full rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 font-bold text-white hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/20"
              >
                {loggingIn ? "Connexion en cours..." : "Accéder à l'administration"}
              </Button>
            </form>
          </motion.div>
        </div>
      </>
    );
  }

  /* ── Authenticated Admin (Tabs: Dashboard & Trafic vs Candidatures) ── */
  const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "dashboard", label: "Visiteurs", icon: BarChart3 },
    { id: "submissions", label: "Candidatures", icon: FileSpreadsheet },
  ];

  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen text-white">
        {/* ── Top Navbar ── */}
        <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-black/30 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
            {/* Logo de gauche */}
            <div className="flex items-center gap-3">
              <span className="relative flex size-10 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-gold/40 shadow-md flex-shrink-0">
                <img
                  src="/logo-lcde.png"
                  alt="Logo LCDE"
                  className="size-full object-contain p-0.5"
                />
              </span>
              <div>
                <h1 className="font-serif text-lg font-bold leading-none text-white flex items-center gap-2">
                  Le Club Des Experts
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Admin
                  </span>
                </h1>
                <p className="text-[11px] text-white/40">
                  Visiteurs · Candidatures
                </p>
              </div>
            </div>

            {/* Actions & Profil Admin à droite */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Photo de profil admin avec le logo du Club des Experts */}
              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 backdrop-blur-md">
                <div className="relative flex size-7 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-gold/50 shadow flex-shrink-0">
                  <img
                    src="/logo-lcde.png"
                    alt="Photo de profil admin - Le Club des Experts"
                    className="size-full object-contain p-0.5"
                  />
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-semibold text-white leading-tight">Admin LCDE</span>
                  <span className="text-[10px] text-emerald-400 font-medium leading-none flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Connecté
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={refreshAll}
                className="h-9 gap-1.5 rounded-xl border-white/10 bg-white/[0.04] text-xs text-white/80 hover:bg-white/[0.08] hover:text-white"
              >
                <RefreshCw className={`size-3.5 ${loadingAnalytics || loadingSubmissions || loadingVisits ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Rafraîchir</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="h-9 gap-1.5 rounded-xl border-white/10 bg-white/[0.04] text-xs text-white/80 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/20 transition-colors"
              >
                <LogOut className="size-3.5" />
                <span className="hidden sm:inline">Quitter</span>
              </Button>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <nav className="flex gap-2 -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 text-xs font-medium transition-all rounded-t-lg ${
                    activeTab === tab.id
                      ? "text-white bg-white/[0.06]"
                      : "text-white/50 hover:text-white/80 hover:bg-white/[0.03]"
                  }`}
                >
                  <tab.icon className="size-4 text-purple-400" />
                  <span>{tab.label}</span>
                  {tab.id === "submissions" && submissions.length > 0 && (
                    <span className="ml-1 rounded-full bg-purple-500/20 px-2 py-0.2 text-[10px] font-semibold text-purple-300 border border-purple-500/30">
                      {submissions.length}
                    </span>
                  )}
                  {tab.id === "dashboard" && visits.length > 0 && (
                    <span className="ml-1 rounded-full bg-blue-500/20 px-2 py-0.2 text-[10px] font-semibold text-blue-300 border border-blue-500/30">
                      {visits.length}
                    </span>
                  )}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full"
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </header>

        {/* ── Content ── */}
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <AnimatePresence mode="wait">
            {/* ========== DASHBOARD & TRAFFIC TAB ========== */}
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* ── Section 1 : Carte Visites Totales + Graphique des visites ── */}
                {loadingAnalytics && !analytics ? (
                  <div className="flex items-center justify-center py-20">
                    <RefreshCw className="size-6 animate-spin text-purple-400" />
                  </div>
                ) : analytics ? (
                  <div className="space-y-6">
                    {/* Carte Visites Totales épurée (durée moyenne, scroll moyen et visites cette semaine retirés selon la demande) */}
                    <div className="rounded-2xl border border-purple-500/20 bg-purple-500/[0.06] backdrop-blur-xl p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                            Visites totales sur le site
                          </p>
                          <div className="flex items-baseline gap-3 mt-1.5">
                            <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
                              {analytics.summary.totalVisits.toLocaleString("fr-FR")}
                            </span>
                            <span className="text-sm font-medium text-emerald-400 flex items-center gap-1">
                              <TrendingUp className="size-4" />
                              +{analytics.summary.todayVisits} aujourd&apos;hui
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs text-white/50">
                            Volume total de visiteurs uniques enregistrés sur la plateforme
                          </p>
                        </div>
                        <div className="flex size-14 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-300 shadow-inner flex-shrink-0">
                          <Globe className="size-7" />
                        </div>
                      </div>
                    </div>

                    {/* ── Graphique Visites Totales (Jour, Semaine, Mois, Overall) ── */}
                    <GlassPanel>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80 flex items-center gap-2">
                              <TrendingUp className="size-4 text-purple-400" />
                              Graphique des Visites Totales
                            </h3>
                            <span className="rounded-full bg-purple-500/15 border border-purple-500/25 px-2 py-0.5 text-[10px] font-semibold text-purple-300">
                              {analytics.summary.totalVisits} visites au total
                            </span>
                          </div>
                          <p className="text-xs text-white/40 mt-1">
                            {trafficPeriod === "day" && "Évolution des visites quotidiennes (30 derniers jours)"}
                            {trafficPeriod === "week" && "Évolution des visites hebdomadaires (12 dernières semaines)"}
                            {trafficPeriod === "month" && "Évolution des visites mensuelles (12 derniers mois)"}
                            {trafficPeriod === "overall" && "Courbe d'évolution cumulative de toutes les visites enregistrées"}
                          </p>
                        </div>

                        {/* Sélecteur de période : Jour / Semaine / Mois / Overall */}
                        <div className="flex items-center rounded-xl bg-white/[0.06] p-1 border border-white/10 self-start sm:self-auto">
                          {(["day", "week", "month", "overall"] as PeriodFilter[]).map((period) => {
                            const labels: Record<PeriodFilter, string> = {
                              day: "Par jour",
                              week: "Par semaine",
                              month: "Par mois",
                              overall: "Overall",
                            };
                            const isActive = trafficPeriod === period;
                            return (
                              <button
                                key={period}
                                onClick={() => setTrafficPeriod(period)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                                  isActive
                                    ? "bg-purple-600 text-white shadow-md shadow-purple-900/40 font-semibold"
                                    : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                                }`}
                              >
                                {labels[period]}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Chart */}
                      <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={currentVisitsChartData}>
                            <defs>
                              <linearGradient id="trafficPeriodGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.02} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                            <XAxis
                              dataKey="label"
                              tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10 }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <YAxis
                              tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10 }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <Tooltip
                              contentStyle={{
                                background: "rgba(10,0,30,0.95)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                borderRadius: "12px",
                                color: "#fff",
                                fontSize: "12px",
                                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)",
                              }}
                              labelFormatter={(_, payload) => {
                                if (payload && payload[0]?.payload) {
                                  const p = payload[0].payload as ChartPoint;
                                  return p.fullDate || p.label || p.key;
                                }
                                return "";
                              }}
                              formatter={(value: number) => [
                                `${value} visite${value > 1 ? "s" : ""}`,
                                trafficPeriod === "overall" ? "Total cumulé" : "Visites",
                              ]}
                            />
                            <Area
                              type="monotone"
                              dataKey={trafficPeriod === "overall" ? "total" : "count"}
                              stroke="#8b5cf6"
                              strokeWidth={2.5}
                              fill="url(#trafficPeriodGrad)"
                              name="Visites"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </GlassPanel>


                    {/* Distribution Appareils & Navigateurs */}
                    <div className="grid gap-6 lg:grid-cols-2">
                      <GlassPanel title="Répartition par Appareil">
                        <div className="space-y-2.5">
                          {Object.entries(analytics.devices)
                            .sort(([, a], [, b]) => b - a)
                            .map(([name, count]) => {
                              const max = Math.max(...Object.values(analytics.devices));
                              const pct = max > 0 ? (count / max) * 100 : 0;
                              const DeviceIcon =
                                name === "Mobile" ? Smartphone : name === "Tablet" ? Tablet : Monitor;
                              return (
                                <div key={name}>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-white/70 flex items-center gap-1.5">
                                      <DeviceIcon className="size-3.5 text-purple-400" />
                                      {name}
                                    </span>
                                    <span className="text-white/50">{count}</span>
                                  </div>
                                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                                    <div
                                      style={{ width: `${pct}%` }}
                                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-400"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </GlassPanel>

                      <GlassPanel title="Sources de trafic (WhatsApp, LinkedIn, Instagram, Google...)">
                        <div className="space-y-3">
                          {(() => {
                            const rawReferrers = analytics.referrers || {};
                            const entries = Object.entries(rawReferrers);
                            const totalTraffic = Object.values(rawReferrers).reduce((sum, c) => sum + c, 0);
                            const max = Math.max(...Object.values(rawReferrers), 1);

                            if (entries.length === 0) {
                              return (
                                <p className="text-xs text-white/40 py-4 text-center">
                                  Aucune donnée de source enregistrée pour le moment.
                                </p>
                              );
                            }

                            return entries
                              .sort(([, a], [, b]) => b - a)
                              .map(([sourceName, count]) => {
                                const si = getSourceInfo(sourceName);
                                const SIcon = SOURCE_ICONS[si.icon] || Globe;
                                const pctOfTotal = totalTraffic > 0 ? Math.round((count / totalTraffic) * 100) : 0;
                                const barWidth = Math.max(4, Math.round((count / max) * 100));

                                return (
                                  <div key={sourceName}>
                                    <div className="flex items-center justify-between text-xs mb-1.5">
                                      <span className="text-white/90 flex items-center gap-2 font-medium">
                                        <span className={`flex size-5 items-center justify-center rounded-md ${si.bgClass} border ${si.borderClass}`}>
                                          <SIcon className={`size-3 ${si.textClass}`} />
                                        </span>
                                        {si.name}
                                      </span>
                                      <div className="flex items-center gap-2">
                                        <span className="font-semibold text-white">
                                          {count} <span className="text-[10px] text-white/40 font-normal">visiteur{count > 1 ? "s" : ""}</span>
                                        </span>
                                        <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-mono text-white/60">
                                          {pctOfTotal}%
                                        </span>
                                      </div>
                                    </div>
                                    <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden p-0.5">
                                      <div
                                        style={{ width: `${barWidth}%`, backgroundColor: si.color }}
                                        className="h-full rounded-full transition-all duration-500 shadow-sm"
                                      />
                                    </div>
                                  </div>
                                );
                              });
                          })()}
                        </div>
                      </GlassPanel>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-white/50">
                    <BarChart3 className="mx-auto size-8 mb-3 text-white/30" />
                    <p>Aucune donnée analytics disponible pour le moment.</p>
                  </div>
                )}

                {/* ── Section 3 : Trafic & Replays de Sessions ── */}
                <div className="space-y-4 pt-4 border-t border-white/[0.08]">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-base font-bold text-white flex items-center gap-2">
                        <Eye className="size-5 text-purple-400" />
                        Trafic & Sessions des Visiteurs en Direct
                      </h2>
                      <p className="text-xs text-white/40 mt-0.5">
                        Retrouvez le parcours exact de chaque visiteur : sections scrollées, clics effectués et temps passé
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="relative flex-1 sm:w-80">
                        <Search className="pointer-events-none absolute left-3.5 top-2.5 size-3.5 text-white/30" />
                        <Input
                          type="text"
                          placeholder="Filtrer par IP, navigateur, appareil, source..."
                          value={visitSearch}
                          onChange={(e) => setVisitSearch(e.target.value)}
                          className="h-9 rounded-xl border-white/10 bg-white/[0.05] pl-9 text-xs text-white placeholder:text-white/30 focus:border-purple-500/50 focus:ring-purple-500/30"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchVisits}
                        disabled={loadingVisits}
                        className="h-9 rounded-xl border-white/10 bg-white/[0.04] text-xs text-white/80 hover:bg-white/[0.08]"
                      >
                        <RefreshCw className={`size-3.5 mr-1.5 ${loadingVisits ? "animate-spin text-purple-400" : ""}`} />
                        Actualiser
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>
                      <strong className="text-white/80">{filteredVisits.length}</strong> session{filteredVisits.length > 1 ? "s" : ""} enregistrée{filteredVisits.length > 1 ? "s" : ""}
                      {visitSearch ? ` (filtré depuis ${visits.length})` : ""}
                    </span>
                    <span className="text-purple-400 flex items-center gap-1.5">
                      <Sparkles className="size-3.5 text-purple-400 animate-pulse" />
                      Cliquez sur une session pour dérouler le replay d&apos;activité
                    </span>
                  </div>

                  {/* Sessions Table */}
                  <GlassPanel>
                    {loadingVisits && visits.length === 0 ? (
                      <div className="py-12 text-center">
                        <RefreshCw className="mx-auto size-6 animate-spin text-purple-400 mb-2" />
                        <p className="text-xs text-white/40">Chargement des sessions visiteurs...</p>
                      </div>
                    ) : filteredVisits.length === 0 ? (
                      <div className="py-16 text-center">
                        <Eye className="mx-auto size-8 mb-3 text-white/20" />
                        <p className="text-sm text-white/40">
                          {visitSearch ? "Aucune session ne correspond à votre recherche." : "Aucune visite enregistrée pour le moment."}
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-white/[0.04]">
                        {paginatedVisits.map((v) => {
                          const isExpanded = expandedVisitId === v.id;
                          const DeviceIcon =
                            v.device === "Mobile" ? Smartphone : v.device === "Tablet" ? Tablet : Monitor;

                          return (
                            <div key={v.id}>
                              <button
                                onClick={() => setExpandedVisitId(isExpanded ? null : v.id)}
                                className="w-full flex items-center gap-4 py-3 px-4 text-left hover:bg-white/[0.03] transition-colors text-xs sm:text-sm group"
                              >
                                {/* Device Icon */}
                                <div className="flex size-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.05] group-hover:bg-purple-500/10 transition-colors">
                                  <DeviceIcon className="size-4 text-white/50 group-hover:text-purple-400" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-6 gap-2 items-center">
                                  <div>
                                    <p className="text-[10px] text-white/40 uppercase">Date</p>
                                    <p className="text-white/80 text-xs truncate">{formatDate(v.startedAt)}</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-white/40 uppercase">Source</p>
                                    {(() => {
                                      const si = getSourceInfo(v.referrer);
                                      const SIcon = SOURCE_ICONS[si.icon];
                                      return si.icon !== "direct" && si.icon !== "other" ? (
                                        <span className={`inline-flex items-center gap-1 rounded-md ${si.bgClass} border ${si.borderClass} px-1.5 py-0.5 text-[10px] font-semibold ${si.textClass} truncate`}>
                                          <SIcon className={`size-2.5 ${si.textClass}`} /> {si.name}
                                        </span>
                                      ) : (
                                        <p className="text-white/70 text-xs truncate">{si.name}</p>
                                      );
                                    })()}
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-white/40 uppercase">Appareil</p>
                                    <p className="text-white/80 text-xs truncate">{v.browser} / {v.os}</p>
                                  </div>
                                  <div className="hidden sm:block">
                                    <p className="text-[10px] text-white/40 uppercase">Durée</p>
                                    <p className="text-emerald-400 text-xs font-medium">{formatDuration(v.duration)}</p>
                                  </div>
                                  <div className="hidden sm:block">
                                    <p className="text-[10px] text-white/40 uppercase">Scroll Max</p>
                                    <p className="text-white/80 text-xs">{v.maxScrollPercent}%</p>
                                  </div>
                                  <div className="hidden sm:block">
                                    <p className="text-[10px] text-white/40 uppercase">Résultat / Abandon</p>
                                    {(() => {
                                      const visitEvents = v.events || [];
                                      const hasSubmit = visitEvents.some((e) => e.type === "form_submitted");
                                      const vSections = v.sectionsVisited || [];
                                      const lastSec = vSections.length > 0 ? vSections[vSections.length - 1].name : null;

                                      if (hasSubmit) {
                                        return (
                                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                                            <CheckCircle2 className="size-2.5 text-emerald-400" /> Formulaire rempli 🎉
                                          </span>
                                        );
                                      }
                                      if (lastSec) {
                                        return (
                                          <span
                                            className="inline-flex items-center gap-1 rounded-md bg-rose-500/15 border border-rose-500/25 px-1.5 py-0.5 text-[10px] font-medium text-rose-300 truncate max-w-[150px]"
                                            title={`A quitté sur : ${SECTION_LABELS[lastSec] || lastSec}`}
                                          >
                                            <LogOut className="size-2.5 text-rose-400 flex-shrink-0" /> Quitté : {SECTION_LABELS[lastSec] || lastSec}
                                          </span>
                                        );
                                      }
                                      return <p className="text-white/40 text-xs truncate">Visite rapide</p>;
                                    })()}
                                  </div>
                                </div>

                                {/* Expand Chevron */}
                                <div className="flex-shrink-0">
                                  {isExpanded ? (
                                    <ChevronUp className="size-4 text-purple-400" />
                                  ) : (
                                    <ChevronDown className="size-4 text-white/40 group-hover:text-white/70" />
                                  )}
                                </div>
                              </button>

                              {/* Expanded Detail */}
                              <AnimatePresence>
                                {isExpanded && <SessionTimeline visit={v} />}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Pagination Controls for Visits */}
                    {filteredVisits.length > 0 && (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/[0.06] text-xs text-white/60">
                        <div className="flex items-center gap-3">
                          <span>
                            Affichage de <strong className="text-white/90">{(visitPage - 1) * visitsPerPage + 1}</strong> à{" "}
                            <strong className="text-white/90">
                              {Math.min(visitPage * visitsPerPage, filteredVisits.length)}
                            </strong>{" "}
                            sur <strong className="text-white/90">{filteredVisits.length}</strong> session{filteredVisits.length > 1 ? "s" : ""}
                          </span>
                          <div className="flex items-center gap-1.5 ml-2">
                            <span className="text-white/40">Par page :</span>
                            <select
                              value={visitsPerPage}
                              onChange={(e) => {
                                setVisitsPerPage(Number(e.target.value));
                                setVisitPage(1);
                              }}
                              className="bg-white/[0.06] border border-white/10 rounded-lg px-2 py-1 text-xs text-white/80 focus:outline-none focus:border-purple-500/50 cursor-pointer"
                            >
                              <option value={10} className="bg-slate-900 text-white">10</option>
                              <option value={25} className="bg-slate-900 text-white">25</option>
                              <option value={50} className="bg-slate-900 text-white">50</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={visitPage <= 1}
                            onClick={() => setVisitPage((p) => Math.max(1, p - 1))}
                            className="h-8 px-2.5 rounded-lg border-white/10 bg-white/[0.04] text-xs text-white/70 hover:bg-white/[0.08] disabled:opacity-30 disabled:pointer-events-none"
                          >
                            <ChevronLeft className="size-3.5 mr-1" />
                            Précédent
                          </Button>

                          <span className="text-xs text-white/70 font-medium px-2">
                            Page <span className="text-purple-400 font-semibold">{visitPage}</span> / {totalVisitPages}
                          </span>

                          <Button
                            variant="outline"
                            size="sm"
                            disabled={visitPage >= totalVisitPages}
                            onClick={() => setVisitPage((p) => Math.min(totalVisitPages, p + 1))}
                            className="h-8 px-2.5 rounded-lg border-white/10 bg-white/[0.04] text-xs text-white/70 hover:bg-white/[0.08] disabled:opacity-30 disabled:pointer-events-none"
                          >
                            Suivant
                            <ChevronRight className="size-3.5 ml-1" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </GlassPanel>
                </div>
              </motion.div>
            )}

            {/* ========== CANDIDATURES TAB (Avec statistiques et tri Jour/Semaine/Mois/Overall) ========== */}
            {activeTab === "submissions" && (
              <motion.div
                key="submissions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* ── Cartes de statistiques cliquables ── */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {([
                    { period: "overall" as PeriodFilter, label: "Total Candidats", count: submissionStats.total, subtitle: "Personnes inscrites au total", borderColor: "border-purple-500/20", bgColor: "bg-purple-500/[0.06]", hoverBg: "hover:bg-purple-500/[0.12]", textColor: "text-purple-300", countColor: "text-white", iconBg: "bg-purple-500/20", icon: Users },
                    { period: "day" as PeriodFilter, label: "Aujourd'hui", count: submissionStats.today, subtitle: "Inscriptions reçues aujourd'hui", borderColor: "border-emerald-500/20", bgColor: "bg-emerald-500/[0.05]", hoverBg: "hover:bg-emerald-500/[0.12]", textColor: "text-emerald-400", countColor: "text-emerald-400", iconBg: "bg-emerald-500/20", icon: Calendar },
                    { period: "week" as PeriodFilter, label: "Cette semaine", count: submissionStats.week, subtitle: "Depuis lundi", borderColor: "border-blue-500/20", bgColor: "bg-blue-500/[0.05]", hoverBg: "hover:bg-blue-500/[0.12]", textColor: "text-blue-400", countColor: "text-blue-400", iconBg: "bg-blue-500/20", icon: Calendar },
                    { period: "month" as PeriodFilter, label: "Ce mois-ci", count: submissionStats.month, subtitle: "Inscriptions ce mois", borderColor: "border-amber-500/20", bgColor: "bg-amber-500/[0.05]", hoverBg: "hover:bg-amber-500/[0.12]", textColor: "text-amber-400", countColor: "text-amber-400", iconBg: "bg-amber-500/20", icon: TrendingUp },
                  ]).map((card) => {
                    const isActive = submissionPeriod === card.period;
                    const CardIcon = card.icon;
                    return (
                      <button
                        key={card.period}
                        onClick={() => setSubmissionPeriod(submissionPeriod === card.period ? null : card.period)}
                        className={`rounded-2xl border ${card.borderColor} ${card.bgColor} backdrop-blur-xl p-5 ${card.hoverBg} transition-all text-left cursor-pointer ${
                          isActive ? "ring-2 ring-purple-500/60 shadow-xl shadow-purple-900/30 scale-[1.02]" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className={`text-xs font-semibold uppercase tracking-wider ${card.textColor}`}>{card.label}</p>
                            <p className={`mt-1.5 text-3xl font-bold ${card.countColor}`}>
                              {card.period === "overall" ? card.count : `+${card.count}`}
                            </p>
                            <p className="mt-1 text-xs text-white/50">{card.subtitle}</p>
                          </div>
                          <div className={`flex size-10 items-center justify-center rounded-xl ${card.iconBg} ${card.textColor}`}>
                            <CardIcon className="size-5" />
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-[11px] font-medium border-t border-white/[0.06] pt-2">
                          <span className={isActive ? "text-purple-300 font-semibold" : "text-white/40"}>
                            {isActive ? "Masquer les détails" : "Voir les candidats"}
                          </span>
                          <span className={isActive ? "text-purple-300" : "text-white/30"}>
                            {isActive ? "▲" : "▼"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* ── Détail des candidatures filtrées (affiché UNIQUEMENT si une carte est cliquée) ── */}
                <AnimatePresence mode="wait">
                  {submissionPeriod !== null ? (
                    <motion.div
                      key={submissionPeriod}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="space-y-4"
                    >
                      {/* En-tête de sélection + Actions : Recherche + Excel + Fermer */}
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl">
                        <div className="flex flex-wrap items-center gap-3 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white/90">
                              {submissionPeriod === "overall" && "Total des candidats"}
                              {submissionPeriod === "day" && "Candidatures d'Aujourd'hui"}
                              {submissionPeriod === "week" && "Candidatures de Cette semaine"}
                              {submissionPeriod === "month" && "Candidatures de Ce mois-ci"}
                            </span>
                            <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 text-[11px] font-bold text-purple-300">
                              {filteredSubmissions.length} profil{filteredSubmissions.length > 1 ? "s" : ""}
                            </span>
                          </div>

                          <div className="relative flex-1 min-w-[200px] max-w-sm">
                            <Search className="pointer-events-none absolute left-3.5 top-2.5 size-4 text-white/30" />
                            <Input
                              type="text"
                              placeholder="Rechercher par nom, téléphone, email..."
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              className="h-9 rounded-xl border-white/10 bg-white/[0.05] pl-10 text-xs text-white placeholder:text-white/30 focus:border-purple-500/50 focus:ring-purple-500/30"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={fetchSubmissions}
                            disabled={loadingSubmissions}
                            className="h-9 rounded-xl border-white/10 bg-white/[0.04] text-xs text-white/80 hover:bg-white/[0.08]"
                          >
                            <RefreshCw className={`size-3.5 mr-1.5 ${loadingSubmissions ? "animate-spin text-purple-400" : ""}`} />
                            Rafraîchir
                          </Button>
                          <Button
                            size="sm"
                            onClick={exportToExcel}
                            disabled={downloadingExcel || filteredSubmissions.length === 0}
                            className="h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs gap-2 px-4 shadow-lg shadow-emerald-900/30 transition-all disabled:opacity-50"
                          >
                            <Download className={`size-4 ${downloadingExcel ? "animate-bounce" : ""}`} />
                            {downloadingExcel ? "Génération..." : "Télécharger Excel (.xlsx)"}
                          </Button>
                          <button
                            onClick={() => setSubmissionPeriod(null)}
                            title="Masquer les détails"
                            className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/50 hover:bg-white/[0.08] hover:text-white transition-colors text-xs font-semibold"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      {/* Table des Candidatures */}
                      <GlassPanel>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs sm:text-sm">
                            <thead className="border-b border-white/[0.06] text-[11px] uppercase tracking-wider text-white/50">
                              <tr>
                                <th className="py-3 px-4 font-semibold">
                                  <span className="inline-flex items-center gap-1.5"><Calendar className="size-3 text-purple-400" /> Date</span>
                                </th>
                                <th className="py-3 px-4 font-semibold">
                                  <span className="inline-flex items-center gap-1.5"><User className="size-3 text-purple-400" /> Nom</span>
                                </th>
                                <th className="py-3 px-4 font-semibold">
                                  <span className="inline-flex items-center gap-1.5"><Phone className="size-3 text-purple-400" /> WhatsApp</span>
                                </th>
                                <th className="py-3 px-4 font-semibold">
                                  <span className="inline-flex items-center gap-1.5"><Mail className="size-3 text-purple-400" /> Email</span>
                                </th>
                                <th className="py-3 px-4 font-semibold">
                                  <span className="inline-flex items-center gap-1.5"><GraduationCap className="size-3 text-purple-400" /> Niveau</span>
                                </th>
                                <th className="py-3 px-4 font-semibold">
                                  <span className="inline-flex items-center gap-1.5"><Building className="size-3 text-purple-400" /> École</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.04]">
                              {loadingSubmissions && submissions.length === 0 ? (
                                <tr>
                                  <td colSpan={6} className="py-12 text-center text-white/40">
                                    <RefreshCw className="mx-auto size-6 animate-spin text-purple-400 mb-2" />
                                    Chargement des candidatures...
                                  </td>
                                </tr>
                              ) : filteredSubmissions.length === 0 ? (
                                <tr>
                                  <td colSpan={6} className="py-16 text-center text-white/40">
                                    <FileSpreadsheet className="mx-auto size-8 mb-3 text-white/20" />
                                    <p className="text-sm">
                                      {search
                                        ? "Aucun résultat pour cette recherche."
                                        : "Aucune candidature enregistrée pour cette période."}
                                    </p>
                                  </td>
                                </tr>
                              ) : (
                                paginatedSubmissions.map((s) => {
                                  const cleanPhone = s.phone.replace(/[^0-9+]/g, "");
                                  const waLink = cleanPhone ? `https://wa.me/${cleanPhone.replace("+", "")}` : null;
                                  return (
                                    <tr key={s.id} className="hover:bg-white/[0.03] transition-colors">
                                      <td className="py-3 px-4 whitespace-nowrap text-white/60 text-xs">
                                        {formatDate(s.createdAt)}
                                      </td>
                                      <td className="py-3 px-4 font-medium text-white whitespace-nowrap">{s.name}</td>
                                      <td className="py-3 px-4 whitespace-nowrap">
                                        {waLink ? (
                                          <a
                                            href={waLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 hover:underline"
                                          >
                                            <Phone className="size-3.5" /> {s.phone}
                                          </a>
                                        ) : (
                                          <span className="text-white/30">{s.phone}</span>
                                        )}
                                      </td>
                                      <td className="py-3 px-4 whitespace-nowrap">
                                        <a href={`mailto:${s.email}`} className="text-sky-400 hover:text-sky-300 hover:underline">
                                          {s.email}
                                        </a>
                                      </td>
                                      <td className="py-3 px-4 whitespace-nowrap">
                                        <span className="inline-block rounded-lg bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 text-xs text-purple-300 font-medium">
                                          {s.level}
                                        </span>
                                      </td>
                                      <td className="py-3 px-4 whitespace-nowrap text-white/70">{s.school}</td>
                                    </tr>
                                  );
                                })
                              )}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination Bar */}
                        {filteredSubmissions.length > 0 && (
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-white/[0.06] text-xs text-white/60">
                            <div className="flex items-center gap-3">
                              <span>
                                Affichage de <strong className="text-white/90">{(subPage - 1) * subsPerPage + 1}</strong> à{" "}
                                <strong className="text-white/90">
                                  {Math.min(subPage * subsPerPage, filteredSubmissions.length)}
                                </strong>{" "}
                                sur <strong className="text-white/90">{filteredSubmissions.length}</strong> candidat{filteredSubmissions.length > 1 ? "s" : ""}
                              </span>
                              <div className="flex items-center gap-1.5 ml-2">
                                <span className="text-white/40">Par page :</span>
                                <select
                                  value={subsPerPage}
                                  onChange={(e) => {
                                    setSubsPerPage(Number(e.target.value));
                                    setSubPage(1);
                                  }}
                                  className="bg-white/[0.06] border border-white/10 rounded-lg px-2 py-1 text-xs text-white/80 focus:outline-none focus:border-purple-500/50 cursor-pointer"
                                >
                                  <option value={10} className="bg-slate-900 text-white">10</option>
                                  <option value={25} className="bg-slate-900 text-white">25</option>
                                  <option value={50} className="bg-slate-900 text-white">50</option>
                                  <option value={100} className="bg-slate-900 text-white">100</option>
                                </select>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={subPage <= 1}
                                onClick={() => setSubPage((p) => Math.max(1, p - 1))}
                                className="h-8 px-2.5 rounded-lg border-white/10 bg-white/[0.04] text-xs text-white/70 hover:bg-white/[0.08] disabled:opacity-30 disabled:pointer-events-none"
                              >
                                <ChevronLeft className="size-3.5 mr-1" />
                                Précédent
                              </Button>

                              <span className="text-xs text-white/70 font-medium px-2">
                                Page <span className="text-purple-400 font-semibold">{subPage}</span> / {totalSubPages}
                              </span>

                              <Button
                                variant="outline"
                                size="sm"
                                disabled={subPage >= totalSubPages}
                                onClick={() => setSubPage((p) => Math.min(totalSubPages, p + 1))}
                                className="h-8 px-2.5 rounded-lg border-white/10 bg-white/[0.04] text-xs text-white/70 hover:bg-white/[0.08] disabled:opacity-30 disabled:pointer-events-none"
                              >
                                Suivant
                                <ChevronRight className="size-3.5 ml-1" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </GlassPanel>
                    </motion.div>
                  ) : (
                    null
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}
