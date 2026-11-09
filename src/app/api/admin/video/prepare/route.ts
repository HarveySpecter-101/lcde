import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isUserAdmin } from "@/lib/admin-auth";
import { DRIVE_REFRESH_COOKIE, downloadDriveFile, refreshGoogleAccessToken } from "@/lib/google-drive";

export const maxDuration = 300;

export async function POST() {
  if (!(await isUserAdmin())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const refreshToken = (await cookies()).get(DRIVE_REFRESH_COOKIE)?.value;
  if (!refreshToken) return NextResponse.json({ error: "Connexion Google Drive requise", connect: true }, { status: 401 });

  if (process.env.VIDEO_WORKER_URL) {
    const response = await fetch(`${process.env.VIDEO_WORKER_URL.replace(/\/$/, "")}/prepare`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-worker-secret": process.env.VIDEO_WORKER_SECRET || "" },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await response.json().catch(() => ({ error: "Réponse invalide du service vidéo" }));
    return NextResponse.json(data, { status: response.status });
  }

  const root = path.join(process.cwd(), ".cache", "lcde-hls");
  const output = path.join(root, "test-video");
  const source = path.join(root, "source-video");
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  await mkdir(root, { recursive: true });
  try {
    const accessToken = await refreshGoogleAccessToken(refreshToken);
    await downloadDriveFile(accessToken, source);
    await runFfmpeg(source, output);
    return NextResponse.json({ ok: true, manifest: "/api/admin/video/manifest" });
  } catch (error) {
    console.error("[Admin video prepare]", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Conversion impossible" }, { status: 500 });
  }
}

function runFfmpeg(source: string, output: string) {
  return new Promise<void>((resolve, reject) => {
    const process = spawn("ffmpeg", ["-y", "-i", source, "-c:v", "libx264", "-preset", "veryfast", "-crf", "23", "-c:a", "aac", "-b:a", "128k", "-f", "hls", "-hls_time", "6", "-hls_playlist_type", "vod", "-hls_segment_filename", path.join(output, "segment-%03d.ts"), path.join(output, "index.m3u8")], { windowsHide: true });
    let stderr = "";
    process.stderr.on("data", (chunk) => { stderr += chunk.toString(); });
    process.on("error", reject);
    process.on("close", (code) => code === 0 ? resolve() : reject(new Error(`FFmpeg a échoué (${code}): ${stderr.slice(-500)}`)));
  });
}
