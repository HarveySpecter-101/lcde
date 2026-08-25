/**
 * Resend email sender wrapper for LCDE.
 * Sends two emails in parallel for each form submission:
 *  1. Support notification → SUPPORT_EMAIL
 *  2. User confirmation    → submitter's email
 */

import { Resend } from "resend";
import type { ContactData } from "./email-templates";
import {
  buildSupportEmailHtml,
  buildSupportEmailText,
  buildConfirmationEmailHtml,
  buildConfirmationEmailText,
} from "./email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS =
  process.env.EMAIL_FROM ?? "LCDE <onboarding@resend.dev>";

const SUPPORT_EMAIL =
  process.env.SUPPORT_EMAIL ?? "persieusleaderpersi@gmail.com";

const SOURCE_SUBJECTS: Record<string, string> = {
  contact: "🎯 Nouveau lead LCDE — Formulaire de contact",
  newsletter: "📧 Nouvelle inscription Newsletter LCDE",
  "pricing-modal": "💰 Demande de devis LCDE",
};

const CONFIRM_SUBJECTS: Record<string, string> = {
  contact: "✅ Votre inscription LCDE est bien reçue",
  newsletter: "📬 Bienvenue dans la newsletter LCDE",
  "pricing-modal": "✅ Votre demande de tarif LCDE est bien reçue",
};

export interface SendResult {
  supportOk: boolean;
  confirmOk: boolean;
  errors: string[];
}

/**
 * Sends the support notification + user confirmation emails in parallel.
 * Never throws — errors are captured and returned so the API can still
 * respond with { ok: true } even if Resend is down.
 */
export async function sendContactEmails(data: ContactData): Promise<SendResult> {
  const sourceKey = data.source ?? "contact";
  const supportSubject =
    SOURCE_SUBJECTS[sourceKey] ?? "🎯 Nouveau lead LCDE";
  const confirmSubject =
    CONFIRM_SUBJECTS[sourceKey] ?? "✅ Votre demande LCDE est bien reçue";

  const errors: string[] = [];

  const [supportResult, confirmResult] = await Promise.allSettled([
    // 1. Support notification
    resend.emails.send({
      from: FROM_ADDRESS,
      to: [SUPPORT_EMAIL],
      subject: supportSubject,
      html: buildSupportEmailHtml(data),
      text: buildSupportEmailText(data),
      replyTo: data.email,
    }),

    // 2. User confirmation (only if not newsletter with fake name)
    data.email && data.source !== "newsletter"
      ? resend.emails.send({
          from: FROM_ADDRESS,
          to: [data.email],
          subject: confirmSubject,
          html: buildConfirmationEmailHtml(data),
          text: buildConfirmationEmailText(data),
        })
      : // For newsletter, still send confirmation to the subscriber
        data.source === "newsletter"
        ? resend.emails.send({
            from: FROM_ADDRESS,
            to: [data.email],
            subject: confirmSubject,
            html: buildConfirmationEmailHtml(data),
            text: buildConfirmationEmailText(data),
          })
        : Promise.resolve({ data: null, error: null }),
  ]);

  const supportOk =
    supportResult.status === "fulfilled" && !supportResult.value.error;
  const confirmOk =
    confirmResult.status === "fulfilled" && !confirmResult.value.error;

  if (supportResult.status === "rejected") {
    errors.push(`Support email failed: ${String(supportResult.reason)}`);
  } else if (supportResult.value.error) {
    errors.push(`Support email error: ${supportResult.value.error.message}`);
  }

  if (confirmResult.status === "rejected") {
    errors.push(`Confirm email failed: ${String(confirmResult.reason)}`);
  } else if (
    confirmResult.status === "fulfilled" &&
    confirmResult.value.error
  ) {
    errors.push(`Confirm email error: ${confirmResult.value.error.message}`);
  }

  if (errors.length > 0) {
    console.error("[email] Send errors:", errors);
  }

  return { supportOk, confirmOk, errors };
}
