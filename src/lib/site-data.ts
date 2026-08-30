import {
  BookOpenCheck,
  FileBarChart,
  Landmark,
  Scale,
  ShieldCheck,
  ClipboardCheck,
  SearchCheck,
  Building2,
  ShieldAlert,
  GitMerge,
  FileCheck2,
  Monitor,
  MonitorSmartphone,
  type LucideIcon,
} from "lucide-react";

/* ===== Brand constants ===== */
export const LCDE = {
  name: "Le Club Des Experts",
  shortName: "LCDE",
  slogan: "Créons les experts de demain…",
  city: "Casablanca",
  country: "Maroc",
  activeSince: 2020,
  edition: "8ᵉ édition (2027)",
  whatsappNumber: "+212777293083",
  whatsappDisplay: "+212 777-293083",
  whatsappRaw: "212777293083",
  email: "contact@leclubdesexperts1.com",
  instagram: "https://instagram.com/leclubdesexperts",
  instagramHandle: "@leclubdesexperts",
  facebook: "https://facebook.com",
  facebookName: "Le Club Des Experts",
  linkedin: "https://linkedin.com",
  linkedinName: "Le Club Des Experts",
};

export const WHATSAPP_LINK = `https://wa.me/${LCDE.whatsappRaw}?text=${encodeURIComponent(
  "Bonjour LCDE, je souhaite avoir des informations sur la formation."
)}`;

/* ===== Animated stats ===== */
export const STATS = [
  { prefix: "+ ", value: 4500, suffix: "", label: "Personnes formées", sub: "depuis 2020" },
  { prefix: "+ ", value: 95, suffix: " %", label: "Des participants touchent entre 10K et 15K DH", sub: "dès la sortie d'école" },
  { value: 100, suffix: " %", label: "Taux de satisfaction", sub: "" },
  { value: 8, suffix: "ᵉ édition", label: "2027", sub: "En cours" },
] as const;

/* ===== 13 Métiers ===== */
export type Metier = {
  id: number;
  icon: LucideIcon;
  title: string;
  short: string;
  bullets: string[];
  description: string;
  skills: string[];
  duration: string;
};

