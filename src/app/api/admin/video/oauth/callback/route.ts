import { NextResponse } from "next/server";
import { isUserAdmin } from "@/lib/admin-auth";
import { DRIVE_REFRESH_COOKIE, DRIVE_STATE_COOKIE, exchangeGoogleCode } from "@/lib/google-drive";

export async function GET(request: Request) {
  if (!(await isUserAdmin())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = request.headers.get("cookie")?.match(new RegExp(`${DRIVE_STATE_COOKIE}=([^;]+)`))?.[1];
  if (!code || !state || state !== cookieState) return NextResponse.json({ error: "État OAuth invalide" }, { status: 400 });
  try {
    const refreshToken = await exchangeGoogleCode(code);
    const response = NextResponse.redirect(new URL("/admin/video?connected=1", request.url));
    response.cookies.set(DRIVE_REFRESH_COOKIE, refreshToken, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 30, path: "/" });
    response.cookies.delete(DRIVE_STATE_COOKIE);
    return response;
  } catch (error) {
    console.error("[Google Drive OAuth]", error);
    return NextResponse.redirect(new URL("/admin/video?error=oauth", request.url));
  }
}
