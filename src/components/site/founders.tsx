"use client";

import { motion } from "framer-motion";
import { SectionDecor } from "@/components/site/section-decor";
import { Reveal } from "@/components/site/reveal";
import { Sparkles } from "lucide-react";

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
    <section id="fondateurs" className="relative scroll-mt-20 overflow-hidden bg-[#0A0A0A] py-14 md:py-24">
      <SectionDecor variant="dark" pos="A" />

      {/* Animated floating background ambient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-20 top-1/4 size-80 rounded-full bg-gold/20 blur-3xl"
        aria-hidden
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.1, 0.05],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute -right-20 bottom-1/4 size-96 rounded-full bg-white/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white border border-white/10 shadow-sm"
          >
            <Sparkles className="size-3.5 text-gold animate-spin-slow" /> Équipe dirigeante
          </motion.span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl uppercase">
            Les <span className="text-gold-gradient">fondateurs</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            Deux praticiens complémentaires qui ont bâti LCDE sur une conviction : la formation
            doit se confronter à la réalité des dossiers.
          </p>
        </Reveal>

        <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.15} direction={i === 0 ? "right" : "left"}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative h-full rounded-3xl bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-2xl"
              >
                {/* Founder photo */}
                <div className="shrink-0 mx-auto sm:mx-0">
                  <div className="relative size-32 overflow-hidden rounded-2xl sm:size-[120px]">
                    <img
                      src={f.photo}
                      alt={`Photo de ${f.name}`}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left flex flex-col justify-center h-full pt-1 sm:pt-0">
                  <h3 className="font-serif text-[22px] sm:text-2xl font-extrabold text-[#0f172a]">
                    {f.name}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-[15px] font-medium leading-relaxed text-[#334155]">
                    {f.bio}
                  </p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
