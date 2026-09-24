"use client";

import { Landmark, Globe2, Building2, Building } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SectionDecor } from "@/components/site/section-decor";

const SECTORS = [
  {
    icon: Building,
    title: "CABINETS BIG4 ET GRANDS CABINETS DE CONSEIL",
  },
  {
    icon: Globe2,
    title: "MULTINATIONALES",
  },
  {
    icon: Building2,
    title: "BANQUES ET ASSURANCES",
  },
  {
    icon: Landmark,
    title: "DIRECTION GÉNÉRALE DES IMPÔTS, CNSS, MINISTÈRES, COUR DES COMPTES, ...",
  },
];

export function HiringCompanies() {
  return (
    <section id="entreprises" className="relative overflow-hidden bg-soft py-12 sm:py-16 md:py-20">
      {/* Background animated geometric elements */}
      <SectionDecor variant="light" pos="B" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
            Où vous serez <span className="text-gold font-extrabold">embauchés</span>&nbsp;?
          </h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-anthracite/75 sm:text-base">
            Des opportunités d'insertion et de carrière auprès des structures les plus prestigieuses.
          </p>
        </Reveal>

        {/* Premium Sectors Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-3 sm:gap-4">
          {SECTORS.map((sector, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="relative flex items-center gap-4 rounded-2xl border border-navy/10 bg-white px-4 py-3.5 sm:px-6 sm:py-4 shadow-sm backdrop-blur-sm transition-all hover:border-gold/30 hover:shadow-gold-glow">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-gradient text-gold shadow-md ring-2 ring-gold/15 sm:h-12 sm:w-12">
                  <sector.icon className="size-5 sm:size-6" strokeWidth={1.6} />
                </div>
                <h3 className="font-sans text-xs sm:text-sm font-bold leading-relaxed tracking-wide text-navy">
                  {sector.title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