export const METIERS: Metier[] = [
  {
    id: 1,
    icon: BookOpenCheck,
    title: "Consultant en Expertise comptable",
    short: "Tenue, clôture et révision des comptes selon les normes marocaines.",
    bullets: [
      "Tenue et clôture des comptes",
      "Travaux d'inventaire et provisions",
      "Révision des comptes et production des états financiers",
      "Déclarations fiscales (IS, IR, TVA)"
    ],
    description: "Le socle du métier d'expert-comptable. Vous apprenez la tenue courante, les travaux d'inventaire, la révision des comptes, la déclaration fiscale, et la production d'états financiers conformes au CGNC. Des cas pratiques issus de dossiers réels de cabinets d'expertise comptable.",
    skills: [
      "Comptabilité générale",
      "Révision comptable",
      "États financiers CGNC",
      "Déclarations fiscales"
    ],
    duration: "6 semaines",
  },
  {
    id: 2,
    icon: Landmark,
    title: "Consultant en Tax",
    short: "Tax advisory : du CGI aux conventions fiscales internationales.",
    bullets: [
      "IS, IR, TVA et retenues à la source",
      "Contrôle & contentieux fiscal",
      "Fiscalité internationale & prix de transfert",
      "Optimisation fiscale et due diligence fiscale"
    ],
    description: "Le pôle Tax Advisory complet. Vous maîtrisez l'IS, l'IR et la TVA au Maroc, gérez un contrôle fiscal, et structurez des opérations internationales en maîtrisant les conventions fiscales et les prix de transfert. Simulation de contrôles fiscaux et cas de contentieux.",
    skills: [
      "IS / IR / TVA",
      "Contrôle fiscal",
      "Prix de transfert",
      "Due diligence fiscale"
    ],
    duration: "6 semaines",
  },
  {
    id: 3,
    icon: Scale,
    title: "Consultant Juridique",
    short: "Cadre juridique de l'entreprise, contrats et restructurations.",
    bullets: [
      "Droit des sociétés (SA, SARL, SCA)",
      "Contrats commerciaux & sûretés",
      "Fusions, scissions et transformations",
      "Due diligence juridique"
    ],
    description: "Le cadre juridique indispensable à tout praticien. Vous comprenez les statuts juridiques (SA, SARL, SCA), rédigez et analysez des contrats commerciaux, et maîtrisez les opérations de restructuration (fusions, scissions, apports partiels d'actifs).",
    skills: [
      "Droit des sociétés",
      "Contrats commerciaux",
      "Sûretés & garanties",
      "Restructurations"
    ],
    duration: "4 semaines",
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "Auditeur Financier des états de synthèse",
    short: "Démarche d'audit et certification des comptes individuels.",
    bullets: [
      "Planification & risques d'audit",
      "Tests de procédures & substantifs",
      "Rapport d'audit (CNCC / ISA)",
      "Mission de Certification des comptes"
    ],
    description: "Le cœur du métier d'auditeur. Planification, identification et évaluation des risques, tests de procédures et substantifs, et rédaction d'un rapport d'audit conforme aux normes ISA et CNCC. Simulation complète d'une mission de commissariat aux comptes.",
    skills: [
      "Planification d'audit",
      "Évaluation des risques",
      "Tests de procédures",
      "Certification ISA/CNCC"
    ],
    duration: "6 semaines",
  },
  {
    id: 5,
    icon: Building2,
    title: "Auditeur Financier spécialisé dans le secteur Bancaire",
    short: "Audit et contrôle spécifiques aux établissements bancaires.",
    bullets: [
      "Comptabilité bancaire et PCEC",
      "Réglementation prudentielle (Bâle III/IV)",
      "Audit des opérations de crédit et de marché",
      "Contrôle interne des établissements bancaires"
    ],
    description: "L'audit financier appliqué au secteur bancaire. Vous maîtrisez les spécificités comptables des établissements de crédit, le contrôle interne bancaire, la réglementation prudentielle (Bâle III/IV), et l'audit des opérations de crédit, de marché et de trésorerie.",
    skills: [
      "PCEC",
      "Réglementation Bâle",
      "Audit bancaire",
      "Contrôle interne"
    ],
    duration: "5 semaines",
  },
  {
    id: 6,
    icon: ShieldAlert,
    title: "Auditeur Financier spécialisé dans le secteur des Assurances",
    short: "Audit et contrôle des compagnies d'assurance et de réassurance.",
    bullets: [
      "Comptabilité des assurances",
      "Provisionnement technique",
      "Réglementation Solvabilité II",
      "Audit des engagements et réassurance"
    ],
    description: "L'audit financier du secteur assurantiel. Vous apprenez les spécificités comptables des compagnies d'assurance, le provisionnement technique, la réglementation Solvabilité II, et l'audit des engagements techniques et de la réassurance.",
    skills: [
      "Comptabilité assurance",
      "Provisions techniques",
      "Solvabilité II",
      "Audit engagements"
    ],
    duration: "4 semaines",
  },
  {
    id: 7,
    icon: FileBarChart,
    title: "Consultant spécialisé en Normes Comptables IFRS",
    short: "Référentiel international des états financiers.",
    bullets: [
      "IFRS 15 (revenus)",
      "IFRS 16 (contrats de location)",
      "IFRS 9 (instruments financiers)",
      "Présentation de l'IFRS consolidé"
    ],
    description: "Maîtrisez le référentiel IFRS utilisé par les groupes cotés et les multinationales. Écritures complexes (IFRS 15 revenus, IFRS 16 contrats de location, IFRS 9 instruments financiers) et présentation d'états financiers IFRS consolidés.",
    skills: [
      "IFRS 15 — revenus",
      "IFRS 16 — contrats de location",
      "IFRS 9 — instruments financiers",
      "Présentation IFRS consolidé"
    ],
    duration: "5 semaines",
  },
  {
    id: 8,
    icon: GitMerge,
    title: "Consultant spécialisé en Consolidation des Comptes",
    short: "Du bilan individuel aux comptes consolidés de groupe.",
    bullets: [
      "Périmètre de consolidation",
      "Méthodes de consolidation (IG, IP, MEE)",
      "Éliminations intra-groupe",
      "Retraitements de consolidation"
    ],
    description: "L'expertise en consolidation comptable. Vous apprenez à établir un périmètre de consolidation, effectuer les retraitements de consolidation, éliminer les opérations intra-groupe, et produire des comptes consolidés selon le référentiel marocain et IFRS.",
    skills: [
      "Périmètre de consolidation",
      "Intégration globale",
      "Éliminations intra-groupe",
      "Retraitements"
    ],
    duration: "5 semaines",
  },
  {
    id: 9,
    icon: FileCheck2,
    title: "Audit des états financiers Consolidés en Normes IFRS",
    short: "Audit des comptes consolidés selon le référentiel IFRS.",
    bullets: [
      "Audit des packages de consolidation",
      "Revue des retraitements IFRS",
      "Tests substantifs sur les comptes consolidés",
      "Certification des états financiers consolidés"
    ],
    description: "La combinaison audit + consolidation + IFRS. Vous menez une mission d'audit de comptes consolidés en normes IFRS de bout en bout : planification, revue des packages de consolidation, tests sur les retraitements IFRS, et certification des états financiers consolidés.",
    skills: [
      "Audit consolidé",
      "Packages IFRS",
      "Tests substantifs consolidés",
      "Rapport de certification"
    ],
    duration: "5 semaines",
  },
  {
    id: 10,
    icon: SearchCheck,
    title: "Consultant Financier",
    short: "Analyses financières, M&A et ingénierie financière.",
    bullets: [
      "Due Diligence financière (vendeur / acheteur)",
      "Quality of Earnings (QoE)",
      "Valorisation (DCF, comparables)",
      "Financial modeling & structuration M&A"
    ],
    description: "Le sommet de l'ingénierie financière. Due diligence financière (vendeur/acheteur), Quality of Earnings, valorisation d'entreprises (DCF, comparables), structuration M&A, financial modeling et pitching auprès d'investisseurs.",
    skills: [
      "Due Diligence",
      "QoE",
      "Valorisation DCF",
      "Financial modeling"
    ],
    duration: "6 semaines",
  },
  {
    id: 11,
    icon: Monitor,
    title: "Consultant SAP FI/CO",
    short: "Paramétrage et consulting sur le module Finance de SAP.",
    bullets: [
      "Paramétrage SAP FI (Financial Accounting)",
      "Paramétrage SAP CO (Controlling)",
      "Centres de coûts et comptabilité analytique",
      "Intégration inter-modules"
    ],
    description: "La maîtrise du module SAP FI/CO, le plus demandé sur le marché. Vous apprenez le paramétrage des modules Financial Accounting (FI) et Controlling (CO), la gestion des centres de coûts, la comptabilité analytique SAP, et l'intégration avec les autres modules.",
    skills: [
      "SAP FI",
      "SAP CO",
      "Centres de coûts",
      "Intégration ERP"
    ],
    duration: "5 semaines",
  },
  {
    id: 12,
    icon: MonitorSmartphone,
    title: "Auditeur IT",
    short: "Audit des systèmes d'information et cybersécurité.",
    bullets: [
      "Contrôles IT généraux (ITGC)",
      "Audit de la sécurité des SI",
      "Référentiels COBIT & ISO 27001",
      "Évaluation des risques cyber"
    ],
    description: "L'audit des systèmes d'information. Vous apprenez à évaluer les contrôles IT généraux (ITGC), auditer la sécurité des SI, évaluer les risques cyber, et mener des missions d'audit IT selon les référentiels COBIT et ISO 27001.",
    skills: [
      "ITGC",
      "Sécurité SI",
      "COBIT",
      "ISO 27001"
    ],
    duration: "4 semaines",
  },
  {
    id: 13,
    icon: ClipboardCheck,
    title: "Contrôleur de gestion",
    short: "Pilotage de la performance et contrôle budgétaire.",
    bullets: [
      "Contrôle budgétaire et analyse des écarts",
      "Tableaux de bord et reporting",
      "Calcul des coûts (ABC, coûts complets)",
      "Power BI et Excel/VBA pour le pilotage"
    ],
    description: "Le pilotage de l'entreprise par la performance. Vous apprenez le contrôle budgétaire, la construction de tableaux de bord, l'analyse des écarts, le calcul des coûts (ABC, coûts complets), et l'utilisation d'outils BI (Power BI, Excel/VBA) pour le reporting de gestion.",
    skills: [
      "Contrôle budgétaire",
      "Tableaux de bord",
      "Méthode ABC",
      "Power BI"
    ],
    duration: "5 semaines",
  }
];

