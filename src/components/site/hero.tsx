"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCanvas } from "@/components/site/hero-canvas";
import { HiggsfieldTiltCard, HiggsfieldLaserButton } from "@/components/site/higgsfield-ui";

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
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="accueil"
      className="relative overflow-hidden bg-soft pt-28 pb-20 md:pt-36 md:pb-28"
    >
      {/* ══════════════════════════════════════════════
          INTERACTIVE BACKGROUND — all 4 layers
          (canvas particles · parallax · spotlight · geometry)
          ══════════════════════════════════════════════ */}
      <HeroCanvas sectionRef={sectionRef} />

      {/* ══════════════════════════════════════════════
          FOREGROUND CONTENT — z-10 so it sits above bg
          ══════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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

          {/* Promotional cards — emoji inline, text wraps to left edge */}
          <motion.div variants={item} className="mt-10 w-full space-y-4 text-left">
            {PROMO_ITEMS.map((p, i) => (
              <HiggsfieldTiltCard key={i}>
                <div className="px-5 py-5 sm:px-6">
                  <p className="text-[15px] leading-relaxed text-anthracite sm:text-base">
                    <span className="mr-2 text-lg">{p.emoji}</span>{p.text}
                  </p>
                </div>
              </HiggsfieldTiltCard>
            ))}
          </motion.div>

          {/* CTA button */}
          <motion.div variants={item} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <HiggsfieldLaserButton asChild>
              <a href="#contact">
                Je rejoins la prochaine édition
                <ArrowRight className="size-4 ml-1" />
              </a>
            </HiggsfieldLaserButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden />
    </section>
  );
}
