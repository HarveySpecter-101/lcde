"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import {
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
  MessageCircle,
  ArrowRight,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK } from "@/lib/site-data";

const GAIN_ITEMS = [
  {
    id: 1,
    icon: Target,
    badge: "100% Pratique",
    title: "Compétences réellement opérationnelles",
    sub: "Apprises par la pratique et non la théorie.",
    points: [
      "Pratique directe sur des cas réels issus de dossiers de cabinets d'expertise et d'audit",
      "Maîtrise opérationnelle des outils du marché (Sage, SAP FI/CO, Odoo, Power BI)",
      "Capacité à être immédiatement autonome et performant dès le premier jour",
    ],
  },
  {
    id: 2,
    icon: Users,
    badge: "Technique & RH",
    title: "Accompagnement à vie par nos intervenants",
    sub: "Un soutien continu même après la fin de la formation.",
    points: [
      "Assistance technique continue sur vos missions et dossiers réels en poste",
      "Conseil RH & orientation carrière personnalisée tout au long de votre parcours",
      "Mentorat direct et bienveillant assuré par des praticiens en exercice",
    ],
  },
  {
    id: 3,
    icon: FileText,
    badge: "CV & Entretiens",
    title: "Préparation complète au marché du travail",
    sub: "CV (Classique & ATS), entretiens et soft skills.",
    points: [
      "Techniques de rédaction & optimisation du CV (Classique & format ATS)",
      "Simulations d'entretiens professionnels en conditions réelles avec débriefing",
      "Perfectionnement des soft skills indispensables pour faire la différence",
    ],
  },
  {
    id: 4,
    icon: Send,
    badge: "Accès Exclusif",
    title: "Candidatures intelligentes & Base d'adresses vérifiées",
    sub: "Méthodes efficaces et exclusives pour postuler intelligemment.",
    points: [
      "Méthodes exclusives pour postuler intelligemment et capter l'attention",
      "Accès à une base de données exclusive d'adresses mails vérifiées de recruteurs",
      "Stratégies d'approche directe générant un taux élevé de convocation",
    ],
  },
  {
    id: 5,
    icon: Briefcase,
    badge: "Insertion Pro",
    title: "Réseau de partenaires & Aide aux stages et emplois",
    sub: "Priorité absolue aux offres auprès de nos partenaires professionnels.",
    points: [
      "Réseau de partenaires professionnels exclusifs (Big 4, banques, multinationales)",
      "Aide active à l'insertion : stages rémunérés, pré-embauches et emplois",
      "Priorité accordée à nos participants sur les recrutements partenaires",
    ],
  },
  {
    id: 6,
    icon: Award,
    badge: "Recommandation LCDE",
    title: "Recommandations exclusives “Le Club Des Experts”",
    sub: "Recommandations officielles et réseautage ciblé.",
    points: [
      "Recommandations exclusives appuyant officiellement votre dossier auprès des cabinets",
      "Réseautage ciblé et prioritaire avec notre écosystème de recruteurs",
      "Mise en relation privilégiée avec la communauté d'alumni déjà en poste",
    ],
  },
  {
    id: 7,
    icon: GraduationCap,
    badge: "+15 ans d'expérience",
    title: "Experts et intervenants de très haut niveau",
    sub: "+10 intervenants avec un minimum de 15 ans d'expérience.",
    points: [
      "Associés & Senior Managers Big Four (PwC, Deloitte, EY, Mazars...)",
      "Commissaires aux comptes et Experts-comptables diplômés de l'OEC",
      "Partage d'expériences concrètes, méthodologies et secrets du métier",
    ],
  },
  {
    id: 8,
    icon: Laptop,
    badge: "Flexibilité Totale",
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

  const whatsappPaymentLink = `https://wa.me/212777293083?text=${encodeURIComponent(
    "Bonjour Le Club Des Experts, je souhaite avoir des informations sur les réductions et facilités de paiements en tranches pour la formation."
  )}`;

  return (
    <section
      id="ce-que-vous-gagnez"
      className="relative scroll-mt-20 overflow-hidden bg-[#faf9f5] py-20 md:py-28 border-b border-navy/5"
    >
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.06]" aria-hidden />
      <div className="pointer-events-none absolute -right-24 top-1/4 size-96 rounded-full bg-gold/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-24 bottom-1/4 size-96 rounded-full bg-navy/5 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy border border-navy/10">
            <Sparkles className="size-3.5 text-gold" /> Avantages & Valeur Exclusifs
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-navy sm:text-5xl md:text-6xl">
            Ce que vous <span className="text-gold-gradient">gagnez</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-anthracite/75 sm:text-lg">
            Bien plus qu'un programme de cours : découvrez vos avantages exclusifs et votre accompagnement
            complet conçus pour propulser votre carrière.
          </p>
        </Reveal>

        {/* ═══════════ SLIDER / CAROUSEL ═══════════ */}
        <Reveal delay={0.15} className="mt-14">
          <div
            className="relative mx-auto max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            {/* ← Previous button */}
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Avantage précédent"
              className="absolute -left-4 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-premium transition-all hover:bg-navy hover:text-white hover:scale-105 sm:-left-16"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* → Next button */}
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Avantage suivant"
              className="absolute -right-4 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-premium transition-all hover:bg-navy hover:text-white hover:scale-105 sm:-right-16"
            >
              <ChevronRight className="size-6" />
            </button>

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
                  <div className="relative overflow-hidden rounded-3xl border border-navy/10 bg-white p-7 sm:p-10 shadow-premium">
                    {/* Number watermark */}
                    <span className="pointer-events-none absolute right-6 top-4 font-serif text-6xl sm:text-8xl font-bold text-navy opacity-5">
                      {String(currentItem.id).padStart(2, "0")}
                    </span>

                    {/* Gold accent top bar */}
                    <span className="absolute inset-x-0 top-0 h-1.5 bg-gold" />

                    {/* Header of slide */}
                    <div className="relative z-10 flex items-start gap-4 sm:gap-6">
                      <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-navy-gradient text-gold shadow-navy-glow">
                        <currentItem.icon className="size-8" strokeWidth={1.9} />
                      </span>
                      <div className="flex-1 pr-12 sm:pr-20">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-soft px-3 py-1 text-xs font-semibold text-navy border border-navy/10">
                          <Sparkles className="size-3 text-gold" />
                          {currentItem.badge}
                        </span>
                        <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-navy sm:text-3xl">
                          {currentItem.title}
                        </h3>
                        <p className="mt-1 text-sm sm:text-base font-semibold text-gold font-sans">
                          {currentItem.sub}
                        </p>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <div className="mt-6 sm:mt-8 border-t border-navy/8 pt-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-anthracite/50 mb-3">
                        Ce que cela comprend concrètement :
                      </p>
                      <ul className="space-y-3">
                        {currentItem.points.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-anthracite/85">
                            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                              <CheckCircle2 className="size-4" />
                            </span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ──── Dot indicators ──── */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {GAIN_ITEMS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  aria-label={`Aller au slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-gold"
                      : "w-2 bg-navy/20 hover:bg-navy/40"
                  }`}
                />
              ))}
            </div>

            {/* Counter */}
            <p className="mt-2 text-center text-xs font-semibold text-anthracite/50">
              {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
          </div>
        </Reveal>

        {/* Highlight Card: Réductions et Paiements en tranches */}
        <Reveal delay={0.2} className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border-2 border-gold/30 bg-navy-gradient p-8 text-white shadow-navy-glow md:p-10">
            {/* Ambient gold glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-gold/20 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-dots opacity-10" />

            <div className="relative z-10 flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold backdrop-blur-sm border border-white/10 mb-4">
                  <Heart className="size-3.5 fill-red-500 text-red-500" /> Facilités de paiement
                </div>
                <h3 className="font-serif text-2xl font-bold sm:text-3xl md:text-4xl text-white">
                  ❤️ Réductions et Paiements en tranches
                </h3>
                <p className="mt-2 text-base sm:text-lg font-medium text-gold">
                  N'hésites pas à nous en parler, nous sommes à ton écoute 🙏
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                  Nous croyons fermement que l'aspect financier ne doit jamais être un obstacle à votre insertion
                  et votre progression. Des facilités de paiement échelonné adaptées à votre profil ainsi que des réductions
                  personnalisées sont mises à votre disposition.
                </p>
              </div>

              {/* Call to action buttons */}
              <div className="flex flex-col sm:flex-row shrink-0 gap-3 w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-600 text-white font-semibold hover:bg-emerald-500 shadow-md hover:shadow-lg transition-all"
                >
                  <a
                    href={whatsappPaymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="size-5" />
                    Échanger sur WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-gold text-navy font-semibold hover:bg-gold/90 shadow-gold-glow transition-all"
                >
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2">
                    Rejoindre la formation
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
