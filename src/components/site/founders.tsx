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
    <section id="fondateurs" className="relative scroll-mt-20 overflow-hidden bg-navy py-20 md:py-28">
      <SectionDecor variant="dark" pos="A" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl uppercase">
            Les fondateurs
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
            Deux praticiens complémentaires qui ont bâti LCDE sur une conviction : la formation
            doit se confronter à la réalité des dossiers.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.1} direction={i === 0 ? "right" : "left"}>
              <motion.article
                whileHover={{ y: -4 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-navy/10 bg-white p-6 shadow-premium md:p-8"
              >
                <span className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-gold/10 blur-2xl transition-opacity group-hover:opacity-80" />
                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
                  {/* Founder photo */}
                  <div className="relative shrink-0">
                    <div className="relative size-28 overflow-hidden rounded-2xl shadow-premium sm:size-32">
                      <img
                        src={f.photo}
                        alt={`Photo de ${f.name}`}
                        className="size-full object-cover"
                      />
                      {/* Gradient overlay for premium effect */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-navy">{f.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-anthracite/75">{f.bio}</p>
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
