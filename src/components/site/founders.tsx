"use client";

import { motion } from "framer-motion";
import { SectionDecor } from "@/components/site/section-decor";
import { Reveal } from "@/components/site/reveal";
import { Sparkles, Award, ShieldCheck, CheckCircle2 } from "lucide-react";

const FOUNDERS = [
  {
    name: "Rachad GHALI",
    role: "Fondateur & Associé",
    speciality: "Audit Bancaire & Advisory",
    bio: "Manager Audit & Financial Advisory, Consultant spécialisé dans l'Audit et le Métier du secteur Bancaire.",
    photo: "/founders/rachad-ghali.jpg",
    badge: "15+ ans d'expérience",
  },
  {
    name: "Rida MOUTIK",
    role: "Fondateur & Associé",
    speciality: "Due Diligence & Audit Financier",
    bio: "Expert Comptable Mémorialiste, Manager Audit & Financial Advisory, Spécialiste en Due Diligence (financière, fiscale, sociale et juridique).",
    photo: "/founders/rida-moutik.jpg",
    badge: "Expert-Comptable Mémorialiste",
  },
];

export function Founders() {
  return (
    <section id="fondateurs" className="relative scroll-mt-20 overflow-hidden bg-[#faf9f6] py-14 md:py-24">
      <SectionDecor variant="light" pos="A" />

      {/* Animated floating background ambient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.25, 0.12],
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
          opacity: [0.1, 0.2, 0.1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute -right-20 bottom-1/4 size-96 rounded-full bg-navy/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy border border-navy/10 shadow-sm"
          >
            <Sparkles className="size-3.5 text-gold animate-spin-slow" /> Équipe dirigeante
          </motion.span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl uppercase">
            Les <span className="text-gold-gradient">fondateurs</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-anthracite/75 sm:text-base">
            Deux praticiens complémentaires qui ont bâti LCDE sur une conviction : la formation
            doit se confronter à la réalité des dossiers.
          </p>
        </Reveal>

        <div className="mt-10 sm:mt-12 grid gap-6 sm:gap-8 md:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.15} direction={i === 0 ? "right" : "left"}>
              <motion.article
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-navy/10 bg-white p-6 shadow-premium sm:p-8 hover:shadow-2xl hover:border-gold/40 transition-all duration-300"
              >
                {/* Animated shimmer glow on hover */}
                <motion.span
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-gradient-to-br from-gold/20 to-transparent blur-2xl transition-opacity group-hover:opacity-100"
                />

                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
                  {/* Founder photo with animated badge */}
                  <div className="relative shrink-0 mx-auto sm:mx-0">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="relative size-32 overflow-hidden rounded-2xl ring-4 ring-gold/30 shadow-premium sm:size-36"
                    >
                      <img
                        src={f.photo}
                        alt={`Photo de ${f.name}`}
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
                    </motion.div>

                    {/* Floating verified badge */}
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                      className="absolute -bottom-2 -right-2 flex items-center gap-1 rounded-full bg-navy px-2.5 py-1 text-[11px] font-bold text-gold shadow-md border border-gold/40"
                    >
                      <ShieldCheck className="size-3 text-gold" />
                      <span>LCDE</span>
                    </motion.div>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-gold-dark border border-gold/30">
                        <Award className="size-3 text-gold" /> {f.role}
                      </span>
                    </div>

                    <h3 className="mt-2 font-serif text-2xl font-bold text-navy group-hover:text-gold transition-colors">
                      {f.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold">
                      {f.speciality}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-anthracite/85">
                      {f.bio}
                    </p>

                    <div className="mt-4 pt-3 border-t border-navy/5 flex items-center justify-center sm:justify-start gap-2 text-xs font-medium text-navy/70">
                      <CheckCircle2 className="size-3.5 text-emerald-600" />
                      <span>{f.badge}</span>
                    </div>
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
