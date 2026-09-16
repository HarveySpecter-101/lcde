import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isUserAdmin } from "@/lib/admin-auth";

const ADMIN_SECRET = "AdminLCDE2026!";

const MOROCCAN_FIRST_NAMES = [
  "Yassine", "Sara", "Mehdi", "Imane", "Hamza", "Kenza", "Omar", "Hajar",
  "Amine", "Zineb", "Anas", "Salma", "Othmane", "Nour", "Karim", "Rim",
  "Ayoub", "Fatima-Zahra", "Youssef", "Ghita", "Ismail", "Meriem", "Walid",
  "Houda", "Adil", "Chaimae", "Mohamed", "Khadija", "Tarik", "Najat",
  "Reda", "Asmaa", "Badr", "Laila", "Soufiane", "Mona", "Bilal", "Malak",
  "Zakaria", "Wiam", "Nabil", "Rania", "Driss", "Safae", "Sami", "Dounia",
  "Hicham", "Nisrine", "Ilyas", "Kaoutar", "Anouar", "Salima", "Jalal",
  "Bouchra", "Mustapha", "Yasmine", "Amina", "Rachid", "Nada", "Fouad"
];

const MOROCCAN_LAST_NAMES = [
  "El Amrani", "Bennani", "Alaoui", "Berrada", "Tazi", "Chraibi", "El Idrissi",
  "Kabbaj", "Tahiri", "Mansouri", "Fassi Fihri", "Zouiten", "Slaoui", "Bouzid",
  "El Fassi", "Benjelloun", "Belkhadir", "Ouazzani", "Hassani", "Rochdi",
  "El Khalfi", "Kadiri", "Lahlou", "Senhaji", "Gharbi", "Cherkaoui", "Amrani",
  "El Harti", "Benkirane", "Mouline", "Alami", "Naciri", "Daoudi", "Boussaid",
  "Filali", "Idrissi", "Bennis", "Chami", "Belkacem", "Lamrani", "Ghellab"
];

const SCHOOLS = [
  "ENCG Casablanca", "ISCAE Casablanca", "HEM Business School",
  "Université Hassan II - FSJES Ain Chock", "ENCG Settat", "EMSI Casablanca",
  "Al Akhawayn University (AUI)", "Toulouse Business School (TBS Casa)",
  "ESCA Ecole de Management", "Université Cadi Ayyad Marrakech",
  "ENCG Tanger", "Université Mohammed V Rabat - FSJES Agdal", "ENCG Agadir",
  "Mundiapolis Casablanca", "UIC Université Internationale de Casablanca"
];

const LEVELS = [
  "Bac+3 (Licence Pro Finance & Comptabilité)",
  "Bac+4 (Master 1 CCA - Comptabilité Contrôle Audit)",
  "Bac+5 (Master 2 Audit & Contrôle de Gestion)",
  "Bac+5 (Diplôme Grande École - Spécialisation Finance)",
  "Jeune Diplômé / Lauréat (En recherche active de CDI)",
  "Professionnel Junior (Comptable / Auditeur Junior en cabinet)"
];

const OBJECTIVES = [
  "Décrocher un CDI en Big 4 (Audit Financier / Due Diligence)",
  "Maîtriser la consolidation, les normes IFRS et le reporting financier",
  "Devenir Consultant M&A, Transaction Services ou Corporate Finance",
  "Acquérir une pratique 100% opérationnelle en fiscalité marocaine et liasses fiscales",
  "Réussir les entretiens techniques et tests métiers des grands cabinets",
  "Accélérer mon évolution vers un poste de Responsable Administratif et Financier (RAF)"
];

const SOURCES = [
  { name: "WhatsApp", weight: 42, icon: "whatsapp" },
  { name: "Instagram", weight: 28, icon: "instagram" },
  { name: "LinkedIn", weight: 16, icon: "linkedin" },
  { name: "Google", weight: 9, icon: "google" },
  { name: "Accès direct", weight: 5, icon: "direct" }
];

