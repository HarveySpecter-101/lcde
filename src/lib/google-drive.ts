import { readFile } from "node:fs/promises";
import path from "node:path";

type OAuthClient = {
  web?: { client_id: string; client_secret: string; redirect_uris?: string[] };
  installed?: { client_id: string; client_secret: string; redirect_uris?: string[] };
};

const OAUTH_FILE = process.env.GOOGLE_OAUTH_CLIENT_FILE || "secrets/google-oauth-client.json";
export const DRIVE_FILE_ID = process.env.LCDE_TEST_DRIVE_FILE_ID || "1EdJZYmgcjyGO5PS10vAnsgImw2FM8NdZ";
export const DRIVE_REFRESH_COOKIE = "lcde_drive_refresh_token";
export const DRIVE_STATE_COOKIE = "lcde_drive_oauth_state";

export async function getGoogleOAuthClient() {
  const raw = process.env.GOOGLE_OAUTH_CLIENT_JSON || await readFile(path.resolve(process.cwd(), OAUTH_FILE), "utf8");
  const config = JSON.parse(raw) as OAuthClient;
  const client = config.web || config.installed;
  if (!client?.client_id || !client.client_secret) {
    throw new Error("Configuration OAuth Google invalide");
  }
  return { clientId: client.client_id, clientSecret: client.client_secret };
}

export function getGoogleRedirectUri() {
  return process.env.GOOGLE_OAUTH_REDIRECT_URI || "https://le-club-des-experts.vercel.app/api/admin/video/oauth/callback";
}

export async function refreshGoogleAccessToken(refreshToken: string) {
  const { clientId, clientSecret } = await getGoogleOAuthClient();
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) throw new Error("Autorisation Google Drive expirée ou invalide");
  return data.access_token as string;
}

export async function exchangeGoogleCode(code: string) {
  const { clientId, clientSecret } = await getGoogleOAuthClient();
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: getGoogleRedirectUri(),
      grant_type: "authorization_code",
    }),
  });
  const data = await response.json();
  if (!response.ok || !data.refresh_token) throw new Error("Google n'a pas fourni de jeton de rafraîchissement");
  return data.refresh_token as string;
}

export async function downloadDriveFile(accessToken: string, destination: string) {
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(DRIVE_FILE_ID)}?alt=media`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  if (!response.ok || !response.body) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Google Drive n'a pas pu fournir la vidéo (${response.status}): ${detail.slice(0, 200)}`);
  }
  const file = await readFileFromWebStream(response.body);
  const { writeFile } = await import("node:fs/promises");
  await writeFile(destination, file);
}

async function readFileFromWebStream(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const next = await reader.read();
    if (next.done) break;
    chunks.push(next.value);
    total += next.value.byteLength;
  }
  const result = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result;
}
