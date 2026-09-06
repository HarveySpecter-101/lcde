"use client";

import { useEffect, useState, useMemo } from "react";
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
} from "lucide-react";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: string;
  school: string;
  createdAt: string;
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginEmail, setLoginEmail] = useState("admin@lcde.ma");
  const [loginPassword, setLoginPassword] = useState("AdminLCDE2026!");
  const [loggingIn, setLoggingIn] = useState(false);

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [search, setSearch] = useState("");

  // Check authentication on mount
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setIsAuthenticated(true);
        toast.success("Connexion réussie !");
        fetchSubmissions();
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

  const exportToExcel = () => {
    if (filteredSubmissions.length === 0) {
      toast.error("Aucune donnée à exporter.");
      return;
    }

    try {
      const dataToExport = filteredSubmissions.map((s, idx) => ({
        "N°": idx + 1,
        "Date": new Date(s.createdAt).toLocaleString("fr-FR", {
          timeZone: "Africa/Casablanca",
        }),
        "Nom complet": s.name,
        "Téléphone / WhatsApp": s.phone,
        "Email": s.email,
        "Niveau actuel": s.level,
        "École": s.school,
      }));

      const ws = XLSX.utils.json_to_sheet(dataToExport);

      // Largeurs de colonnes optimales
      ws["!cols"] = [
        { wch: 6 },
        { wch: 20 },
        { wch: 26 },
        { wch: 20 },
        { wch: 32 },
        { wch: 28 },
        { wch: 28 },
      ];

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Candidatures");

      const today = new Date().toISOString().split("T")[0];
      XLSX.writeFile(wb, `Candidatures_LCDE_${today}.xlsx`);
      toast.success("Fichier Excel généré et téléchargé avec succès !");
    } catch (error) {
      console.error("Export Excel error:", error);
      toast.error("Erreur lors de l'export Excel.");
    }
  };

  // 1. Loading state
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#071930] text-white">
        <div className="flex items-center gap-3">
          <RefreshCw className="size-6 animate-spin text-gold" />
          <span className="text-sm font-medium">Chargement de l'espace admin...</span>
        </div>
      </div>
    );
  }

  // 2. Login Screen
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#071930] px-4 py-12 text-white">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.05] p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gold/15 border border-gold/30 text-gold mb-4 shadow-inner">
            <ShieldCheck className="size-7" />
          </div>

          <h1 className="text-center font-serif text-2xl font-bold text-white">
            Espace Administrateur
          </h1>
          <p className="mt-1 text-center text-xs text-white/60">
            Accès sécurisé à la liste des candidatures
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/70">
                Email / Identifiant
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-3 size-4 text-white/40" />
                <Input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="h-11 rounded-xl border-white/15 bg-white/10 pl-10 text-sm text-white placeholder:text-white/40 focus:border-gold focus:ring-gold"
                  placeholder="admin@lcde.ma"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/70">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-3 size-4 text-white/40" />
                <Input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="h-11 rounded-xl border-white/15 bg-white/10 pl-10 text-sm text-white placeholder:text-white/40 focus:border-gold focus:ring-gold"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loggingIn}
              className="mt-2 h-11 w-full rounded-xl bg-gold font-bold text-navy hover:bg-gold/90 transition-all shadow-lg"
            >
              {loggingIn ? "Vérification..." : "Se connecter"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // 3. Admin Data Table Screen
  return (
    <div className="min-h-screen bg-[#061427] text-white">
      {/* Top Navbar */}
      <header className="border-b border-white/10 bg-[#071930]/90 backdrop-blur-md sticky top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-gold/20 text-gold border border-gold/30">
              <FileSpreadsheet className="size-5" />
            </span>
            <div>
              <h1 className="font-serif text-lg font-bold leading-none text-white">
                LCDE — Administration
              </h1>
              <p className="text-[11px] text-white/60">
                Données synchronisées avec Supabase
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="h-9 gap-1.5 rounded-xl border-white/15 bg-white/5 text-xs text-white/90 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 transition-colors"
            >
              <LogOut className="size-3.5" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Actions Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-3 size-4 text-white/40" />
            <Input
              type="text"
              placeholder="Rechercher par nom, téléphone, email, école..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 rounded-xl border-white/15 bg-white/5 pl-10 text-sm text-white placeholder:text-white/40 focus:border-gold focus:ring-gold"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchSubmissions}
              disabled={loadingSubmissions}
              className="h-10 rounded-xl border-white/15 bg-white/5 text-xs text-white/90 hover:bg-white/10"
              title="Rafraîchir les données"
            >
              <RefreshCw
                className={`size-3.5 mr-1.5 ${
                  loadingSubmissions ? "animate-spin text-gold" : ""
                }`}
              />
              Rafraîchir
            </Button>

            <Button
              size="sm"
              onClick={exportToExcel}
              className="h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs gap-2 px-4 shadow-lg shadow-emerald-900/30 transition-all"
            >
              <Download className="size-4" />
              Télécharger Excel (.xlsx)
            </Button>
          </div>
        </div>

        {/* Total indicator */}
        <div className="flex items-center justify-between mb-3 text-xs text-white/60">
          <span>
            Affichage de <strong>{filteredSubmissions.length}</strong> candidature
            {filteredSubmissions.length > 1 ? "s" : ""}
            {search ? ` (filtré depuis ${submissions.length})` : ""}
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            Supabase Live
          </span>
        </div>

        {/* Data Table */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#071930]/80 backdrop-blur-sm shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-white/10 bg-white/[0.04] text-[11px] uppercase tracking-wider text-white/70">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="size-3 text-gold" /> Date
                    </span>
                  </th>
                  <th className="py-3.5 px-4 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <User className="size-3 text-gold" /> Nom complet
                    </span>
                  </th>
                  <th className="py-3.5 px-4 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="size-3 text-gold" /> Téléphone / WhatsApp
                    </span>
                  </th>
                  <th className="py-3.5 px-4 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <Mail className="size-3 text-gold" /> Email
                    </span>
                  </th>
                  <th className="py-3.5 px-4 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <GraduationCap className="size-3 text-gold" /> Niveau actuel
                    </span>
                  </th>
                  <th className="py-3.5 px-4 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <Building className="size-3 text-gold" /> École
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loadingSubmissions && submissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-white/50">
                      <RefreshCw className="mx-auto size-6 animate-spin text-gold mb-2" />
                      Chargement des candidatures depuis Supabase...
                    </td>
                  </tr>
                ) : filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-white/50">
                      {search
                        ? "Aucune candidature ne correspond à votre recherche."
                        : "Aucune candidature enregistrée pour le moment."}
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((s) => {
                    const cleanPhone = s.phone.replace(/[^0-9+]/g, "");
                    const waLink = cleanPhone
                      ? `https://wa.me/${cleanPhone.replace("+", "")}`
                      : null;

                    return (
                      <tr
                        key={s.id}
                        className="hover:bg-white/[0.04] transition-colors"
                      >
                        <td className="py-3.5 px-4 whitespace-nowrap text-white/70 text-xs">
                          {new Date(s.createdAt).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-white whitespace-nowrap">
                          {s.name}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {waLink ? (
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 hover:underline"
                              title="Ouvrir sur WhatsApp"
                            >
                              <Phone className="size-3.5" />
                              {s.phone}
                            </a>
                          ) : (
                            <span className="text-white/40">{s.phone}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <a
                            href={`mailto:${s.email}`}
                            className="text-sky-300 hover:text-sky-200 hover:underline"
                          >
                            {s.email}
                          </a>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-block rounded-lg bg-gold/10 border border-gold/20 px-2.5 py-1 text-xs text-gold font-medium">
                            {s.level}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap text-white/80">
                          {s.school}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
