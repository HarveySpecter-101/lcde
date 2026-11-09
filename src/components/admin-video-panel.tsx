"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export function AdminVideoPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState("Prêt à lancer la séance.");
  const [manifest, setManifest] = useState<string | null>(null);
  const [needsAdminLogin, setNeedsAdminLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!manifest || !videoRef.current) return;
    const video = videoRef.current;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = manifest;
      return;
    }
    if (!Hls.isSupported()) {
      setStatus("Ce navigateur ne prend pas en charge la lecture HLS.");
      return;
    }
    const hls = new Hls();
    hls.loadSource(manifest);
    hls.attachMedia(video);
    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (data.fatal) setStatus("Erreur pendant la lecture de la séance.");
    });
    return () => hls.destroy();
  }, [manifest]);

  async function watchLesson() {
    setBusy(true);
    setStatus("Préparation de la séance en cours...");
    try {
      const response = await fetch("/api/admin/video/prepare", { method: "POST", credentials: "same-origin" });
      const data = await response.json().catch(() => ({}));
      if (response.status === 401) {
        setNeedsAdminLogin(true);
        setStatus("Connecte-toi avec ton compte administrateur pour lancer le test vidéo.");
        return;
      }
      if (!response.ok) {
        setStatus(data.error || "La séance n'a pas pu être préparée.");
        return;
      }
      setNeedsAdminLogin(false);
      setManifest(data.manifest);
      setStatus("Séance prête. La lecture reste protégée par la session admin.");
    } catch {
      setStatus("Impossible de joindre le serveur. Réessaie dans un instant.");
    } finally {
      setBusy(false);
    }
  }

  async function signInForPreview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus("Vérification de la connexion...");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        setStatus(data.error || "Identifiants administrateur incorrects.");
        return;
      }
      setPassword("");
      setNeedsAdminLogin(false);
      await watchLesson();
    } catch {
      setStatus("Impossible de vérifier la connexion. Réessaie dans un instant.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm text-purple-300">Formation LCDE</p>
        <h2 className="mt-2 text-2xl font-bold text-white">Regarder les séances</h2>
        <p className="mt-2 text-sm text-white/60">Les vidéos sont récupérées côté serveur et lues directement dans cette interface.</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-white">Séance 1</p>
            <p className="mt-1 text-xs text-white/50">Vidéo de formation</p>
          </div>
          <button onClick={watchLesson} disabled={busy} className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500 disabled:cursor-wait disabled:opacity-60">{busy ? "Chargement…" : "Regarder"}</button>
        </div>
        <p className="mt-4 text-sm text-white/60">{status}</p>
        {needsAdminLogin && (
          <form onSubmit={signInForPreview} className="mt-5 grid gap-3 rounded-xl border border-white/10 bg-black/20 p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <label className="grid gap-1 text-xs text-white/70">
              E-mail administrateur
              <input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className="h-10 rounded-lg border border-white/15 bg-white/5 px-3 text-sm text-white outline-none focus:border-purple-400" />
            </label>
            <label className="grid gap-1 text-xs text-white/70">
              Mot de passe
              <input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-10 rounded-lg border border-white/15 bg-white/5 px-3 text-sm text-white outline-none focus:border-purple-400" />
            </label>
            <button disabled={busy} className="h-10 rounded-lg bg-white/10 px-4 text-sm font-semibold text-white hover:bg-white/15 disabled:opacity-60">{busy ? "Connexion…" : "Se connecter"}</button>
          </form>
        )}
      </div>
      {manifest && <video ref={videoRef} controls playsInline className="aspect-video w-full rounded-2xl bg-black shadow-2xl" />}
    </section>
  );
}
