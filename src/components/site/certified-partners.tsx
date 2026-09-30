"use client";

import Image from "next/image";
import { Reveal } from "@/components/site/reveal";
import { SectionDecor } from "@/components/site/section-decor";

const LOGOS = [
  { name: "Deloitte", src: "/logos/deloitte.svg" },
  { name: "KPMG", src: "/logos/kpmg.svg" },
  { name: "PwC", src: "/logos/pwc.svg" },
  { name: "EY", src: "/logos/ey.svg" },
  { name: "BDO", src: "/logos/bdo.svg" },
  { name: "Fidaroc Grant Thornton", src: "/logos/entreprises/fidaroc.jpeg" },
  { name: "Crowe", src: "/logos/entreprises/hgv.jpg" },
  { name: "Maphar", src: "/logos/entreprises/Maphar.jpg" },
  { name: "Danone", src: "/logos/companieslogo/danone.svg" },
  { name: "Coca-Cola", src: "/logos/coca-cola.svg" },
  { name: "TAQA Morocco", src: "/logos/companieslogo/taqa-morocco.svg" },
  { name: "Sanofi", src: "/logos/companieslogo/sanofi.svg" },
  { name: "AXA Assurance", src: "/logos/companieslogo/axa.svg" },
  { name: "TotalEnergies", src: "/logos/companieslogo/totalenergies.svg" },
  { name: "Safran", src: "/logos/companieslogo/safran.svg" },
  { name: "Crédit Agricole du Maroc", src: "/logos/companieslogo/credit-agricole.svg" },
  { name: "Marjane", src: "/logos/user-partners/marjane.jpeg" },
  { name: "LafargeHolcim", src: "/logos/user-partners/lafarge-holcim.jpeg" },
  { name: "CIH", src: "/logos/user-partners/cih.jpeg" },
  { name: "Upsilon Consulting", src: "/logos/user-partners/upsilon.png" },
  { name: "Vivo Energy", src: "/logos/user-partners/vivo-energy.png" },
  { name: "Viseo", src: "/logos/user-partners/viseo.png" },
];

function normalizedLogoSrc(src: string) {
  const withoutExtension = src.replace(/\.[^.]+$/, "");
  return `/logos/normalized/${withoutExtension.replace(/^\//, "").replaceAll("/", "-")}.webp`;
}

export function CertifiedPartners() {
  return (
    <section id="certifications" className="relative overflow-hidden bg-white py-4 md:py-6">
      {/* Background decoration */}
      <SectionDecor variant="light" pos="A" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:max-w-5xl lg:px-8 xl:max-w-6xl">
        <Reveal>
          <h2 className="font-serif text-3xl font-bold leading-[1.25] tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-[2.6rem] xl:text-[2.85rem]">
            Formation{" "}
            <span className="text-gold-gradient font-extrabold drop-shadow-sm">
              certifiée et reconnue
            </span>{" "}
            <br className="hidden md:inline" />
            auprès de nos partenaires professionnels{" "}
            <br className="hidden md:inline" />
            sur le marché d'emploi marocain et international.
          </h2>
        </Reveal>
      </div>

      {/* Logos Marquee Ribbon */}
      <div className="mt-8 sm:mt-6 overflow-hidden bg-soft/60 py-6 sm:py-8 border-y border-navy/5 relative max-w-[100vw]">
        {/* Gradients to fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 sm:w-28" />

        <div className="flex w-max animate-marquee items-center">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={i}
              className="flex h-28 w-[288px] shrink-0 items-center justify-center px-6 sm:px-10"
            >
              {/* Fixed frame: every logo gets the same visual area while keeping its proportions. */}
              <div className="relative h-20 w-56 transition-transform duration-300 hover:scale-110 sm:h-24 sm:w-64">
                  <Image
                  src={normalizedLogoSrc(logo.src)}
                  alt={logo.name}
                  fill
                  loading="eager"
                  sizes="(min-width: 640px) 256px, 224px"
                  className="object-contain mix-blend-multiply"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
