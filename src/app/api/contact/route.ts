import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendContactEmails } from "@/lib/email";

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
    const source = typeof body.source === "string" ? body.source : "contact";

    // For newsletter: message is pre-filled on the client, accept it as-is
    const rawMessage = typeof body.message === "string" ? body.message.trim() : "";
    const message =
      rawMessage || (source === "newsletter" ? "Inscription newsletter depuis le footer." : "");

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Champs obligatoires manquants (nom, email)" },
        { status: 422 }
      );
    }
    if (!message) {
      return NextResponse.json(
        { ok: false, error: "Le message est requis" },
        { status: 422 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Adresse email invalide" },
        { status: 422 }
      );
    }

    // 1. Save to Supabase via Prisma
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

    // 2. Send emails via Resend (non-blocking — DB record is always saved first)
    sendContactEmails({ name, email, phone, profile, objective, message, source })
      .then(({ errors }) => {
        if (errors.length > 0) {
          console.warn("[API /contact] Email warnings:", errors);
        }
      })
      .catch((err) => {
        console.error("[API /contact] Email send failed (non-critical):", err);
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
