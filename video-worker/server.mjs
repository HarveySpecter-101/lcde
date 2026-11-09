import crypto from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import express from "express";
import { Storage } from "@google-cloud/storage";

const app = express();
app.use(express.json({ limit: "1mb" }));
const storage = new Storage();
const bucket = storage.bucket(process.env.GCS_BUCKET);
const secret = process.env.VIDEO_WORKER_SECRET;
const fileId = process.env.LCDE_TEST_DRIVE_FILE_ID || "1EdJZYmgcjyGO5PS10vAnsgImw2FM8NdZ";
const port = process.env.PORT || 8080;
app.use((_req, res, next) => { res.set("Access-Control-Allow-Origin", "*"); res.set("Access-Control-Allow-Headers", "*"); next(); });

function authorized(req) {
  return Boolean(secret && req.get("x-worker-secret") === secret);
}

function signature(job, exp) {
  return crypto.createHmac("sha256", secret).update(`${job}.${exp}`).digest("hex");
}

function validHlsRequest(req) {
  const { exp, sig } = req.query;
  if (typeof exp !== "string" || typeof sig !== "string" || Number(exp) <= Date.now()) return false;
  const expected = Buffer.from(signature(req.params.job, exp));
  const received = Buffer.from(sig);
  return received.length === expected.length && crypto.timingSafeEqual(received, expected);
}

app.get("/health", (_req, res) => res.json({ ok: true }));

app.post("/prepare", async (req, res) => {
  if (!authorized(req)) return res.status(401).json({ error: "Non autorisé" });
  const refreshToken = req.body?.refreshToken || process.env.GOOGLE_DRIVE_REFRESH_TOKEN;
  if (!refreshToken) return res.status(400).json({ error: "Jeton Google Drive manquant" });
  const job = crypto.randomUUID();
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), "lcde-video-"));
  const source = path.join(temp, "source-video");
  const output = path.join(temp, "hls");
  await fs.mkdir(output);
  try {
    const accessToken = await refreshAccessToken(refreshToken);
    await downloadDriveFile(accessToken, source);
    await runFfmpeg(source, output);
    const files = await fs.readdir(output);
    await Promise.all(files.map((name) => bucket.upload(path.join(output, name), { destination: `hls/${job}/${name}`, metadata: { contentType: name.endsWith(".m3u8") ? "application/vnd.apple.mpegurl" : "video/mp2t", cacheControl: "private, max-age=3600" } })));
    const exp = String(Date.now() + 60 * 60 * 1000);
    const query = `exp=${exp}&sig=${signature(job, exp)}`;
    const base = process.env.PUBLIC_WORKER_URL?.replace(/\/$/, "");
    return res.json({ ok: true, manifest: `${base}/hls/${job}/index.m3u8?${query}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error instanceof Error ? error.message : "Conversion impossible" });
  } finally {
    await fs.rm(temp, { recursive: true, force: true });
  }
});

app.get("/hls/:job/:name", async (req, res) => {
  if (!validHlsRequest(req) || !/^(index\.m3u8|segment-\d+\.ts)$/.test(req.params.name)) return res.status(403).send("Forbidden");
  try {
    const [file] = await bucket.file(`hls/${req.params.job}/${req.params.name}`).download();
    if (req.params.name === "index.m3u8") {
      const exp = req.query.exp;
      const sig = req.query.sig;
      const query = `?exp=${exp}&sig=${sig}`;
      const manifest = file.toString("utf8").replace(/^(segment-\d+\.ts)$/gm, `/hls/${req.params.job}/$1${query}`);
      res.set("Content-Type", "application/vnd.apple.mpegurl").send(manifest);
    } else {
      res.set("Content-Type", "video/mp2t").send(file);
    }
  } catch { res.status(404).send("Not found"); }
});

app.listen(port, () => console.log(`LCDE video worker listening on ${port}`));

async function refreshAccessToken(refreshToken) {
  const response = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: process.env.GOOGLE_CLIENT_ID, client_secret: process.env.GOOGLE_CLIENT_SECRET, refresh_token: refreshToken, grant_type: "refresh_token" }) });
  const data = await response.json();
  if (!response.ok || !data.access_token) throw new Error("Autorisation Google Drive invalide");
  return data.access_token;
}

async function downloadDriveFile(accessToken, destination) {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media`, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!response.ok || !response.body) throw new Error(`Google Drive a répondu ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(destination, buffer);
}

function runFfmpeg(source, output) {
  return new Promise((resolve, reject) => {
    const child = spawn("ffmpeg", ["-y", "-i", source, "-c:v", "libx264", "-preset", "veryfast", "-crf", "23", "-c:a", "aac", "-b:a", "128k", "-f", "hls", "-hls_time", "6", "-hls_playlist_type", "vod", "-hls_segment_filename", path.join(output, "segment-%03d.ts"), path.join(output, "index.m3u8")]);
    let error = "";
    child.stderr.on("data", (data) => { error += data.toString(); });
    child.on("error", reject);
    child.on("close", (code) => code === 0 ? resolve() : reject(new Error(error.slice(-500))));
  });
}
