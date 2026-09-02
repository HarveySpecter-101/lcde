"use client";

import Image from "next/image";
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

const LOGOS = [
  // Banques
  { name: "Bank Al-Maghrib", src: "/logos/bank-al-maghrib.svg" },
  { name: "CIH Bank", src: "/logos/cih-bank.svg" },
  { name: "CDG", src: "/logos/cdg.svg" },
  // Autres / Consulting
  { name: "Danone", src: "/logos/danone.svg" },
  { name: "PwC", src: "/logos/pwc.svg" },
  { name: "Deloitte", src: "/logos/deloitte.svg" },
  { name: "EY", src: "/logos/ey.svg" },
  { name: "KPMG", src: "/logos/kpmg.svg" },
  { name: "BDO", src: "/logos/bdo.svg" },
  { name: "Grant Thornton", src: "/logos/grant-thornton.svg" },
  // Fin
  { name: "Royal Air Maroc", src: "/logos/royal-air-maroc.svg" },
  { name: "Coca-Cola", src: "/logos/coca-cola.svg" },
];

export function HiringCompanies() {
  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-12 sm:pt-14 sm:pb-16 md:pt-16 md:pb-18">
      {/* Background animated geometric elements */}
      <SectionDecor variant="light" pos="A" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy border border-navy/10 mb-3">
            <Landmark className="size-3.5 text-gold" /> Débouchés & Recrutement
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
            Où vous serez <span className="text-gold-gradient font-extrabold">acceptés</span> ?
          </h2>
        </Reveal>

        {/* Premium Sectors Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:gap-6">
          {SECTORS.map((sector, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="relative flex h-full flex-col items-center rounded-2xl sm:rounded-[1.75rem] border border-navy/10 bg-soft/80 p-4 sm:p-6 shadow-sm backdrop-blur-sm transition-all hover:border-gold/30 hover:bg-white hover:shadow-gold-glow">
                <div className="mb-4 sm:mb-5 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-navy-gradient text-gold shadow-md ring-2 ring-gold/15">
                  <sector.icon className="size-7 sm:size-8" strokeWidth={1.6} />
                </div>
                <h3 className="text-center font-sans text-xs sm:text-sm font-bold leading-relaxed tracking-wide text-navy">
                  {sector.title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Logos Marquee */}
      <div className="mt-10 sm:mt-12 overflow-hidden bg-soft/90 py-8 sm:py-10 border-y border-navy/5 relative max-w-[100vw]">
        {/* Gradients to fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-soft to-transparent z-10 sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-soft to-transparent z-10 sm:w-28" />
        
        <div className="flex w-max animate-marquee items-center">
          {/* Exactly 2 copies: first half scrolls out, second half replaces it seamlessly */}
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center justify-center px-6 sm:px-10"
            >
              <div className="relative h-12 w-32 transition-transform duration-300 hover:scale-110 sm:h-16 sm:w-44 md:h-18 md:w-48">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
