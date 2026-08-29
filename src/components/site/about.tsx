"use client";

import { motion } from "framer-motion";
import { Target, Eye, Gem, Building2, CalendarDays, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { AnimatedCounter } from "@/components/site/animated-counter";
import { LCDE } from "@/lib/site-data";

const VALUES = [
  {
    icon: Gem,
    title: "Exigence",
    desc: "Le niveau d'un cabinet international : rigueur méthodologique et qualité de production.",
  },
  {
    icon: Target,
    title: "Pratique réelle",
    desc: "Des cas concrets issus de dossiers réels, jamais de théorie hors-sol.",
  },
  {
    icon: Target,
    title: "Accompagnement",
    desc: "Un suivi personnalisé par des praticiens qui s'engagent sur vos résultats.",
  },
];

const MILESTONES: {
  icon: typeof CalendarDays;
  value?: string;
  numeric?: number;
  suffix?: string;
  label: string;
}[] = [
  { icon: CalendarDays, numeric: 2020, label: "Année de création" },
  { icon: Building2, value: "Casablanca", label: "Siège — Maroc" },
  { icon: Sparkles, value: "5ᵉ/6ᵉ", label: "Édition en cours" },
];

export function About() {
  return (
    <section id="apropos" className="relative scroll-mt-20 overflow-hidden bg-soft py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy">
            <Eye className="size-3.5 text-gold" />
            À propos de LCDE
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-navy sm:text-5xl md:text-6xl">
            Une école née du terrain, pensée pour le terrain.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-anthracite/70 sm:text-lg">
            Depuis 2020, <strong className="font-semibold text-navy">Le Club Des Experts</strong> comble l'écart
            entre la théorie académique et les attentes réelles des cabinets et entreprises. Notre mission :
            rendre chaque candidat <strong className="font-semibold text-navy">opérationnel dès le premier jour</strong>.
          </p>
        </Reveal>

        {/* Milestones */}
        <Reveal delay={0.1} className="mt-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {MILESTONES.map((m) => (
              <motion.div
                key={m.label}
                whileHover={{ y: -3 }}
                className="flex items-center gap-4 rounded-2xl border border-navy/10 bg-white p-5 shadow-premium"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy-gradient text-gold">
                  <m.icon className="size-6" />
                </span>
                <div className="min-w-0">
                  {m.numeric !== undefined ? (
                    <p className="font-serif text-xl font-bold text-navy">
                      <AnimatedCounter value={m.numeric} suffix={m.suffix ?? ""} />
                    </p>
                  ) : (
                    <p className="font-serif text-xl font-bold text-navy">{m.value}</p>
                  )}
                  <p className="text-sm text-anthracite/60">{m.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Mission + Values */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="right">
            <div className="relative h-full overflow-hidden rounded-3xl bg-navy-gradient p-8 text-white shadow-navy-glow md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-gold/20 blur-3xl" />
              <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.08]" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
                  <Target className="size-3.5" /> Notre mission
                </span>
                <h3 className="mt-5 font-serif text-2xl font-bold leading-tight md:text-3xl">
                  « Créons les experts de demain. »
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/80">
                  Transformer des étudiants et jeunes diplômés en profils recherchés par les Big Four, les banques,
                  les assurances et les multinationales — en leur donnant accès aux méthodes, outils et réflexes
                  des praticiens confirmés.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-white/85">
                  {[
                    "10 modules couvrant tout le spectre audit / finance / fiscalité",
                    "Outils réels : Sage, SAP FI/CO, Odoo, Excel/VBA, Power BI",
                    "Intervenants inscrits à l'Ordre des Experts Comptables",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="flex flex-col justify-center gap-4">
            <h3 className="font-serif text-2xl font-bold text-navy">Nos valeurs</h3>
            <p className="text-sm text-anthracite/70">
              Une exigence de niveau international appliquée à chaque détail de la formation.
            </p>
            <div className="space-y-3">
              {VALUES.map((v) => (
                <motion.div
                  key={v.title}
                  whileHover={{ x: 4 }}
                  className="flex gap-4 rounded-2xl border border-navy/10 bg-white p-5 shadow-premium"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <v.icon className="size-6" />
                  </span>
                  <div>
                    <p className="font-semibold text-navy">{v.title}</p>
                    <p className="mt-0.5 text-sm text-anthracite/70">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
