"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

const FOUNDERS = [
  {
    name: "Rachad GHALI",
    role: 'Co-fondateur "Le Club Des Experts"',
    bio: "Manager Audit & Financial Advisory, Consultant spécialisé dans l'Audit et le Métier du secteur Bancaire.",
    badge: "Audit & Banking",
    photo: "/founders/rachad-ghali.jpg",
  },
  {
    name: "Rida MOUTIK",
    role: 'Co-fondateur "Le Club Des Experts"',
    bio: "Expert Comptable Mémorialiste, Manager Audit & Financial Advisory, Spécialiste en Due Diligence (financière, fiscale, sociale et juridique).",
    badge: "EC & Due Diligence",
    photo: "/founders/rida-moutik.jpg",
  },
];

export function Founders() {
  return (
    <section id="fondateurs" className="relative scroll-mt-20 overflow-hidden bg-soft py-20 md:py-28">
      <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-gold/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy">
            <Users className="size-3.5 text-gold" /> Les fondateurs
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
            À l'initiative du Club
          </h2>
          <p className="mt-5 text-base leading-relaxed text-anthracite/70 sm:text-lg">
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
                        alt={`Photo de ${f.name}, ${f.role} au LCDE`}
                        className="size-full object-cover"
                      />
                      {/* Gradient overlay for premium effect */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold-gradient px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-gold-glow">
                      {f.badge}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-navy">{f.name}</h3>
                    <p className="text-sm font-medium text-gold">{f.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-anthracite/70">{f.bio}</p>
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
