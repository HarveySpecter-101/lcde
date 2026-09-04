"use client";

import { motion } from "framer-motion";
import { SectionDecor } from "@/components/site/section-decor";
import { Reveal } from "@/components/site/reveal";

const FOUNDERS = [
  {
    name: "Rachad GHALI",
    bio: "Manager Audit & Financial Advisory, Consultant spécialisé dans l'Audit et le Métier du secteur Bancaire.",
    photo: "/founders/rachad-ghali.jpg",
  },
  {
    name: "Rida MOUTIK",
    bio: "Expert Comptable Mémorialiste, Manager Audit & Financial Advisory, Spécialiste en Due Diligence (financière, fiscale, sociale et juridique).",
    photo: "/founders/rida-moutik.jpg",
  },
];

export function Founders() {
  return (
    <section id="fondateurs" className="relative scroll-mt-20 overflow-hidden bg-[#faf9f6] py-14 md:py-20">
      <SectionDecor variant="light" pos="A" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy border border-navy/10">
            Équipe dirigeante
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl uppercase">
            Les fondateurs
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-anthracite/75 sm:text-base">
            Deux praticiens complémentaires qui ont bâti LCDE sur une conviction : la formation
            doit se confronter à la réalité des dossiers.
          </p>
        </Reveal>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.1} direction={i === 0 ? "right" : "left"}>
              <motion.article
                whileHover={{ y: -4 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-navy/10 bg-white p-6 shadow-premium md:p-8 hover:shadow-2xl transition-all"
              >
                <span className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-gold/15 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
                  {/* Founder photo */}
                  <div className="relative shrink-0">
                    <div className="relative size-28 overflow-hidden rounded-2xl ring-2 ring-gold/40 shadow-premium sm:size-32">
                      <img
                        src={f.photo}
                        alt={`Photo de ${f.name}`}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Gradient overlay for premium effect */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-navy group-hover:text-gold transition-colors">{f.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-anthracite/80">{f.bio}</p>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
