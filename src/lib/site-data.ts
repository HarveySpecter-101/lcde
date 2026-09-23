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

export const SUCCESS_STORIES: SuccessStory[] = s s S t o r y   {  
     n a m e :   s t r i n g ;  
     s c h o o l :   s t r i n g ;  
     a d m i s s i o n s :   s t r i n g [ ] ;  
 }  
  
 e x p o r t   c o n s t   S U C C E S S _ S T O R I E S :   S u c c e s s S t o r y [ ]   =   [  
     {  
         " n a m e " :   " L a i l a   B o u a l i " ,  
         " s c h o o l " :   " E N C G   T a n g e r " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " S a l m a   D o u t a r " ,  
         " s c h o o l " :   " E N C G   M a r r a k e c h " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " M o h a m e d   M o n c e f   A k r a " ,  
         " s c h o o l " :   " I S C A E   R a b a t " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " M a r y a m e   E l   O m a r i " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " M e r y e m e   E l   H o u d a i b i " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " N a d a   H a n i " ,  
         " s c h o o l " :   " I S C A E   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e " ,  
             " A D   A s s o c i � %� s " ,  
             " E Y   M a r o c " ,  
             " M a z a r s   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " M o h a m m e d   E r r a m d a n i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " K P M G   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " N i r m i n e   B e r r a d a " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " N i s r i n e   B e n b i h i " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   M a r o c " ,  
             " P W C   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " A l a e   A j d i d " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   M a r o c   ( T a x ) " ,  
             " M a p h a r   ( C o n t r � %� l e   d e   g e s t i o n ) "  
         ]  
     } ,  
     {  
         " n a m e " :   " N a d a   H a r c h i " ,  
         " s c h o o l " :   " E N C G   B � %� n i " ,  
         " a d m i s s i o n s " :   [  
             " M e l l a l   K P M G   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " H a f s a   B e s s a m " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " N i a m a   J i d a r " ,  
         " s c h o o l " :   " E N C G   M a r r a k e c h " ,  
         " a d m i s s i o n s " :   [  
             " P W C   F r a n c e " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M o h a m e d   A m i n e   B e l a s r i " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n   ( T S ) "  
         ]  
     } ,  
     {  
         " n a m e " :   " A n a s   B e l k h a r r a z " ,  
         " s c h o o l " :   " E N C G   E l   J a d i d a " ,  
         " a d m i s s i o n s " :   [  
             " H d i d   a n d   A s s o c i � %� s " ,  
             " F i z a z i   a n d   A s s o c i � %� s "  
         ]  
     } ,  
     {  
         " n a m e " :   " I m a n e   A h a n n a c h " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " C o o p e r s   a n d   L y b r a n d "  
         ]  
     } ,  
     {  
         " n a m e " :   " K e n z a   E z z i a n y " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " M a z a r s   M a r o c " ,  
             " M a z a r s   F r a n c e " ,  
             " P W C   R t m "  
         ]  
     } ,  
     {  
         " n a m e " :   " S i h a m   E l a n s i " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e " ,  
             " M a z a r s   M a r o c " ,  
             " A D   A s s o c i � %� s " ,  
             " B a n k   O f   A f r i c a   ( A u d i t ) " ,  
             " S o c i � %� t � %�   G � %� n � %� r a l e   ( F i n a n c e ) "  
         ]  
     } ,  
     {  
         " n a m e " :   " I k r a m e   C h o u k i " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " E Y   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " A y a   A b o u - E l - K h e b r a " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " P W C   R t m "  
         ]  
     } ,  
     {  
         " n a m e " :   " H a m z a   B e n d r i s s " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " N o h a i l a   L a k h d a r " ,  
         " s c h o o l " :   " E N C G   A g a d i r " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " I s m a i l   A z z o u z i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " D e l o i t t e   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " I k r a m   L a k h o i t r i " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " A D   A s s o c i � %� s " ,  
             " M a z a r s   M a r o c " ,  
             " K P M G   T a x "  
         ]  
     } ,  
     {  
         " n a m e " :   " I m r a n e   H o u m o u " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " C o o p e r s   a n d   L y b r a n d " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " H i b a   F a d e l " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   L u x e m b o u r g " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " C h a i m a e   I b n   A d e l m o u l a   S l i m a n i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " P W C   R t m "  
         ]  
     } ,  
     {  
         " n a m e " :   " N o u h a   B e n n i s " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e " ,  
             " M a z a r s   M a r o c " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " A y m a n   H a l a l " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " K P M G   F r a n c e " ,  
             " M a z a r s   F r a n c e " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " W i a m   M o k h t a r i " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " B i l a l   O u b o u a z i z " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   M a r o c " ,  
             " P W C   R t m " ,  
             " A D   A s s o c i � %� s "  
         ]  
     } ,  
     {  
         " n a m e " :   " K e n z a   C h a j i d y " ,  
         " s c h o o l " :   " E N C G   T a n g e r " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " I m a n e   M e h d a o u i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " P W C   R t m " ,  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " K e n z a   B e n k i r a n e " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " E Y   M a r o c " ,  
             " C D G   I n v e s t "  
         ]  
     } ,  
     {  
         " n a m e " :   " M o s a a b   B e n d a h h o u " ,  
         " s c h o o l " :   " E N C G   M e k n � %� s " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " I m a n e   L a m k a d m i " ,  
         " s c h o o l " :   " I S C A E   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M a h m o u d   J a d i l " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " S M   S o u t h   C a p i t a l "  
         ]  
     } ,  
     {  
         " n a m e " :   " I k r a m   H i l a l i " ,  
         " s c h o o l " :   " E N C G   A g a d i r " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e " ,  
             " K P M G   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " R a j a a   B a c h a " ,  
         " s c h o o l " :   " I S C A E   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " P W C   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " K h a o u l a   E l   H a r h a r " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " J a n n a t t e   M o u r c h i d " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " A b d e l l a h   M o u j t a h i d " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " D e l o i t t e   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " H i b a   K o r c h i " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " W i s s a l   B a r a k a t " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " P W C   M a r o c " ,  
             " K P M G   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " M o u n a   B o u k h a f f a " ,  
         " s c h o o l " :   " M e t z   S c h o o l   o f   M a n a g e m e n t " ,  
         " a d m i s s i o n s " :   [  
             " K P M G   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " I m a n e   B o u n a j r a " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " B D O   M a r o c " ,  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " K h o u l o u d   N o u a r i " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " F a d w a   N a f i e " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " F a t i m a e z z a h r a   A m r i " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " M o o r e   S t e p h e n s " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M e r i e m   E l   M i r " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " A D   A s s o c i � %� s " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " K a l t o u m   E l   F a d i l i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e " ,  
             " H e d g e   C o n s u l t i n g "  
         ]  
     } ,  
     {  
         " n a m e " :   " A m j a d   T a r r i k o " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " E 2 B   C o n s u l t i n g " ,  
             " F i z a z i   a n d   A s s o c i � %� s " ,  
             " C I H   ( A u d i t   e t   I n s p e c t i o n ) "  
         ]  
     } ,  
     {  
         " n a m e " :   " I h s s a n e   A i t   E l   M a d a n e " ,  
         " s c h o o l " :   " E N C G   T a n g e r " ,  
         " a d m i s s i o n s " :   [  
             " C r o w e   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " I m a n e   J a b r a n e " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " E Y   M a r o c " ,  
             " E x p a c t   P a r t n e r s " ,  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " M o o r e   S t e p h e n s "  
         ]  
     } ,  
     {  
         " n a m e " :   " H a m z a   Z o u h r i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " B N P   P a r i b a s "  
         ]  
     } ,  
     {  
         " n a m e " :   " A r w a   O u d o u c h e " ,  
         " s c h o o l " :   " E N C G   A g a d i r " ,  
         " a d m i s s i o n s " :   [  
             " P W C   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " F a t i m a   Z a h r a   E l   G h a r b a l i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " F a t i m a   E z z a h r a   G h a n a m " ,  
         " s c h o o l " :   " E N C G   E l   J a d i d a " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " A D   A s s o c i � %� s "  
         ]  
     } ,  
     {  
         " n a m e " :   " I l y a s s   E l i d r i s s i   E s s e b t e y " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " R i h a b   B e l q i s " ,  
         " s c h o o l " :   " I S C A E   R a b a t " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   M a r o c " ,  
             " A D   A s s o c i � %� s " ,  
             " P W C   R t m " ,  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " A b d e r r a h m a n e   K h a l " ,  
         " s c h o o l " :   " E N C G   E l   J a d i d a " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " Z a k a r i a e   E l   A z z o u z i " ,  
         " s c h o o l " :   " F S J E S " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " H i b a   D a r m i c h " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " K P M G   M a r o c " ,  
             " B D O   M a r o c " ,  
             " E Y   M a r o c " ,  
             " K P M G   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " H o u d a   D e r r a b i " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e " ,  
             " K P M G   F r a n c e " ,  
             " E Y   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " Y a s s a m i n e   B a h h a " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " E Y   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " S a l m a   C h a h b e d d i n e " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e " ,  
             " C r � %� d i t   D u   M a r o c   ( F i n a n c e ) " ,  
             " S o c i � %� t � %�   G � %� n � %� r a l e   ( A u d i t ) "  
         ]  
     } ,  
     {  
         " n a m e " :   " N o u h a i l a   B o u z a l m a d " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " M a r o c l e a r " ,  
             " R M A "  
         ]  
     } ,  
     {  
         " n a m e " :   " W i s s a l   E l   I d r i s s i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " F a t i m a   Z a h r a   E l   B o u z i d i " ,  
         " s c h o o l " :   " E N C G   T a n g e r " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   M a r o c " ,  
             " B D O   M a r o c " ,  
             " A D   A s s o c i � %� s "  
         ]  
     } ,  
     {  
         " n a m e " :   " I m a n e   E l   A z z a z i " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " D o u a a   Z a h i " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " O t h m a n e   F a k h r i " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " D e l o i t t e   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " K a w t h a r   B o u h f i d " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " K P M G   M a r o c " ,  
             " P W C   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " Y o u s s e f   K e j j i " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " P W C   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " H a m z a   N a j i " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " N o u h a i l a   E z r i o u l i " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " A D   A s s o c i � %� s " ,  
             " P W C   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M a r i y e m   D o d d o u h " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " R i m e   S d i r i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   M a r o c " ,  
             " E Y   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " R a o u a a   E l   F i k r i " ,  
         " s c h o o l " :   " E N C G   A g a d i r " ,  
         " a d m i s s i o n s " :   [  
             " P W C   R t m " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M o h a m e d   A m i n e   D g h o u g h i " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " C o o p e r s   a n d   L y b r a n d " ,  
             " P W C   R t m "  
         ]  
     } ,  
     {  
         " n a m e " :   " H a n a a   B e n l m e k k i " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " E Y   M a r o c " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " W i s s a l   B e n h a m o u " ,  
         " s c h o o l " :   " E N C G   M e k n � %� s " ,  
         " a d m i s s i o n s " :   [  
             " M i n i s t � %� r e   d e s   A f f a i r e s   E t r a n g � %� r e s "  
         ]  
     } ,  
     {  
         " n a m e " :   " S a l m a   B a k r y " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " E Y   M a r o c " ,  
             " P W C   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " M o h a m e d   A m i n e   G l i o u i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e " ,  
             " K P M G   F r a n c e " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " A m i n a   E l a s s a l i " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " S M   S o u t h   C a p i t a l " ,  
             " M a z a r s   F r a n c e " ,  
             " U p s i l o n   C o n s u l t i n g "  
         ]  
     } ,  
     {  
         " n a m e " :   " F a t i m a   E z z a h r a e   B a h r a " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " A k r a m   E r r a y s s e " ,  
         " s c h o o l " :   " E N C G   B � %� n i " ,  
         " a d m i s s i o n s " :   [  
             " M e l l a l   F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " M o h a m e d   A y m a n   S a r i h " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e " ,  
             " P W C   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M a r i e m   T o u f g a " ,  
         " s c h o o l " :   " I S C A E   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " R a n i a   E d d a s s i " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e " ,  
             " K P M G   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " H i b a   E l   O u a r d i " ,  
         " s c h o o l " :   " E N C G   A g a d i r " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e " ,  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " M e h d i   E l   A l a m i " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e " ,  
             " K P M G   F r a n c e " ,  
             " P W C   R t m " ,  
             " K P M G   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " M o h a m m e d   S a s s i o u i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " P W C   F r a n c e " ,  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " B i l a l   E l   M e r i n i " ,  
         " s c h o o l " :   " E N C G   T a n g e r " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " S a l m a   E l   Q a c i m y " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   M a r o c " ,  
             " M a z a r s   F r a n c e " ,  
             " A D   A s s o c i � %� s " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M o h a m e d   G u e r o i n i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   M a r o c " ,  
             " P W C   R t m " ,  
             " M a z a r s   T a x "  
         ]  
     } ,  
     {  
         " n a m e " :   " Y a s m i n e   J e b l i " ,  
         " s c h o o l " :   " E N C G   T a n g e r " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " S a f a e   H a m m a l " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " P W C   R t m " ,  
             " A D   A s s o c i � %� s " ,  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " D e l o i t t e   F r a n c e " ,  
             " P W C   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " O u s s a m a   C h a d l i " ,  
         " s c h o o l " :   " F S J E S " ,  
         " a d m i s s i o n s " :   [  
             " T Y   C o n s u l t i n g " ,  
             " H d i d   a n d   A s s o c i � %� s "  
         ]  
     } ,  
     {  
         " n a m e " :   " I l h a m   S d o u d " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e " ,  
             " D e l o i t t e   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " C h a i m e   E d - d a n e " ,  
         " s c h o o l " :   " E N C G   A g a d i r " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " I m a n e   R g u i g " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " Y a s s i n   O u a r a o u c h " ,  
         " s c h o o l " :   " E N C G   T a n g e r " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " K h a w l a   E c h i n e " ,  
         " s c h o o l " :   " E N C G   A g a d i r " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " A D   A s s o c i � %� s "  
         ]  
     } ,  
     {  
         " n a m e " :   " K a w t a r   R e g g a d " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " A n d e r s e n   G l o b a l " ,  
             " R S M   M o r o c c o " ,  
             " H d i d   a n d   A s s o c i � %� s " ,  
             " B a n q u e   P o p u l a i r e   ( A u d i t ) " ,  
             " B D O   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " W i s s a l   E l   H e l o u i " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " B D O   M a r o c " ,  
             " K P M G   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " A y a   B e l h a s s a n   A l a o u i " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " D r i s s   A o u i n a " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e " ,  
             " K P M G   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " K a w t a r   E l   H o u a r i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M a r w a   I s t i a d a d " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " C o o p e r s   a n d   L y b r a n d "  
         ]  
     } ,  
     {  
         " n a m e " :   " W a l i d   R i z e k " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " H d i d   a n d   A s s o c i � %� s " ,  
             " A D   A s s o c i � %� s " ,  
             " E x p a c t   P a r t n e r s " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " N i a m a   F i r d a o u s " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " C o o p e r s   a n d   L y b r a n d "  
         ]  
     } ,  
     {  
         " n a m e " :   " N a s s i m a   L a k i m " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " I m a n e   C h e t o u i " ,  
         " s c h o o l " :   " E N C G   E l   J a d i d a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " F a t i m a   E z z a h r a   S o u h a i r " ,  
         " s c h o o l " :   " E N C G   O u j d a " ,  
         " a d m i s s i o n s " :   [  
             " K P M G   F r a n c e " ,  
             " V i n c i   E n e r g y " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " I b t i s s a m   S r a i d i " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " S M   S o u t h   C a p i t a l "  
         ]  
     } ,  
     {  
         " n a m e " :   " R a n i a   A r e s k i " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " B D O   M a r o c " ,  
             " E Y   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " I n a s   A b o u l o u a f a " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " N i h a d   F o u c h e " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " E Y   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " H i b a   S a l o u a n e " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e " ,  
             " M a z a r s   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " M a j d a   L a g l i l " ,  
         " s c h o o l " :   " E N C G   O u j d a " ,  
         " a d m i s s i o n s " :   [  
             " F i z a z i   a n d   A s s o c i � %� s " ,  
             " P W C   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " N o u r   E l   H o u d a   A b o u l a y t " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " E Y   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " H o u d a   K h a d i r " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " P W C   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " H i n d   I s m a i l i   A l a o u i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " N o u r a   A b o u l k a c e m " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " A D   A s s o c i � %� s " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M o h a m e d   I d h a h " ,  
         " s c h o o l " :   " E N C G   A g a d i r " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " J a l a l   A d i l i " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " C o o p e r s   a n d   L y b r a n d " ,  
             " M o o r e   S t e p h e n s "  
         ]  
     } ,  
     {  
         " n a m e " :   " S a m i a   M � %� g h a r i " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " B D O   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " M a r o u a   L a m l i h " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " A h l a m   W a k r i m " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e " ,  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " C o o p e r s   a n d   L y b r a n d "  
         ]  
     } ,  
     {  
         " n a m e " :   " H a j a r   H a m m i o u i " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " K h a l i l   F e k k a l i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e " ,  
             " M a z a r s   L u x e m b o u r g "  
         ]  
     } ,  
     {  
         " n a m e " :   " G h i t a   E l   J i r a r i " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " D e l o i t t e   F r a n c e " ,  
             " E x p a c t   P a r t n e r s "  
         ]  
     } ,  
     {  
         " n a m e " :   " H o u d a   B o u k a c h a " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " P W C   R t m " ,  
             " B D O   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " A m i n e   D a r d i k h " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e " ,  
             " M a z a r s   L u x e m b o u r g "  
         ]  
     } ,  
     {  
         " n a m e " :   " H a j a r   E l   A m r i " ,  
         " s c h o o l " :   " E N C G   T a n g e r " ,  
         " a d m i s s i o n s " :   [  
             " B D O   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " I l l i a s   B e n a l a " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " P W C   R t m "  
         ]  
     } ,  
     {  
         " n a m e " :   " H a m z a   K c h i t " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " D e l o i t t e   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " S a m i   E d - d a m i r i " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " K P M G   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M a n a l   S k a i t a " ,  
         " s c h o o l " :   " E N C G   T a n g e r " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M a r o u a   E l   M o u a l e d " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " C o o p e r s   a n d   L y b r a n d "  
         ]  
     } ,  
     {  
         " n a m e " :   " I s s m a i l   M a n i y a n i " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " N a r i m a n e   A h n i n " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " C o o p e r s   a n d   L y b r a n d "  
         ]  
     } ,  
     {  
         " n a m e " :   " I m a n e   B e n s a l a h " ,  
         " s c h o o l " :   " E N C G   M e k n � %� s " ,  
         " a d m i s s i o n s " :   [  
             " K P M G   F r a n c e " ,  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " M e h d i   Z a i d a n " ,  
         " s c h o o l " :   " E N C G   T a n g e r " ,  
         " a d m i s s i o n s " :   [  
             " V i s e o   ( C o n s u l t a n t   S A P   F I / C O ) "  
         ]  
     } ,  
     {  
         " n a m e " :   " H a f s a   B e l a b b e s " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M a n a l   O t t m a n i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " F a t i m a   E z z a h r a   T e l l a b i " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " D e l o i t t e   F r a n c e " ,  
             " A D   A s s o c i � %� s " ,  
             " H d i d   a n d   A s s o c i � %� s "  
         ]  
     } ,  
     {  
         " n a m e " :   " S a l a h   E d d i n e   E n i l " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " H i b a   B o u f f i " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " W i a m   I k h l a f e n " ,  
         " s c h o o l " :   " E N C G   O u j d a " ,  
         " a d m i s s i o n s " :   [  
             " P W C   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " Y a s m i n e   R a c i f i " ,  
         " s c h o o l " :   " I S C A E   R a b a t " ,  
         " a d m i s s i o n s " :   [  
             " A D   A s s o c i � %� s " ,  
             " M a z a r s   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " I k r a m   A g o u r a r " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " C o o p e r s   a n d   L y b r a n d "  
         ]  
     } ,  
     {  
         " n a m e " :   " J i h a n e   M r a b b i " ,  
         " s c h o o l " :   " F S J E S " ,  
         " a d m i s s i o n s " :   [  
             " M L   E x p e r t s "  
         ]  
     } ,  
     {  
         " n a m e " :   " A d a m   I d r i s s   Z a m z a m i " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   M a r o c " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M a r o u a   B e n s l i m a n e " ,  
         " s c h o o l " :   " E N C G   M e k n � %� s " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " K P M G   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " Y a s m i n e   R e z z o u q " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M a n a l   B e n s a l e m " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " H a t i m   L a a s r i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " B D O   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " Z i n e b   M a s r o u r " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " M o o r e   S t e p h e n s " ,  
             " C r � %� d i t   D u   M a r o c   ( A n a l y s e   C r � %� d i t ) "  
         ]  
     } ,  
     {  
         " n a m e " :   " B a d r e   M e r f o u k " ,  
         " s c h o o l " :   " E N C G   E l   J a d i d a " ,  
         " a d m i s s i o n s " :   [  
             " M a g u i r i   a n d   A s s o c i � %� s " ,  
             " U p s i l o n   C o n s u l t i n g "  
         ]  
     } ,  
     {  
         " n a m e " :   " H i b a   I s m a i l i   A l a o u i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " P W C   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " M a h a   E l   B o u r i m i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " K P M G   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " F a t i n e   L a k h l i f i " ,  
         " s c h o o l " :   " E N C G   M e k n � %� s " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " H o u d a   B l a l " ,  
         " s c h o o l " :   " E N C G   M e k n � %� s " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e " ,  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " U p s i l o n   C o n s u l t i n g " ,  
             " H L B   M a r o c   A u d i t "  
         ]  
     } ,  
     {  
         " n a m e " :   " C h a i m a e   B a r k i " ,  
         " s c h o o l " :   " E N C G   T a n g e r " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " W i a m   M n i i " ,  
         " s c h o o l " :   " E N C G   M e k n � %� s " ,  
         " a d m i s s i o n s " :   [  
             " M o o r e   S t e p h e n s " ,  
             " L o t u s   C a p i t a l " ,  
             " B a n k   O f   A f r i c a   ( M a n d A ) " ,  
             " A D   A s s o c i � %� s "  
         ]  
     } ,  
     {  
         " n a m e " :   " B a d r   B o u a i c h a " ,  
         " s c h o o l " :   " E N C G   E l   J a d i d a " ,  
         " a d m i s s i o n s " :   [  
             " B D O   M a r o c " ,  
             " P W C   M a r o c " ,  
             " B a n k   O f   A f r i c a   ( A u d i t ) " ,  
             " C r � %� d i t   D u   M a r o c   ( I n s p e c t i o n ) "  
         ]  
     } ,  
     {  
         " n a m e " :   " H i b a   B o u s s a k o u m a " ,  
         " s c h o o l " :   " E N C G   T a n g e r " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " R a o u a n e   B o u h a n n i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " S a r a   B a o u z " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " C o o p e r s   a n d   L y b r a n d "  
         ]  
     } ,  
     {  
         " n a m e " :   " R o k i a   M a b r o u k " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   M a r o c " ,  
             " M o o r e   S t e p h e n s " ,  
             " C r � %� d i t   D u   M a r o c   ( F i n a n c e ) " ,  
             " A d v a n c e   G r o u p "  
         ]  
     } ,  
     {  
         " n a m e " :   " G h i t a   D a h b i " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " A D   A s s o c i � %� s " ,  
             " S a a i d i   a n d   A s s o c i � %� s " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " B a r a e   B e n t a h i r " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " E Y   M a r o c   ( C o n s u l t i n g   A C R ) " ,  
             " D e l o i t t e   M a r o c   ( T S ) "  
         ]  
     } ,  
     {  
         " n a m e " :   " M o h a m e d   O u c h a i b " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " M a z a r s   T a x "  
         ]  
     } ,  
     {  
         " n a m e " :   " A b d e l k a d e r   B e n a t a y a " ,  
         " s c h o o l " :   " E N C G   O u j d a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e " ,  
             " A D   A s s o c i � %� s "  
         ]  
     } ,  
     {  
         " n a m e " :   " O u m a y m a   C h a h i d " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " S M   S o u t h   C a p i t a l " ,  
             " H d i d   a n d   A s s o c i � %� s "  
         ]  
     } ,  
     {  
         " n a m e " :   " S o u a d   H a r r a c h " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " I m a n e   A i t   T a l e b " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " H a i t a m   M a z h a r " ,  
         " s c h o o l " :   " I S C A E   R a b a t " ,  
         " a d m i s s i o n s " :   [  
             " E Y   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " O m a r   S e q q a t " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " M a z a r s   F r a n c e " ,  
             " B D O   M a r o c " ,  
             " B a k e r   T i l l y   I n t e r n a t i o n a l " ,  
             " M a z a r s   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " I m a n e   A l a o u i " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " H i n d   N m y e s " ,  
         " s c h o o l " :   " E N C G   M e k n � %� s " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " I m a n e   R o u i g u i " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " R M A   C a p i t a l " ,  
             " C o o p e r s   a n d   L y b r a n d "  
         ]  
     } ,  
     {  
         " n a m e " :   " A s m a e   B e n n i s " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " P W C   R t m " ,  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M a r w a   S a m a r i " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   M a r o c " ,  
             " C r � %� d i t   A g r i c o l e   d u   M a r o c   ( A u d i t ) "  
         ]  
     } ,  
     {  
         " n a m e " :   " G h i t a   B o u z i d i   I d r i s s i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " K P M G   M a r o c " ,  
             " E Y   M a r o c " ,  
             " P W C   F r a n c e " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M e r i e m   J a l o u l " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " C o o p e r s   a n d   L y b r a n d " ,  
             " K P M G   T a x " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M a r y a m e   B o u a z z a o u i " ,  
         " s c h o o l " :   " E N C G   A g a d i r " ,  
         " a d m i s s i o n s " :   [  
             " P W C   R t m " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M o h a m e d   A m i n e   E l   O u a f r i " ,  
         " s c h o o l " :   " E N C G   M a r r a k e c h " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e " ,  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " B a s m a   B e r d a a " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " E Y   M a r o c " ,  
             " M a z a r s   F r a n c e " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " S a i d   B o u h w a c h " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " E Y   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " A s m a e   A d n a n e " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " P W C   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M o h a m e d   A m i n e   A t o u f " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e " ,  
             " K P M G   F r a n c e " ,  
             " P W C   R t m " ,  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " M o h a m e d   E l k h m i s s i " ,  
         " s c h o o l " :   " U n i v e r .   M o h a m m e d   V   d e   R a b a t " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " N i s r i n e   D a g h o u t i " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " P W C   M a r o c " ,  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " P W C   F r a n c e " ,  
             " D e l o i t t e   M a r o c " ,  
             " M a z a r s   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " M a r o u a   B e n a l i " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " P K F   A r s i l o n   L u x e m b o u r g "  
         ]  
     } ,  
     {  
         " n a m e " :   " S o u f i a n e   E l k a d d o u r i " ,  
         " s c h o o l " :   " F S J E S " ,  
         " a d m i s s i o n s " :   [  
             " B D O   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " F a r o u k   H o u s s a i n i " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e " ,  
             " M a z a r s   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " B o t a i n a   C h a o u i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e " ,  
             " D e l o i t t e   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " M e r i a m   A m m a r " ,  
         " s c h o o l " :   " E N C G   M a r r a k e c h " ,  
         " a d m i s s i o n s " :   [  
             " B D O   M a r o c " ,  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " A y o u b   O u a k r i n e " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " E Y   M a r o c " ,  
             " D e l o i t t e   M a r o c " ,  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " A D   A s s o c i � %� s "  
         ]  
     } ,  
     {  
         " n a m e " :   " F a t i m a   O u a h i " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " P W C   R t m "  
         ]  
     } ,  
     {  
         " n a m e " :   " W i a m   K a r i m " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " P W C   F r a n c e " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " M e r y e m   T a g n a o u t i   M o u m n a n i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   M a r o c " ,  
             " D e l o i t t e   F r a n c e " ,  
             " P r i c e w a t e r h o u s e "  
         ]  
     } ,  
     {  
         " n a m e " :   " Z e i d   N a g b i " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   M a r o c " ,  
             " A D   A s s o c i � %� s "  
         ]  
     } ,  
     {  
         " n a m e " :   " S a l m a   S e f i a n i " ,  
         " s c h o o l " :   " E N C G   K � %� n i t r a " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " Y o u s r a   A b o u n i a a m a n e " ,  
         " s c h o o l " :   " E N C G   T a n g e r " ,  
         " a d m i s s i o n s " :   [  
             " K P M G   F r a n c e " ,  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " O u s s a m a   K a r z a b " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e " ,  
             " B T   C o n s e i l " ,  
             " B L K   C o n s u l t i n g " ,  
             " A t t i j a r i W a f a   ( A u d i t   I n t e r n e ) " ,  
             " M o o r e   S t e p h e n s "  
         ]  
     } ,  
     {  
         " n a m e " :   " A c h r a f   H a k i m " ,  
         " s c h o o l " :   " E N C G   E l   J a d i d a " ,  
         " a d m i s s i o n s " :   [  
             " P W C   R t m " ,  
             " A c c o r   ( A u d i t   I n t e r n e ) " ,  
             " C r � %� d i t   D u   M a r o c   ( A u d i t ) " ,  
             " A i r b u s   ( C o n t r � %� l e   d e   g e s t i o n ) "  
         ]  
     } ,  
     {  
         " n a m e " :   " A n a s s   T o u z a n i " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   M a r o c " ,  
             " P W C   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " C h a h d   B i z i " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " P W C   R t m "  
         ]  
     } ,  
     {  
         " n a m e " :   " Z i n e b   M h a o u r i " ,  
         " s c h o o l " :   " E N C G   F � %� s " ,  
         " a d m i s s i o n s " :   [  
             " B D O   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " A y a t   C h a t t i o u i " ,  
         " s c h o o l " :   " H E C   P a r i s " ,  
         " a d m i s s i o n s " :   [  
             " C r o w e   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " O u m a i m a   S o u s s i " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " F i d a r o c   G r a n t   T h o r n t o n " ,  
             " M a z a r s   F r a n c e " ,  
             " H d i d   a n d   A s s o c i � %� s " ,  
             " P W C   R t m " ,  
             " M a z a r s   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " H a f s a   S e k k o u r i " ,  
         " s c h o o l " :   " E N C G   T a n g e r " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " A k r a m   M a k h l o u k " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   M a r o c " ,  
             " C o o p e r s   a n d   L y b r a n d " ,  
             " A D   A s s o c i � %� s " ,  
             " P r i c e w a t e r h o u s e " ,  
             " M a z a r s   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " A m i n e   D a h m o u n " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " E Y   M a r o c "  
         ]  
     } ,  
     {  
         " n a m e " :   " S a i d   S a l m i " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   L u x e m b o u r g " ,  
             " H d i d   a n d   A s s o c i � %� s " ,  
             " D e l o i t t e   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " A m i n a   A b b a s s i " ,  
         " s c h o o l " :   " I S C A E   R a b a t " ,  
         " a d m i s s i o n s " :   [  
             " M a z a r s   F r a n c e " ,  
             " K P M G   T a x " ,  
             " F i d a r o c   G r a n t   T h o r n t o n "  
         ]  
     } ,  
     {  
         " n a m e " :   " A b d e l h a f i d   E l   H a s s a n i " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " D e l o i t t e   F r a n c e " ,  
             " R S M   M o r o c c o " ,  
             " H d i d   a n d   A s s o c i � %� s "  
         ]  
     } ,  
     {  
         " n a m e " :   " W i a m   A j u i n " ,  
         " s c h o o l " :   " E N C G   C a s a b l a n c a " ,  
         " a d m i s s i o n s " :   [  
             " P W C   R t m " ,  
             " K P M G   F r a n c e "  
         ]  
     } ,  
     {  
         " n a m e " :   " G h i t a   T o u a t i " ,  
         " s c h o o l " :   " E N C G   S e t t a t " ,  
         " a d m i s s i o n s " :   [  
             " K P M G   M a r o c "  
         ]  
     }  
 ] ;  
 


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
