"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Wrench, Download, Mail, Gift, CheckCircle2, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const RES = [
  {
    icon: FileText,
    title: "Guide d'entretiens PFE",
    desc: "Questions types, méthodologie de réponse et erreurs à éviter pour réussir vos entretiens en audit & finance.",
    format: "PDF — 24 pages",
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
- Menthir sur une compétence (vérification systématique).
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
5. QUESTIONS À POSER AU RECRRUTEUR
-----------------------------------------
- "Quels sont les défis actuels de l'équipe ?"
- "Comment se déroule l'intégration des nouveaux collaborateurs ?"
- "Quels sont les outils utilisés au quotidien ?"
- "Comment évaluez-vous la performance la première année ?"
- "Quelles opportunités de formation continue ?"

=========================================
Document confidentiel — Le Club Des Experts (LCDE)
Casablanca, Maroc — contact@leclubdesexperts1.com
=========================================
`,
  },
  {
    icon: Wrench,
    title: "Boîte à outils de l'auditeur financier",
    desc: "Check-list d'audit, programmes de travail modèles et trames de due diligence prêtes à l'emploi.",
    format: "Pack — Excel + PDF",
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
[ ] Plan de travail validé par le associé

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
Casablanca, Maroc — contact@leclubdesexperts1.com
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
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleDownload = (r: (typeof RES)[number]) => {
    downloadFile(r.filename, r.content);
    toast.success(`${r.title} téléchargé !`);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Ressource gratuite",
          email,
          profile: "other",
          objective: "Télécharger les ressources gratuites (PFE + boîte à outils)",
          message: "Demande automatique via la section ressources gratuites.",
          source: "ressources",
        }),
      });
      if (!res.ok) throw new Error("Erreur réseau");
      setDone(true);
      // Auto-download both resources after email capture
      RES.forEach((r, i) => {
        setTimeout(() => downloadFile(r.filename, r.content), i * 800);
      });
      toast.success("Merci ! Téléchargement des guides en cours...");
    } catch {
      toast.error("Une erreur est survenue. Réessayez ou écrivez-nous sur WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ressources" className="relative scroll-mt-20 overflow-hidden bg-soft py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.05]" aria-hidden />
      <div className="pointer-events-none absolute -left-20 bottom-0 size-80 rounded-full bg-gold/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left content */}
          <Reveal direction="right">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
              <Gift className="size-3.5" /> Ressources gratuites
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-navy sm:text-5xl md:text-6xl">
              Préparez vos entretiens PFE avec nos guides offerts par nos experts.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-anthracite/70 sm:text-lg">
              Deux ressources premium à télécharger gratuitement, conçues par nos formateurs pour
              vous donner une longueur d'avance dès les premiers entretiens.
            </p>

            <div className="mt-8 space-y-3">
              {RES.map((r) => (
                <motion.div
                  key={r.title}
                  whileHover={{ y: -3 }}
                  className="group flex items-center gap-4 rounded-2xl border border-navy/10 bg-white p-5 shadow-premium transition-colors hover:border-gold/30"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gold-gradient text-white shadow-gold-glow">
                    <r.icon className="size-6" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-serif text-base font-bold text-navy">{r.title}</h3>
                      <span className="rounded-full bg-soft px-2 py-0.5 text-[10px] font-medium text-anthracite/60">
                        {r.format}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-anthracite/70">{r.desc}</p>
                    <button
                      type="button"
                      onClick={() => handleDownload(r)}
                      className="mt-3 inline-flex items-center gap-2 rounded-lg bg-gold-gradient px-3 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.02] shadow-gold-glow"
                    >
                      <Download className="size-3.5" />
                      Télécharger maintenant
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* Right — form card */}
          <Reveal direction="left" delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-navy/10 bg-white p-8 shadow-premium md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-gold/15 blur-3xl" />
              <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.06]" />

              <div className="relative">
                {done ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-10 text-center"
                  >
                    <span className="flex size-16 items-center justify-center rounded-full bg-emerald-brand text-white">
                      <CheckCircle2 className="size-9" />
                    </span>
                    <h3 className="mt-5 font-serif text-2xl font-bold text-navy">Demande enregistrée !</h3>
                    <p className="mt-2 text-sm text-anthracite/70">
                      Vos guides sont en cours de téléchargement. Bonne préparation !
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="flex size-12 items-center justify-center rounded-xl bg-gold-gradient text-white shadow-gold-glow">
                        <Download className="size-6" />
                      </span>
                      <div>
                        <h3 className="font-serif text-xl font-bold text-navy">Recevoir les 2 guides</h3>
                        <p className="text-xs text-anthracite/60">Téléchargement immédiat après envoi</p>
                      </div>
                    </div>

                    <form onSubmit={submit} className="mt-8 space-y-5">
                      <div>
                        <label htmlFor="res-email" className="mb-2 block text-xs font-medium uppercase tracking-wide text-anthracite/60">
                          Votre adresse email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-anthracite/40" />
                          <Input
                            id="res-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="vous@exemple.com"
                            className="h-12 border-navy/15 bg-soft pl-11 text-navy placeholder:text-anthracite/40 focus-visible:border-gold focus-visible:ring-gold/30"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className="h-12 w-full bg-gold-gradient text-white font-semibold hover:opacity-90 hover:shadow-gold-glow"
                      >
                        {loading ? "Envoi en cours…" : "Télécharger les 2 guides"}
                        {!loading && <ArrowRight className="size-4" />}
                      </Button>

                      <p className="text-center text-[11px] leading-relaxed text-anthracite/55">
                        En téléchargeant, vous acceptez d'être recontacté par LCDE.
                        <br />Vos données restent confidentielles et ne sont jamais revendues.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
