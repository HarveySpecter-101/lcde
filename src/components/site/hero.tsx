"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const PROMO_ITEMS = [
  {
    emoji: "💯",
    text: "Une formation certifiée et reconnue, 100% pratique et complète, destinée à toutes les filières. On te prépare pour 13 métiers différents et liés entre eux, et pour toute la carrière : bien au-delà des entretiens PFE et CDI.",
  },
  {
    emoji: "✅",
    text: "+4 500 personnes formées dont +95% font leur carrière dans des postes à haute responsabilité, et les métiers les plus rémunérés sur le marché d'emploi marocain et international.",
  },
  {
    emoji: "💼",
    text: "Chaque métier est assuré par un spécialiste ; nos intervenants sont des experts comptables diplômés, des directeurs en audit, des managers au sein des cabinets Big4, des consultants financiers et des docteurs en sciences de gestion.",
  },
];

export function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-soft pt-28 pb-20 md:pt-36 md:pb-28">
      {/* ── Grid texture ── */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.04]" aria-hidden />

      {/* ── Animated glow orbs ── */}
      <div className="pointer-events-none absolute -left-32 top-24 size-72 rounded-full bg-gold/15 blur-3xl animate-orb-1" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-96 rounded-full bg-gold/10 blur-3xl animate-orb-2" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-1/3 size-64 rounded-full bg-gold/8 blur-3xl animate-orb-3" aria-hidden />

      {/* ── Geometric decorative lines (Webflow-style) ── */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
        preserveAspectRatio="none"
      >
        {/* Diagonal rule top-left */}
        <line x1="0" y1="0" x2="220" y2="220" stroke="rgba(196,169,98,0.10)" strokeWidth="1" />
        <line x1="0" y1="40" x2="180" y2="220" stroke="rgba(196,169,98,0.06)" strokeWidth="1" />
        {/* Diagonal rule top-right */}
        <line x1="100%" y1="0" x2="calc(100% - 220px)" y2="220" stroke="rgba(10,38,71,0.07)" strokeWidth="1" />
        <line x1="100%" y1="40" x2="calc(100% - 180px)" y2="220" stroke="rgba(10,38,71,0.04)" strokeWidth="1" />
        {/* Horizontal rule near bottom */}
        <line x1="0" y1="100%" x2="100%" y2="100%" stroke="rgba(196,169,98,0.18)" strokeWidth="1" />
      </svg>

      {/* ── Corner accent squares (rotated) ── */}
      <div
        className="pointer-events-none absolute left-8 top-28 size-14 rotate-[30deg] rounded-lg border border-gold/20 bg-transparent opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-8 top-36 size-10 rotate-[15deg] rounded-md border border-navy/10 bg-transparent opacity-50"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-16 left-[10%] size-8 rotate-[45deg] rounded border border-gold/15 bg-transparent opacity-40 hidden sm:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-24 right-[8%] size-12 rotate-[20deg] rounded-lg border border-navy/10 bg-transparent opacity-35 hidden sm:block"
        aria-hidden
      />

      {/* ── Dot cluster (top-right) ── */}
      <div
        className="pointer-events-none absolute right-16 top-20 hidden md:block"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(rgba(196,169,98,0.35) 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
          width: 84,
          height: 84,
          opacity: 0.5,
        }}
      />
      {/* ── Dot cluster (bottom-left) ── */}
      <div
        className="pointer-events-none absolute left-16 bottom-20 hidden md:block"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(rgba(10,38,71,0.18) 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
          width: 70,
          height: 70,
          opacity: 0.55,
        }}
      />

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          {/* Top pill badge */}
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold shadow-sm backdrop-blur-md">
              <Sparkles className="size-3.5 text-gold" />
              Le Club Des Experts
            </span>
          </motion.div>

          {/* Centered Headline */}
          <motion.h1
            variants={item}
            className="font-serif text-3xl font-bold leading-[1.2] tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-[3.25rem]"
          >
            Rejoignez{" "}
            <span className="text-gold-gradient font-extrabold drop-shadow-sm">
              la 8ème édition (2027)
            </span>{" "}
            de la formation qui vous prépare pour 13 métiers différents et complémentaires.
          </motion.h1>

          {/* Promotional cards block — emoji stacked above text */}
          <motion.div variants={item} className="mt-8 w-full space-y-3.5 text-left">
            {PROMO_ITEMS.map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col rounded-2xl border border-gold/20 bg-white/70 px-5 pt-4 pb-5 shadow-premium backdrop-blur-sm transition-all hover:border-gold/40 hover:bg-white/90 hover:shadow-gold-glow"
              >
                {/* Emoji — top line */}
                <span className="mb-2 text-xl leading-none">{p.emoji}</span>
                {/* Text — starts below emoji, no extra indent */}
                <p className="text-sm leading-relaxed text-anthracite sm:text-[15px]">
                  {p.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Centered CTA button */}
          <motion.div variants={item} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-gold-gradient text-navy font-semibold shadow-gold-glow transition-transform hover:scale-105 active:scale-95"
            >
              <a href="#contact" className="inline-flex items-center gap-2">
                Je rejoins la prochaine édition
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave divider */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden />
    </section>
  );
}
