"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Landmark, Users, Sparkles, BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

const TRUST = [
  {
    icon: BadgeCheck,
    title: "Ordre des Experts-Comptables",
    desc: "Intervenants inscrits à l'OEC",
  },
  {
    icon: Award,
    title: "Profil Big Four",
    desc: "Seniors issus de grands cabinets",
  },
  {
    icon: Landmark,
    title: "Référentiel OEC / CNCC",
    desc: "Méthodologie d'audit reconnue",
  },
  {
    icon: Users,
    title: "1 500+ diplômés",
    desc: "depuis 2020",
  },
  {
    icon: ShieldCheck,
    title: "Taux d'insertion 96 %",
    desc: "jusqu'à l'emploi",
  },
];

export function TrustBadges() {
  return (
    <section className="relative overflow-hidden border-y border-navy/10 bg-white py-10 md:py-12">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.03]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex shrink-0 items-center gap-2 text-navy">
            <Sparkles className="size-5 text-gold" />
            <span className="font-serif text-sm font-bold uppercase tracking-wider">
              Ils signent la qualité LCDE
            </span>
          </div>
          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:flex-1 lg:justify-end lg:gap-6">
            {TRUST.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-2.5 rounded-xl border border-navy/10 bg-soft px-3 py-2.5 lg:bg-transparent lg:p-0 lg:border-0"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-navy-gradient text-gold">
                    <t.icon className="size-4.5" />
                  </span>
                  <div className="min-w-0 leading-tight">
                    <p className="truncate text-xs font-bold text-navy">{t.title}</p>
                    <p className="truncate text-[10px] text-anthracite/60">{t.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
