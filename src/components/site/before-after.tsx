"use client";

import { motion } from "framer-motion";
import { X, Check, ArrowRight, GitCompareArrows, GraduationCap, Briefcase } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

const BEFORE = [
  "Savoir académique théorique, peu confronté à la réalité des dossiers",
  "Méconnaissance des outils réels (Sage, SAP, Odoo, Power BI)",
  "Pas de méthodologie d'audit structurée",
  "Difficulté à tenir en entretien PFE et en mission",
  "Écart ressenti entre la fac et les attentes des cabinets",
];

const AFTER = [
  "Raisonner comme un praticien sur des cas réels",
  "Maîtriser les outils utilisés en cabinet et en entreprise",
  "Appliquer une démarche d'audit (ISA / CNCC) de bout en bout",
  "Arriver opérationnel dès le premier jour en stage ou en poste",
  "Parler le même langage que les seniors des Big Four",
];

export function BeforeAfter() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.04]" aria-hidden />
      <div className="pointer-events-none absolute -left-20 top-1/3 size-72 rounded-full bg-gold/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy">
            <GitCompareArrows className="size-3.5 text-gold" /> L'effet LCDE
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
            Avant / Après LCDE
          </h2>
          <p className="mt-5 text-base leading-relaxed text-anthracite/70 sm:text-lg">
            Nous comblons l'écart entre la théorie académique et les attentes réelles des cabinets.
            Voici ce qui change concrètement.
          </p>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
          {/* Before */}
          <Reveal direction="right">
            <div className="relative h-full overflow-hidden rounded-3xl border border-navy/10 bg-soft p-6 md:p-8">
              <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-anthracite/5 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-anthracite/10 text-anthracite">
                  <GraduationCap className="size-6" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-anthracite/50">Avant</p>
                  <p className="font-serif text-xl font-bold text-anthracite">Le profil académique</p>
                </div>
              </div>
              <ul className="relative mt-6 space-y-3">
                {BEFORE.map((t, i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="flex items-start gap-3 text-sm leading-relaxed text-anthracite/75"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-anthracite/10 text-anthracite">
                      <X className="size-3.5" strokeWidth={2.5} />
                    </span>
                    {t}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Arrow divider */}
          <Reveal delay={0.15} className="flex items-center justify-center">
            <div className="flex items-center justify-center lg:flex-col">
              <span className="hidden lg:block lg:h-16 lg:w-px lg:bg-gradient-to-b lg:from-transparent lg:via-gold lg:to-transparent" />
              <span className="flex size-14 items-center justify-center rounded-full bg-gold-gradient text-navy shadow-gold-glow lg:my-2">
                <ArrowRight className="size-6 lg:rotate-90" strokeWidth={2.5} />
              </span>
              <span className="hidden lg:block lg:h-16 lg:w-px lg:bg-gradient-to-b lg:from-transparent lg:via-gold lg:to-transparent" />
              <span className="lg:hidden lg:mx-2 block h-px w-12 bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>
          </Reveal>

          {/* After */}
          <Reveal direction="left" delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-emerald-brand/30 bg-emerald-brand/[0.06] p-6 shadow-premium md:p-8">
              <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-emerald-brand/15 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-emerald-brand text-white">
                  <Briefcase className="size-6" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-brand">Après</p>
                  <p className="font-serif text-xl font-bold text-navy">Le profil opérationnel</p>
                </div>
              </div>
              <ul className="relative mt-6 space-y-3">
                {AFTER.map((t, i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="flex items-start gap-3 text-sm font-medium leading-relaxed text-navy"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-brand text-white">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {t}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Bottom takeaway */}
        <Reveal delay={0.2} className="mt-10">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-2xl bg-navy-gradient p-6 text-center text-white shadow-navy-glow sm:flex-row sm:text-left">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gold text-navy">
              <Check className="size-6" strokeWidth={3} />
            </span>
            <p className="text-sm leading-relaxed sm:text-base">
              <strong className="font-semibold text-gold">Résultat :</strong> un candidat recherché
              par les Big Four, banques, assurances et multinationales — avec un taux d'insertion
              allant jusqu'à <strong className="font-semibold text-gold">96 %</strong>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
