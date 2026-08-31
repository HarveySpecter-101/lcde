/**
 * WhatsApp Confirmation Engine via UltraMsg
 * - Formats all numbers (Moroccan & International)
 * - Generates unique dynamic spintax messages
 * - Dispatches safely to UltraMsg API
 */

/**
 * Normalizes phone number to international format (E.164 without leading +)
 */
export function formatPhoneForWhatsApp(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, "");

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
 * Random item picker
 */
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Dynamic message generator (Anti-Identical Text / Spintax)
 * Generates unique, natural human-sounding messages for every single lead.
 */
export function generateDynamicMessage(name: string): string {
  const firstName = name.trim().split(" ")[0] || name.trim();

  // Permutation building blocks
  const greetings = [
    `Bonjour ${firstName} 👋`,
    `Salam ${firstName} 👋`,
    `Bonjour ${firstName} !`,
    `Hello ${firstName} 👋`,
    `Bonjour et bienvenue ${firstName} 😊`,
  ];

  const acknowledgments = [
    `Nous avons bien reçu votre demande d'inscription pour la formation *Le Club Des Experts (LCDE)*.`,
    `Votre demande pour rejoindre la prochaine édition de *LCDE* a bien été enregistrée.`,
    `Merci pour votre intérêt envers le programme pratique *Le Club Des Experts*.`,
    `Nous venons de recevoir vos coordonnées pour la prochaine promotion du *Club Des Experts*.`,
  ];

  const nextSteps = [
    `Un conseiller pédagogique va examiner vos informations et vous recontacter par message ou appel sous 24h pour finaliser la démarche.`,
    `Un membre de notre équipe va prendre contact avec vous d'ici 24 heures pour échanger sur vos objectifs et valider votre dossier.`,
    `Un conseiller LCDE revient vers vous sous 24h ouvrées pour vous accompagner dans votre inscription.`,
  ];

  const questions = [
    `En attendant, avez-vous des questions particulières sur le programme ou les modules ? 😊`,
    `Avez-vous déjà une question sur le planning ou les facilités de paiement ?`,
    `N'hésitez pas à nous préciser votre filière ou vos attentes si vous le souhaitez.`,
    `Si vous avez la moindre question d'ici là, vous pouvez nous répondre directement ici !`,
  ];

  const signoffs = [
    `— *L'équipe Le Club Des Experts*`,
    `— *L'équipe pédagogique LCDE*`,
    `— *LCDE - Le Club Des Experts*`,
    `À très vite,\n*L'équipe LCDE*`,
  ];

  const randomRef = Math.floor(1000 + Math.random() * 9000);

  return [
    pick(greetings),
    "",
    pick(acknowledgments),
    "",
    pick(nextSteps),
    "",
    pick(questions),
    "",
    pick(signoffs),
    `\n_Réf. dossier : LCDE-${randomRef}_`,
  ].join("\n");
}

/**
 * Sends automated WhatsApp message via UltraMsg
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

  // Generate unique variation
  const message = generateDynamicMessage(name);

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
