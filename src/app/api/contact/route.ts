import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendContactEmails } from "@/lib/email";
import { sendWhatsAppConfirmation } from "@/lib/whatsapp";

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
    const level = typeof body.level === "string" ? body.level.trim() : "";
    const school = typeof body.school === "string" ? body.school.trim() : "";
    const profile =
      typeof body.profile === "string" ? body.profile : "candidate";
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
        : "Je souhaite rejoindre la prochaine promotion.");

    if (!name || !email) {
      return NextResponse.json(
        {
          ok: false,
          error: "Champs obligatoires manquants (nom, email)",
        },
        { status: 422 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Adresse email invalide" },
        { status: 422 }
      );
    }

    const enhancedObjective = [
      objective || "Rejoindre la prochaine édition",
      level ? `Niveau: ${level}` : null,
      school ? `École: ${school}` : null,
    ].filter(Boolean).join(" | ");

    const enhancedMessage = [
      message,
      level ? `Niveau actuel : ${level}` : null,
      school ? `École : ${school}` : null,
    ].filter(Boolean).join("\n");

    // 1. Save to Supabase via Prisma
    const submission = await db.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        profile,
        objective: enhancedObjective || null,
        message: enhancedMessage,
        source,
      },
    });

    // 2. Send emails via Resend
    sendContactEmails({
      name,
      email,
      phone,
      level,
      school,
      profile,
      objective: enhancedObjective,
      message: enhancedMessage,
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

    // 3. Send the form data to Google Sheet / n8n Webhook
    const googleSheetUrl =
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbx8eVWRPqIs0Q-mPst-4mV6oDeh_m1eAEdBv8FocLzYhyb6bQtKpWz8IV2p4946f4Zp/exec";

    const webhookUrls = [
      googleSheetUrl,
      process.env.N8N_WEBHOOK_URL,
    ].filter(Boolean) as string[];

    const webhookPayload = {
      "Date": new Date().toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" }),
      "Nom Complet": name,
      "Nom complet": name,
      "Nom": name,
      "name": name,
      "Email": email,
      "email": email,
      "E-mail": email,
      "WhatsApp": phone,
      "Téléphone": phone,
      "Telephone": phone,
      "phone": phone,
      "Niveau actuel": level,
      "Niveau Actuel": level,
      "Niveau": level,
      "level": level,
      "Level": level,
      "Ecole": school,
      "École": school,
      "ECOLE": school,
      "ÉCOLE": school,
      "school": school,
      "School": school,
      "source": source,
      "profile": profile,
      "objective": enhancedObjective,
      "message": enhancedMessage,
    };

    for (const url of webhookUrls) {
      try {
        const isGoogleScript = url.includes("script.google.com");
        let targetUrl = url;
        if (isGoogleScript) {
          const params = new URLSearchParams({
            "Date": webhookPayload["Date"],
            "Nom Complet": name,
            "Email": email,
            "WhatsApp": phone,
            "Niveau actuel": level,
            "Ecole": school,
            "level": level,
            "school": school,
            "name": name,
            "email": email,
            "phone": phone,
          });
          targetUrl = `${url}${url.includes("?") ? "&" : "?"}${params.toString()}`;
        }

        await fetch(targetUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookPayload),
          redirect: "follow",
        });
      } catch (err) {
        console.error(`[API /contact] Webhook failed (${url}):`, err);
      }
    }

    // 4. Send automated WhatsApp message to the lead
    if (phone) {
      try {
        await sendWhatsAppConfirmation(name, phone);
      } catch (err) {
        console.error("[API /contact] WhatsApp confirmation failed:", err);
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
