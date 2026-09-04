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

    // 2. Prepare payload for Google Sheet Webhook
    const googleSheetUrl =
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbz0KnU7lmE22AxA_8esMXBlcLdYKhcAcSrvgnM133YJGOlOtisHWT2J7h9ZMQ-Y4Qg-mQ/exec";

    const webhookUrls = [
      googleSheetUrl,
      process.env.N8N_WEBHOOK_URL,
    ].filter(Boolean) as string[];

    const dateStr = new Date().toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" });

    const webhookPayload = {
      "Date": dateStr,
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
      "Niveau actuel": level || (profile === "student" ? "Étudiant" : profile === "graduate" ? "Lauréat" : profile === "pro" ? "Professionnel" : "Non spécifié"),
      "Niveau Actuel": level || "",
      "Niveau": level || "",
      "level": level || "",
      "Level": level || "",
      "Ecole": school || (source === "pricing-modal" ? "Demande de tarif" : "Non spécifié"),
      "École": school || "",
      "ECOLE": school || "",
      "ÉCOLE": school || "",
      "school": school || "",
      "School": school || "",
      "source": source,
      "profile": profile,
      "objective": enhancedObjective,
      "message": enhancedMessage,
    };

    // 3. Dispatch Webhook, Email and WhatsApp concurrently (non-blocking for UI speed)
    const backgroundTasks = async () => {
      // 3a. Google Sheet Webhook
      for (const url of webhookUrls) {
        try {
          await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(webhookPayload),
            redirect: "follow",
          });
          console.log(`[API /contact] Webhook sent successfully to ${url}`);
        } catch (err) {
          console.error(`[API /contact] Webhook failed (${url}):`, err);
        }
      }

      // 3b. Send emails via Resend
      try {
        await sendContactEmails({
          name,
          email,
          phone,
          level,
          school,
          profile,
          objective: enhancedObjective,
          message: enhancedMessage,
          source,
        });
      } catch (err) {
        console.error("[API /contact] Email send failed:", err);
      }

      // 3c. Send WhatsApp confirmation
      if (phone) {
        try {
          await sendWhatsAppConfirmation(name, phone);
        } catch (err) {
          console.error("[API /contact] WhatsApp confirmation failed:", err);
        }
      }
    };

    // Run background tasks safely
    backgroundTasks().catch((e) => console.error("[API /contact backgroundTasks error]:", e));

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
