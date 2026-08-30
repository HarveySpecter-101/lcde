"use client";

import { motion } from "framer-motion";
import { FileText, Wrench, Download, Gift } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { toast } from "sonner";

const RES = [
  {
    icon: FileText,
    title: "Guide d'entretiens PFE",
    desc: "Questions types, méthodologie de réponse et erreurs à éviter pour réussir vos entretiens en audit & finance.",
    filename: "LCDE-Guide-Entretiens-PFE.txt",
    content: `LE CLUB DES EXPERTS (LCDE)
=========================================
GUIDE D'ENTRETIENS PFE — AUDIT & FINANCE
=========================================

Table des matières
1. Préparation générale
2. Questions types (avec méthodologie de réponse)
3. Erreurs fréquentes à éviter
4. Check-list de la veille d'entretien
5. Questions à poser au recruteur

-----------------------------------------
1. PRÉPARATION GÉNÉRALE
-----------------------------------------
- Connaissez votre CV par cœur (dates, missions, résultats chiffrés).
- Préparez 3 forces et 3 faiblesses illustrées par des exemples concrets.
- Renseignez-vous sur le cabinet/entreprise : secteur, récents deals, valeurs.
- Préparez une présentation de 2 minutes (pitch personnel).

-----------------------------------------
2. QUESTIONS TYPES
-----------------------------------------

Q1. "Présentez-vous."
Réponse en 3 parties : parcours académique → expériences → pourquoi ce poste.
Durée cible : 90 secondes. Structure : présent, passé, futur.

Q2. "Pourquoi l'audit / la finance ?"
Montrez la passion par un fait concret (un dossier qui vous a marqué,
un article lu, une rencontre). Évitez les réponses génériques.

Q3. "Quelle est votre expérience en IFRS ?"
Citez les normes maîtrisées (IFRS 15, 16, 9), un cas traité,
et la limite de votre expérience (honnêteté = crédibilité).

Q4. "Comment réagissez-vous à la pression ?"
Exemple STAR : Situation, Tâche, Action, Résultat.
Évitez "je gère bien la pression" sans exemple.

Q5. "Où vous voyez-vous dans 5 ans ?"
Montrez une trajectoire cohérente : junior → senior → manager,
en lien avec les métiers du cabinet. Pas trop précis, pas trop vague.

Q6. "Pourquoi notre cabinet ?"
3 raisons concrètes : expertise sectorielle, culture, opportunités.
Référencez un deal récent ou un article publié par le cabinet.

Q7. Questions techniques types :
- Décrivez le cycle d'audit.
- Quelle est la différence entre audit interne et audit externe ?
- Expliquez la consolidation (méthode intégration globale).
- Qu'est-ce qu'une due diligence financière ?
- Calculez le DCF d'une entreprise (méthodologie).

-----------------------------------------
3. ERREURS FRÉQUENTES À ÉVITER
-----------------------------------------
- Arriver en retard (prévoyez 15 min de marge).
- Ne pas connaître son propre CV.
- Critiquer un ancien employeur.
- Répondre trop longuement (> 2 min par réponse).
- Ne pas poser de questions à la fin.
- Mentir sur une compétence (vérification systématique).
- Oublier de remercier le recruteur à la fin.

-----------------------------------------
4. CHECK-LIST VEILLE D'ENTRETIEN
-----------------------------------------
[ ] Tenue vérifiée (costume/cravate pour cabinets)
[ ] CV imprimé x2 + lettre de motivation
[ ] Carnet + stylo
[ ] Itinéraire vérifié + plan B transport
[ ] Questions préparées (5 minimum)
[ ] Veille sectorielle (actualité du cabinet)
[ ] Sommeil 7h minimum
[ ] Réveil avec marge

-----------------------------------------
5. QUESTIONS À POSER AU RECRUTEUR
-----------------------------------------
- "Quels sont les défis actuels de l'équipe ?"
- "Comment se déroule l'intégration des nouveaux collaborateurs ?"
- "Quels sont les outils utilisés au quotidien ?"
- "Comment évaluez-vous la performance la première année ?"
- "Quelles opportunités de formation continue ?"

=========================================
Document confidentiel — Le Club Des Experts (LCDE)
Casablanca, Maroc — contact@leclubdesexperts.com
=========================================
`,
  },
  {
    icon: Wrench,
    title: "Boîte à outils de l'auditeur financier",
    desc: "Check-list d'audit, programmes de travail modèles et trames de due diligence prêtes à l'emploi.",
    filename: "LCDE-Boite-a-Outils-Auditeur.txt",
    content: `LE CLUB DES EXPERTS (LCDE)
=========================================
BOÎTE À OUTILS DE L'AUDITEUR FINANCIER
=========================================

Sommaire
1. Check-list générale d'audit
2. Programme de travail — Trésorerie
3. Programme de travail — Créances clients
4. Trame de due diligence financière
5. Analyse Quality of Earnings (QoE)
6. Calcul de la dette nette normalisée

=========================================
1. CHECK-LIST GÉNÉRALE D'AUDIT
=========================================

PHASE 1 — PLANIFICATION
[ ] Lettre de mission signée
[ ] Connaissance de l'entité (secteur, structure, activités)
[ ] Évaluation du contrôle interne
[ ] Seuil de signification défini
[ ] Approche d'audit (substantive vs tests de procédures)
[ ] Plan de travail validé par l'associé

PHASE 2 — TRAVAUX DE FIN D'EXERCICE
[ ] Rapprochement comptable ↔ fiscal
[ ] Test d'inventaire physique (circularisation)
[ ] Confirmation des tiers (banques, avocats, clients)
[ ] Test de cut-off (charges/produits)
[ ] Examen des événements postérieurs
[ ] Examen des engagements hors bilan
[ ] Test de dépréciation des créances
[ ] Justification des soldes (banques, tiers, État)

PHASE 3 — FINALISATION
[ ] Synthèse des ajustements proposés
[ ] Lettre de recommandations (management letter)
[ ] Rapport d'audit (type ISA 700)
[ ] Déclaration de contrôle interne
[ ] Archive du dossier (permanent + année)

=========================================
2. PROGRAMME DE TRAVAIL — TRÉSORERIE
=========================================

Objectif : S'assurer que les soldes bancaires existent, appartiennent
à l'entité et sont correctement évalués au 31/12.

Procédures :
1. Obtenir le grand livre des comptes de trésorerie
2. Rapprocher avec les rapprochements bancaires mensuels
3. Effectuer les confirmations directes des banques (circularisation)
4. Vérifier les rapprochements bancaires au 31/12
5. Tester les écritures postérieures (virements, encaissements)
6. Analyser les comptes à fort volume d'opérations
7. Vérifier la classification (découvert = passif courant)
8. Contrôler l'existence d'éventuels comptes bloqués/gelés

Conclusion : Les soldes de trésorerie sont sincères et justifiés.

=========================================
3. PROGRAMME DE TRAVAIL — CRÉANCES CLIENTS
=========================================

Objectif : S'assurer de l'existence, de l'exhaustivité et de
l'évaluation des créances au 31/12.

Procédures :
1. Obtenir la balance âgée des clients
2. Analyser l'évolution du délai moyen de recouvrement (DSO)
3. Effectuer des circularisations clients (échantillon significatif)
4. Tester le cut-off des ventes (dernier BL / première facture N+1)
5. Évaluer les provisions pour créances douteuses
6. Analyser les avoirs à établir
7. Vérifier les effets escomptés non échus
8. Contrôler les comptes débiteurs anormaux (crédits clients)

Conclusion : Les créances clients sont justifiées et correctement
provisionnées.

=========================================
4. TRAME DE DUE DILIGENCE FINANCIÈRE
=========================================

A. VENTE & MARCHÉ
- Chiffre d'affaires par segment / client / zone géo
- Concentration client (top 10)
- Carnet de commandes
- Taux de récurrence / rétention

B. MARGE & RENTABILITÉ
- EBITDA ajusté (retraitement des éléments non récurrents)
- Évolution des marges par produit
- Coût des ventes détaillé (matières, main d'œuvre, overhead)
- Bridge EBITDA N-1 → N

C. BESOIN EN FONDS DE ROULEMENT (BFR)
- BFR en jours de CA
- DSO / DPO / DIO
- Saisonnalité du BFR
- Normalisation du BFR

D. ENDETTEMENT
- Dette bancaire (court terme / long terme)
- Dettes financières hors bilan (crédit-bail, IFRS 16)
- Covenants bancaires
- Intercompany loans

E. TRÉSORERIE
- Trésorerie nette
- Trésorerie bloquée / compromise
- Facilities disponibles

=========================================
5. ANALYSE QUALITY OF EARNINGS (QoE)
=========================================

Objectif : Identifier les éléments non récurrents du résultat net
pour calculer le résultat "normalisé" / récurrent.

Ajustements typiques :
+/- Plus-values / moins-values de cession
+/- Provisions non récurrentes
+/- Charges de restructuration
+/- Éléments exceptionnels (litiges, amendes)
+/- Impact des variations de juste valeur
+/- Coûts liés à la transaction (frais juridiques, audit)
+/- Stock-options et bonus exceptionnels

Résultat normalisé = Résultat net + Ajustements (net d'impôt)

=========================================
6. CALCUL DE LA DETTE NETTE NORMALISÉE
=========================================

Dette nette = Dettes financières - Trésorerie - Actifs financiers liquides

Dette financière brute :
+ Emprunts bancaires (LT + CT)
+ Dettes de crédit-bail (capital restant dû)
+ Dettes envers les associés (à terme)
+ Effets escomptés non échus
+ Avances conditionnées

Moins :
- Trésorerie disponible
- Valeurs mobilières de placement (liquides)
- Découverts autorisés non utilisés (si facility confirmée)

= DETTE NETTE NORMALISÉE

Note : Exclure les dettes opérationnelles (fournisseurs, fiscales,
sociales) du calcul de la dette nette.

=========================================
Document confidentiel — Le Club Des Experts (LCDE)
Casablanca, Maroc — contact@leclubdesexperts.com
=========================================
`,
  },
];

