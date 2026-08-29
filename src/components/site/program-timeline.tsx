"use client";

import { motion } from "framer-motion";
import { CalendarRange, BookOpen, Trophy, Rocket } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

type Phase = {
  trimester: string;
  months: string;
  label: string;
  icon: typeof BookOpen;
  color: "navy" | "gold" | "emerald";
  modules: string[];
  outcome: string;
};

const PHASES: Phase[] = [
  {
    trimester: "T1",
    months: "Janvier — Mars",
    label: "Fondations",
    icon: BookOpen,
    color: "navy",
    modules: [
      "Comptabilité générale & consolidation",
      "Normes IFRS",
      "Droit des affaires",
    ],
    outcome: "Maîtrise du socle comptable, juridique et du référentiel international.",
  },
  {
    trimester: "T2",
    months: "Avril — Juin",
    label: "Audit & Fiscalité",
    icon: Trophy,
    color: "gold",
    modules: [
      "Fiscalité marocaine & internationale",
      "Audit des états financiers",
      "Commissariat aux comptes",
    ],
    outcome: "Capacité à conduire une mission d'audit et de certification.",
  },
  {
    trimester: "T3",
    months: "Juillet — Septembre",
    label: "Pilotage & RSE",
    icon: Rocket,
    color: "emerald",
    modules: [
      "Audit interne & contrôle de gestion",
      "Responsabilité Sociétale (RSE)",
      "Transaction Services & Due Diligence",
    ],
    outcome: "Vision transversale : risques, performance et durabilité.",
  },
  {
    trimester: "T4",
    months: "Octobre — Décembre",
    label: "M&A & Insertion",
    icon: Trophy,
    color: "navy",
    modules: [
      "M&A, Financial Advisory & Investment Banking",
      "Cas réels & simulations d'opérations",
      "Préparation aux entretiens & insertion",
    ],
    outcome: "Prêt pour le marché : opérationnel dès le premier jour.",
  },
];

const MONTHS = [
  "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
  "Juil", "Août", "Sept", "Oct", "Nov", "Déc",
];

const colorMap = {
  navy: {
    chip: "bg-navy-gradient text-gold",
    ring: "border-navy/20",
    accent: "text-navy",
    bar: "bg-navy",
  },
  gold: {
    chip: "bg-gold-gradient text-navy",
    ring: "border-gold/30",
    accent: "text-gold",
    bar: "bg-gold",
  },
  emerald: {
    chip: "bg-emerald-brand text-white",
    ring: "border-emerald-brand/30",
    accent: "text-emerald-brand",
    bar: "bg-emerald-brand",
  },
};

export function ProgramTimeline() {
  return (
    <section id="programme" className="relative scroll-mt-20 overflow-hidden bg-soft py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.05]" aria-hidden />
      <div className="pointer-events-none absolute -right-24 top-10 size-80 rounded-full bg-gold/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy">
            <CalendarRange className="size-3.5 text-gold" /> Programme sur 12 mois
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-navy sm:text-5xl md:text-6xl">
            Une année, quatre phases, dix modules.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-anthracite/70 sm:text-lg">
            De janvier à décembre, la formation « 10 en 1 » progresse du socle comptable aux opérations
            de M&A — pour arriver opérationnel sur le marché du travail.
          </p>
        </Reveal>

        {/* Months ruler */}
        <Reveal delay={0.1} className="mt-12">
          <div className="mb-2 flex justify-between px-1">
            {MONTHS.map((m, i) => (
              <motion.span
                key={m}
                initial={{ opacity: 0, y: -6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                className="text-[10px] font-medium uppercase tracking-wide text-anthracite/45 sm:text-xs"
              >
                {m}
              </motion.span>
            ))}
          </div>
          {/* Progress track */}
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-navy/10">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-navy via-gold to-emerald-brand"
            />
            {/* Phase-center markers (align with 4 cards) */}
            {[12.5, 37.5, 62.5, 87.5].map((pos, i) => (
              <span
                key={pos}
                className={`absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm transition-colors ${
                  i === 0 ? "bg-navy" : i === 1 ? "bg-gold" : i === 2 ? "bg-emerald-brand" : "bg-navy"
                }`}
                style={{ left: `${pos}%` }}
                aria-label={`Phase ${i + 1}`}
              />
            ))}
          </div>
        </Reveal>

        {/* Phases grid */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PHASES.map((p, i) => {
            const c = colorMap[p.color];
            return (
              <Reveal key={p.trimester} delay={i * 0.08} direction="up">
                <motion.article
                  whileHover={{ y: -6 }}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border ${c.ring} bg-white p-6 shadow-premium`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className={`flex size-11 items-center justify-center rounded-2xl ${c.chip} font-serif text-sm font-bold shadow-sm`}>
                      {p.trimester}
                    </span>
                    <span className={`flex size-10 items-center justify-center rounded-xl bg-navy/5 ${c.accent}`}>
                      <p.icon className="size-5" strokeWidth={2} />
                    </span>
                  </div>

                  {/* Label + months */}
                  <div className="mt-4">
                    <p className={`text-[11px] font-semibold uppercase tracking-wider ${c.accent}`}>{p.months}</p>
                    <h3 className="mt-1 font-serif text-xl font-bold text-navy">{p.label}</h3>
                  </div>

                  {/* Modules */}
                  <ul className="mt-4 flex-1 space-y-2 border-t border-navy/8 pt-4">
                    {p.modules.map((m) => (
                      <li key={m} className="flex items-start gap-2 text-[13px] leading-snug text-anthracite/75">
                        <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${c.bar}`} />
                        {m}
                      </li>
                    ))}
                  </ul>

                  {/* Outcome */}
                  <div className="mt-4 rounded-xl bg-soft p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-anthracite/50">
                      Résultat de phase
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-navy">{p.outcome}</p>
                  </div>

                  {/* Hover accent bar */}
                  <span className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 ${c.bar} transition-transform duration-300 group-hover:scale-x-100`} />
                </motion.article>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom note */}
        <Reveal delay={0.2} className="mt-10">
          <p className="text-center text-xs text-anthracite/50">
            Calendrier indicatif — le planning détaillé de chaque édition est communiqué sur demande.
            <a href="#contact" className="ml-1 font-semibold text-gold underline-offset-2 hover:underline">
              Demander le calendrier complet
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
