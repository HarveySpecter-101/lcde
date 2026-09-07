"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
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
  ShieldCheck,
  FileSpreadsheet,
  BarChart3,
  Eye,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  MousePointerClick,
  Clock,
  ArrowUpRight,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Activity,
  Layers,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
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

type AnalyticsData = {
  summary: {
    totalVisits: number;
    todayVisits: number;
    weekVisits: number;
    avgDuration: number;
    avgScrollDepth: number;
    avgClicks: number;
    bounceRate: number;
  };
  visitsPerDay: Array<{ date: string; count: number }>;
  sectionStats: Array<{ name: string; views: number; avgTime: number }>;
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

type Tab = "dashboard" | "submissions" | "traffic";

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
  hero: "Hero / Accueil",
  stats: "Statistiques",
  "hiring-companies": "Entreprises partenaires",
  modules: "Modules de formation",
  intervenants: "Intervenants",
  "what-you-gain": "Ce que vous gagnez",
  "before-after": "Avant / Après",
  "success-stories": "Témoignages",
  founders: "Fondateurs",
  contact: "Contact / Inscription",
};

const PIE_COLORS = ["#8b5cf6", "#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];

/* ────────────────────────────────────────────────────────────── */
/* Animated Background                                           */
/* ────────────────────────────────────────────────────────────── */

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
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
}

/* ────────────────────────────────────────────────────────────── */
/* Metric Card                                                   */
/* ────────────────────────────────────────────────────────────── */

function MetricCard({
  label,
  value,
  icon: Icon,
  trend,
  color = "text-purple-400",
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl p-5 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/50">{label}</p>
          <p className="mt-1.5 text-2xl font-bold text-white">{value}</p>
          {trend && (
            <p className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
              <TrendingUp className="size-3" />
              {trend}
            </p>
          )}
        </div>
        <div className={`flex size-10 items-center justify-center rounded-xl bg-white/[0.06] ${color}`}>
          <Icon className="size-5" />
        </div>
      </div>
    </motion.div>
  );
}

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
/* Session Timeline (expanded visit detail)                      */
/* ────────────────────────────────────────────────────────────── */