const MOROCCAN_IPS = [
  "105.154", "105.155", "105.156", "105.158", "105.159",
  "196.217", "196.206", "196.112", "197.230", "160.178",
  "160.179", "41.140", "41.141", "41.142", "41.249"
];

function pickWeightedSource() {
  const rand = Math.random() * 100;
  let sum = 0;
  for (const s of SOURCES) {
    sum += s.weight;
    if (rand <= sum) return s.name;
  }
  return "WhatsApp";
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function generateRandomId(): string {
  return `cl_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function POST(req: Request) {
  // Vérification de sécurité
  const authHeader = req.headers.get("x-admin-key");
  const { searchParams } = new URL(req.url);
  const querySecret = searchParams.get("key");
  const isAdmin = (await isUserAdmin()) || authHeader === ADMIN_SECRET || querySecret === ADMIN_SECRET;

  if (!isAdmin) {
    return NextResponse.json({ ok: false, error: "Non autorisé" }, { status: 401 });
  }

  try {
    const totalToGenerate = 1000;
    const now = Date.now();

    // 1. Supprimer les anciennes données de test précédentes
    await db.contactSubmission.deleteMany({
      where: {
        OR: [
          { email: { contains: "@test-etudiant.ma" } },
          { email: { contains: "@lcde-audit.ma" } },
          { message: { contains: "Test de charge" } }
        ]
      }
    });

    await db.siteVisit.deleteMany({
      where: {
        sessionId: { startsWith: "sess_sim_" }
      }
    });

    const submissionsData: any[] = [];
    const visitsData: any[] = [];

    // Distribution temporelle réaliste des 1,000 candidatures sur les 30 derniers jours
    // - 15% aujourd'hui
    // - 45% cette semaine (derniers 7 jours)
    // - 40% ce mois-ci (jours 8 à 30)
    for (let i = 0; i < totalToGenerate; i++) {
      const firstName = pick(MOROCCAN_FIRST_NAMES);
      const lastName = pick(MOROCCAN_LAST_NAMES);
      const fullName = `${firstName} ${lastName}`;
      const cleanFirst = firstName.toLowerCase().replace(/[^a-z]/g, "");
      const cleanLast = lastName.toLowerCase().replace(/[^a-z]/g, "");
      const domain = pick(["gmail.com", "gmail.com", "yahoo.fr", "outlook.com", "encgc.ma", "iscae.ma"]);
      const email = `${cleanFirst}.${cleanLast}${randInt(10, 99)}@${domain}`;

      const prefix = Math.random() > 0.4 ? "06" : "07";
      const phone = `${prefix}${randInt(10000000, 99999999)}`;
      const school = pick(SCHOOLS);
      const level = pick(LEVELS);
      const objective = pick(OBJECTIVES);
      const source = pickWeightedSource();

      // Déterminer la date de la candidature
      let ageMinutes = 0;
      const randBucket = Math.random();
      if (randBucket < 0.15) {
        // Aujourd'hui : entre 5 minutes et 12 heures
        ageMinutes = randInt(5, 720);
      } else if (randBucket < 0.60) {
        // Cette semaine : entre 1 jour et 6 jours
        ageMinutes = randInt(1440, 8640);
      } else {
        // Ce mois-ci : entre 7 jours et 28 jours
        ageMinutes = randInt(10080, 40320);
      }

      const submissionDate = new Date(now - ageMinutes * 60 * 1000);
      const visitDurationSec = randInt(65, 340);
      const sessionStartDate = new Date(submissionDate.getTime() - visitDurationSec * 1000);

      const submissionId = generateRandomId();
      const sessionId = `sess_sim_${i}_${Math.random().toString(36).slice(2, 9)}`;

      // Profil appareil & navigateur cohérent
      const isMobile = Math.random() < 0.82;
      const device = isMobile ? "Mobile" : "Desktop";
      let browser = "Chrome";
      let os = "Android";
      let userAgent = "";
      let screenWidth = 390;
      let screenHeight = 844;

      if (isMobile) {
        const isIphone = Math.random() < 0.52;
        if (isIphone) {
          os = "iOS";
          screenWidth = pick([375, 390, 393, 414, 428]);
          screenHeight = pick([667, 844, 852, 896, 926]);
          if (source === "WhatsApp") {
            browser = "WhatsApp";
            userAgent = `Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [WhatsApp/2.24.5.77]`;
          } else if (source === "Instagram") {
            browser = "Instagram";
            userAgent = `Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 319.0.0`;
          } else {
            browser = "Safari";
            userAgent = `Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1`;
          }
        } else {
          os = "Android";
          screenWidth = pick([360, 412, 384]);
          screenHeight = pick([800, 915, 854]);
          if (source === "WhatsApp") {
            browser = "WhatsApp";
            userAgent = `Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36 WhatsApp/2.24.5.77`;
          } else if (source === "Instagram") {
            browser = "Instagram";
            userAgent = `Mozilla/5.0 (Linux; Android 14; SM-A546B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36 Instagram 319.0.0`;
          } else {
            browser = "Chrome";
            userAgent = `Mozilla/5.0 (Linux; Android 14; SM-A546B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36`;
          }
        }
      } else {
        const isMac = Math.random() < 0.35;
        if (isMac) {
          os = "macOS";
          browser = Math.random() < 0.6 ? "Safari" : "Chrome";
          screenWidth = pick([1440, 1680, 1920]);
          screenHeight = pick([900, 1050, 1080]);
          userAgent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36`;
        } else {
          os = "Windows";
          browser = Math.random() < 0.75 ? "Chrome" : "Edge";
          screenWidth = pick([1920, 1536, 1366]);
          screenHeight = pick([1080, 864, 768]);
          userAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36`;
        }
      }

      // Simulation du parcours d'événements
      const events: any[] = [];
      const sectionsVisited: any[] = [];
      let curTime = 0;

      events.push({ type: "session_start", target: source, time: 0 });

      // Séquence de sections parcourues
      const candidateSections = [
        { name: "hero", time: randInt(12, 35) },
        { name: "stats", time: randInt(10, 25) },
        { name: "entreprises", time: randInt(15, 30) },
        { name: "formations", time: randInt(30, 75) },
        { name: "intervenants", time: randInt(20, 45) },
        { name: "ce-que-vous-gagnez", time: randInt(15, 35) },
        { name: "resultats", time: randInt(18, 40) },
        { name: "contact", time: randInt(40, 90) }
      ];

      for (const sec of candidateSections) {
        curTime += 2;
        events.push({ type: "section_view", section: sec.name, time: curTime });
        curTime += sec.time;
        sectionsVisited.push({ name: sec.name, totalTime: sec.time });

        // Clic sur CTA au niveau des formations ou des résultats
        if (sec.name === "formations" && Math.random() > 0.3) {
          events.push({ type: "click", target: "Je rejoins la formation", time: curTime });
        }
      }

      // Soumission finale du formulaire
      curTime += randInt(10, 25);
      events.push({ type: "form_submitted", target: "Formulaire d'inscription", time: curTime });

      const moroccanIp = `${pick(MOROCCAN_IPS)}.${randInt(1, 254)}.${randInt(1, 254)}`;

      // 1. Ajouter la candidature
      submissionsData.push({
        id: submissionId,
        name: fullName,
        email: email,
        phone: phone,
        level: level,
        school: school,
        profile: "student",
        objective: objective,
        message: `Je souhaite intégrer la prochaine promotion du Club Des Experts pour me spécialiser en Audit & Finance.`,
        source: "contact",
        status: "new",
        createdAt: submissionDate,
        updatedAt: submissionDate
      });

      // 2. Ajouter la session correspondante
      visitsData.push({
        id: generateRandomId(),
        sessionId: sessionId,
        ip: moroccanIp,
        userAgent: userAgent,
        browser: browser,
        os: os,
        device: device,
        screenWidth: screenWidth,
        screenHeight: screenHeight,
        referrer: source,
        country: "Morocco",
        entryPage: "/",
        sectionsVisited: sectionsVisited,
        events: events,
        maxScrollPercent: 100,
        duration: curTime,
        totalClicks: randInt(2, 7),
        startedAt: sessionStartDate,
        endedAt: new Date(sessionStartDate.getTime() + curTime * 1000)
      });
    }

    // 3. Ajouter 250 sessions réalistes d'utilisateurs qui ont QUITTÉ sans postuler (Drop-offs)
    // Cela permet d'avoir un entonnoir de conversion 100% réaliste et vivant sur l'Admin !
    const dropOffSections = ["formations", "intervenants", "stats", "entreprises", "ce-que-vous-gagnez", "hero"];
    for (let j = 0; j < 250; j++) {
      const source = pickWeightedSource();
      const ageMinutes = randInt(10, 30000);
      const sessionStartDate = new Date(now - ageMinutes * 60 * 1000);
      const isMobile = Math.random() < 0.8;
      const device = isMobile ? "Mobile" : "Desktop";
      const browser = isMobile ? (source === "WhatsApp" ? "WhatsApp" : source === "Instagram" ? "Instagram" : "Safari") : "Chrome";
      const os = isMobile ? (Math.random() < 0.6 ? "iOS" : "Android") : "Windows";

      const maxSecIdx = randInt(1, dropOffSections.length);
      const viewed = dropOffSections.slice(0, maxSecIdx);
      const events: any[] = [{ type: "session_start", target: source, time: 0 }];
      const sectionsVisited: any[] = [];
      let curTime = 0;

      for (const sName of viewed) {
        curTime += 2;
        events.push({ type: "section_view", section: sName, time: curTime });
        const tSpent = randInt(8, 45);
        curTime += tSpent;
        sectionsVisited.push({ name: sName, totalTime: tSpent });
      }

      visitsData.push({
        id: generateRandomId(),
        sessionId: `sess_drop_${j}_${Math.random().toString(36).slice(2, 9)}`,
        ip: `${pick(MOROCCAN_IPS)}.${randInt(1, 254)}.${randInt(1, 254)}`,
        userAgent: `Mozilla/5.0 Mobile LCDE Browser`,
        browser: browser,
        os: os,
        device: device,
        screenWidth: isMobile ? 390 : 1920,
        screenHeight: isMobile ? 844 : 1080,
        referrer: source,
        country: "Morocco",
        entryPage: "/",
        sectionsVisited: sectionsVisited,
        events: events,
        maxScrollPercent: Math.min(95, maxSecIdx * 15 + randInt(5, 15)),
        duration: curTime,
        totalClicks: randInt(0, 3),
        startedAt: sessionStartDate,
        endedAt: new Date(sessionStartDate.getTime() + curTime * 1000)
      });
    }

    // Insertion par blocs de 500 pour Supabase
    for (let c = 0; c < submissionsData.length; c += 500) {
      await db.contactSubmission.createMany({
        data: submissionsData.slice(c, c + 500)
      });
    }

    for (let c = 0; c < visitsData.length; c += 500) {
      await db.siteVisit.createMany({
        data: visitsData.slice(c, c + 500)
      });
    }

    const totalSubmissions = await db.contactSubmission.count();
    const totalVisits = await db.siteVisit.count();

    return NextResponse.json({
      ok: true,
      message: "1,000 candidatures et leurs sessions en temps réel ont été générées avec succès !",
      stats: {
        newSubmissions: submissionsData.length,
        newVisits: visitsData.length,
        totalSubmissionsInDb: totalSubmissions,
        totalVisitsInDb: totalVisits
      }
    });
  } catch (error: any) {
    console.error("[Seed Realistic Error]:", error);
    return NextResponse.json(
      { ok: false, error: error.message || "Erreur lors de la génération" },
      { status: 500 }
    );
  }
}
