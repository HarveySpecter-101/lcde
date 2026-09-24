"use client";

import Image from "next/image";
import { Reveal } from "@/components/site/reveal";
import { SectionDecor } from "@/components/site/section-decor";

const LOGOS = [
  { name: "Deloitte", src: "/logos/deloitte.svg" },
  { name: "KPMG", src: "/logos/kpmg.svg" },
  { name: "Forvis Mazars", src: "/logos/mazars.svg" },
  { name: "PwC", src: "/logos/pwc.svg" },
  { name: "EY", src: "/logos/ey.svg" },
  { name: "BDO", src: "/logos/bdo.svg" },
  { name: "Grant Thornton", src: "/logos/grant-thornton.svg" },
  { name: "OCP", src: "/logos/ocp.svg" },
  { name: "Attijariwafa bank", src: "/logos/attijariwafa.svg" },
  { name: "Banque Populaire", src: "/logos/banque-populaire.svg" },
  { name: "BMCE", src: "/logos/bmce.svg" },
  { name: "CIH Bank", src: "/logos/cih-bank.svg" },
  { name: "Bank Al-Maghrib", src: "/logos/bank-al-maghrib.svg" },
  { name: "CDG", src: "/logos/cdg.svg" },
  { name: "Danone", src: "/logos/danone.svg" },
  { name: "Royal Air Maroc", src: "/logos/royal-air-maroc.svg" },
  { name: "Coca-Cola", src: "/logos/coca-cola.svg" },
];

export function CertifiedPartners() {
  return (
    <section id="certifications" className="relative overflow-hidden bg-white pt-10 pb-12 sm:pt-14 sm:pb-16 md:pt-16 md:pb-20">
      {/* Background decoration */}
      <SectionDecor variant="light" pos="A" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-serif text-3xl font-bold leading-[1.2] tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Formations{" "}
            <span className="text-gold-gradient font-extrabold drop-shadow-sm">
              certifiées et reconnues
            </span>{" "}
            auprès de nos partenaires professionnels sur le marché d'emploi marocain et international.
          </h2>
        </Reveal>
      </div>

      {/* Logos Marquee Ribbon */}
      <div className="mt-8 sm:mt-12 overflow-hidden bg-soft/60 py-6 sm:py-8 border-y border-navy/5 relative max-w-[100vw]">
        {/* Gradients to fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 sm:w-28" />

        <div className="flex w-max animate-marquee items-center">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center justify-center px-6 sm:px-10"
            >
              <div className="relative h-11 w-28 transition-transform duration-300 hover:scale-110 sm:h-14 sm:w-40 md:h-16 md:w-44">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  loading="eager"
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
