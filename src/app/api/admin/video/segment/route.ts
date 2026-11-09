import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isUserAdmin } from "@/lib/admin-auth";

export async function GET(request: Request) {
  if (!(await isUserAdmin())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const name = new URL(request.url).searchParams.get("name") || "";
  if (!/^segment-\d{3}\.ts$/.test(name)) return NextResponse.json({ error: "Segment invalide" }, { status: 400 });
  try {
    const file = await readFile(path.join(process.cwd(), ".cache", "lcde-hls", "test-video", name));
    return new NextResponse(file, { headers: { "Content-Type": "video/mp2t", "Cache-Control": "private, max-age=3600" } });
  } catch {
    return NextResponse.json({ error: "Segment introuvable" }, { status: 404 });
  }
}
