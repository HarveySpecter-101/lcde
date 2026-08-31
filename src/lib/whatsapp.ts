/**
 * Format phone number to international standard (E.164 without leading +)
 * Supports standard Moroccan numbers (06..., 07..., +212...) and international numbers.
 */
export function formatPhoneForWhatsApp(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, "");

  // Moroccan format normalization
  if (cleaned.startsWith("06") || cleaned.startsWith("07")) {
    cleaned = "212" + cleaned.slice(1);
  } else if ((cleaned.startsWith("6") || cleaned.startsWith("7")) && cleaned.length === 9) {
    cleaned = "212" + cleaned;
  } else if (cleaned.startsWith("00")) {
    cleaned = cleaned.slice(2);
  }

  return cleaned;
}

/**
 * Send an automated WhatsApp confirmation to a new lead via UltraMsg
 */
export async function sendWhatsAppConfirmation(name: string, rawPhone: string): Promise<boolean> {
  const instanceId = process.env.ULTRAMSG_INSTANCE_ID || "instance190147";
  const token = process.env.ULTRAMSG_TOKEN || "sqqmbbw3qeajqvhu";

  if (!instanceId || !token || !rawPhone) {
    console.warn("[WhatsApp UltraMsg] Missing instance, token or phone number");
    return false;
  }

  const phone = formatPhoneForWhatsApp(rawPhone);
  if (!phone || phone.length < 8) {
    console.warn("[WhatsApp UltraMsg] Invalid phone format:", rawPhone);
    return false;
  }

  const firstName = name.trim().split(" ")[0] || name.trim();
  const message = `Bonjour ${firstName} 👋,\n\nMerci d'avoir manifesté votre intérêt pour la formation *Le Club Des Experts (LCDE)*.\n\nNous avons bien reçu votre demande d'inscription. Un conseiller va examiner vos coordonnées et vous recontacter par message ou appel sous 24h pour finaliser votre dossier.\n\nEn attendant, avez-vous des questions particulières sur le programme ou les modalités ? 😊\n\n— *L'équipe Le Club Des Experts*`;

  try {
    const params = new URLSearchParams();
    params.append("token", token);
    params.append("to", phone);
    params.append("body", message);

    const response = await fetch(`https://api.ultramsg.com/${instanceId}/messages/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json().catch(() => null);
    console.log("[WhatsApp UltraMsg Sent]", { to: phone, result: data });
    return !!data?.sent;
  } catch (err) {
    console.error("[WhatsApp UltraMsg Error]", err);
    return false;
  }
}
