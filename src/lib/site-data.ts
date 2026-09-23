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
  {
    "name": "Laila Bouali",
    "school": "ENCG Tanger",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Salma Doutar",
    "school": "ENCG Marrakech",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Mohamed Moncef Akra",
    "school": "ISCAE Rabat",
    "admissions": [
      "Mazars Maroc"
    ]
  },
  {
    "name": "Maryame El Omari",
    "school": "ENCG Casablanca",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Meryeme El Houdaibi",
    "school": "ENCG Settat",
    "admissions": [
      "Mazars France",
      "Deloitte France"
    ]
  },
  {
    "name": "Nada Hani",
    "school": "ISCAE Casablanca",
    "admissions": [
      "Mazars France",
      "AD Associ�s",
      "EY Maroc",
      "Mazars Maroc"
    ]
  },
  {
    "name": "Mohammed Erramdani",
    "school": "ENCG F�s",
    "admissions": [
      "KPMG Maroc"
    ]
  },
  {
    "name": "Nirmine Berrada",
    "school": "ENCG F�s",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Nisrine Benbihi",
    "school": "ENCG K�nitra",
    "admissions": [
      "Mazars Maroc",
      "PWC Maroc"
    ]
  },
  {
    "name": "Alae Ajdid",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte Maroc (Tax)",
      "Maphar (Contr�le de gestion)"
    ]
  },
  {
    "name": "Nada Harchi",
    "school": "ENCG B�ni",
    "admissions": [
      "Mellal KPMG Maroc"
    ]
  },
  {
    "name": "Hafsa Bessam",
    "school": "ENCG Settat",
    "admissions": [
      "Mazars Maroc"
    ]
  },
  {
    "name": "Niama Jidar",
    "school": "ENCG Marrakech",
    "admissions": [
      "PWC France",
      "Deloitte France"
    ]
  },
  {
    "name": "Mohamed Amine Belasri",
    "school": "ENCG Casablanca",
    "admissions": [
      "Fidaroc Grant Thornton (TS)"
    ]
  },
  {
    "name": "Anas Belkharraz",
    "school": "ENCG El Jadida",
    "admissions": [
      "Hdid and Associ�s",
      "Fizazi and Associ�s"
    ]
  },
  {
    "name": "Imane Ahannach",
    "school": "ENCG Casablanca",
    "admissions": [
      "Coopers and Lybrand"
    ]
  },
  {
    "name": "Kenza Ezziany",
    "school": "ENCG Casablanca",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Mazars Maroc",
      "Mazars France",
      "PWC Rtm"
    ]
  },
  {
    "name": "Siham Elansi",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte France",
      "Mazars Maroc",
      "AD Associ�s",
      "Bank Of Africa (Audit)",
      "Soci�t� G�n�rale (Finance)"
    ]
  },
  {
    "name": "Ikrame Chouki",
    "school": "ENCG Settat",
    "admissions": [
      "EY Maroc"
    ]
  },
  {
    "name": "Aya Abou-El-Khebra",
    "school": "ENCG F�s",
    "admissions": [
      "PWC Rtm"
    ]
  },
  {
    "name": "Hamza Bendriss",
    "school": "ENCG F�s",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Nohaila Lakhdar",
    "school": "ENCG Agadir",
    "admissions": [
      "Mazars Maroc"
    ]
  },
  {
    "name": "Ismail Azzouzi",
    "school": "ENCG F�s",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Deloitte Maroc"
    ]
  },
  {
    "name": "Ikram Lakhoitri",
    "school": "ENCG Settat",
    "admissions": [
      "AD Associ�s",
      "Mazars Maroc",
      "KPMG Tax"
    ]
  },
  {
    "name": "Imrane Houmou",
    "school": "ENCG Casablanca",
    "admissions": [
      "Coopers and Lybrand",
      "Deloitte France"
    ]
  },
  {
    "name": "Hiba Fadel",
    "school": "ENCG Settat",
    "admissions": [
      "Mazars Luxembourg",
      "Deloitte France"
    ]
  },
  {
    "name": "Chaimae Ibn Adelmoula Slimani",
    "school": "ENCG F�s",
    "admissions": [
      "Fidaroc Grant Thornton",
      "PWC Rtm"
    ]
  },
  {
    "name": "Nouha Bennis",
    "school": "ENCG K�nitra",
    "admissions": [
      "Mazars France",
      "Mazars Maroc",
      "Deloitte France"
    ]
  },
  {
    "name": "Ayman Halal",
    "school": "ENCG F�s",
    "admissions": [
      "KPMG France",
      "Mazars France",
      "Deloitte France"
    ]
  },
  {
    "name": "Wiam Mokhtari",
    "school": "ENCG Settat",
    "admissions": [
      "Mazars Maroc"
    ]
  },
  {
    "name": "Bilal Oubouaziz",
    "school": "ENCG F�s",
    "admissions": [
      "Deloitte Maroc",
      "PWC Rtm",
      "AD Associ�s"
    ]
  },
  {
    "name": "Kenza Chajidy",
    "school": "ENCG Tanger",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Imane Mehdaoui",
    "school": "ENCG F�s",
    "admissions": [
      "PWC Rtm",
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Kenza Benkirane",
    "school": "ENCG F�s",
    "admissions": [
      "EY Maroc",
      "CDG Invest"
    ]
  },
  {
    "name": "Mosaab Bendahhou",
    "school": "ENCG Mekn�s",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Imane Lamkadmi",
    "school": "ISCAE Casablanca",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Mahmoud Jadil",
    "school": "ENCG Casablanca",
    "admissions": [
      "SM South Capital"
    ]
  },
  {
    "name": "Ikram Hilali",
    "school": "ENCG Agadir",
    "admissions": [
      "Deloitte France",
      "KPMG Maroc"
    ]
  },
  {
    "name": "Rajaa Bacha",
    "school": "ISCAE Casablanca",
    "admissions": [
      "PWC Maroc"
    ]
  },
  {
    "name": "Khaoula El Harhar",
    "school": "ENCG K�nitra",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Jannatte Mourchid",
    "school": "ENCG Settat",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Abdellah Moujtahid",
    "school": "ENCG Casablanca",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Deloitte Maroc"
    ]
  },
  {
    "name": "Hiba Korchi",
    "school": "ENCG Casablanca",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Wissal Barakat",
    "school": "ENCG Settat",
    "admissions": [
      "PWC Maroc",
      "KPMG Maroc"
    ]
  },
  {
    "name": "Mouna Boukhaffa",
    "school": "Metz School of Management",
    "admissions": [
      "KPMG France"
    ]
  },
  {
    "name": "Imane Bounajra",
    "school": "ENCG F�s",
    "admissions": [
      "BDO Maroc",
      "Mazars France"
    ]
  },
  {
    "name": "Khouloud Nouari",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte Maroc"
    ]
  },
  {
    "name": "Fadwa Nafie",
    "school": "ENCG Casablanca",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Fatimaezzahra Amri",
    "school": "ENCG Casablanca",
    "admissions": [
      "Moore Stephens",
      "Deloitte France"
    ]
  },
  {
    "name": "Meriem El Mir",
    "school": "ENCG Casablanca",
    "admissions": [
      "AD Associ�s",
      "Deloitte France"
    ]
  },
  {
    "name": "Kaltoum El Fadili",
    "school": "ENCG F�s",
    "admissions": [
      "Deloitte France",
      "Hedge Consulting"
    ]
  },
  {
    "name": "Amjad Tarriko",
    "school": "ENCG K�nitra",
    "admissions": [
      "E2B Consulting",
      "Fizazi and Associ�s",
      "CIH (Audit et Inspection)"
    ]
  },
  {
    "name": "Ihssane Ait El Madane",
    "school": "ENCG Tanger",
    "admissions": [
      "Crowe Maroc"
    ]
  },
  {
    "name": "Imane Jabrane",
    "school": "ENCG Casablanca",
    "admissions": [
      "EY Maroc",
      "Expact Partners",
      "Fidaroc Grant Thornton",
      "Moore Stephens"
    ]
  },
  {
    "name": "Hamza Zouhri",
    "school": "ENCG F�s",
    "admissions": [
      "BNP Paribas"
    ]
  },
  {
    "name": "Arwa Oudouche",
    "school": "ENCG Agadir",
    "admissions": [
      "PWC France"
    ]
  },
  {
    "name": "Fatima Zahra El Gharbali",
    "school": "ENCG F�s",
    "admissions": [
      "Deloitte France"
    ]
  },
  {
    "name": "Fatima Ezzahra Ghanam",
    "school": "ENCG El Jadida",
    "admissions": [
      "Fidaroc Grant Thornton",
      "AD Associ�s"
    ]
  },
  {
    "name": "Ilyass Elidrissi Essebtey",
    "school": "ENCG Casablanca",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Mazars France"
    ]
  },
  {
    "name": "Rihab Belqis",
    "school": "ISCAE Rabat",
    "admissions": [
      "Mazars Maroc",
      "AD Associ�s",
      "PWC Rtm",
      "Mazars France"
    ]
  },
  {
    "name": "Abderrahmane Khal",
    "school": "ENCG El Jadida",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Zakariae El Azzouzi",
    "school": "FSJES",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Hiba Darmich",
    "school": "ENCG Settat",
    "admissions": [
      "KPMG Maroc",
      "BDO Maroc",
      "EY Maroc",
      "KPMG France"
    ]
  },
  {
    "name": "Houda Derrabi",
    "school": "ENCG Casablanca",
    "admissions": [
      "Mazars France",
      "KPMG France",
      "EY Maroc"
    ]
  },
  {
    "name": "Yassamine Bahha",
    "school": "ENCG K�nitra",
    "admissions": [
      "EY Maroc"
    ]
  },
  {
    "name": "Salma Chahbeddine",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte France",
      "Cr�dit Du Maroc (Finance)",
      "Soci�t� G�n�rale (Audit)"
    ]
  },
  {
    "name": "Nouhaila Bouzalmad",
    "school": "ENCG Casablanca",
    "admissions": [
      "Maroclear",
      "RMA"
    ]
  },
  {
    "name": "Wissal El Idrissi",
    "school": "ENCG F�s",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Fatima Zahra El Bouzidi",
    "school": "ENCG Tanger",
    "admissions": [
      "Mazars Maroc",
      "BDO Maroc",
      "AD Associ�s"
    ]
  },
  {
    "name": "Imane El Azzazi",
    "school": "ENCG K�nitra",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Douaa Zahi",
    "school": "ENCG Casablanca",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Othmane Fakhri",
    "school": "ENCG Casablanca",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Deloitte Maroc"
    ]
  },
  {
    "name": "Kawthar Bouhfid",
    "school": "ENCG K�nitra",
    "admissions": [
      "Fidaroc Grant Thornton",
      "KPMG Maroc",
      "PWC Maroc"
    ]
  },
  {
    "name": "Youssef Kejji",
    "school": "ENCG Settat",
    "admissions": [
      "Fidaroc Grant Thornton",
      "PWC France"
    ]
  },
  {
    "name": "Hamza Naji",
    "school": "ENCG K�nitra",
    "admissions": [
      "Deloitte Maroc"
    ]
  },
  {
    "name": "Nouhaila Ezriouli",
    "school": "ENCG K�nitra",
    "admissions": [
      "AD Associ�s",
      "PWC France"
    ]
  },
  {
    "name": "Mariyem Doddouh",
    "school": "ENCG Casablanca",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Rime Sdiri",
    "school": "ENCG F�s",
    "admissions": [
      "Mazars Maroc",
      "EY Maroc"
    ]
  },
  {
    "name": "Raouaa El Fikri",
    "school": "ENCG Agadir",
    "admissions": [
      "PWC Rtm",
      "Deloitte France"
    ]
  },
  {
    "name": "Mohamed Amine Dghoughi",
    "school": "ENCG K�nitra",
    "admissions": [
      "Coopers and Lybrand",
      "PWC Rtm"
    ]
  },
  {
    "name": "Hanaa Benlmekki",
    "school": "ENCG Settat",
    "admissions": [
      "EY Maroc",
      "Deloitte France"
    ]
  },
  {
    "name": "Wissal Benhamou",
    "school": "ENCG Mekn�s",
    "admissions": [
      "Minist�re des Affaires Etrang�res"
    ]
  },
  {
    "name": "Salma Bakry",
    "school": "ENCG F�s",
    "admissions": [
      "EY Maroc",
      "PWC Maroc"
    ]
  },
  {
    "name": "Mohamed Amine Glioui",
    "school": "ENCG F�s",
    "admissions": [
      "Mazars France",
      "KPMG France",
      "Deloitte France"
    ]
  },
  {
    "name": "Amina Elassali",
    "school": "ENCG K�nitra",
    "admissions": [
      "SM South Capital",
      "Mazars France",
      "Upsilon Consulting"
    ]
  },
  {
    "name": "Fatima Ezzahrae Bahra",
    "school": "ENCG F�s",
    "admissions": [
      "Deloitte France"
    ]
  },
  {
    "name": "Akram Erraysse",
    "school": "ENCG B�ni",
    "admissions": [
      "Mellal Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Mohamed Ayman Sarih",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte France",
      "PWC France"
    ]
  },
  {
    "name": "Mariem Toufga",
    "school": "ISCAE Casablanca",
    "admissions": [
      "Deloitte Maroc"
    ]
  },
  {
    "name": "Rania Eddassi",
    "school": "ENCG K�nitra",
    "admissions": [
      "Mazars France",
      "KPMG France"
    ]
  },
  {
    "name": "Hiba El Ouardi",
    "school": "ENCG Agadir",
    "admissions": [
      "Deloitte France",
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Mehdi El Alami",
    "school": "ENCG Casablanca",
    "admissions": [
      "Mazars France",
      "KPMG France",
      "PWC Rtm",
      "KPMG Maroc"
    ]
  },
  {
    "name": "Mohammed Sassioui",
    "school": "ENCG F�s",
    "admissions": [
      "PWC France",
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Bilal El Merini",
    "school": "ENCG Tanger",
    "admissions": [
      "Deloitte Maroc"
    ]
  },
  {
    "name": "Salma El Qacimy",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte Maroc",
      "Mazars France",
      "AD Associ�s",
      "Deloitte France"
    ]
  },
  {
    "name": "Mohamed Gueroini",
    "school": "ENCG F�s",
    "admissions": [
      "Deloitte Maroc",
      "PWC Rtm",
      "Mazars Tax"
    ]
  },
  {
    "name": "Yasmine Jebli",
    "school": "ENCG Tanger",
    "admissions": [
      "Mazars Maroc"
    ]
  },
  {
    "name": "Safae Hammal",
    "school": "ENCG F�s",
    "admissions": [
      "PWC Rtm",
      "AD Associ�s",
      "Fidaroc Grant Thornton",
      "Deloitte France",
      "PWC France"
    ]
  },
  {
    "name": "Oussama Chadli",
    "school": "FSJES",
    "admissions": [
      "TY Consulting",
      "Hdid and Associ�s"
    ]
  },
  {
    "name": "Ilham Sdoud",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte France",
      "Deloitte Maroc"
    ]
  },
  {
    "name": "Chaime Ed-dane",
    "school": "ENCG Agadir",
    "admissions": [
      "Mazars Maroc"
    ]
  },
  {
    "name": "Imane Rguig",
    "school": "ENCG Settat",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Yassin Ouaraouch",
    "school": "ENCG Tanger",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Khawla Echine",
    "school": "ENCG Agadir",
    "admissions": [
      "Fidaroc Grant Thornton",
      "AD Associ�s"
    ]
  },
  {
    "name": "Kawtar Reggad",
    "school": "ENCG Casablanca",
    "admissions": [
      "Andersen Global",
      "RSM Morocco",
      "Hdid and Associ�s",
      "Banque Populaire (Audit)",
      "BDO Maroc"
    ]
  },
  {
    "name": "Wissal El Heloui",
    "school": "ENCG Casablanca",
    "admissions": [
      "BDO Maroc",
      "KPMG France"
    ]
  },
  {
    "name": "Aya Belhassan Alaoui",
    "school": "ENCG Settat",
    "admissions": [
      "Deloitte France"
    ]
  },
  {
    "name": "Driss Aouina",
    "school": "ENCG Casablanca",
    "admissions": [
      "Mazars France",
      "KPMG France"
    ]
  },
  {
    "name": "Kawtar El Houari",
    "school": "ENCG F�s",
    "admissions": [
      "Deloitte France"
    ]
  },
  {
    "name": "Marwa Istiadad",
    "school": "ENCG Casablanca",
    "admissions": [
      "Coopers and Lybrand"
    ]
  },
  {
    "name": "Walid Rizek",
    "school": "ENCG Casablanca",
    "admissions": [
      "Hdid and Associ�s",
      "AD Associ�s",
      "Expact Partners",
      "Deloitte France"
    ]
  },
  {
    "name": "Niama Firdaous",
    "school": "ENCG K�nitra",
    "admissions": [
      "Coopers and Lybrand"
    ]
  },
  {
    "name": "Nassima Lakim",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte France"
    ]
  },
  {
    "name": "Imane Chetoui",
    "school": "ENCG El Jadida",
    "admissions": [
      "Deloitte France"
    ]
  },
  {
    "name": "Fatima Ezzahra Souhair",
    "school": "ENCG Oujda",
    "admissions": [
      "KPMG France",
      "Vinci Energy",
      "Deloitte France"
    ]
  },
  {
    "name": "Ibtissam Sraidi",
    "school": "ENCG Casablanca",
    "admissions": [
      "SM South Capital"
    ]
  },
  {
    "name": "Rania Areski",
    "school": "ENCG Settat",
    "admissions": [
      "BDO Maroc",
      "EY Maroc"
    ]
  },
  {
    "name": "Inas Aboulouafa",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte Maroc"
    ]
  },
  {
    "name": "Nihad Fouche",
    "school": "ENCG Settat",
    "admissions": [
      "EY Maroc"
    ]
  },
  {
    "name": "Hiba Salouane",
    "school": "ENCG K�nitra",
    "admissions": [
      "Deloitte France",
      "Mazars Maroc"
    ]
  },
  {
    "name": "Majda Laglil",
    "school": "ENCG Oujda",
    "admissions": [
      "Fizazi and Associ�s",
      "PWC France"
    ]
  },
  {
    "name": "Nour El Houda Aboulayt",
    "school": "ENCG Settat",
    "admissions": [
      "EY Maroc"
    ]
  },
  {
    "name": "Houda Khadir",
    "school": "ENCG Settat",
    "admissions": [
      "Fidaroc Grant Thornton",
      "PWC Maroc"
    ]
  },
  {
    "name": "Hind Ismaili Alaoui",
    "school": "ENCG F�s",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Noura Aboulkacem",
    "school": "ENCG Casablanca",
    "admissions": [
      "AD Associ�s",
      "Deloitte France"
    ]
  },
  {
    "name": "Mohamed Idhah",
    "school": "ENCG Agadir",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Jalal Adili",
    "school": "ENCG K�nitra",
    "admissions": [
      "Coopers and Lybrand",
      "Moore Stephens"
    ]
  },
  {
    "name": "Samia M�ghari",
    "school": "ENCG Settat",
    "admissions": [
      "BDO Maroc"
    ]
  },
  {
    "name": "Maroua Lamlih",
    "school": "ENCG Settat",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Ahlam Wakrim",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte France",
      "Fidaroc Grant Thornton",
      "Coopers and Lybrand"
    ]
  },
  {
    "name": "Hajar Hammioui",
    "school": "ENCG K�nitra",
    "admissions": [
      "Deloitte France"
    ]
  },
  {
    "name": "Khalil Fekkali",
    "school": "ENCG F�s",
    "admissions": [
      "Deloitte France",
      "Mazars Luxembourg"
    ]
  },
  {
    "name": "Ghita El Jirari",
    "school": "ENCG Settat",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Deloitte France",
      "Expact Partners"
    ]
  },
  {
    "name": "Houda Boukacha",
    "school": "ENCG F�s",
    "admissions": [
      "PWC Rtm",
      "BDO Maroc"
    ]
  },
  {
    "name": "Amine Dardikh",
    "school": "ENCG K�nitra",
    "admissions": [
      "Mazars France",
      "Mazars Luxembourg"
    ]
  },
  {
    "name": "Hajar El Amri",
    "school": "ENCG Tanger",
    "admissions": [
      "BDO Maroc"
    ]
  },
  {
    "name": "Illias Benala",
    "school": "ENCG Settat",
    "admissions": [
      "PWC Rtm"
    ]
  },
  {
    "name": "Hamza Kchit",
    "school": "ENCG F�s",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Deloitte Maroc"
    ]
  },
  {
    "name": "Sami Ed-damiri",
    "school": "ENCG K�nitra",
    "admissions": [
      "KPMG France"
    ]
  },
  {
    "name": "Manal Skaita",
    "school": "ENCG Tanger",
    "admissions": [
      "Deloitte France"
    ]
  },
  {
    "name": "Maroua El Moualed",
    "school": "ENCG Casablanca",
    "admissions": [
      "Coopers and Lybrand"
    ]
  },
  {
    "name": "Issmail Maniyani",
    "school": "ENCG Settat",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Mazars France"
    ]
  },
  {
    "name": "Narimane Ahnin",
    "school": "ENCG Casablanca",
    "admissions": [
      "Coopers and Lybrand"
    ]
  },
  {
    "name": "Imane Bensalah",
    "school": "ENCG Mekn�s",
    "admissions": [
      "KPMG France",
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Mehdi Zaidan",
    "school": "ENCG Tanger",
    "admissions": [
      "Viseo (Consultant SAP FI/CO)"
    ]
  },
  {
    "name": "Hafsa Belabbes",
    "school": "ENCG K�nitra",
    "admissions": [
      "Deloitte France"
    ]
  },
  {
    "name": "Manal Ottmani",
    "school": "ENCG F�s",
    "admissions": [
      "Mazars Maroc"
    ]
  },
  {
    "name": "Fatima Ezzahra Tellabi",
    "school": "ENCG Settat",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Deloitte France",
      "AD Associ�s",
      "Hdid and Associ�s"
    ]
  },
  {
    "name": "Salah Eddine Enil",
    "school": "ENCG F�s",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Mazars France"
    ]
  },
  {
    "name": "Hiba Bouffi",
    "school": "ENCG Casablanca",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Wiam Ikhlafen",
    "school": "ENCG Oujda",
    "admissions": [
      "PWC France"
    ]
  },
  {
    "name": "Yasmine Racifi",
    "school": "ISCAE Rabat",
    "admissions": [
      "AD Associ�s",
      "Mazars Maroc"
    ]
  },
  {
    "name": "Ikram Agourar",
    "school": "ENCG Casablanca",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Coopers and Lybrand"
    ]
  },
  {
    "name": "Jihane Mrabbi",
    "school": "FSJES",
    "admissions": [
      "ML Experts"
    ]
  },
  {
    "name": "Adam Idriss Zamzami",
    "school": "ENCG Casablanca",
    "admissions": [
      "Mazars Maroc",
      "Deloitte France"
    ]
  },
  {
    "name": "Maroua Benslimane",
    "school": "ENCG Mekn�s",
    "admissions": [
      "Fidaroc Grant Thornton",
      "KPMG Maroc"
    ]
  },
  {
    "name": "Yasmine Rezzouq",
    "school": "ENCG K�nitra",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Deloitte France"
    ]
  },
  {
    "name": "Manal Bensalem",
    "school": "ENCG K�nitra",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Hatim Laasri",
    "school": "ENCG F�s",
    "admissions": [
      "Fidaroc Grant Thornton",
      "BDO Maroc"
    ]
  },
  {
    "name": "Zineb Masrour",
    "school": "ENCG F�s",
    "admissions": [
      "Moore Stephens",
      "Cr�dit Du Maroc (Analyse Cr�dit)"
    ]
  },
  {
    "name": "Badre Merfouk",
    "school": "ENCG El Jadida",
    "admissions": [
      "Maguiri and Associ�s",
      "Upsilon Consulting"
    ]
  },
  {
    "name": "Hiba Ismaili Alaoui",
    "school": "ENCG F�s",
    "admissions": [
      "PWC Maroc"
    ]
  },
  {
    "name": "Maha El Bourimi",
    "school": "ENCG F�s",
    "admissions": [
      "KPMG Maroc"
    ]
  },
  {
    "name": "Fatine Lakhlifi",
    "school": "ENCG Mekn�s",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Houda Blal",
    "school": "ENCG Mekn�s",
    "admissions": [
      "Deloitte France",
      "Fidaroc Grant Thornton",
      "Upsilon Consulting",
      "HLB Maroc Audit"
    ]
  },
  {
    "name": "Chaimae Barki",
    "school": "ENCG Tanger",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Wiam Mnii",
    "school": "ENCG Mekn�s",
    "admissions": [
      "Moore Stephens",
      "Lotus Capital",
      "Bank Of Africa (MandA)",
      "AD Associ�s"
    ]
  },
  {
    "name": "Badr Bouaicha",
    "school": "ENCG El Jadida",
    "admissions": [
      "BDO Maroc",
      "PWC Maroc",
      "Bank Of Africa (Audit)",
      "Cr�dit Du Maroc (Inspection)"
    ]
  },
  {
    "name": "Hiba Boussakouma",
    "school": "ENCG Tanger",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Raouane Bouhanni",
    "school": "ENCG F�s",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Sara Baouz",
    "school": "ENCG K�nitra",
    "admissions": [
      "Coopers and Lybrand"
    ]
  },
  {
    "name": "Rokia Mabrouk",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte Maroc",
      "Moore Stephens",
      "Cr�dit Du Maroc (Finance)",
      "Advance Group"
    ]
  },
  {
    "name": "Ghita Dahbi",
    "school": "ENCG Casablanca",
    "admissions": [
      "AD Associ�s",
      "Saaidi and Associ�s",
      "Deloitte France"
    ]
  },
  {
    "name": "Barae Bentahir",
    "school": "ENCG Settat",
    "admissions": [
      "EY Maroc (Consulting ACR)",
      "Deloitte Maroc (TS)"
    ]
  },
  {
    "name": "Mohamed Ouchaib",
    "school": "ENCG F�s",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Mazars Tax"
    ]
  },
  {
    "name": "Abdelkader Benataya",
    "school": "ENCG Oujda",
    "admissions": [
      "Deloitte France",
      "AD Associ�s"
    ]
  },
  {
    "name": "Oumayma Chahid",
    "school": "ENCG Settat",
    "admissions": [
      "SM South Capital",
      "Hdid and Associ�s"
    ]
  },
  {
    "name": "Souad Harrach",
    "school": "ENCG K�nitra",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Imane Ait Taleb",
    "school": "ENCG K�nitra",
    "admissions": [
      "Deloitte France"
    ]
  },
  {
    "name": "Haitam Mazhar",
    "school": "ISCAE Rabat",
    "admissions": [
      "EY Maroc"
    ]
  },
  {
    "name": "Omar Seqqat",
    "school": "ENCG F�s",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Mazars France",
      "BDO Maroc",
      "Baker Tilly International",
      "Mazars Maroc"
    ]
  },
  {
    "name": "Imane Alaoui",
    "school": "ENCG Settat",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Hind Nmyes",
    "school": "ENCG Mekn�s",
    "admissions": [
      "Mazars Maroc"
    ]
  },
  {
    "name": "Imane Rouigui",
    "school": "ENCG K�nitra",
    "admissions": [
      "RMA Capital",
      "Coopers and Lybrand"
    ]
  },
  {
    "name": "Asmae Bennis",
    "school": "ENCG F�s",
    "admissions": [
      "PWC Rtm",
      "Fidaroc Grant Thornton",
      "Mazars France"
    ]
  },
  {
    "name": "Marwa Samari",
    "school": "ENCG K�nitra",
    "admissions": [
      "Mazars Maroc",
      "Cr�dit Agricole du Maroc (Audit)"
    ]
  },
  {
    "name": "Ghita Bouzidi Idrissi",
    "school": "ENCG F�s",
    "admissions": [
      "KPMG Maroc",
      "EY Maroc",
      "PWC France",
      "Deloitte France"
    ]
  },
  {
    "name": "Meriem Jaloul",
    "school": "ENCG K�nitra",
    "admissions": [
      "Coopers and Lybrand",
      "KPMG Tax",
      "Deloitte France"
    ]
  },
  {
    "name": "Maryame Bouazzaoui",
    "school": "ENCG Agadir",
    "admissions": [
      "PWC Rtm",
      "Deloitte France"
    ]
  },
  {
    "name": "Mohamed Amine El Ouafri",
    "school": "ENCG Marrakech",
    "admissions": [
      "Deloitte France",
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Basma Berdaa",
    "school": "ENCG K�nitra",
    "admissions": [
      "EY Maroc",
      "Mazars France",
      "Deloitte France"
    ]
  },
  {
    "name": "Said Bouhwach",
    "school": "ENCG F�s",
    "admissions": [
      "EY Maroc"
    ]
  },
  {
    "name": "Asmae Adnane",
    "school": "ENCG Settat",
    "admissions": [
      "PWC France"
    ]
  },
  {
    "name": "Mohamed Amine Atouf",
    "school": "ENCG Settat",
    "admissions": [
      "Mazars France",
      "KPMG France",
      "PWC Rtm",
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Mohamed Elkhmissi",
    "school": "Univer. Mohammed V de Rabat",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Nisrine Daghouti",
    "school": "ENCG Settat",
    "admissions": [
      "PWC Maroc",
      "Fidaroc Grant Thornton",
      "PWC France",
      "Deloitte Maroc",
      "Mazars Maroc"
    ]
  },
  {
    "name": "Maroua Benali",
    "school": "ENCG K�nitra",
    "admissions": [
      "PKF Arsilon Luxembourg"
    ]
  },
  {
    "name": "Soufiane Elkaddouri",
    "school": "FSJES",
    "admissions": [
      "BDO Maroc"
    ]
  },
  {
    "name": "Farouk Houssaini",
    "school": "ENCG K�nitra",
    "admissions": [
      "Mazars France",
      "Mazars Maroc"
    ]
  },
  {
    "name": "Botaina Chaoui",
    "school": "ENCG F�s",
    "admissions": [
      "Mazars France",
      "Deloitte Maroc"
    ]
  },
  {
    "name": "Meriam Ammar",
    "school": "ENCG Marrakech",
    "admissions": [
      "BDO Maroc",
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Ayoub Ouakrine",
    "school": "ENCG Settat",
    "admissions": [
      "EY Maroc",
      "Deloitte Maroc",
      "Fidaroc Grant Thornton",
      "AD Associ�s"
    ]
  },
  {
    "name": "Fatima Ouahi",
    "school": "ENCG K�nitra",
    "admissions": [
      "PWC Rtm"
    ]
  },
  {
    "name": "Wiam Karim",
    "school": "ENCG Casablanca",
    "admissions": [
      "PWC France",
      "Deloitte France"
    ]
  },
  {
    "name": "Meryem Tagnaouti Moumnani",
    "school": "ENCG F�s",
    "admissions": [
      "Deloitte Maroc",
      "Deloitte France",
      "Pricewaterhouse"
    ]
  },
  {
    "name": "Zeid Nagbi",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte Maroc",
      "AD Associ�s"
    ]
  },
  {
    "name": "Salma Sefiani",
    "school": "ENCG K�nitra",
    "admissions": [
      "Mazars Maroc"
    ]
  },
  {
    "name": "Yousra Abouniaamane",
    "school": "ENCG Tanger",
    "admissions": [
      "KPMG France",
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Oussama Karzab",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte France",
      "BT Conseil",
      "BLK Consulting",
      "AttijariWafa (Audit Interne)",
      "Moore Stephens"
    ]
  },
  {
    "name": "Achraf Hakim",
    "school": "ENCG El Jadida",
    "admissions": [
      "PWC Rtm",
      "Accor (Audit Interne)",
      "Cr�dit Du Maroc (Audit)",
      "Airbus (Contr�le de gestion)"
    ]
  },
  {
    "name": "Anass Touzani",
    "school": "ENCG Settat",
    "admissions": [
      "Deloitte Maroc",
      "PWC France"
    ]
  },
  {
    "name": "Chahd Bizi",
    "school": "ENCG Settat",
    "admissions": [
      "PWC Rtm"
    ]
  },
  {
    "name": "Zineb Mhaouri",
    "school": "ENCG F�s",
    "admissions": [
      "BDO Maroc"
    ]
  },
  {
    "name": "Ayat Chattioui",
    "school": "HEC Paris",
    "admissions": [
      "Crowe Maroc"
    ]
  },
  {
    "name": "Oumaima Soussi",
    "school": "ENCG Settat",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Mazars France",
      "Hdid and Associ�s",
      "PWC Rtm",
      "Mazars Maroc"
    ]
  },
  {
    "name": "Hafsa Sekkouri",
    "school": "ENCG Tanger",
    "admissions": [
      "Mazars Maroc"
    ]
  },
  {
    "name": "Akram Makhlouk",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte Maroc",
      "Coopers and Lybrand",
      "AD Associ�s",
      "Pricewaterhouse",
      "Mazars France"
    ]
  },
  {
    "name": "Amine Dahmoun",
    "school": "ENCG Settat",
    "admissions": [
      "EY Maroc"
    ]
  },
  {
    "name": "Said Salmi",
    "school": "ENCG Casablanca",
    "admissions": [
      "Mazars Luxembourg",
      "Hdid and Associ�s",
      "Deloitte France"
    ]
  },
  {
    "name": "Amina Abbassi",
    "school": "ISCAE Rabat",
    "admissions": [
      "Mazars France",
      "KPMG Tax",
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Abdelhafid El Hassani",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte France",
      "RSM Morocco",
      "Hdid and Associ�s"
    ]
  },
  {
    "name": "Wiam Ajuin",
    "school": "ENCG Casablanca",
    "admissions": [
      "PWC Rtm",
      "KPMG France"
    ]
  },
  {
    "name": "Ghita Touati",
    "school": "ENCG Settat",
    "admissions": [
      "KPMG Maroc"
    ]
  }
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
  { href: "#resultats", label: "Résultats" },
  { href: "#contact", label: "Contact" },
];
