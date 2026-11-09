import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isUserAdmin } from "@/lib/admin-auth";
import { DRIVE_STATE_COOKIE, getGoogleOAuthClient, getGoogleRedirectUri } from "@/lib/google-drive";

export async function GET() {
  if (!(await isUserAdmin())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { clientId } = await getGoogleOAuthClient();
  const state = randomUUID();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: getGoogleRedirectUri(),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
    scope: "https://www.googleapis.com/auth/drive.readonly",
    state,
  });
  const response = NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
  response.cookies.set(DRIVE_STATE_COOKIE, state, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 600, path: "/" });
  return response;
}