export type Module = Metier;
export const MODULES = METIERS;

/* ===== Tools / software taught ===== */
export const TOOLS = [
  { name: "Sage", tag: "Comptabilité" },
  { name: "SAP FI/CO", tag: "ERP Finance" },
  { name: "Odoo", tag: "ERP" },
  { name: "Excel / VBA", tag: "Modélisation" },
  { name: "Power BI", tag: "Data Viz" },
] as const;

/* ===== Intervenants data ===== */
export type Intervenant = {
  name: string;
  company?: string;
  experience: string;
  role: string;
  specialties: string[];
  initials: string;
  photo?: string;
};

export const INTERVENANTS: Intervenant[] = [
  {
    name: "Mr. Amine Hassanain",
    company: "Topium Advisory",
    experience: "+15 ans d'expérience",
    role: "Founding Partner, Commissaire aux comptes et Expert comptable",
    specialties: [
      "Membre du Conseil National de la Comptabilité",
      "Consultant en Normes IFRS (INTEC Paris)",
      "Consultant en Consolidation des Comptes",
      "Consultant en Dissolution et Liquidation",
      "Docteur en Sciences de Gestion",
      "Enseignant MBA et Cycle d'Expertise Comptable",
    ],
    initials: "AH",
  },
  {
    name: "Mr. Mehdi Zaher",
    company: "Forvis Mazars",
    experience: "+12 ans d'expérience",
    role: "Senior Manager Transaction Services",
    specialties: [
      "Audit d'Acquisition",
      "Due Diligence Financière",
      "Valorisation des Entreprises",
    ],
    initials: "MZ",
  },
  {
    name: "Mme. Sarah Dchieche",
    company: "Deloitte Maroc",
    experience: "+12 ans d'expérience",
    role: "Directrice Tax",
    specialties: [
      "Fiscalité Internationale",
      "Due Diligence Fiscale et Juridique",
      "Contrôle Fiscal",
      "Optimisation Fiscale",
    ],
    initials: "SD",
  },
  {
    name: "Mr. Reda Latrach",
    company: "Auditus",
    experience: "+8 ans d'expérience",
    role: "Founding Partner, Commissaire aux comptes et Expert comptable",
    specialties: [
      "Spécialiste en Fiscalité",
      "Consultant en Finance Islamique & Audit Sharia",
    ],
    initials: "RL",
  },
];

