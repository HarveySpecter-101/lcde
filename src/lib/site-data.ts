import {
  BookOpenCheck,
  FileBarChart,
  Landmark,
  Scale,
  ShieldCheck,
  BadgeCheck,
  ClipboardCheck,
  Leaf,
  SearchCheck,
  Handshake,
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
  edition: "7ᵉ édition (2026)",
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
  { value: 1500, suffix: "+", label: "Profils accompagnés", sub: "depuis 2020" },
  { value: 96, suffix: "%", label: "Taux d'insertion professionnelle", sub: "jusqu'à" },
  { value: 100, suffix: "%", label: "Taux de satisfaction", sub: "revendiqué" },
  { value: 7, suffix: "ᵉ", label: "Édition en cours", sub: "2026" },
] as const;

/* ===== 10 modules (pôles) ===== */
export type Module = {
  id: number;
  icon: LucideIcon;
  title: string;
  short: string;
  bullets: string[];
  description: string;
  skills: string[];
  duration: string;
};

export const MODULES: Module[] = [
  {
    id: 1,
    icon: BookOpenCheck,
    title: "Comptabilité Générale & Consolidation",
    short: "Du bilan individuel aux comptes consolidés.",
    bullets: [
      "Tenue et clôture des comptes",
      "Conversion & consolidation (méthode intégration globale)",
      "Éliminations des opérations intra-groupe",
    ],
    description:
      "Le socle du métier d'expert-comptable : de la tenue courante des comptes jusqu'à l'établissement de bilans consolidés pour les groupes. Vous apprenez à produire des états financiers conformes au CGNC et à présenter des comptes consolidés selon le référentiel marocain.",
    skills: [
      "Bilan & compte de résultat",
      "Tableau de flux de trésorerie",
      "Périmètre de consolidation",
      "Éliminations intra-groupe",
    ],
    duration: "6 semaines",
  },
  {
    id: 2,
    icon: FileBarChart,
    title: "Normes IFRS",
    short: "Référentiel international des états financiers.",
    bullets: [
      "IFRS 15 (revenus), IFRS 16 (contrats de location)",
      "IFRS 9 (instruments financiers)",
      "Présentation de l'IFRS consolidé",
    ],
    description:
      "Maîtrisez le référentiel IFRS utilisé par les groupes cotés et les multinationales. Vous êtes capable de passer les écritures complexes (reconnaissance des revenus, contrats de location, instruments financiers) et de présenter des états financiers IFRS consolidés.",
    skills: [
      "IFRS 15 — revenus",
      "IFRS 16 — contrats de location",
      "IFRS 9 — instruments financiers",
      "Présentation IFRS consolidé",
    ],
    duration: "5 semaines",
  },
  {
    id: 3,
    icon: Landmark,
    title: "Fiscalité Marocaine & Internationale",
    short: "Tax advisory : du CGI aux conventions fiscales.",
    bullets: [
      "IS, IR, TVA et retenues à la source",
      "Contrôle & contentieux fiscal",
      "Fiscalité internationale & prix de transfert",
    ],
    description:
      "Le pôle Tax Advisory : vous apprenez à calculer et optimiser l'IS, l'IR et la TVA au Maroc, à gérer un contrôle fiscal, et à structurer des opérations internationales en maîtrisant les conventions fiscales et les prix de transfert.",
    skills: [
      "IS / IR / TVA",
      "Retenues à la source",
      "Contrôle & contentieux",
      "Prix de transfert",
    ],
    duration: "6 semaines",
  },
  {
    id: 4,
    icon: Scale,
    title: "Droit des Affaires",
    short: "Cadre juridique de l'entreprise et des contrats.",
    bullets: [
      "Droit des sociétés (SA, SARL, SCA)",
      "Contrats commerciaux & sûretés",
      "Fusions, scissions et transformations",
    ],
    description:
      "Le cadre juridique indispensable à tout praticien de la finance d'entreprise. Vous comprenez les statuts juridiques, rédigez et analysez des contrats commerciaux, et maîtrisez les opérations de restructuration (fusions, scissions, apports).",
    skills: [
      "Droit des sociétés",
      "Contrats commerciaux",
      "Sûretés & garanties",
      "Restructurations",
    ],
    duration: "4 semaines",
  },
  {
    id: 5,
    icon: ShieldCheck,
    title: "Audit des États Financiers",
    short: "Démarche d'audit des comptes individuels et consolidés.",
    bullets: [
      "Planification & risques d'audit",
      "Tests de procédures & substantifs",
      "Rapport d'audit (CNCC / ISA)",
    ],
    description:
      "Le cœur du métier d'auditeur. Vous apprenez à planifier une mission, identifier et évaluer les risques, concevoir des tests de procédures et substantifs, et rédiger un rapport d'audit conforme aux normes ISA et CNCC.",
    skills: [
      "Planification d'audit",
      "Évaluation des risques",
      "Tests de procédures",
      "Rapport ISA / CNCC",
    ],
    duration: "6 semaines",
  },
  {
    id: 6,
    icon: BadgeCheck,
    title: "Commissariat aux Comptes",
    short: "Missions légales du commissaire aux comptes.",
    bullets: [
      "Mission de Certification des comptes",
      "SEF & examens limités",
      "Obligations légales & déclarations de fraude",
    ],
    description:
      "La mission légale par excellence. Vous maîtrisez la certification des comptes, les interventions prévues par la loi (SEF, examens limités), et vos obligations de déclaration de fraude et de vigilance.",
    skills: [
      "Certification des comptes",
      "SEF",
      "Examens limités",
      "Alerte & déclaration de fraude",
    ],
    duration: "4 semaines",
  },
  {
    id: 7,
    icon: ClipboardCheck,
    title: "Audit Interne & Contrôle de Gestion",
    short: "Pilotage des risques et de la performance.",
    bullets: [
      "Cadre COSO & cartographie des risques",
      "Cycle d'audit interne",
      "Tableaux de bord & contrôle budgétaire",
    ],
    description:
      "Le pilotage de l'entreprise par les risques et la performance. Vous apprenez à cartographier les risques (COSO), à conduire un cycle d'audit interne, et à concevoir des tableaux de bord de pilotage budgétaire et opérationnel.",
    skills: [
      "Cadre COSO",
      "Cartographie des risques",
      "Cycle d'audit interne",
      "Tableaux de bord",
    ],
    duration: "5 semaines",
  },
  {
    id: 8,
    icon: Leaf,
    title: "Responsabilité Sociétale (RSE)",
    short: "Reporting extra-financiel & développement durable.",
    bullets: [
      "Cadre GRI & CSRD",
      "Bilan carbone & démarche RSE",
      "Reporting de durabilité",
    ],
    description:
      "Le reporting extra-financier devenu incontournable. Vous maîtrisez les cadres GRI et CSRD, conduisez un bilan carbone, et êtes capable de produire un rapport de durabilité conforme aux nouvelles exigences réglementaires européennes.",
    skills: [
      "Cadre GRI",
      "CSRD",
      "Bilan carbone",
      "Reporting de durabilité",
    ],
    duration: "3 semaines",
  },
  {
    id: 9,
    icon: SearchCheck,
    title: "Transaction Services & Due Diligence",
    short: "Analyses financières pré-acquisition.",
    bullets: [
      "Due Diligence financière (vendeur / acheteur)",
      "Quality of Earnings (QoE)",
      "Net debt & working capital analysis",
    ],
  },
  {
    id: 10,
    icon: Handshake,
    title: "M&A, Financial Advisory & Investment Banking",
    short: "Ingénierie financière et opérations de rapprochement.",
    bullets: [
      "Valorisation (DCF, comparables)",
      "Structuration d'opérations M&A",
      "Financial modeling & pitching",
    ],
    description:
      "Le sommet de l'ingénierie financière. Vous apprenez à valoriser une entreprise (DCF, comparables), à structurer une opération de M&A de bout en bout, et à construire des modèles financiers prêts pour le pitch auprès d'investisseurs.",
    skills: [
      "Valorisation DCF",
      "Méthode des comparables",
      "Structuration M&A",
      "Financial modeling",
    ],
    duration: "5 semaines",
  },
];

