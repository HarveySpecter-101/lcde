"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export default function AdminVideoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState("Prêt à tester la vidéo Google Drive.");
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
      if (data.fatal) setStatus("Erreur pendant la lecture HLS.");
    });
    return () => hls.destroy();
  }, [manifest]);

  async function prepareVideo() {
    setStatus("Préparation de la séance en cours...");
    const response = await fetch("/api/admin/video/prepare", { method: "POST" });
    const data = await response.json();
    if (!response.ok) {
      setStatus(data.error || "La vidéo n'a pas pu être préparée.");
      return;
    }
    setManifest(data.manifest);
    setStatus("Vidéo prête. La lecture reste protégée par la session admin.");
  }

  return (
    <main className="min-h-screen bg-[#030014] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <p className="text-sm text-purple-300">LCDE · Test admin</p>
          <h1 className="mt-2 text-3xl font-bold">Vidéo de formation</h1>
          <p className="mt-2 text-white/60">La vidéo est récupérée depuis Google Drive côté serveur puis convertie en HLS.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
          <button onClick={prepareVideo} className="rounded-xl bg-purple-600 px-4 py-2 font-semibold hover:bg-purple-500">Regarder la séance</button>
          <p className="mt-4 text-sm text-white/60">{status}</p>
        </div>
        {manifest && <video ref={videoRef} controls playsInline className="aspect-video w-full rounded-2xl bg-black shadow-2xl" />}
      </div>
    </main>
  );
}
