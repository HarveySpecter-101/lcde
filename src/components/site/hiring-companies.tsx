"use client";

import { motion } from "framer-motion";
import { Landmark, Globe2, Building2, Building } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

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
  "PwC",
  "Deloitte",
  "EY",
  "KPMG",
  "Mazars",
  "BDO",
  "Grant Thornton",
  "Ministère des Finances",
  "Direction Générale des Impôts",
  "Cour des Comptes",
  "Bank Al-Maghrib",
  "Banque Populaire",
  "Attijariwafa bank",
  "BMCE Bank of Africa",
  "CNSS",
  "CDG",
  "OCP",
  "Royal Air Maroc",
  "Renault",
  "Danone",
];

export function HiringCompanies() {
  return (
    <section className="relative overflow-hidden border-y border-navy/10 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold mb-4">
            <Landmark className="size-7" />
          </div>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-navy sm:text-5xl md:text-6xl">
            Où vous serez embauché ?
          </h2>
        </Reveal>

        {/* Sectors Grid */}
        <div className="mt-12 grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
          {SECTORS.map((sector, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex h-full flex-col items-center justify-start text-center">
                <div className="flex h-16 w-16 items-center justify-center text-navy mb-4">
                  <sector.icon className="size-10 opacity-80" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-bold leading-tight text-navy uppercase md:text-base">
                  {sector.title}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Logos Marquee */}
      <div className="mt-20 overflow-hidden bg-soft py-10 border-y border-navy/5 relative flex max-w-[100vw]">
        {/* Gradients to fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-soft to-transparent z-10 sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-soft to-transparent z-10 sm:w-32" />
        
        <div className="flex w-max animate-marquee items-center">
          {/* Double the logos to make the infinite loop seamless */}
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center justify-center px-8 sm:px-12"
            >
              <span className="font-serif text-3xl font-bold text-anthracite/40 tracking-tight transition-colors hover:text-navy/80 cursor-default">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