export type AnonymousIntervenant = {
  role: string;
  experience: string;
  specialty: string;
};

export const ANONYMOUS_INTERVENANTS: AnonymousIntervenant[] = [
  { role: "Contrôleur de Gestion Senior Industriel (Multinationale Pharmaceutique)", experience: "+8 ans", specialty: "Consultant en Finance Informatique & Data Analytics (SAP FI/CO, Microsoft Office, Power BI, VBA, SQL, SPSS, ...)" },
  { role: "Auditrice Senior IT & Cybersécurité (Cabinet Big4)", experience: "+5 ans", specialty: "Diplômée de l'Université Sorbonne Paris Nord" },
  { role: "HR Business Partner (Multinationale)", experience: "+5 ans", specialty: "Consultant en Talent Acquisition" },
  { role: "Auditeur Senior (Cabinet Big4)", experience: "+5 ans", specialty: "Expert Comptable en Formation, Auditeur et Consultant spécialisé dans le métier du secteur des Assurances" },
  { role: "Auditrice Senior (Cabinet Big4)", experience: "+7 ans", specialty: "spécialisée en Consolidation des Comptes et Normes IFRS, Expert Comptable Mémorialiste" },
  { role: "Consultante Senior (Cabinet Big4)", experience: "+5 ans", specialty: "Consultante en Transaction Services et M&A" },
];

