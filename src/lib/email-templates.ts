/**
 * Email templates for LCDE contact form notifications.
 * Two templates:
 *  - supportEmail: notification sent to the support team
 *  - confirmationEmail: confirmation sent to the user
 */

export interface ContactData {
  name: string;
  email: string;
  phone?: string | null;
  level?: string | null;
  school?: string | null;
  profile: string;
  objective?: string | null;
  message: string;
  source?: string | null;
}

const PROFILE_LABELS: Record<string, string> = {
  company: "Entreprise / Recruteur",
  candidate: "Candidat",
  student: "Étudiant",
  other: "Autre",
};

const SOURCE_LABELS: Record<string, string> = {
  contact: "Formulaire de contact principal",
  newsletter: "Inscription Newsletter (footer)",
  "pricing-modal": "Modal Tarif (demande de devis)",
};

function formatDate(date: Date): string {
  return date.toLocaleString("fr-FR", {
    timeZone: "Africa/Casablanca",
    dateStyle: "full",
    timeStyle: "short",
  });
}

// ─── SUPPORT NOTIFICATION ────────────────────────────────────────────────────

export function buildSupportEmailHtml(data: ContactData): string {
  const profileLabel = PROFILE_LABELS[data.profile] ?? data.profile;
  const sourceLabel = SOURCE_LABELS[data.source ?? ""] ?? data.source ?? "—";
  const dateStr = formatDate(new Date());

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nouveau lead LCDE</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0a2647 0%,#1a3d6e 100%);padding:32px 40px;text-align:center;">
            <div style="display:inline-block;background:linear-gradient(135deg,#c9a84c,#e8c96e);border-radius:12px;padding:8px 20px;margin-bottom:16px;">
              <span style="color:#0a2647;font-weight:700;font-size:18px;letter-spacing:2px;">LCDE</span>
            </div>
            <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;">🎯 Nouveau lead reçu !</h1>
            <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">${sourceLabel}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 40px;">

            <!-- Alert badge -->
            <div style="background:#fef3c7;border-left:4px solid #c9a84c;border-radius:8px;padding:12px 16px;margin-bottom:24px;">
              <p style="margin:0;color:#92400e;font-size:14px;font-weight:600;">
                ⚡ Action requise — recontacter sous 24 h
              </p>
            </div>

            <!-- Lead info table -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
              <tr style="background:#f9fafb;">
                <td colspan="2" style="padding:12px 20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6b7280;">Informations du contact</td>
              </tr>
              <tr>
                <td style="padding:12px 20px;border-top:1px solid #f3f4f6;width:35%;color:#6b7280;font-size:14px;font-weight:600;">Nom</td>
                <td style="padding:12px 20px;border-top:1px solid #f3f4f6;color:#111827;font-size:14px;font-weight:700;">${escapeHtml(data.name)}</td>
              </tr>
              <tr>
                <td style="padding:12px 20px;border-top:1px solid #f3f4f6;color:#6b7280;font-size:14px;font-weight:600;">Email</td>
                <td style="padding:12px 20px;border-top:1px solid #f3f4f6;">
                  <a href="mailto:${escapeHtml(data.email)}" style="color:#c9a84c;font-weight:700;font-size:14px;text-decoration:none;">${escapeHtml(data.email)}</a>
                </td>
              </tr>
              ${data.phone ? `
              <tr>
                <td style="padding:12px 20px;border-top:1px solid #f3f4f6;color:#6b7280;font-size:14px;font-weight:600;">Téléphone</td>
                <td style="padding:12px 20px;border-top:1px solid #f3f4f6;">
                  <a href="tel:${escapeHtml(data.phone)}" style="color:#c9a84c;font-weight:700;font-size:14px;text-decoration:none;">${escapeHtml(data.phone)}</a>
                </td>
              </tr>` : ""}
              ${data.level ? `
              <tr>
                <td style="padding:12px 20px;border-top:1px solid #f3f4f6;color:#6b7280;font-size:14px;font-weight:600;">Niveau actuel</td>
                <td style="padding:12px 20px;border-top:1px solid #f3f4f6;color:#111827;font-size:14px;font-weight:600;">${escapeHtml(data.level)}</td>
              </tr>` : ""}
              ${data.school ? `
              <tr>
                <td style="padding:12px 20px;border-top:1px solid #f3f4f6;color:#6b7280;font-size:14px;font-weight:600;">École</td>
                <td style="padding:12px 20px;border-top:1px solid #f3f4f6;color:#111827;font-size:14px;font-weight:600;">${escapeHtml(data.school)}</td>
              </tr>` : ""}
              <tr>
                <td style="padding:12px 20px;border-top:1px solid #f3f4f6;color:#6b7280;font-size:14px;font-weight:600;">Profil</td>
                <td style="padding:12px 20px;border-top:1px solid #f3f4f6;color:#111827;font-size:14px;">${escapeHtml(profileLabel)}</td>
              </tr>
              ${data.objective ? `
              <tr>
                <td style="padding:12px 20px;border-top:1px solid #f3f4f6;color:#6b7280;font-size:14px;font-weight:600;">Objectif</td>
                <td style="padding:12px 20px;border-top:1px solid #f3f4f6;color:#111827;font-size:14px;">${escapeHtml(data.objective)}</td>
              </tr>` : ""}
              <tr>
                <td style="padding:12px 20px;border-top:1px solid #f3f4f6;color:#6b7280;font-size:14px;font-weight:600;">Source</td>
                <td style="padding:12px 20px;border-top:1px solid #f3f4f6;color:#111827;font-size:14px;">${escapeHtml(sourceLabel)}</td>
              </tr>
              <tr>
                <td style="padding:12px 20px;border-top:1px solid #f3f4f6;color:#6b7280;font-size:14px;font-weight:600;">Date</td>
                <td style="padding:12px 20px;border-top:1px solid #f3f4f6;color:#111827;font-size:14px;">${dateStr}</td>
              </tr>
            </table>

            <!-- Message -->
            <div style="margin-top:24px;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6b7280;">Message</p>
              <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px 20px;">
                <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
              </div>
            </div>

            <!-- Quick-reply CTA -->
            <div style="margin-top:28px;text-align:center;">
              <a href="mailto:${escapeHtml(data.email)}?subject=${encodeURIComponent(`Réponse LCDE — ${data.name}`)}"
                 style="display:inline-block;background:linear-gradient(135deg,#c9a84c,#e8c96e);color:#0a2647;font-weight:700;font-size:15px;text-decoration:none;padding:14px 32px;border-radius:50px;">
                ✉ Répondre à ${escapeHtml(data.name)}
              </a>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">
              Le Club Des Experts · Casablanca, Maroc<br/>
              Cet email est généré automatiquement par le site LCDE.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function buildSupportEmailText(data: ContactData): string {
  const profileLabel = PROFILE_LABELS[data.profile] ?? data.profile;
  const sourceLabel = SOURCE_LABELS[data.source ?? ""] ?? data.source ?? "—";
  return `
NOUVEAU LEAD LCDE
=================
Source      : ${sourceLabel}
Nom         : ${data.name}
Email       : ${data.email}
Téléphone   : ${data.phone ?? "—"}
Profil      : ${profileLabel}
Objectif    : ${data.objective ?? "—"}
Date        : ${formatDate(new Date())}

MESSAGE :
${data.message}
  `.trim();
}

// ─── USER CONFIRMATION ────────────────────────────────────────────────────────

export function buildConfirmationEmailHtml(data: ContactData): string {
  const isNewsletter = data.source === "newsletter";
  const isPricing = data.source === "pricing-modal";

  const headline = isNewsletter
    ? "Bienvenue dans le Club ! 🎉"
    : isPricing
    ? "Votre demande de devis est bien reçue !"
    : "Votre inscription est bien reçue !";

  const body = isNewsletter
    ? `Merci pour votre inscription à la newsletter LCDE. Vous recevrez chaque mois nos conseils en audit &amp; finance, les dates des prochaines éditions et les opportunités exclusives du Club.`
    : isPricing
    ? `Merci <strong>${escapeHtml(data.name)}</strong>, votre demande de tarif personnalisé a été transmise à notre équipe. Nous analysons votre profil et vous recontactons <strong>sous 24 h</strong> avec une proposition adaptée.`
    : `Merci <strong>${escapeHtml(data.name)}</strong>, votre demande a bien été reçue par notre équipe. Un conseiller LCDE vous recontacte <strong>sous 24 h</strong> pour étudier votre projet et répondre à toutes vos questions.`;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirmation LCDE</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0a2647 0%,#1a3d6e 100%);padding:40px;text-align:center;">
            <div style="display:inline-block;background:linear-gradient(135deg,#c9a84c,#e8c96e);border-radius:12px;padding:8px 20px;margin-bottom:20px;">
              <span style="color:#0a2647;font-weight:700;font-size:18px;letter-spacing:2px;">LCDE</span>
            </div>
            <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">${headline}</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">

            <p style="margin:0 0 20px;color:#374151;font-size:16px;line-height:1.7;">${body}</p>

            <!-- What's next -->
            <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
              <p style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#0369a1;">La suite</p>
              <ul style="margin:0;padding-left:20px;color:#374151;font-size:14px;line-height:2;">
                ${isNewsletter
                  ? `<li>Vous recevrez la prochaine newsletter LCDE</li>
                     <li>Conseils pratiques en audit &amp; finance</li>
                     <li>Dates et opportunités en avant-première</li>`
                  : `<li>Un conseiller LCDE vous appelle ou envoie un email sous <strong>24 h</strong></li>
                     <li>Discussion sur votre parcours et vos objectifs</li>
                     <li>Présentation de la prochaine édition disponible</li>`}
              </ul>
            </div>

            <!-- Contact box -->
            <div style="background:#fefce8;border:1px solid #fde68a;border-radius:12px;padding:16px 20px;text-align:center;">
              <p style="margin:0 0 6px;color:#92400e;font-size:13px;font-weight:600;">Besoin d'une réponse immédiate ?</p>
              <a href="https://wa.me/212777293083?text=${encodeURIComponent("Bonjour LCDE, je souhaite avoir des informations sur la formation.")}"
                 style="display:inline-block;background:#25D366;color:#fff;font-weight:700;font-size:14px;text-decoration:none;padding:10px 24px;border-radius:50px;margin-top:6px;">
                💬 WhatsApp — +212 777-293083
              </a>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;">
              Le Club Des Experts · Casablanca, Maroc<br/>
              <a href="mailto:contact@leclubdesexperts1.com" style="color:#c9a84c;text-decoration:none;">contact@leclubdesexperts1.com</a><br/>
              <span style="font-size:11px;">Vous recevez cet email car vous avez soumis un formulaire sur notre site.</span>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function buildConfirmationEmailText(data: ContactData): string {
  return `
Bonjour ${data.name},

Merci pour votre message ! Notre équipe LCDE vous recontacte sous 24 h.

Besoin d'une réponse rapide ? WhatsApp : +212 777-293083
Email : contact@leclubdesexperts1.com

Le Club Des Experts
Casablanca, Maroc
  `.trim();
}

// ─── Utility ─────────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
