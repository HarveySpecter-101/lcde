"use client";

import { useState, useEffect, useCallback } from "react";
import { SectionDecor } from "@/components/site/section-decor";

import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import {
  CreditCard,
  Target,
  Users,
  FileText,
  Send,
  Briefcase,
  Award,
  GraduationCap,
  Laptop,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";

const GAIN_ITEMS = [
  {
    id: 1,
    icon: CreditCard,
    title: "Réductions et Paiements en tranches",
    sub: "N'hésites pas à nous en parler, nous sommes à ton écoute 🙏",
    points: [
      "Paiements échelonnés en plusieurs tranches sans frais adaptés à votre situation",
      "Réductions personnalisées et tarifs préférentiels selon votre profil",
      "Facilités d'accès immédiat à l'ensemble du programme d'élite et de son réseau",
    ],
  },
  {
    id: 2,
    icon: Target,
    title: "Compétences réellement opérationnelles",
    sub: "Apprises par la pratique et non la théorie.",
    points: [
      "Pratique directe sur des cas réels issus de dossiers de cabinets d'expertise et d'audit",
      "Maîtrise opérationnelle des outils du marché (Sage, SAP FI/CO, Odoo, Power BI)",
      "Capacité à être immédiatement autonome et performant dès le premier jour",
    ],
  },
  {
    id: 3,
    icon: Users,
    title: "Accompagnement à vie par nos intervenants",
    sub: "Un soutien continu même après la fin de la formation.",
    points: [
      "Assistance technique continue sur vos missions et dossiers réels en poste",
      "Conseil RH & orientation carrière personnalisée tout au long de votre parcours",
      "Mentorat direct et bienveillant assuré par des praticiens en exercice",
    ],
  },
  {
    id: 4,
    icon: FileText,
    title: "Préparation complète au marché du travail",
    sub: "CV (Classique & ATS), entretiens et soft skills.",
    points: [
      "Techniques de rédaction & optimisation du CV (Classique & format ATS)",
      "Simulations d'entretiens professionnels en conditions réelles avec débriefing",
      "Perfectionnement des soft skills indispensables pour faire la différence",
    ],
  },
  {
    id: 5,
    icon: Send,
    title: "Candidatures intelligentes & Base d'adresses vérifiées",
    sub: "Méthodes efficaces et exclusives pour postuler intelligemment.",
    points: [
      "Méthodes exclusives pour postuler intelligemment et capter l'attention",
      "Accès à une base de données exclusive d'adresses mails vérifiées de recruteurs",
      "Stratégies d'approche directe générant un taux élevé de convocation",
    ],
  },
  {
    id: 6,
    icon: Briefcase,
    title: "Réseau de partenaires & Aide aux stages et emplois",
    sub: "Priorité absolue aux offres auprès de nos partenaires professionnels.",
    points: [
      "Réseau de partenaires professionnels exclusifs (Big 4, banques, multinationales)",
      "Aide active à l'insertion : stages rémunérés, pré-embauches et emplois",
      "Priorité accordée à nos participants sur les recrutements partenaires",
    ],
  },
  {
    id: 7,
    icon: Award,
    title: "Recommandations exclusives “Le Club Des Experts”",
    sub: "Recommandations officielles et réseautage ciblé.",
    points: [
      "Recommandations exclusives appuyant officiellement votre dossier auprès des cabinets",
      "Réseautage ciblé et prioritaire avec notre écosystème de recruteurs",
      "Mise en relation privilégiée avec la communauté d'alumni déjà en poste",
    ],
  },
  {
    id: 8,
    icon: GraduationCap,
    title: "Experts et intervenants de très haut niveau",
    sub: "+10 intervenants avec un minimum de 15 ans d'expérience.",
    points: [
      "Associés & Senior Managers Big Four (PwC, Deloitte, EY, Mazars...)",
      "Commissaires aux comptes et Experts-comptables diplômés de l'OEC",
      "Partage d'expériences concrètes, méthodologies et secrets du métier",
    ],
  },
  {
    id: 9,
    icon: Laptop,
    title: "100% à distance, En Direct & Replays disponibles",
    sub: "Séances interactives en direct et simultanément enregistrées.",
    points: [
      "Séances tenues 100% en direct avec échanges et questions-réponses en temps réel",
      "Enregistrements intégraux disponibles pour revoir les séances à votre rythme",
      "Possibilité de rattraper et réviser convenablement et sans aucune pression",
    ],
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const SWIPE_THRESHOLD = 50;

export function WhatYouGain() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = GAIN_ITEMS.length;

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => {
        let next = prev + dir;
        if (next < 0) next = total - 1;
        if (next >= total) next = 0;
        return next;
      });
    },
    [total]
  );

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused, total]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) paginate(1);
    else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1);
  };

  const currentItem = GAIN_ITEMS[current];

  return (
    <section
      id="ce-que-vous-gagnez"
      className="relative scroll-mt-20 overflow-hidden bg-[#faf9f5] py-14 md:py-22 border-b border-navy/5"
    >
      <SectionDecor variant="light" pos="C" />

      {/* Floating background ambient animation */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 top-1/3 size-96 rounded-full bg-gold/20 blur-3xl"
        aria-hidden
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.25, 0.1],
          x: [0, -20, 0],
          y: [0, 25, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute -left-20 bottom-1/4 size-80 rounded-full bg-navy/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy border border-navy/10 shadow-sm"
          >
            <Sparkles className="size-3.5 text-gold animate-pulse" /> Avantages & Valeur Exclusifs
          </motion.span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
            Ce que vous <span className="text-gold-gradient">gagnez aussi</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-anthracite/75 sm:text-base">
            Bien plus qu'un programme de cours : découvrez vos avantages exclusifs et votre accompagnement
            complet conçus pour propulser votre carrière.
          </p>
        </Reveal>

        {/* ═══════════ SLIDER / CAROUSEL ═══════════ */}
        <Reveal delay={0.15} className="mt-8 sm:mt-10">
          <div
            className="relative mx-auto max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            {/* ← Previous button */}
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Avantage précédent"
              className="absolute -left-4 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-premium transition-all hover:bg-navy hover:text-white sm:-left-16"
            >
              <ChevronLeft className="size-6" />
            </motion.button>

            {/* Next button → */}
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={() => paginate(1)}
              aria-label="Avantage suivant"
              className="absolute -right-4 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-premium transition-all hover:bg-navy hover:text-white sm:-right-16"
            >
              <ChevronRight className="size-6" />
            </motion.button>

            {/* Slide container */}
            <div className="overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  onDragEnd={handleDragEnd}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <div className="relative overflow-hidden rounded-3xl border border-navy/10 bg-white p-6 sm:p-8 md:p-10 shadow-premium">
                    {/* Gold accent top bar */}
                    <span className="absolute inset-x-0 top-0 h-1.5 bg-gold" />

                    {/* Header of slide */}
                    <div className="relative z-10 flex items-start gap-4 sm:gap-6">
                      <motion.span
                        animate={{ rotate: [0, -3, 3, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="flex size-14 sm:size-16 shrink-0 items-center justify-center rounded-2xl bg-navy-gradient text-gold shadow-navy-glow"
                      >
                        <currentItem.icon className="size-7 sm:size-8" strokeWidth={1.9} />
                      </motion.span>
                      <div className="flex-1 pr-8 sm:pr-14">
                        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-navy">
                          {currentItem.title}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm md:text-base font-semibold text-gold font-sans">
                          {currentItem.sub}
                        </p>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <div className="mt-5 sm:mt-6 border-t border-navy/8 pt-5">
                      <ul className="space-y-2.5 sm:space-y-3">
                        {currentItem.points.map((pt, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.08 }}
                            className="flex items-start gap-3 text-xs sm:text-sm md:text-base leading-relaxed text-anthracite/85"
                          >
                            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                              <CheckCircle2 className="size-4" />
                            </span>
                            <span>{pt}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination dots */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {GAIN_ITEMS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  aria-label={`Aller à l'avantage ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-gold shadow-gold-glow" : "w-2.5 bg-navy/20 hover:bg-navy/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