function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function Resources() {
  const handleDownload = (r: (typeof RES)[number]) => {
    downloadFile(r.filename, r.content);
    toast.success(`${r.title} téléchargé !`);
  };

  return (
    <section id="ressources" className="relative scroll-mt-20 overflow-hidden bg-soft py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.05]" aria-hidden />
      <div className="pointer-events-none absolute -left-20 bottom-0 size-80 rounded-full bg-gold/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-20 top-0 size-80 rounded-full bg-navy/5 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold border border-gold/20">
            <Gift className="size-3.5" /> Ressources gratuites
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-navy sm:text-5xl md:text-6xl">
            Préparez vos entretiens avec nos guides offerts par nos experts
          </h2>
          <p className="mt-5 text-base leading-relaxed text-anthracite/75 sm:text-lg">
            Des ressources conçues par nos experts pour vous donner une longueur d'avance et réussir vos démarches.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {RES.map((r, idx) => (
            <Reveal key={r.title} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group flex h-full flex-col justify-between rounded-3xl border border-navy/10 bg-white p-7 shadow-premium transition-all hover:border-gold/40 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-navy-gradient text-gold shadow-navy-glow">
                      <r.icon className="size-7" />
                    </span>
                    <h3 className="font-serif text-xl font-bold leading-snug text-navy">
                      {r.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-anthracite/75">
                    {r.desc}
                  </p>
                </div>

                <div className="mt-8 border-t border-navy/8 pt-5">
                  <button
                    type="button"
                    onClick={() => handleDownload(r)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient px-4 py-3 text-sm font-semibold text-navy transition-transform hover:scale-[1.02] shadow-gold-glow active:scale-95"
                  >
                    <Download className="size-4" />
                    Télécharger maintenant
                  </button>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
