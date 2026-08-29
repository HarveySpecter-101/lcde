"use client";

import { motion } from "framer-motion";
import { Clock, Layers, Wrench, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { AnimatedCounter } from "@/components/site/animated-counter";

const FORMATION_STATS = [
  { icon: Clock, value: 500, suffix: "+", label: "Heures de formation", sub: "sur 12 mois" },
  { icon: Layers, value: 10, suffix: "", label: "Modules spécialisés", sub: "en un seul parcours" },
  { icon: Wrench, value: 5, suffix: "", label: "Outils maîtrisés", sub: "Sage · SAP · Odoo · BI" },
  { icon: GraduationCap, value: 1500, suffix: "+", label: "Diplômés accompagnés", sub: "depuis 2020" },
];

export function FormationStats() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-secondary py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.06]" aria-hidden />
      <div className="pointer-events-none absolute -left-20 top-0 size-72 rounded-full bg-gold/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-sm font-medium text-navy mb-4 border border-navy/10">
            <Layers className="size-4 text-gold" /> En résumé
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-navy">
            La formation en chiffres
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {FORMATION_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group relative flex flex-col items-center rounded-2xl border border-border bg-card p-5 text-center shadow-premium md:p-6"
              >
                <span className="mb-3 flex size-11 items-center justify-center rounded-xl bg-navy-gradient text-gold transition-transform group-hover:scale-110">
                  <s.icon className="size-5" strokeWidth={2} />
                </span>
                <p className="font-serif text-3xl font-bold text-navy sm:text-4xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1.5 text-sm font-semibold text-navy">{s.label}</p>
                <p className="mt-0.5 text-xs text-anthracite/60">{s.sub}</p>

                {/* Gold accent line */}
                <span className="absolute inset-x-6 bottom-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