function SessionTimeline({ visit }: { visit: SiteVisit }) {
  const events = visit.events || [];
  const sections = visit.sectionsVisited || [];

  const eventIcon = (type: string) => {
    switch (type) {
      case "section_enter":
        return <Eye className="size-3.5 text-emerald-400" />;
      case "section_leave":
        return <ArrowUpRight className="size-3.5 text-amber-400" />;
      case "click":
        return <MousePointerClick className="size-3.5 text-sky-400" />;
      default:
        return <Activity className="size-3.5 text-white/40" />;
    }
  };

  const eventLabel = (e: { type: string; target?: string; section?: string }) => {
    switch (e.type) {
      case "section_enter":
        return `A vu la section "${SECTION_LABELS[e.section || ""] || e.section}"`;
      case "section_leave":
        return `A quitté "${SECTION_LABELS[e.section || ""] || e.section}"`;
      case "click":
        return `Clic sur : ${e.target || "élément"}`;
      default:
        return e.type;
    }
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden"
    >
      <div className="border-t border-white/[0.06] bg-white/[0.02] px-4 py-4">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Session Info */}
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
              <div className="flex justify-between">
                <span className="text-white/50">Source</span>
                <span className="truncate max-w-[200px]">{visit.referrer || "Accès direct"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Durée totale</span>
                <span className="text-emerald-400 font-medium">{formatDuration(visit.duration)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Scroll max</span>
                <span>{visit.maxScrollPercent}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Clics</span>
                <span>{visit.totalClicks}</span>
              </div>
            </div>

            {/* Sections visited */}
            {sections.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                  Sections visitées
                </h4>
                <div className="space-y-1.5">
                  {sections.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs"
                    >
                      <span className="text-white/80">
                        {SECTION_LABELS[s.name] || s.name}
                      </span>
                      <span className="text-white/50">
                        {formatDuration(s.totalTime)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Event Timeline */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">
              Activité détaillée ({events.length} événements)
            </h4>
            <div className="max-h-[300px] overflow-y-auto space-y-0 pr-2 scroll-lcde">
              {events.length === 0 ? (
                <p className="text-xs text-white/40 italic">Aucun événement enregistré</p>
              ) : (
                events.slice(0, 100).map((e, i) => (
                  <div key={i} className="flex items-start gap-3 py-1.5 group">
                    <div className="mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.06] group-hover:bg-white/[0.1] transition-colors">
                      {eventIcon(e.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/80 leading-relaxed truncate">
                        {eventLabel(e)}
                      </p>
                    </div>
                    <span className="text-[10px] text-white/30 tabular-nums flex-shrink-0">
                      {formatDuration(e.time)}
                    </span>
                  </div>
                ))
              )}
              {events.length > 100 && (
                <p className="text-xs text-white/40 pt-2 text-center">
                  … et {events.length - 100} autres événements
                </p>
              )}
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

  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  // Submissions
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [downloadingExcel, setDownloadingExcel] = useState(false);
  const [search, setSearch] = useState("");

  // Analytics
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  // Traffic / Visits
  const [visits, setVisits] = useState<SiteVisit[]>([]);
  const [loadingVisits, setLoadingVisits] = useState(false);
  const [expandedVisitId, setExpandedVisitId] = useState<string | null>(null);
  const [visitSearch, setVisitSearch] = useState("");

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
      const res = await fetch("/api/admin/visits?limit=100");
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

  // Load data when tabs change
  useEffect(() => {
    if (!isAuthenticated) return;
    if (activeTab === "dashboard" && !analytics) fetchAnalytics();
    if (activeTab === "traffic" && visits.length === 0) fetchVisits();
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

  const filteredSubmissions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return submissions;
    return submissions.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q) ||
        s.level.toLowerCase().includes(q) ||
        s.school.toLowerCase().includes(q)
    );
  }, [submissions, search]);

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

  const exportToExcel = async () => {
    if (submissions.length === 0) {
      toast.error("Aucune donnée à exporter.");
      return;
    }
    setDownloadingExcel(true);
    try {
      toast.info("Génération du fichier Excel en cours...");
      const response = await fetch("/api/admin/export");
      if (!response.ok) throw new Error("Erreur de génération.");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(
        new Blob([blob], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = `Candidatures_LCDE_${new Date().toISOString().split("T")[0]}.xlsx`;
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

  /* ── Login Screen ── */
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
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 text-purple-400 mb-5">
              <ShieldCheck className="size-8" />
            </div>

            <h1 className="text-center font-serif text-2xl font-bold text-white">
              LCDE Admin
            </h1>
            <p className="mt-1.5 text-center text-xs text-white/50">
              Accédez aux candidatures, analytics et sessions
            </p>

            <form onSubmit={handleLogin} autoComplete="off" className="mt-7 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60">
                  Email
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
                    placeholder="votre-email@lcde.ma"
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
                className="mt-3 h-12 w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-bold text-white hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/20"
              >
                {loggingIn ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>
          </motion.div>
        </div>
      </>
    );
  }

  /* ── Authenticated Admin ── */
  const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "dashboard", label: "Tableau de bord", icon: BarChart3 },
    { id: "submissions", label: "Candidatures", icon: FileSpreadsheet },
    { id: "traffic", label: "Trafic & Sessions", icon: Eye },
  ];

  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen text-white">
        {/* ── Top Navbar ── */}
        <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-black/30 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 text-purple-400">
                <Layers className="size-5" />
              </span>
              <div>
                <h1 className="font-serif text-lg font-bold leading-none text-white">
                  LCDE Admin
                </h1>
                <p className="text-[11px] text-white/40">
                  Dashboard · Analytics · Sessions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={refreshAll}
                className="h-9 gap-1.5 rounded-xl border-white/10 bg-white/[0.04] text-xs text-white/80 hover:bg-white/[0.08] hover:text-white"
              >
                <RefreshCw className={`size-3.5 ${loadingAnalytics || loadingSubmissions || loadingVisits ? "animate-spin" : ""}`} />
                Rafraîchir
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="h-9 gap-1.5 rounded-xl border-white/10 bg-white/[0.04] text-xs text-white/80 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/20 transition-colors"
              >
                <LogOut className="size-3.5" />
                Quitter
              </Button>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <nav className="flex gap-1 -mb-px">
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
                  <tab.icon className="size-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
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
            {/* ========== DASHBOARD TAB ========== */}
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {loadingAnalytics && !analytics ? (
                  <div className="flex items-center justify-center py-20">
                    <RefreshCw className="size-6 animate-spin text-purple-400" />
                  </div>
                ) : analytics ? (
                  <div className="space-y-6">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                      <MetricCard
                        label="Visites totales"
                        value={analytics.summary.totalVisits.toLocaleString("fr-FR")}
                        icon={Globe}
                        color="text-purple-400"
                      />
                      <MetricCard
                        label="Aujourd'hui"
                        value={analytics.summary.todayVisits}
                        icon={Eye}
                        trend={analytics.summary.weekVisits > 0 ? `${analytics.summary.weekVisits} cette semaine` : undefined}
                        color="text-blue-400"
                      />
                      <MetricCard
                        label="Durée moyenne"
                        value={formatDuration(analytics.summary.avgDuration)}
                        icon={Clock}
                        color="text-teal-400"
                      />
                      <MetricCard
                        label="Scroll moyen"
                        value={`${analytics.summary.avgScrollDepth}%`}
                        icon={ArrowUpRight}
                        trend={`${analytics.summary.bounceRate}% taux de rebond`}
                        color="text-amber-400"
                      />
                    </div>

                    {/* Charts Row */}
                    <div className="grid gap-6 lg:grid-cols-2">
                      {/* Visits Over Time */}
                      <GlassPanel title="Visites (30 derniers jours)">
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analytics.visitsPerDay}>
                              <defs>
                                <linearGradient id="visitGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                              <XAxis
                                dataKey="date"
                                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                                tickFormatter={(d) => {
                                  const parts = d.split("-");
                                  return `${parts[2]}/${parts[1]}`;
                                }}
                                axisLine={false}
                                tickLine={false}
                              />
                              <YAxis
                                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                              />
                              <Tooltip
                                contentStyle={{
                                  background: "rgba(10,0,30,0.9)",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  borderRadius: "12px",
                                  color: "#fff",
                                  fontSize: "12px",
                                }}
                                labelFormatter={(d) => {
                                  const parts = String(d).split("-");
                                  return `${parts[2]}/${parts[1]}/${parts[0]}`;
                                }}
                              />
                              <Area
                                type="monotone"
                                dataKey="count"
                                stroke="#8b5cf6"
                                strokeWidth={2}
                                fill="url(#visitGrad)"
                                name="Visites"
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </GlassPanel>

                      {/* Section Funnel */}
                      <GlassPanel title="Sections les plus vues">
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={analytics.sectionStats.slice(0, 8)}
                              layout="vertical"
                              margin={{ left: 0, right: 10 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                              <XAxis
                                type="number"
                                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                              />
                              <YAxis
                                type="category"
                                dataKey="name"
                                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                                width={100}
                                tickFormatter={(name) => SECTION_LABELS[name] || name}
                              />
                              <Tooltip
                                contentStyle={{
                                  background: "rgba(10,0,30,0.9)",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  borderRadius: "12px",
                                  color: "#fff",
                                  fontSize: "12px",
                                }}
                                formatter={(value: number, name: string) => {
                                  if (name === "views") return [`${value} vues`, "Vues"];
                                  return [formatDuration(value), "Temps moyen"];
                                }}
                              />
                              <Bar dataKey="views" fill="#8b5cf6" radius={[0, 6, 6, 0]} name="views" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </GlassPanel>
                    </div>

                    {/* Bottom Row: Device + Browser */}
                    <div className="grid gap-6 lg:grid-cols-3">
                      {/* Devices Pie */}
                      <GlassPanel title="Appareils">
                        <div className="h-[200px] flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={Object.entries(analytics.devices).map(([name, value]) => ({ name, value }))}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={3}
                                dataKey="value"
                              >
                                {Object.entries(analytics.devices).map((_, i) => (
                                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip
                                contentStyle={{
                                  background: "rgba(10,0,30,0.9)",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  borderRadius: "12px",
                                  color: "#fff",
                                  fontSize: "12px",
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3 mt-2">
                          {Object.entries(analytics.devices).map(([name, count], i) => (
                            <span key={name} className="flex items-center gap-1.5 text-xs text-white/60">
                              <span
                                className="size-2.5 rounded-full"
                                style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                              />
                              {name} ({count})
                            </span>
                          ))}
                        </div>
                      </GlassPanel>

                      {/* Browsers */}
                      <GlassPanel title="Navigateurs">
                        <div className="space-y-2.5">
                          {Object.entries(analytics.browsers)
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 6)
                            .map(([name, count]) => {
                              const max = Math.max(...Object.values(analytics.browsers));
                              const pct = max > 0 ? (count / max) * 100 : 0;
                              return (
                                <div key={name}>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-white/70">{name}</span>
                                    <span className="text-white/50">{count}</span>
                                  </div>
                                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${pct}%` }}
                                      transition={{ duration: 0.8, ease: "easeOut" }}
                                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </GlassPanel>

                      {/* Sources / Referrers */}
                      <GlassPanel title="Sources de trafic">
                        <div className="space-y-2.5">
                          {Object.entries(analytics.referrers)
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 6)
                            .map(([name, count]) => {
                              const max = Math.max(...Object.values(analytics.referrers));
                              const pct = max > 0 ? (count / max) * 100 : 0;
                              return (
                                <div key={name}>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-white/70 truncate max-w-[150px]">{name}</span>
                                    <span className="text-white/50">{count}</span>
                                  </div>
                                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${pct}%` }}
                                      transition={{ duration: 0.8, ease: "easeOut" }}
                                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </GlassPanel>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20 text-white/50">
                    <BarChart3 className="mx-auto size-8 mb-3 text-white/30" />
                    <p>Aucune donnée analytics disponible.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* ========== SUBMISSIONS TAB ========== */}
            {activeTab === "submissions" && (
              <motion.div
                key="submissions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Actions Bar */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
                  <div className="relative flex-1 max-w-md">
                    <Search className="pointer-events-none absolute left-3.5 top-3 size-4 text-white/30" />
                    <Input
                      type="text"
                      placeholder="Rechercher par nom, téléphone, email, école..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="h-10 rounded-xl border-white/10 bg-white/[0.05] pl-10 text-sm text-white placeholder:text-white/30 focus:border-purple-500/50 focus:ring-purple-500/30"
                    />
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={fetchSubmissions}
                      disabled={loadingSubmissions}
                      className="h-10 rounded-xl border-white/10 bg-white/[0.04] text-xs text-white/80 hover:bg-white/[0.08]"
                    >
                      <RefreshCw className={`size-3.5 mr-1.5 ${loadingSubmissions ? "animate-spin text-purple-400" : ""}`} />
                      Rafraîchir
                    </Button>
                    <Button
                      size="sm"
                      onClick={exportToExcel}
                      disabled={downloadingExcel || submissions.length === 0}
                      className="h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs gap-2 px-4 shadow-lg shadow-emerald-900/30 transition-all disabled:opacity-50"
                    >
                      <Download className={`size-4 ${downloadingExcel ? "animate-bounce" : ""}`} />
                      {downloadingExcel ? "Génération..." : "Excel (.xlsx)"}
                    </Button>
                  </div>
                </div>

                {/* Counter */}
                <div className="flex items-center justify-between mb-3 text-xs text-white/50">
                  <span>
                    <strong className="text-white/80">{filteredSubmissions.length}</strong> candidature{filteredSubmissions.length > 1 ? "s" : ""}
                    {search ? ` (filtré depuis ${submissions.length})` : ""}
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </div>

                {/* Data Table */}
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
                              Chargement...
                            </td>
                          </tr>
                        ) : filteredSubmissions.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-16 text-center text-white/40">
                              <FileSpreadsheet className="mx-auto size-8 mb-3 text-white/20" />
                              <p className="text-sm">
                                {search ? "Aucun résultat." : "Aucune candidature."}
                              </p>
                            </td>
                          </tr>
                        ) : (
                          filteredSubmissions.map((s) => {
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
                </GlassPanel>
              </motion.div>
            )}

            {/* ========== TRAFFIC TAB ========== */}
            {activeTab === "traffic" && (
              <motion.div
                key="traffic"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Actions Bar */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
                  <div className="relative flex-1 max-w-md">
                    <Search className="pointer-events-none absolute left-3.5 top-3 size-4 text-white/30" />
                    <Input
                      type="text"
                      placeholder="Rechercher par IP, navigateur, appareil, source..."
                      value={visitSearch}
                      onChange={(e) => setVisitSearch(e.target.value)}
                      className="h-10 rounded-xl border-white/10 bg-white/[0.05] pl-10 text-sm text-white placeholder:text-white/30 focus:border-purple-500/50 focus:ring-purple-500/30"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchVisits}
                    disabled={loadingVisits}
                    className="h-10 rounded-xl border-white/10 bg-white/[0.04] text-xs text-white/80 hover:bg-white/[0.08]"
                  >
                    <RefreshCw className={`size-3.5 mr-1.5 ${loadingVisits ? "animate-spin text-purple-400" : ""}`} />
                    Rafraîchir
                  </Button>
                </div>

                <div className="flex items-center justify-between mb-3 text-xs text-white/50">
                  <span>
                    <strong className="text-white/80">{filteredVisits.length}</strong> session{filteredVisits.length > 1 ? "s" : ""}
                  </span>
                  <span className="text-white/40">
                    Cliquez sur une session pour voir le détail
                  </span>
                </div>

                {/* Visits Table */}
                <GlassPanel>
                  {loadingVisits && visits.length === 0 ? (
                    <div className="py-12 text-center">
                      <RefreshCw className="mx-auto size-6 animate-spin text-purple-400 mb-2" />
                      <p className="text-xs text-white/40">Chargement des sessions...</p>
                    </div>
                  ) : filteredVisits.length === 0 ? (
                    <div className="py-16 text-center">
                      <Eye className="mx-auto size-8 mb-3 text-white/20" />
                      <p className="text-sm text-white/40">
                        {visitSearch ? "Aucune session trouvée." : "Aucune visite enregistrée."}
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-white/[0.04]">
                      {filteredVisits.map((v) => {
                        const isExpanded = expandedVisitId === v.id;
                        const DeviceIcon =
                          v.device === "Mobile" ? Smartphone : v.device === "Tablet" ? Tablet : Monitor;

                        return (
                          <div key={v.id}>
                            <button
                              onClick={() => setExpandedVisitId(isExpanded ? null : v.id)}
                              className="w-full flex items-center gap-4 py-3 px-4 text-left hover:bg-white/[0.03] transition-colors text-xs sm:text-sm"
                            >
                              {/* Device Icon */}
                              <div className="flex size-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.05]">
                                <DeviceIcon className="size-4 text-white/50" />
                              </div>

                              {/* Info */}
                              <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-5 gap-2">
                                <div>
                                  <p className="text-[10px] text-white/40 uppercase">Date</p>
                                  <p className="text-white/80 text-xs truncate">{formatDate(v.startedAt)}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] text-white/40 uppercase">Appareil</p>
                                  <p className="text-white/80 text-xs">{v.browser} / {v.os}</p>
                                </div>
                                <div className="hidden sm:block">
                                  <p className="text-[10px] text-white/40 uppercase">Durée</p>
                                  <p className="text-emerald-400 text-xs font-medium">{formatDuration(v.duration)}</p>
                                </div>
                                <div className="hidden sm:block">
                                  <p className="text-[10px] text-white/40 uppercase">Scroll</p>
                                  <p className="text-white/80 text-xs">{v.maxScrollPercent}%</p>
                                </div>
                                <div className="hidden sm:block">
                                  <p className="text-[10px] text-white/40 uppercase">Sections</p>
                                  <p className="text-white/80 text-xs">
                                    {(v.sectionsVisited || []).length} vues
                                  </p>
                                </div>
                              </div>

                              {/* Expand Chevron */}
                              <div className="flex-shrink-0">
                                {isExpanded ? (
                                  <ChevronUp className="size-4 text-white/40" />
                                ) : (
                                  <ChevronDown className="size-4 text-white/40" />
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
                </GlassPanel>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}
