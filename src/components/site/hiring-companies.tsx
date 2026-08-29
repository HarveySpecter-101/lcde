"use client";

import Image from "next/image";
import { Landmark, Globe2, Building2, Building } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

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
  { name: "PwC", src: "/logos/pwc.svg" },
  { name: "Deloitte", src: "/logos/deloitte.svg" },
  { name: "EY", src: "/logos/ey.svg" },
  { name: "KPMG", src: "/logos/kpmg.svg" },
  { name: "Mazars", src: "/logos/mazars.svg" },
  { name: "BDO", src: "/logos/bdo.svg" },
  { name: "Grant Thornton", src: "/logos/grant-thornton.svg" },
  { name: "OCP", src: "/logos/ocp.svg" },
  { name: "Renault", src: "/logos/renault.svg" },
  { name: "Danone", src: "/logos/danone.svg" },
  { name: "BMCE Bank of Africa", src: "/logos/bmce.svg" },
  { name: "Attijariwafa bank", src: "/logos/attijariwafa.svg" },
  { name: "Royal Air Maroc", src: "/logos/ram.svg" },
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
            Où vous serez <span className="text-gold">embauché</span> ?
          </h2>
        </Reveal>

        {/* Premium Sectors Grid */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {SECTORS.map((sector, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="relative flex h-full flex-col items-center rounded-[2rem] border-2 border-transparent bg-soft p-6 shadow-sm transition-all hover:border-gold/20 hover:shadow-gold-glow">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-navy-gradient text-gold shadow-lg ring-4 ring-gold/10">
                  <sector.icon className="size-10" strokeWidth={1.5} />
                </div>
                <h3 className="text-center font-sans text-sm font-bold leading-relaxed tracking-wide text-navy sm:text-base">
                  {sector.title}
                </h3>
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
          {/* Use 4 copies so translateX(-50%) shifts exactly by 2 copies seamlessly */}
          {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center justify-center px-10 sm:px-16"
            >
              <div className="relative h-12 w-32 transition-all duration-300 hover:scale-105 sm:h-16 sm:w-40">
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
