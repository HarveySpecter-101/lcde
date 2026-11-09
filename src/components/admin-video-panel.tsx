"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export function AdminVideoPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState("Prêt à lancer la séance.");
  const [manifest, setManifest] = useState<string | null>(null);

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
    setStatus("Préparation de la séance en cours...");
    const response = await fetch("/api/admin/video/prepare", { method: "POST" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setStatus(data.error || "La séance n'a pas pu être préparée.");
      return;
    }
    setManifest(data.manifest);
    setStatus("Séance prête. La lecture reste protégée par la session admin.");
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
          <button onClick={watchLesson} className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500">Regarder</button>
        </div>
        <p className="mt-4 text-sm text-white/60">{status}</p>
      </div>
      {manifest && <video ref={videoRef} controls playsInline className="aspect-video w-full rounded-2xl bg-black shadow-2xl" />}
    </section>
  );
}
