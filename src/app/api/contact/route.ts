import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendContactEmails } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Payload invalide" },
        { status: 400 }
      );
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const profile =
      typeof body.profile === "string" ? body.profile : "student";
    const objective =
      typeof body.objective === "string" ? body.objective.trim() : "";
    const source =
      typeof body.source === "string" ? body.source : "contact";

    const rawMessage =
      typeof body.message === "string" ? body.message.trim() : "";

    const message =
      rawMessage ||
      (source === "newsletter"
        ? "Inscription newsletter depuis le footer."
        : "");

    if (!name || !email) {
      return NextResponse.json(
        {
          ok: false,
          error: "Champs obligatoires manquants (nom, email)",
        },
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

    // 2. Send emails via Resend
    sendContactEmails({
      name,
      email,
      phone,
      profile,
      objective,
      message,
      source,
    })
      .then(({ errors }) => {
        if (errors.length > 0) {
          console.warn("[API /contact] Email warnings:", errors);
        }
      })
      .catch((err) => {
        console.error(
          "[API /contact] Email send failed (non-critical):",
          err
        );
      });

    // 3. Send the form data to n8n
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || "https://72ccd59247a56a.lhr.life/webhook-test/aa39b0fe-2db6-429e-bf02-3cd36c4a8933";
    if (n8nWebhookUrl) {
      try {
        await fetch(
          n8nWebhookUrl,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              phone,
              profile,
              objective,
              message,
              source,
            }),
          }
        );
      } catch (err) {
        console.error("[API /contact] n8n webhook failed:", err);
      }
    }

    return NextResponse.json({
      ok: true,
      id: submission.id,
    });
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

    return NextResponse.json({
      ok: true,
      submissions: count,
    });
  } catch (err) {
    console.error("[API /contact GET] error:", err);

    return NextResponse.json(
      { ok: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