/* ===== Tools / software taught ===== */
export const TOOLS = [
  { name: "Sage", tag: "Comptabilité" },
  { name: "SAP FI/CO", tag: "ERP Finance" },
  { name: "Odoo", tag: "ERP" },
  { name: "Excel / VBA", tag: "Modélisation" },
  { name: "Power BI", tag: "Data Viz" },
] as const;

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

/* ===== Testimonials ===== */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  tags: string[];
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Formation suivie sur 12 mois avec des cas pratiques réels : audit bancaire, fiscalité marocaine et internationale, IFRS et due diligence. Un grand merci aux fondateurs pour la qualité et le concret du programme — j'ai été recruté en cabinet avec des compétences directement opérationnelles.",
    name: "Yassine B.",
    role: "Consultant — Audit & Finance",
    initials: "YB",
    tags: ["Audit bancaire", "IFRS", "Due Diligence"],
  },
  {
    quote:
      "Formation intensive animée par des praticiens : experts-comptables et consultants seniors. Approche très concrète qui a renforcé mes compétences en audit financier, fiscalité, contrôle de gestion et due diligence. Merci aux intervenants et aux cofondateurs pour leur accompagnement.",
    name: "Salma E.",
    role: "Cabinet d'expertise comptable & d'audit",
    initials: "SE",
    tags: ["Audit financier", "Fiscalité", "Contrôle de gestion"],
  },
  {
    quote:
      "L'écart entre la théorie de la fac et la réalité des dossiers a disparu. Les cas traités sont ceux qu'on retrouve en mission. Opérationnel dès le premier jour, c'est exactement ça.",
    name: "Anas T.",
    role: "Junior — Transaction Services",
    initials: "AT",
    tags: ["M&A", "Modeling", "QoE"],
  },
  {
    quote:
      "Je suis arrivée en cherchant un complément et je suis repartie avec une vraie méthodologie d'auditeur. Les retours des intervenants sur mes travaux étaient d'un niveau exigeant.",
    name: "Imane K.",
    role: "Auditrice interne",
    initials: "IK",
    tags: ["Audit interne", "COSO", "Reporting"],
  },
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
  { href: "#apropos", label: "À propos" },
  { href: "#temoignages", label: "Témoignages" },
  { href: "#entreprises", label: "Entreprises" },
  { href: "#contact", label: "Contact" },
];
