import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: false, error: "Payload invalide" }, { status: 400 });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const profile = typeof body.profile === "string" ? body.profile : "student";
    const objective =
      typeof body.objective === "string" ? body.objective.trim() : "";
    const message =
      typeof body.message === "string" ? body.message.trim() : "";
    const source = typeof body.source === "string" ? body.source : "contact";

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Champs obligatoires manquants" },
        { status: 422 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Adresse email invalide" },
        { status: 422 }
      );
    }

    const submission = await db.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        profile,
        objective: objective || null,
        message,
        source,
      },
    });

    return NextResponse.json({ ok: true, id: submission.id });
  } catch (err) {
    console.error("[API /contact] error:", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await db.contactSubmission.count();
    return NextResponse.json({ ok: true, submissions: count });
  } catch (err) {
    console.error("[API /contact GET] error:", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