/* ===== Founders data ===== */
export const FOUNDERS_DATA = [
  {
    name: "Rachad GHALI",
    role: 'Co-fondateur "Le Club Des Experts"',
    bio: "Manager Audit & Financial Advisory, Consultant spécialisé dans l'Audit et le Métier du secteur Bancaire.",
    badge: "Audit & Banking",
    photo: "/founders/rachad-ghali.jpg",
  },
  {
    name: "Rida MOUTIK",
    role: 'Co-fondateur "Le Club Des Experts"',
    bio: "Expert Comptable Mémorialiste, Manager Audit & Consulting Financier.",
    badge: "EC & Due Diligence",
    photo: "/founders/rida-moutik.jpg",
  },
];

/* ===== Trainers profile ===== */
export type Trainer = {
  name: string;
  role: string;
  tags: string[];
  initials: string;
};

export const TRAINERS: Trainer[] = [
  {
    name: "Rachad GHALI",
    role: "Fondateur & CEO — Expert-comptable",
    tags: ["OEC", "Audit", "Fiscalité"],
    initials: "RG",
  },
  {
    name: "Moutik Rida",
    role: "Co-fondateur — Consultant Senior",
    tags: ["Transaction Services", "Due Diligence"],
    initials: "MR",
  },
  {
    name: "Intervenant Big Four",
    role: "Senior Auditor — Grand cabinet international",
    tags: ["Audit", "IFRS", "Consolidation"],
    initials: "BF",
  },
  {
    name: "Docteur en Gestion",
    role: "Académique & Praticien",
    tags: ["Contrôle de gestion", "Recherche"],
    initials: "DG",
  },
];

/* ===== Success Stories ===== */
export type SuccessStory = {
  name: string;
  school: string;
  admissions: string[];
};

export const SUCCESS_STORIES: SuccessStory[] = [
  { name: "Abdelghafour Louah", school: "ENCG Meknès", admissions: ["Saaidi & Associés", "Pricewaterhouse"] },
  { name: "Abdelhafid El Hassani", school: "ENCG Casablanca", admissions: ["Deloitte France", "RSM Morocco", "Hdid & Associés"] },
  { name: "Abdelkader Benataya", school: "ENCG Oujda", admissions: ["Deloitte France", "AD Associés"] },
  { name: "Abdellah Moujtahid", school: "ENCG Casablanca", admissions: ["Fidaroc Grant Thornton", "Deloitte Maroc"] },
  { name: "Abderrahmane Khal", school: "ENCG El Jadida", admissions: ["Mazars France"] },
  { name: "Abdessamad Zoumhane", school: "ENCG Casablanca", admissions: ["Pricewaterhouse"] },
  { name: "Achraf Hakim", school: "ENCG El Jadida", admissions: ["PWC Rtm", "Accor (Audit Interne)", "Crédit Du Maroc (Audit)", "Airbus (Contrôle de gestion)"] },
  { name: "Adam Idriss Zamzami", school: "ENCG Casablanca", admissions: ["Mazars Maroc", "Deloitte France"] },
  { name: "Ahlam Wakrim", school: "ENCG Casablanca", admissions: ["Deloitte France", "Fidaroc Grant Thornton", "Coopers & Lybrand"] },
  { name: "Akram Erraysse", school: "ENCG Béni Mellal", admissions: ["Fidaroc Grant Thornton"] },
  { name: "Akram Makhlouk", school: "ENCG Casablanca", admissions: ["Deloitte Maroc", "Coopers & Lybrand", "AD Associés", "Pricewaterhouse", "Mazars France"] },
  { name: "Alae Ajdid", school: "ENCG Casablanca", admissions: ["Deloitte Maroc (Tax)", "Maphar (Contrôle de gestion)"] },
  { name: "Amina Abbassi", school: "ISCAE Rabat", admissions: ["Mazars France", "KPMG Tax", "Fidaroc Grant Thornton"] },
  { name: "Amina Elassali", school: "ENCG Kénitra", admissions: ["SM South Capital", "Mazars France", "Upsilon Consulting"] },
  { name: "Amine Dahmoun", school: "ENCG Settat", admissions: ["EY Maroc"] },
  { name: "Amine Dardikh", school: "ENCG Kénitra", admissions: ["Mazars France", "Mazars Luxembourg"] },
  { name: "Amjad Tarriko", school: "ENCG Kénitra", admissions: ["E2B Consulting", "Fizazi & Associés", "CIH (Audit et Inspection)"] },
  { name: "Anas Belkharraz", school: "ENCG El Jadida", admissions: ["Hdid & Associés", "Fizazi & Associés"] },
  { name: "Anass Touzani", school: "ENCG Settat", admissions: ["Deloitte Maroc", "PWC France"] },
  { name: "Arwa Oudouche", school: "ENCG Agadir", admissions: ["PWC France"] },
  { name: "Asmae Adnane", school: "ENCG Settat", admissions: ["PWC France"] },
  { name: "Asmae Bennis", school: "ENCG Fès", admissions: ["PWC Rtm", "Fidaroc Grant Thornton", "Mazars France"] },
];

