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
      {/* ════════════════════════════════════════
          WEBFLOW-STYLE HERO BACKGROUND
          Navy #0a2647 · Gold #c4a962 · Soft #f6f4ef
          ════════════════════════════════════════ */}

      {/* 1 ── Fine grid baseline */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" aria-hidden />

      {/* 2 ── Diagonal gradient sweep (Stripe / Webflow signature) */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(135deg, rgba(196,169,98,0.07) 0%, transparent 40%, rgba(10,38,71,0.05) 100%)",
        }}
      />

      {/* 3 ── Large animated orbs — boosted opacity */}
      <div className="pointer-events-none absolute -left-24 top-12 size-[26rem] rounded-full bg-gold/20 blur-[80px] animate-orb-1" aria-hidden />
      <div className="pointer-events-none absolute -right-20 -bottom-8 size-[32rem] rounded-full bg-gold/14 blur-[100px] animate-orb-2" aria-hidden />
      <div className="pointer-events-none absolute left-[35%] top-[30%] size-80 rounded-full bg-navy/10 blur-[70px] animate-orb-3" aria-hidden />

      {/* 4 ── Concentric circle rings — top-right (Webflow hero signature) */}
      <div className="pointer-events-none absolute -right-40 -top-40 size-[640px] rounded-full border-2 border-gold/18" aria-hidden />
      <div className="pointer-events-none absolute -right-28 -top-28 size-[500px] rounded-full border border-gold/13" aria-hidden />
      <div className="pointer-events-none absolute -right-16 -top-16 size-[360px] rounded-full border border-gold/10" aria-hidden />
      <div className="pointer-events-none absolute -right-6  -top-6  size-[240px] rounded-full border border-gold/[0.07]" aria-hidden />

      {/* 5 ── Concentric circle rings — bottom-left */}
      <div className="pointer-events-none absolute -left-40 -bottom-40 size-[560px] rounded-full border-2 border-navy/12" aria-hidden />
      <div className="pointer-events-none absolute -left-28 -bottom-28 size-[420px] rounded-full border border-navy/9" aria-hidden />
      <div className="pointer-events-none absolute -left-14 -bottom-14 size-[300px] rounded-full border border-gold/[0.10]" aria-hidden />

      {/* 6 ── SVG: bold diagonal lines + gradient horizontal rule */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(196,169,98,0)" />
            <stop offset="25%"  stopColor="rgba(196,169,98,0.25)" />
            <stop offset="75%"  stopColor="rgba(196,169,98,0.25)" />
            <stop offset="100%" stopColor="rgba(196,169,98,0)" />
          </linearGradient>
          <linearGradient id="dGold1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="rgba(196,169,98,0.15)" />
            <stop offset="100%" stopColor="rgba(196,169,98,0)" />
          </linearGradient>
          <linearGradient id="dNavy1" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="rgba(10,38,71,0.12)" />
            <stop offset="100%" stopColor="rgba(10,38,71,0)" />
          </linearGradient>
        </defs>

        {/* Diagonal lines left-to-right (gold) */}
        <line x1="0" y1="0" x2="28%" y2="100%" stroke="url(#dGold1)" strokeWidth="1.5" />
        <line x1="6%" y1="0" x2="34%" y2="100%" stroke="rgba(196,169,98,0.07)" strokeWidth="1" />

        {/* Diagonal lines right-to-left (navy) */}
        <line x1="100%" y1="0" x2="72%" y2="100%" stroke="url(#dNavy1)" strokeWidth="1.5" />
        <line x1="94%" y1="0" x2="66%" y2="100%" stroke="rgba(10,38,71,0.06)" strokeWidth="1" />

        {/* Horizontal accent rule — gold fade through center */}
        <line x1="4%" y1="62%" x2="96%" y2="62%" stroke="url(#hGold)" strokeWidth="1" />
        {/* Top thin rule */}
        <line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(196,169,98,0.12)" strokeWidth="1" />
        {/* Bottom thin rule */}
        <line x1="0" y1="100%" x2="100%" y2="100%" stroke="rgba(196,169,98,0.20)" strokeWidth="1" />
      </svg>

      {/* 7 ── Large "LCDE" watermark text */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
        aria-hidden
      >
        <span
          className="font-serif font-extrabold uppercase text-navy leading-none"
          style={{ fontSize: "clamp(120px, 22vw, 280px)", opacity: 0.025, letterSpacing: "-0.04em" }}
        >
          LCDE
        </span>
      </div>

      {/* 8 ── Dot matrix — top-right */}
      <div
        className="pointer-events-none absolute top-16 right-6 sm:right-20"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(rgba(196,169,98,0.55) 1.8px, transparent 1.8px)",
          backgroundSize: "16px 16px",
          width: 112,
          height: 112,
          opacity: 0.65,
        }}
      />

      {/* 9 ── Dot matrix — bottom-left */}
      <div
        className="pointer-events-none absolute bottom-10 left-6 sm:left-20"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(rgba(10,38,71,0.30) 1.8px, transparent 1.8px)",
          backgroundSize: "16px 16px",
          width: 96,
          height: 96,
          opacity: 0.70,
        }}
      />

      {/* 10 ── Rotated accent squares — corners */}
      <div className="pointer-events-none absolute left-5 top-24 size-[60px] rotate-[28deg] rounded-xl border-2 border-gold/30" aria-hidden />
      <div className="pointer-events-none absolute left-10 top-32 size-[38px] rotate-[28deg] rounded-lg border border-gold/15" aria-hidden />
      <div className="pointer-events-none absolute right-5 top-28 size-[44px] rotate-[-16deg] rounded-xl border-2 border-navy/18" aria-hidden />
      <div className="pointer-events-none absolute bottom-10 right-[12%] size-[50px] rotate-[20deg] rounded-xl border border-gold/22" aria-hidden />
      <div className="pointer-events-none absolute bottom-16 left-[14%] size-[32px] rotate-[45deg] rounded-md border-2 border-gold/20" aria-hidden />

      {/* 11 ── Gold cross ("+") accents */}
      <svg className="pointer-events-none absolute left-[42%] top-5 opacity-[0.22]" aria-hidden width="28" height="28" viewBox="0 0 28 28" fill="none">
        <line x1="14" y1="0" x2="14" y2="28" stroke="#c4a962" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="14" x2="28" y2="14" stroke="#c4a962" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <svg className="pointer-events-none absolute right-[22%] bottom-8 opacity-[0.18]" aria-hidden width="22" height="22" viewBox="0 0 22 22" fill="none">
        <line x1="11" y1="0" x2="11" y2="22" stroke="#c4a962" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="11" x2="22" y2="11" stroke="#c4a962" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <svg className="pointer-events-none absolute left-[18%] bottom-20 opacity-[0.14]" aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none">
        <line x1="9" y1="0" x2="9" y2="18" stroke="#0a2647" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="9" x2="18" y2="9" stroke="#0a2647" strokeWidth="2" strokeLinecap="round" />
      </svg>

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

          {/* Promotional cards — emoji inline at start, text wraps to left edge */}
          <motion.div variants={item} className="mt-8 w-full space-y-3.5 text-left">
            {PROMO_ITEMS.map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-gold/20 bg-white/70 px-5 py-4 shadow-premium backdrop-blur-sm transition-all hover:border-gold/40 hover:bg-white/90 hover:shadow-gold-glow"
              >
                <p className="text-sm leading-relaxed text-anthracite sm:text-[15px]">
                  <span className="mr-1.5 text-base">{p.emoji}</span>{p.text}
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
