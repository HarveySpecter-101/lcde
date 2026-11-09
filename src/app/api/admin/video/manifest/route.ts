import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isUserAdmin } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isUserAdmin())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  try {
    const source = await readFile(path.join(process.cwd(), ".cache", "lcde-hls", "test-video", "index.m3u8"), "utf8");
    const manifest = source.replace(/^(segment-[^\r\n]+)$/gm, "/api/admin/video/segment?name=$1");
    return new NextResponse(manifest, { headers: { "Content-Type": "application/vnd.apple.mpegurl", "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "La vidéo n'est pas encore convertie" }, { status: 404 });
  }
}
