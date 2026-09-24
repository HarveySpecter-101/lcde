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
  details: {
    heading?: string;
    text?: string;
    items?: string[];
  }[];
};

export const METIERS: Metier[] = [
  {
    id: 1,
    icon: BookOpenCheck,
    title: "Consultant en Expertise Comptable",
    details: [
      {
        heading: "l’analyse et la maitrise du cadre légal de la comptabilité au Maroc :",
        items: [
          "les lois en vigueur relatives aux obligations comptables des commerçants, le code général de normalisation comptable, les avis du conseil national de la comptabilité, et les notes circulaires relatives au code général des impôts au Maroc."
        ]
      },
      {
        heading: "la simulation des dossiers réels dans tous ses aspects :",
        items: [
          "le processus entier de création des sociétés au Maroc ;",
          "la tenue des livres comptables obligatoires (via Sage, SAP et Odoo), des déclarations fiscales (via le portail SIMPL de la DGI), des déclarations de personnel (via le portail DAMANCOM de la CNSS), et des déclarations juridiques (via le portail MAHAKIM du Ministère de la Justice) ;",
          "le processus d’établissement et de dépôt, ainsi que les formalités juridiques incombant la liasse comptable et fiscale ;",
          "l’établissement des états de synthèse dans le cas de dissolution et liquidation des sociétés ;",
          "les contrôles de cohérence nécessaires avant le dépôt des états de synthèse ;",
          "la gestion des délais de paiement conformément à la loi 69/21."
        ]
      },
      {
        text: "le traitement comptable, fiscal, audit et juridique de plusieurs opérations quotidiennes de l’entreprise (les contrats à long terme, les engagements hors bilan, les immobilisations, les subventions, l’emprunt bancaire et obligataire, les titres, les opérations libellées en devises, les amortissements, les provisions, la régularisation des charges et produits, le stock, la taxe sur la valeur ajoutée, l’impôt sur les sociétés, la contribution sociale de solidarité, le redressement fiscal, etc)."
      },
      {
        text: "le traitement des exercices du concours d'accès et des examens du cycle d'expertise comptable."
      }
    ]
  },
  {
    id: 2,
    icon: Landmark,
    title: "Consultant en Tax (contrôle fiscal, prix de transfert, ...)",
    details: [
      {
        heading: "l’analyse et la maitrise du cadre légal de la fiscalité marocaine :",
        items: [
          "le code général des impôts ;",
          "les notes circulaires et de services de la DGI ;",
          "l’analyse des spécificités, apports et évolution des lois de finances ;",
          "l’analyse des réformes de la loi de finances 2023 en matière de l’impôt sur les sociétés ;",
          "l’analyse des réformes de la loi de finances 2024 en matière de la taxe sur la valeur ajoutée ;",
          "l’analyse des nouveautés de la loi de finances 2025 en matière de l’impôt sur le revenu ;",
          "l’analyse de la loi de finances 2026 et du projet de loi de finances 2027."
        ]
      },
      {
        heading: "le traitement fiscal, comptable, audit et juridique :",
        items: [
          "la taxe sur la valeur ajoutée (le champ d’application de la TVA, la retenue à la source en matière de TVA, la TVA non apparente, la TVA à l’importation, le régime suspensif, le dossier de remboursement de la TVA, la TVA exigible, la TVA déductible, la TVA sur les opérations réalisées avec les non résidents, le crédit de TVA, la TVA due, ...).",
          "l’impôt sur les sociétés (le champ d’application de l’IS, l’évolution des taux d’imposition IS de 2023 à 2026, la retenue à la source en matière d’IS, l’imposition des produits et la déductibilité des charges, le report du déficit fiscal, le calcul du résultat fiscal, la cotisation minimale, le calcul de l’impôt sur les sociétés, ...).",
          "l’impôt sur le revenu (l’analyse détaillée des nouveautés de la loi de finances 2025).",
          "les droits d’enregistrement (l’analyse détaillée des formalités, et des actes et conventions passibles de ces droits)."
        ]
      },
      {
        heading: "la méthodologie complète de traitement d'une consultation fiscale :",
        items: [
          "l’analyse du contexte, l’identification des risques fiscaux, la recherche de la base légale (CGI, circulaires, jurisprudence), la formulation de la position fiscale et la rédaction de la note de consultation professionnelle."
        ]
      },
      {
        heading: "les cas pratiques et réels en contrôle fiscal et audit fiscal :",
        items: [
          "le déroulement d’un contrôle fiscal de A à Z, l’analyse des notifications, la préparation des réponses, la gestion des redressements, la négociation avec l’administration fiscale et la sécurisation de la position du client."
        ]
      },
      {
        text: "le traitement des exercices du concours d'accès et des examens du cycle d'expertise comptable."
      }
    ]
  },
  {
    id: 3,
    icon: Scale,
    title: "Consultant Juridique",
    details: [
      {
        heading: "l’analyse et la maitrise du cadre légal des commerçants au Maroc :",
        items: [
          "les lois en vigueur incombant les commerçants (la loi 5/96, la loi 17/95, la loi 15/95, la loi 15/89, la loi 103/12, la loi 69/21, ...) ;",
          "les spécificités et réglementations relatives à la société à responsabilité limitée ;",
          "les spécificités et réglementations relatives à la société anonyme ;",
          "les spécificités et réglementations relatives à la société par actions simplifiée ;",
          "la présentation légale et juridique de la profession d’expertise comptable."
        ]
      },
      {
        heading: "le traitement juridique, fiscal, comptable et audit relatif à :",
        items: [
          "l’augmentation du capital ;",
          "la réduction du capital."
        ]
      },
      {
        heading: "la dissolution et la liquidation des sociétés :",
        items: [
          "les causes de dissolution anticipée ;",
          "le traitement du dossier d'une société depuis la prise de décision de dissolution jusqu'à sa radiation du registre du commerce ;",
          "le suivi juridique et la tenue du dossier sous ses aspects comptable, fiscal et légal ;",
          "la mesure de l'impact de la dissolution anticipée de la société sur sa gouvernance, son activité et les relations avec les partenaires et les tiers ;",
          "l’organisation du dossier comptable, les obligations déclaratives, la préparation des comptes de liquidation ;",
          "la répartition du boni / mali de liquidation."
        ]
      }
    ]
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "Auditeur Financier des états de synthèse (Commissariat aux comptes / Audit légal)",
    details: [
      {
        heading: "l’analyse et la maitrise du cadre légal en audit :",
        items: [
          "la présentation et l’analyse du manuel des normes d’audit au Maroc ;",
          "la présentation et l’analyse des normes ISA (International Standards on Auditing) ;",
          "la maitrise A à Z de la démarche des missions : de compilation, d’examen limité, d’audit des états financiers, d’audit contractuel et d’audit légal (commissariat aux comptes)."
        ]
      },
      {
        heading: "l’audit de tous les cycles d’audit :",
        items: [
          "les capitaux propres, les dettes de financement, les immobilisations, les titres de placement, les titres et valeurs de placement, les clients, les fournisseurs, le personnel, les comptes Etat, la trésorerie, les achats et charges externes, le résultat financier, le stock, le chiffre d’affaires, le résultat non courant, ...",
          "la maitrise d’Excel et VBA lors d’une mission d’audit."
        ]
      },
      {
        heading: "les vérifications spécifiques :",
        items: [
          "les conventions réglementées, le rapport de gestion, les documents adressés aux actionnaires, les actions de garantie, l'égalité entre les actionnaires, l'acquisition d'une filiale et la prise de participation et de contrôle."
        ]
      },
      {
        heading: "la finalisation de la mission de commissariat aux comptes :",
        items: [
          "les événements postérieurs à la date de clôture ;",
          "la procédure de prévention interne ;",
          "la norme 3570 relative à la continuité d’exploitation ;",
          "la norme 3580 relative à la déclaration de direction ;",
          "les autres principales normes du nouveau manuel des normes d’audit au Maroc ;",
          "la préparation du projet du rapport d'audit conformément au nouveau manuel des normes d’audit."
        ]
      }
    ]
  },
  {
    id: 5,
    icon: Building2,
    title: "Auditeur Financier spécialisé dans le secteur Bancaire",
    details: [
      {
        text: "En complément du programme du commissariat aux comptes, l’audit légal du secteur bancaire intègre également les volets suivants :"
      },
      {
        heading: "l’analyse et la maitrise du cadre légal en audit du secteur bancaire :",
        items: [
          "la présentation du jargon et des spécificités du métier de la banque ;",
          "la présentation et l’analyse du Plan Comptable des Etablissements de Crédits (PCEC) ;",
          "la présentation et l’analyse de la loi 103/12 relative aux établissements de crédit et organismes assimilés ;",
          "la présentation et l’analyse des notes circulaires de Bank Al Maghrib ;",
          "la présentation du cadre fiscal application au secteur bancaire."
        ]
      },
      {
        heading: "le traitement des spécificités d’une mission d’audit du secteur bancaire :",
        items: [
          "l’audit des créances sur les établissements de crédit, créances sur la clientèle, et créances acquises par affacturage ;",
          "l’audit des titres de transaction, titres de placement, titres d’investissement, et titres de créances émis ;",
          "l’audit des dépôts de la clientèle, dépôts envers les établissements de crédit, et dépôts d’investissement ;",
          "l’audit du produit net bancaire ;",
          "la finalisation de la mission d’audit du secteur bancaire ;",
          "la préparation du projet du rapport d’audit conformément aux réglementations en vigueur."
        ]
      }
    ]
  },
  {
    id: 6,
    icon: ShieldAlert,
    title: "Auditeur Financier spécialisé dans le secteur des Assurances",
    details: [
      {
        text: "En complément du programme du commissariat aux comptes, l’audit légal du secteur des assurances intègre également les volets suivants :"
      },
      {
        heading: "l’analyse et la maitrise du cadre légal en audit du secteur des assurances :",
        items: [
          "la présentation du jargon et des spécificités du métier des assurances ;",
          "la présentation et l’analyse du Plan Comptable des Assurances (PCA) ;",
          "la présentation et l’analyse de la loi 17/99 (Code des Assurances) ;",
          "la présentation et l’analyse des notes circulaires de l’ACAPS ;",
          "la présentation du cadre fiscal application au secteur des assurances."
        ]
      },
      {
        heading: "le traitement des spécificités d’une mission d’audit des assurances :",
        items: [
          "l’audit des placements des compagnies d’assurances ;",
          "l’audit des provisions techniques (engagements futurs des compagnies d’assurances) ;",
          "l’audit des prestations et frais des assurances ,",
          "l’audit des primes d’assurances ;",
          "la finalisation de la mission d’audit du secteur des assurances ;",
          "la préparation du projet du rapport d’audit conformément aux réglementations en vigueur."
        ]
      }
    ]
  },
  {
    id: 7,
    icon: FileBarChart,
    title: "Consultant spécialisé en Normes Comptables IFRS",
    details: [
      {
        heading: "la maitrise du cadre conceptuel des normes comptables internationales IFRS :",
        items: [
          "la présentation approfondie des objectifs des normes internationales ;",
          "l’analyse des référentiels et des principales normes IFRS appliquées en pratique ;",
          "la lecture et l’interprétation des normes à partir de situations concrètes rencontrées en entreprise et en cabinet."
        ]
      },
      {
        heading: "l’analyse comparative des référentiels comptables marocains et normes IFRS :",
        items: [
          "l’identification des divergences majeures entre le CGNC et le référentiel IFRS ;",
          "l’étude des différences en matière de méthodes d’évaluation, de reconnaissance des actifs et passifs, et de présentation des états financiers IFRS."
        ]
      },
      {
        heading: "l’impact des normes IFRS au niveau “social” :",
        items: [
          "l’identification des ajustements nécessaires lors du passage des comptes sociaux vers les normes IFRS",
          "l’étude des impacts sur les résultats, les capitaux propres, les indicateurs financiers et la communication financière ;",
          "la compréhension des enjeux fiscaux et réglementaires liés aux retraitements IFRS."
        ]
      },
      {
        text: "la validation des retraitements IFRS lors d’une mission d’audit."
      }
    ]
  },
  {
    id: 8,
    icon: GitMerge,
    title: "Consultant spécialisé en Consolidation des Comptes",
    details: [
      {
        heading: "les convergences et divergences entre les normes marocaines et les normes IFRS :",
        items: [
          "l’analyse approfondie de la consolidation des comptes selon le référentiel marocain (notamment à travers l’avis n°5 du CNC) et selon les normes IFRS ;",
          "l’identification des impacts des divergences sur la structure des comptes consolidés, les méthodes de consolidation et la présentation de l’information financière."
        ]
      },
      {
        heading: "la démarche de consolidation des comptes :",
        items: [
          "la délimitation précise du périmètre de consolidation en fonction des critères de contrôle, d’influence notable ou de contrôle conjoint ;",
          "l’application des méthodes et modalités de consolidation appropriées (l’intégration globale, l’intégration proportionnelle et la mise en équivalence) ;",
          "le calcul et l’analyse des pourcentages de contrôle et d’intérêt pour chaque entité consolidée ;",
          "les retraitements de consolidation et l’élimination des opérations intragroupes ;",
          "l’application des règles de conversion des comptes des filiales étrangères selon les normes IFRS ;",
          "le calcul du goodwill lors d’une prise de contrôle et le traitement comptable des écarts de conversion."
        ]
      },
      {
        heading: "la présentation des états financiers consolidés :",
        items: [
          "l’élaboration du bilan consolidé, du compte de résultat consolidé, du tableau des flux de trésorerie et de l’état de variation des capitaux propres ;",
          "la rédaction des annexes consolidées conformément aux exigences réglementaires."
        ]
      }
    ]
  },
  {
    id: 9,
    icon: FileCheck2,
    title: "Audit des états financiers Consolidés en Normes IFRS",
    details: [
      {
        text: "En complément des programmes du commissariat aux comptes, des normes comptables IFRS et de la consolidation des comptes, l’audit des états financiers consolidés intègre également les volets suivants :"
      },
      {
        heading: "l’audit des états consolidés et annexes :",
        items: [
          "l’audit du bilan consolidé ;",
          "l’audit du compte de résultat consolidé ;",
          "l’audit du tableau des flux de trésorerie ;",
          "les informations à fournir (jugements significatifs, estimations critiques, parties liées, ...)."
        ]
      },
      {
        heading: "les risques et fraudes spécifiques à la consolidation :",
        items: [
          "les risques majeurs dans les groupes ;",
          "les manipulations fréquentes en consolidation ;",
          "l’utilisation de data analytics et revue des écritures d’ajustement."
        ]
      },
      {
        heading: "la coordination avec les auditeurs des filiales :",
        items: [
          "les instructions groupe ;",
          "la circularisation des commissaires aux comptes ;",
          "la revue critique des travaux des auditeurs des filiales ;",
          "la synthèse au niveau groupe."
        ]
      },
      {
        heading: "la finalisation de la mission d’audit consolidé :",
        items: [
          "les événements postérieurs à la clôture ;",
          "la préparation du projet de rapport d’audit consolidé ;",
          "la communication avec la direction et le comité d’audit."
        ]
      }
    ]
  },
  {
    id: 10,
    icon: SearchCheck,
    title: "Consultant Financier (Transaction Services, Due Diligence Financière, Valorisation des entreprises, Modélisation financière, Etablissement des Business Plan, ...)",
    details: [
      {
        heading: "l’analyse et la maitrise du cadre général du consulting financier :",
        items: [
          "les fondamentaux du conseil financier ;",
          "l’aperçu général des métiers de la due diligence financière, la fusion et acquisition, l’évaluation des entreprises, la modélisation financière , ...",
          "le focus sur les rôles, les enjeux, outils et spécificités du métier ;",
          "la présentation détaillée du processus de la due diligence financière et ses objectifs pour l’acheteur et le vendeur ;",
          "l’analyse des risques à caractère comptable, fiscal, réglementaire, social et financier ;",
          "la préparation de la data room et la lecture critique des états financiers."
        ]
      },
      {
        heading: "le traitement des différentes missions du “financial advisory” :",
        items: [
          "la présentation et l’analyse de la notion de la performance historique ;",
          "l’analyse et la lecture approfondie des KPI financiers ;",
          "la présentation des travaux de normalisation ;",
          "la présentation et la sélection des règles et méthodes de valorisation des entreprises ;",
          "le passage de l’EBITDA comptable à l’EBITDA normatif ;",
          "le passage de l’ANC à l’ANC ajusté ;",
          "le calcul de la dette nette ajustée ;",
          "le passage du BFR comptable au BFR normatif ;",
          "la revue qualité des résultats “quality of earnings” ;",
          "la négociation financière, l’analyse des synergies et les impacts post-acquisition ;",
          "la rédaction et la communication des livrables."
        ]
      }
    ]
  },
  {
    id: 11,
    icon: ClipboardCheck,
    title: "Consultant SAP Fi/Co",
    details: [
      {
        heading: "l’introduction générale à SAP Fi/Co :",
        items: [
          "la présentation des ERP et SAP ;",
          "l’architecture et navigation dans SAP ;",
          "les notions de modules intégrés (FI, CO, MM, SD, ...) ;",
          "le rôle du module Fi/Co (Finance & Controlling)."
        ]
      },
      {
        heading: "le paramétrage de base en comptabilité générale :",
        items: [
          "la modélisation de la structure de l’entreprise dans SAP ;",
          "le plan comptable et groupes de comptes ;",
          "la création des comptes généraux, les journaux comptables et les tranches de numération ;",
          "la saisie d’écritures simples et complexes ;",
          "la gestion des taxes et écritures automatiques ;",
          "le lettrage manuel et automatique."
        ]
      },
      {
        heading: "le traitement opérationnel et le suivi comptable :",
        items: [
          "la comptabilité bancaire (la gestion des fiches de banque, le traitement des extraits de comptes, le rapprochement bancaire et la gestion de la caisse) ;",
          "la comptabilité fournisseurs (la saisie des factures et avoirs, les paiements automatiques, le reporting fournisseurs) ;",
          "la comptabilité clients (la gestion des encaissements, le rapprochement client, le reporting clients) ;",
          "la comptabilité immobilisations (les plans d’évaluation, les catégories d’immobilisations, l’acquisition et la comptabilisation des immobilisations, le programme d’amortissement, la cession d’immobilisations)."
        ]
      },
      {
        text: "la production des états de synthèse et les rapports SAP Fi/Co."
      }
    ]
  },
  {
    id: 12,
    icon: ShieldCheck,
    title: "Auditeur IT",
    details: [
      {
        heading: "l’analyse et la maitrise du cadre général de l’audit IT :",
        items: [
          "les objectifs et le périmètre d’une mission d’audit IT ;",
          "le rôle de l’audit IT dans la gouvernance d’entreprise ;",
          "l’éthique, l’indépendance et la déontologie de l’auditeur IT ;",
          "la différence entre audit financier, audit interne et audit IT."
        ]
      },
      {
        heading: "le déroulement réel d’une mission d’audit IT de A à Z :",
        items: [
          "l’identification des applications et systèmes critiques ;",
          "la présentation et l’analyse des référentiels de l’audit IT ;",
          "l’identification des risques liés aux systèmes d’information ;",
          "la mise en place de la cartographie des risques IT ;",
          "l’évaluation des dispositifs de contrôle existants ;",
          "l’élaboration du programme de travail d’audit IT ;",
          "la revue des contrôles généraux informatiques (ITGC) ;",
          "l’audit des interfaces et des flux automatisés ;",
          "l’utilisation des techniques d’audit assisté par ordinateur (CAATs) ;",
          "l’analyse des constats et l’évaluation des impacts IT ;",
          "la finalisation de la mission d’audit IT, la rédaction et la communication des livrables aux directions IT et générale."
        ]
      }
    ]
  },
  {
    id: 13,
    icon: FileBarChart,
    title: "Contrôleur de gestion",
    details: [
      {
        heading: "l’introduction au contrôle de gestion :",
        items: [
          "la définition du contrôle de gestion et de ses missions clés dans l’entreprise ;",
          "le rôle stratégique du contrôleur de gestion dans le pilotage de la performance ;",
          "les différences fondamentales entre le contrôle de gestion, la comptabilité générale et la comptabilité analytique ;",
          "la présentation des principaux types de contrôle de gestion (industriel, commercial, par projets) ;",
          "le panorama des outils du contrôleur de gestion (budgets, tableaux de bord, comptabilité analytique)."
        ]
      },
      {
        heading: "le processus budgétaire :",
        items: [
          "la maitrise du budget comme outil central de pilotage ;",
          "les objectifs et l’utilité du budget dans la prise de décision ;",
          "les grandes étapes du processus budgétaire (élaboration, arbitrage et validation, suivi et révisions) ;",
          "la responsabilités des différents acteurs (direction générale, responsables opérationnels, département finance) ;",
          "l’analyse des écarts entre le budget prévu et le réalisé ;",
          "l’interprétation des écarts et actions correctives à mettre en place."
        ]
      },
      {
        heading: "les tableaux de bord et le pilotage de la performance :",
        items: [
          "la transformation des chiffres en outils de décision ;",
          "l’identification et la sélection des indicateurs clés de performance (KPI) financiers et opérationnels ;",
          "la méthodologie de conception d’un tableau de bord efficace."
        ]
      },
      {
        heading: "l’utilisation des outils de modélisation, d’automatisation et de synthèse :",
        items: [
          "Excel, VBA, Power Bi, et SAP Contrôle de Gestion."
        ]
      }
    ]
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
  logo?: string;
};

export const INTERVENANTS: Intervenant[] = [
  {
    name: "Mr. Amine Hassanain",
    role: "Founding Partner, Commissaire aux Comptes, Expert-Comptable",
    experience: "+15 ans d'expérience",
    specialties: [
      "Membre du Conseil National de la Comptabilité",
      "Consultant en Normes IFRS (INTEC Paris)",
      "Consultant en Consolidation des Comptes",
      "Consultant en Dissolution et Liquidation des Sociétés",
      "Docteur en Sciences de Gestion",
      "Enseignant du programme MBA et du Cycle d’Expertise Comptable"
    ],
    initials: "AH",
    photo: "/images/intervenants/1.jpg"
  },
  {
    name: "Mr. Mehdi Zaher",
    role: "Senior Manager en Transaction Services",
    experience: "+15 ans d'expérience",
    company: "Mazars",
    specialties: [
      "Consultant Spécialisé en Audit d’Acquisition",
      "Due Diligence Financière",
      "Valorisation des Entreprises",
      "Modélisation Financière"
    ],
    initials: "MZ",
    photo: "/images/intervenants/2.jpg"
  },
  {
    name: "Mme. Sarah Dchieche",
    role: "Directrice Tax",
    experience: "+15 ans d'expérience",
    company: "Deloitte Maroc",
    specialties: [
      "Consultante Spécialisée en Fiscalité Marocaine",
      "Fiscalité Internationale",
      "Due Diligence Fiscale et Juridique",
      "Contrôle Fiscal",
      "Optimisation Fiscale",
      "Droits d’Enregistrements",
      "Fiscalité Locale"
    ],
    initials: "SD",
    logo: "/images/intervenants/deloitte.png"
  },
  {
    name: "Mr. Reda Latrach",
    role: "Founding Partner, Commissaire aux Comptes, Expert-Comptable",
    experience: "+15 ans d'expérience",
    specialties: [
      "Consultant Spécialisé en Fiscalité",
      "Consultant Spécialisé en Finance Islamique",
      "Consultant Spécialisé en Audit de la Sharia"
    ],
    initials: "RL",
    photo: "/images/intervenants/3.jpg"
  },
  {
    name: "Consultante Senior",
    role: "Spécialisée en Transaction Services et M&A",
    experience: "+15 ans d'expérience",
    company: "EY Maroc",
    specialties: [
      "Transaction Services",
      "M&A (Mergers and Acquisitions)"
    ],
    initials: "CS",
    logo: "/images/intervenants/ey.png"
  },
  {
    name: "Auditeur Senior",
    role: "Expert-Comptable, Auditeur et Consultant Spécialisé dans le secteur des Assurances",
    experience: "+15 ans d'expérience",
    company: "KPMG Maroc",
    specialties: [
      "Expertise Comptable",
      "Audit secteur des Assurances"
    ],
    initials: "AS",
    logo: "/images/intervenants/kpmg.png"
  },
  {
    name: "Auditrice Senior",
    role: "Expert-Comptable, Auditrice et Consultante",
    experience: "+15 ans d'expérience",
    company: "Fidaroc Grant Thornton",
    specialties: [
      "Consolidation des Comptes",
      "Normes Comptables Internationales (IFRS)"
    ],
    initials: "AS",
    logo: "/images/intervenants/fidaroc.png"
  },
  {
    name: "HR Business Partner",
    role: "Spécialisé en Recrutement et Acquisition des Talents",
    experience: "+15 ans d'expérience",
    company: "OCP",
    specialties: [
      "Recrutement",
      "Acquisition des Talents"
    ],
    initials: "HR",
    logo: "/images/intervenants/ocp.png"
  },
  {
    name: "Rida Moutik",
    role: "Fondateur, Expert-Comptable, Manager Audit & Financial Advisory",
    experience: "+15 ans d'expérience",
    specialties: [
      "Audit",
      "Financial Advisory"
    ],
    initials: "RM",
    photo: "/images/intervenants/4.jpg"
  },
  {
    name: "Rachad Ghali",
    role: "Fondateur, Manager Audit & Financial Advisory",
    experience: "+15 ans d'expérience",
    specialties: [
      "Auditeur et Consultant Spécialisé dans le Secteur Bancaire"
    ],
    initials: "RG",
    photo: "/images/intervenants/5.jpg"
  }
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
    "name": "Meryem Tagnaouti Moumnani",
    "school": "ENCG Fès",
    "admissions": [
      "Deloitte Maroc",
      "Deloitte France",
      "Pricewaterhouse"
    ]
  },
  {
    "name": "Niama Firdaous",
    "school": "ENCG Kénitra",
    "admissions": [
      "Coopers & Lybrand"
    ]
  },
  {
    "name": "Wiam Karim",
    "school": "ENCG Casablanca",
    "admissions": [
      "PWC France",
      "Deloitte France",
      "Wiam Mnii ENCG Mekn8s Moore Stephens",
      "Lotus Capital",
      "Bank Of Africa (M&A)",
      "AD Associés"
    ]
  },
  {
    "name": "Salah Eddine Enil",
    "school": "ENCG Fès",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Mazars France"
    ]
  },
  {
    "name": "Noura Aboulkacem",
    "school": "ENCG Casablanca",
    "admissions": [
      "AD Associés",
      "Deloitte France"
    ]
  },
  {
    "name": "Zeid Nagbi",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte Maroc",
      "AD Associés"
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
    "name": "Nouhaila Ezriouli",
    "school": "ENCG Kénitra",
    "admissions": [
      "AD Associés",
      "PWC France"
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
    "name": "Oumaima Soussi",
    "school": "ENCG Settat",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Mazars France",
      "Hdid & Associés",
      "PWC Rtm",
      "Mazars Maroc"
    ]
  },
  {
    "name": "Sami Ed-damiri",
    "school": "ENCG Kénitra",
    "admissions": [
      "KPMG France"
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
    "name": "Youssef Kejji",
    "school": "ENCG Settat",
    "admissions": [
      "Fidaroc Grant Thornton",
      "PWC France"
    ]
  },
  {
    "name": "Yasmine Rezzouq",
    "school": "ENCG Kénitra",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Deloitte France"
    ]
  },
  {
    "name": "Safae Hammal",
    "school": "ENCG Fès",
    "admissions": [
      "PWC Rtm",
      "AD Associés",
      "Fidaroc Grant Thornton",
      "Deloitte France",
      "PWC France"
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
    "name": "Omar Seqqat",
    "school": "ENCG Fès",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Mazars France",
      "BDO Maroc",
      "Baker Tilly International",
      "Mazars Maroc"
    ]
  },
  {
    "name": "Nouha Bennis",
    "school": "ENCG Kénitra",
    "admissions": [
      "Mazars France",
      "Mazars Maroc",
      "Deloitte France"
    ]
  },
  {
    "name": "Meriem El Mir",
    "school": "ENCG Casablanca",
    "admissions": [
      "AD Associés",
      "Deloitte France"
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
    "name": "Said Bouhwach",
    "school": "ENCG Fès",
    "admissions": [
      "EY Maroc"
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
    "name": "Salma Sefiani",
    "school": "ENCG Kénitra",
    "admissions": [
      "Mazars Maroc"
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
    "name": "Fidaroc Grant Thornton \tImane Bounajra",
    "school": "ENCG Fès",
    "admissions": [
      "BDO Maroc",
      "Mazars France"
    ]
  },
  {
    "name": "Abdelhafid El Hassani",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte France",
      "RSM Morocco",
      "Hdid & Associés"
    ]
  },
  {
    "name": "Abdelkader Benataya",
    "school": "ENCG Oujda",
    "admissions": [
      "Deloitte France",
      "AD Associés"
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
    "name": "Mahmoud Jadil",
    "school": "ENCG Casablanca",
    "admissions": [
      "SM South Capital"
    ]
  },
  {
    "name": "Marwa Istiadad",
    "school": "ENCG Casablanca",
    "admissions": [
      "Coopers & Lybrand"
    ]
  },
  {
    "name": "Farouk Houssaini",
    "school": "ENCG Kénitra",
    "admissions": [
      "Mazars France",
      "Mazars Maroc"
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
    "name": "Fatima Zahra El Gharbali",
    "school": "ENCG Fès",
    "admissions": [
      "Deloitte France"
    ]
  },
  {
    "name": "Kenza Benkirane",
    "school": "ENCG Fès",
    "admissions": [
      "EY Maroc",
      "CDG Invest"
    ]
  },
  {
    "name": "Hajar Hammioui",
    "school": "ENCG Kénitra",
    "admissions": [
      "Deloitte France"
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
    "name": "Rania Areski",
    "school": "ENCG Settat",
    "admissions": [
      "BDO Maroc",
      "EY Maroc"
    ]
  },
  {
    "name": "Laila Bouali",
    "school": "ENCG Tanger",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Ayoub Ouakrine",
    "school": "ENCG Settat",
    "admissions": [
      "EY Maroc",
      "Deloitte Maroc",
      "Fidaroc Grant Thornton",
      "AD Associés"
    ]
  },
  {
    "name": "Nada Hani",
    "school": "ISCAE Casablanca",
    "admissions": [
      "Mazars France",
      "AD Associés",
      "EY Maroc",
      "Mazars Maroc"
    ]
  },
  {
    "name": "Walid Rizek",
    "school": "ENCG Casablanca",
    "admissions": [
      "Hdid & Associés",
      "AD Associés",
      "Expact Partners",
      "Deloitte France"
    ]
  },
  {
    "name": "Hamza Naji",
    "school": "ENCG Kénitra",
    "admissions": [
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
    "name": "Mouna Boukhaffa",
    "school": "Metz School of Management",
    "admissions": [
      "Management KPMG France"
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
    "name": "Siham Elansi",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte France",
      "Mazars Maroc",
      "AD Associés",
      "Bank Of Africa (Audit)",
      "Société Générale (Finance)"
    ]
  },
  {
    "name": "Salma Chahbeddine",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte France",
      "Crédit Du Maroc (Finance)",
      "Société Générale (Audit)"
    ]
  },
  {
    "name": "Houda Boukacha",
    "school": "ENCG Fès",
    "admissions": [
      "PWC Rtm",
      "BDO Maroc"
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
    "name": "Hamza Zouhri",
    "school": "ENCG Fès",
    "admissions": [
      "BNP Paribas"
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
    "name": "Amina Abbassi",
    "school": "ISCAE Rabat",
    "admissions": [
      "Mazars France",
      "KPMG Tax",
      "Fidaroc Grant Thornton"
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
    "name": "Driss Aouina",
    "school": "ENCG Casablanca",
    "admissions": [
      "Mazars France",
      "KPMG France"
    ]
  },
  {
    "name": "Fatima Ouahi",
    "school": "ENCG Kénitra",
    "admissions": [
      "PWC Rtm"
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
    "name": "Ghita Dahbi",
    "school": "ENCG Casablanca",
    "admissions": [
      "AD Associés",
      "Saaidi & Associés",
      "Deloitte France"
    ]
  },
  {
    "name": "Anas Belkharraz",
    "school": "ENCG El Jadida",
    "admissions": [
      "Hdid & Associés",
      "Fizazi & Associés"
    ]
  },
  {
    "name": "Hamza Kchit",
    "school": "ENCG Fès",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Deloitte Maroc"
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
    "name": "Jannatte Mourchid",
    "school": "ENCG Settat",
    "admissions": [
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
    "name": "Ikram Hilali",
    "school": "ENCG Agadir",
    "admissions": [
      "Deloitte France",
      "KPMG Maroc"
    ]
  },
  {
    "name": "Hiba Salouane",
    "school": "ENCG Kénitra",
    "admissions": [
      "Deloitte France",
      "Mazars Maroc"
    ]
  },
  {
    "name": "Aya Abou-El-Khebra",
    "school": "ENCG Fès",
    "admissions": [
      "PWC Rtm"
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
    "name": "Kawtar Reggad",
    "school": "ENCG Casablanca",
    "admissions": [
      "Andersen Global",
      "RSM Morocco",
      "Hdid & Associés",
      "Banque Populaire (Audit)"
    ]
  },
  {
    "name": "Imane Ahannach",
    "school": "ENCG Casablanca",
    "admissions": [
      "Coopers & Lybrand"
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
    "name": "Ilham Sdoud",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte France",
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
    "name": "Nirmine Berrada",
    "school": "ENCG Fès",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Bilal Oubouaziz",
    "school": "ENCG Fès",
    "admissions": [
      "Deloitte Maroc",
      "PWC Rtm",
      "AD Associés"
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
    "name": "Hatim Laasri",
    "school": "ENCG Fès",
    "admissions": [
      "Fidaroc Grant Thornton",
      "BDO Maroc"
    ]
  },
  {
    "name": "Hafsa Belabbes",
    "school": "ENCG Kénitra",
    "admissions": [
      "Deloitte France"
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
    "name": "Nihad Fouche",
    "school": "ENCG Settat",
    "admissions": [
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
    "name": "Mohamed Amine El Ouafri",
    "school": "ENCG Marrakech",
    "admissions": [
      "Deloitte France",
      "Fidaroc Grant Thornton"
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
    "name": "Maroua Benali",
    "school": "ENCG Kénitra",
    "admissions": [
      "PKF Arsilon Luxembourg"
    ]
  },
  {
    "name": "Yassamine Bahha",
    "school": "ENCG Kénitra",
    "admissions": [
      "EY Maroc"
    ]
  },
  {
    "name": "Rihab Belqis",
    "school": "ISCAE Rabat",
    "admissions": [
      "Mazars Maroc",
      "AD Associés",
      "PWC Rtm",
      "Mazars France"
    ]
  },
  {
    "name": "Manal Bensalem",
    "school": "ENCG Kénitra",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Fatima Ezzahrae Bahra",
    "school": "ENCG Fès",
    "admissions": [
      "Deloitte France"
    ]
  },
  {
    "name": "Fatine Lakhlifi",
    "school": "ENCG Meknès",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Mohamed Ouchaib",
    "school": "ENCG Fès",
    "admissions": [
      "Vidaroc Grant Thornton",
      "Mazars Tax"
    ]
  },
  {
    "name": "Ikram Agourar",
    "school": "ENCG Casablanca",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Coopers & Lybrand"
    ]
  },
  {
    "name": "Nada Harchi",
    "school": "ENCG Béni Mellal",
    "admissions": [
      "KPMG Maroc"
    ]
  },
  {
    "name": "Hind Ismaili Alaoui",
    "school": "ENCG Fès",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Badre Merfouk",
    "school": "ENCG El Jadida",
    "admissions": [
      "Maguiri & Associés",
      "Upsilon Consulting"
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
    "name": "Mohamed Moncef Akra",
    "school": "ISCAE Rabat",
    "admissions": [
      "Mazars Maroc"
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
    "name": "Nohaila Lakhdar",
    "school": "ENCG Agadir",
    "admissions": [
      "Mazars Maroc"
    ]
  },
  {
    "name": "Ikram Lakhoitri",
    "school": "ENCG Settat",
    "admissions": [
      "AD Associés",
      "Mazars Maroc",
      "KPMG Tax"
    ]
  },
  {
    "name": "Hind Nmyes",
    "school": "ENCG Meknès",
    "admissions": [
      "Mazars Maroc",
      "Houda Blal ENCG Mekn8s Deloitte France",
      "Fidaroc Grant Thornton",
      "Upsilon Consulting",
      "HLB Maroc Audit"
    ]
  },
  {
    "name": "Ayman Halal",
    "school": "ENCG Fès",
    "admissions": [
      "KPMG France",
      "Mazars France",
      "Deloitte France"
    ]
  },
  {
    "name": "Rania Eddassi",
    "school": "ENCG Kénitra",
    "admissions": [
      "Mazars France",
      "KPMG France"
    ]
  },
  {
    "name": "Asmae Bennis",
    "school": "ENCG Fès",
    "admissions": [
      "PWC Rtm",
      "Fidaroc Grant Thornton",
      "Mazars France"
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
    "name": "Imane Ait Taleb",
    "school": "ENCG Kénitra",
    "admissions": [
      "Deloitte France\tImane Alaoui ENCG Settat Fidaroc Grant Thornton\tImane Bensalah ENCG Mekn8s KPMG France"
    ]
  },
  {
    "name": "Oussama Chadli",
    "school": "FSJES",
    "admissions": [
      "TY Consulting",
      "Hdid & Associés"
    ]
  },
  {
    "name": "Ghita Touati",
    "school": "ENCG Settat",
    "admissions": [
      "KPMG Maroc"
    ]
  },
  {
    "name": "Majda Laglil",
    "school": "ENCG Oujda",
    "admissions": [
      "Fizazi & Associés",
      "PWC France"
    ]
  },
  {
    "name": "Mohammed Erramdani",
    "school": "ENCG Fès",
    "admissions": [
      "KPMG Maroc"
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
    "name": "Fatima Zahra El Bouzidi",
    "school": "ENCG Tanger",
    "admissions": [
      "Mazars Maroc",
      "BDO Maroc",
      "AD Associés"
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
    "name": "Wissal Benhamou",
    "school": "ENCG Meknès",
    "admissions": [
      "Ministère des Affaires Etrangères"
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
    "name": "Maryame Bouazzaoui",
    "school": "ENCG Agadir",
    "admissions": [
      "PWC Rtm",
      "Deloitte France"
    ]
  },
  {
    "name": "Khalil Fekkali",
    "school": "ENCG Fès",
    "admissions": [
      "Deloitte France",
      "Mazars Luxembourg"
    ]
  },
  {
    "name": "Meriem Jaloul",
    "school": "ENCG Kénitra",
    "admissions": [
      "Coopers & Lybrand",
      "KPMG Tax",
      "Deloitte France"
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
    "name": "Jalal Adili",
    "school": "ENCG Kénitra",
    "admissions": [
      "Coopers & Lybrand",
      "Moore Stephens"
    ]
  },
  {
    "name": "Imane Mehdaoui",
    "school": "ENCG Fès",
    "admissions": [
      "PWC Rtm",
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Ahlam Wakrim",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte France",
      "Fidaroc Grant Thornton",
      "Coopers & Lybrand"
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
    "name": "Coopers & Lybrand \tImrane Houmou",
    "school": "ENCG Casablanca",
    "admissions": [
      "Coopers & Lybrand",
      "Deloitte France"
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
    "name": "Imane Chetoui",
    "school": "ENCG El Jadida",
    "admissions": [
      "Deloitte France"
    ]
  },
  {
    "name": "Akram Erraysse",
    "school": "ENCG Béni Mellal",
    "admissions": [
      "Fidaroc Grant Thornton"
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
    "name": "Raouaa El Fikri",
    "school": "ENCG Agadir",
    "admissions": [
      "PWC Rtm",
      "Deloitte France"
    ]
  },
  {
    "name": "Alae Ajdid",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte Maroc (Tax)",
      "Maphar (Contrôle de gestion)"
    ]
  },
  {
    "name": "Badr Bouaicha",
    "school": "ENCG El Jadida",
    "admissions": [
      "BDO Maroc",
      "PWC Maroc",
      "Bank Of Africa (Audit)",
      "Crédit Du Maroc (Inspection)"
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
    "name": "Hamza Bendriss",
    "school": "ENCG Fès",
    "admissions": [
      "Fidaroc Grant Thornton"
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
    "name": "Mohamed Ayman Sarih",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte France",
      "PWC France"
    ]
  },
  {
    "name": "Maha El Bourimi",
    "school": "ENCG Fès",
    "admissions": [
      "KPMG Maroc"
    ]
  },
  {
    "name": "Mohammed Sassioui",
    "school": "ENCG Fès",
    "admissions": [
      "PWC France",
      "Fidaroc Grant Thornton",
      "Mosaab Bendahhou ENCG Mekn8s Vidaroc Grant Thornton"
    ]
  },
  {
    "name": "Amine Dardikh",
    "school": "ENCG Kénitra",
    "admissions": [
      "Mazars France",
      "Mazars Luxembourg"
    ]
  },
  {
    "name": "Fatima Ezzahra Ghanam",
    "school": "ENCG El Jadida",
    "admissions": [
      "Fidaroc Grant Thornton",
      "AD Associés"
    ]
  },
  {
    "name": "Hiba Fadel",
    "school": "ENCG Settat",
    "admissions": [
      "\u0013azars Luxembourg",
      "Deloitte France"
    ]
  },
  {
    "name": "Maroua El Moualed",
    "school": "ENCG Casablanca",
    "admissions": [
      "Coopers & Lybrand"
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
    "name": "Marwa Samari",
    "school": "ENCG Kénitra",
    "admissions": [
      "Mazars Maroc",
      "Crédit Agricole du Maroc (Audit)"
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
    "name": "Mariem Toufga",
    "school": "ISCAE Casablanca",
    "admissions": [
      "Deloitte Maroc"
    ]
  },
  {
    "name": "Chaimae Ibn Adelmoula Slimani",
    "school": "ENCG Fès",
    "admissions": [
      "Fidaroc Grant Thornton",
      "PWC Rtm"
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
    "name": "Oumayma Chahid",
    "school": "ENCG Settat",
    "admissions": [
      "SM South Capital",
      "Hdid & Associés"
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
    "name": "Hedge Consulting Kawtar El Houari",
    "school": "ENCG Fès",
    "admissions": [
      "Deloitte France"
    ]
  },
  {
    "name": "Ismail Azzouzi",
    "school": "ENCG Fès",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Deloitte Maroc"
    ]
  },
  {
    "name": "Rime Sdiri",
    "school": "ENCG Fès",
    "admissions": [
      "Mazars Maroc",
      "EY Maroc"
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
    "name": "Fatima Ezzahra Tellabi",
    "school": "ENCG Settat",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Deloitte France",
      "AD Associés",
      "Hdid & Associés"
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
    "name": "Imane Lamkadmi",
    "school": "ISCAE Casablanca",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Mohamed Gueroinii",
    "school": "ENCG Fès",
    "admissions": [
      "Deloitte Maroc",
      "PWC Rtm",
      "Mazars Tax"
    ]
  },
  {
    "name": "Achraf Hakim",
    "school": "ENCG El Jadida",
    "admissions": [
      "PWC Rtm",
      "Accor (Audit Interne)",
      "Crédit Du Maroc (Audit)",
      "Airbus (Contrôle de gestion)"
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
    "name": "Issmail Maniyani",
    "school": "ENCG Settat",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Mazars France"
    ]
  },
  {
    "name": "Amjad Tarriko",
    "school": "ENCG Kénitra",
    "admissions": [
      "E2B Consulting",
      "Fizazi & Associés",
      "CIH (Audit et Inspection)"
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
    "name": "BDO Maroc Kawthar Bouhfid",
    "school": "ENCG Kénitra",
    "admissions": [
      "Fidaroc Grant Thornton",
      "KPMG Maroc",
      "PWC Maroc"
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
    "name": "Ghita Bouzidi Idrissi",
    "school": "ENCG Fès",
    "admissions": [
      "KPMG Maroc",
      "EY Maroc",
      "PWC France",
      "Deloitte France"
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
    "name": "Zineb Mhaouri",
    "school": "ENCG Fès",
    "admissions": [
      "BDO Maroc"
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
    "name": "Meryeme El Houdaibi",
    "school": "ENCG Settat",
    "admissions": [
      "Mazars France",
      "Deloitte France"
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
    "name": "Barae Bentahir",
    "school": "ENCG Settat",
    "admissions": [
      "EY Maroc (Consulting ACR)",
      "Deloitte Maroc (TS)"
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
    "name": "Ghita El Jirari",
    "school": "ENCG Settat",
    "admissions": [
      "Fidaroc Grant Thornton",
      "Deloitte France",
      "Expact Partners"
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
    "name": "Manal Ottmani",
    "school": "ENCG Fès",
    "admissions": [
      "Mazars Maroc"
    ]
  },
  {
    "name": "Narimane Ahnin",
    "school": "ENCG Casablanca",
    "admissions": [
      "Coopers & Lybrand"
    ]
  },
  {
    "name": "IhssaneAit El Madane",
    "school": "ENCG Tanger",
    "admissions": [
      "Crowe Maroc"
    ]
  },
  {
    "name": "Souad Harrach",
    "school": "ENCG Kénitra",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Salma El Qacimy",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte Maroc",
      "Mazars France",
      "AD Associés",
      "Deloitte France"
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
    "name": "Wissal El Heloui",
    "school": "ENCG Casablanca",
    "admissions": [
      "BDO Maroc",
      "KPMG France"
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
    "name": "Akram Makhlouk",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte Maroc",
      "Coopers & Lybrand",
      "AD Associés",
      "Pricewaterhouse",
      "Mazars France"
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
    "name": "Wissal El Idrissi",
    "school": "ENCG Fès",
    "admissions": [
      "Mazars France"
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
    "name": "Hiba Boussakouma",
    "school": "ENCG Tanger",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Amina Elassali",
    "school": "ENCG Kénitra",
    "admissions": [
      "SM South Capital",
      "Mazars France",
      "Upsilon Consulting"
    ]
  },
  {
    "name": "Mohamed Elkhmissi",
    "school": "Univer. Mohammed V de Rabat",
    "admissions": [
      "Rabat Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Samia M’ghari",
    "school": "ENCG Settat",
    "admissions": [
      "BDO Maroc"
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
    "name": "Imane El Azzazi",
    "school": "ENCG Kénitra",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Said Salmi",
    "school": "ENCG Casablanca",
    "admissions": [
      "Mazars Luxembourg",
      "Hdid & Associés",
      "Deloitte France"
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
    "name": "Yasmine Racifi",
    "school": "ISCAE Rabat",
    "admissions": [
      "AD Associés",
      "Mazars Maroc"
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
    "name": "Zakariae El Azzouzi",
    "school": "FSJES",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Mohamed Amine Dghoughi",
    "school": "ENCG Kénitra",
    "admissions": [
      "Coopers & Lybrand",
      "PWC Rtm"
    ]
  },
  {
    "name": "Salma Bakry",
    "school": "ENCG Fès",
    "admissions": [
      "EY Maroc",
      "PWC Maroc"
    ]
  },
  {
    "name": "Raouane Bouhanni",
    "school": "ENCG Fès",
    "admissions": [
      "Mazars France"
    ]
  },
  {
    "name": "Khawla Echine",
    "school": "ENCG Agadir",
    "admissions": [
      "Fidaroc Grant Thornton",
      "AD Associés"
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
    "name": "Botaina Chaoui",
    "school": "ENCG Fès",
    "admissions": [
      "Mazars France",
      "Deloitte Maroc"
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
    "name": "Maroua Lamlih",
    "school": "ENCG Settat",
    "admissions": [
      "Mazars France"
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
    "name": "Khaoula El Harhar",
    "school": "ENCG Kénitra",
    "admissions": [
      "Fidaroc Grant Thornton"
    ]
  },
  {
    "name": "Zineb Masrour",
    "school": "ENCG Fès",
    "admissions": [
      "Moore Stephens",
      "Crédit Du Maroc (Analyse Crédit)"
    ]
  },
  {
    "name": "Kaltoum El Fadili",
    "school": "ENCG Fès",
    "admissions": [
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
    "name": "Yasmine Jebli",
    "school": "ENCG Tanger",
    "admissions": [
      "Mazars Maroc"
    ]
  },
  {
    "name": "Sara Baouz",
    "school": "ENCG Kénitra",
    "admissions": [
      "Coopers & Lybrand"
    ]
  },
  {
    "name": "Imane Rouigui",
    "school": "ENCG Kénitra",
    "admissions": [
      "RMA Capital"
    ]
  },
  {
    "name": "Mohamed Amine Glioui",
    "school": "ENCG Fès",
    "admissions": [
      "Mazars France",
      "KPMG France",
      "Deloitte France"
    ]
  },
  {
    "name": "Basma Berdaa",
    "school": "ENCG Kénitra",
    "admissions": [
      "EY Maroc",
      "Mazars France",
      "Deloitte France"
    ]
  },
  {
    "name": "Maroua Benslimane",
    "school": "ENCG Meknès",
    "admissions": [
      "Fidaroc Grant Thornton",
      "KPMG Maroc"
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
    "name": "Nisrine Benbihi",
    "school": "ENCG Kénitra",
    "admissions": [
      "Mazars Maroc",
      "PWC Maroc"
    ]
  },
  {
    "name": "Hiba Ismaili Alaoui",
    "school": "ENCG Fès",
    "admissions": [
      "PWC Maroc"
    ]
  },
  {
    "name": "Rokia Mabrouk",
    "school": "ENCG Casablanca",
    "admissions": [
      "Deloitte Maroc",
      "Moore Stephens",
      "Crédit Du Maroc (Finance)",
      "Advance Group"
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