/* ===== Employer sectors (generic categories, no real logos) ===== */
export const EMPLOYER_SECTORS = [
  { name: "Big Four", desc: "Cabinets d'audit & conseil internationaux" },
  { name: "Banques", desc: "Établissements bancaires & de marché" },
  { name: "Assurances", desc: "Compagnies d'assurance & réassurance" },
  { name: "Multinationales", desc: "Groupes industriels & services" },
  { name: "Cabinets d'expertise", desc: "Experts-comptables & commissaires aux comptes" },
  { name: "Conseil stratégique", desc: "Cabinets de conseil & M&A" },
];

/* ===== Free resources (lead magnet) ===== */
export const RESOURCES = [
  {
    title: "Guide d'entretiens PFE",
    desc: "Questions types, méthodologie de réponse et erreurs à éviter pour réussir vos entretiens en audit & finance.",
    icon: "FileText",
    format: "PDF — 24 pages",
  },
  {
    title: "Boîte à outils de l'auditeur financier",
    desc: "Check-list d'audit, programmes de travail modèles et trames de due diligence prêtes à l'emploi.",
    icon: "Wrench",
    format: "Pack — Excel + PDF",
  },
];

/* ===== FAQ ===== */
export const FAQ = [
  {
    q: "La formation est-elle vraiment 100 % pratique ?",
    a: "Oui. Tous les modules sont animés par des experts-comptables inscrits à l'OEC, des docteurs en gestion et des seniors issus de grands cabinets. Chaque séance s'appuie sur des cas réels, des dossiers clients anonymisés et des travaux dirigés.",
  },
  {
    q: "Quelle est la durée et le format de la formation ?",
    a: "La formation « 10 en 1 » s'étale sur 12 mois, de janvier à décembre. Elle combine sessions en présentiel à Casablanca, travaux pratiques et accompagnement personnalisé. Le calendrier précis des éditions est communiqué sur demande.",
  },
  {
    q: "À qui s'adresse cette formation ?",
    a: "Aux étudiants en fin de cursus et jeunes diplômés qui préparent leurs entretiens PFE, stages et premiers emplois, ainsi qu'aux entreprises qui souhaitent former leurs équipes en interne ou recruter des profils déjà opérationnels.",
  },
  {
    q: "Quel est le coût de la formation ?",
    a: "Le tarif dépend du profil et du parcours choisi. Pour obtenir une proposition adaptée, cliquez sur « Demander le tarif » ou contactez-nous directement via WhatsApp.",
  },
  {
    q: "Quels outils et logiciels sont enseignés ?",
    a: "Sage, SAP FI/CO, Odoo, Excel/VBA et Power BI. L'objectif est de maîtriser les outils réellement utilisés en cabinet et en entreprise.",
  },
  {
    q: "Quels sont les débouchés après la formation ?",
    a: "Nos diplômés intègrent principalement les Big Four, les banques, les assurances, les multinationales et les cabinets d'expertise comptable — avec un taux d'insertion professionnelle allant jusqu'à 96 %.",
  },
];

/* ===== Navigation anchors ===== */
export const NAV_LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#formations", label: "Nos Formations" },
  { href: "#ce-que-vous-gagnez", label: "Ce que vous gagnez" },
  { href: "#intervenants", label: "Intervenants" },
  { href: "#temoignages", label: "Témoignages" },
  { href: "#entreprises", label: "Entreprises" },
  { href: "#contact", label: "Contact" },
];
