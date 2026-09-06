import { NextResponse } from "next/server";
import {
  checkAdminCredentials,
  SESSION_COOKIE_NAME,
  SESSION_SECRET_TOKEN,
} from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.email || !body.password) {
      return NextResponse.json(
        { ok: false, error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    const { email, password } = body;
    const isValid = checkAdminCredentials(email, password);

    if (!isValid) {
      return NextResponse.json(
        { ok: false, error: "Identifiants incorrects" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ ok: true });

    // Set HTTP-only cookie valid for 7 days
    res.cookies.set(SESSION_COOKIE_NAME, SESSION_SECRET_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (error) {
    console.error("[Admin Login Error]:", error);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
