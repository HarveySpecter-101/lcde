"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, Briefcase, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCanvas } from "@/components/site/hero-canvas";
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
          initial={false}
          animate="show"
          className="flex flex-col items-center text-center"
        >

          {/* Centered Headline */}
          <motion.h1
            variants={item}
            className="font-serif text-3xl font-bold leading-[1.2] tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-[3.25rem]"
          >
            Rejoignez <span className="text-gold-gradient font-extrabold drop-shadow-sm">la 8ème édition</span> de la formation qui vous prépare pour toute la carrière professionnelle.
          </motion.h1>

                    {/* Vision Block */}
          <motion.div variants={item} className="mt-12 w-full max-w-4xl rounded-[2rem] bg-white p-8 sm:p-12 shadow-xl border-2 border-gold relative overflow-hidden flex flex-col items-center">
            <div className="absolute -top-12 -right-12 p-8 opacity-5 pointer-events-none">
              <Sparkles className="size-64 text-gold" />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm sm:text-base font-bold text-gold relative z-10">
              <Sparkles className="size-4 sm:size-5 text-gold shrink-0" />
              <span>Notre vision</span>
            </div>
            
            <div className="relative z-10 mt-6 max-w-2xl text-lg sm:text-xl font-bold leading-snug text-navy text-center flex flex-col sm:flex-row items-center gap-4">
              <span className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold border border-gold/20 shadow-sm">
                <Target className="size-5 sm:size-6" />
              </span>
              <p className="text-center sm:text-left">Réussir votre carrière professionnelle, bien au-delá des entretiens PFE et Embauche.</p>
            </div>

            {/* Stats blocks */}
            <div className="relative z-10 mt-10 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-4 rounded-xl border border-navy/10 bg-soft/30 p-4 sm:p-5 text-left shadow-sm hover:shadow-md transition-shadow">
                <span className="mt-0.5 flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold border border-gold/20 shadow-sm">
                  <TrendingUp className="size-5 sm:size-6" strokeWidth={2.5} />
                </span>
                <p className="text-[13px] sm:text-[14px] leading-relaxed text-anthracite/90">
                  <strong className="font-bold text-navy text-base">+700</strong> personnes formées et accompagnées <strong className="font-bold text-navy">Chaque Année</strong> depuis notre création en 2020.
                </p>
              </div>
              <div className="flex items-start gap-4 rounded-xl border border-navy/10 bg-soft/30 p-4 sm:p-5 text-left shadow-sm hover:shadow-md transition-shadow">
                <span className="mt-0.5 flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold border border-gold/20 shadow-sm">
                  <Briefcase className="size-5 sm:size-6" strokeWidth={2.5} />
                </span>
                <p className="text-[13px] sm:text-[14px] leading-relaxed text-anthracite/90">
                  <strong className="font-bold text-navy text-base">+95%</strong> de nos lauréats occupent des <strong className="font-bold text-navy">postes á haute responsabilité</strong>, et touchent des salaires <strong className="font-bold text-navy">10-15.000 MAD</strong> dès la sortie d'école.
                </p>
              </div>
            </div>

            {/* CTA button */}
            <div className="relative z-10 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-gold-gradient text-navy font-semibold shadow-gold-glow transition-transform hover:scale-105 active:scale-95"
              >
                <a href="#contact" className="inline-flex items-center gap-2">
                  Nous rejoindre
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </motion.div>

      </div>
    </section>
  );
}
