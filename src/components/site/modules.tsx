"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import {
  ArrowUpRight,
  Layers,
  Clock,
  Wrench,
  GraduationCap,
  X,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";

import { MODULES, TOOLS, type Module } from "@/lib/site-data";
import { PricingModal } from "@/components/site/pricing-modal";

/* ------------------------------------------------------------------ */
/*  Slide transition variants                                         */
/* ------------------------------------------------------------------ */
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

export function Modules() {
  /* ----- carousel state ----- */
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = MODULES.length;

  /* ----- popup state ----- */
  const [popupIndex, setPopupIndex] = useState<number | null>(null);
  const popupModule = popupIndex !== null ? MODULES[popupIndex] : null;

  /* ----- pricing modal ----- */
  const [pricingOpen, setPricingOpen] = useState(false);

  /* ----- navigation ----- */
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
    [total],
  );

  /* ----- auto-advance every 7 s ----- */
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % total);
    }, 7000);
    return () => clearInterval(timer);
  }, [paused, total]);

  /* ----- swipe handler ----- */
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) paginate(1);
    else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1);
  };

  const m = MODULES[current];

  return (
    <section
      id="formations"
      className="relative scroll-mt-20 overflow-hidden bg-white py-20 md:py-28"
    >
      {/* Decorative top line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ───────── Header ───────── */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
            <Layers className="size-3.5" /> Nos formations
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
            13 métiers en 1 formation
          </h2>
          <p className="mt-5 text-base leading-relaxed text-anthracite/70 sm:text-lg">
            Un parcours complet de{" "}
            <strong className="font-semibold text-navy">12 mois</strong>{" "}
            (janvier → décembre), 100 % pratique, couvrant tout le spectre de
            l'audit, de la finance, de la fiscalité et de la comptabilité.
          </p>
        </Reveal>

        {/* ───────── Key facts strip ───────── */}
        <Reveal delay={0.1} className="mt-10">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {[
              { icon: Clock, label: "12 mois", sub: "Janvier → Décembre" },
              { icon: Wrench, label: "100 % pratique", sub: "Cas réels & dossiers" },
              { icon: GraduationCap, label: "Experts OEC", sub: "& seniors Big Four" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-3 rounded-2xl border border-navy/10 bg-soft px-4 py-3"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-navy text-gold">
                  <f.icon className="size-4.5" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-navy">{f.label}</p>
                  <p className="text-[11px] text-anthracite/60">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ═══════════ CAROUSEL ═══════════ */}
        <Reveal delay={0.15} className="mt-14">
          <div
            className="relative mx-auto max-w-2xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            {/* ← Previous button */}
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Métier précédent"
              className="absolute -left-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-premium transition-all hover:bg-navy hover:text-white sm:-left-14"
            >
              <ChevronLeft className="size-5" />
            </button>

            {/* → Next button */}
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Métier suivant"
              className="absolute -right-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-premium transition-all hover:bg-navy hover:text-white sm:-right-14"
            >
              <ChevronRight className="size-5" />
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
                  <div className="relative flex flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-premium">
                    {/* Number watermark */}
                    <span className="pointer-events-none absolute right-6 top-4 font-serif text-7xl font-bold text-navy/[0.05]">
                      {String(m.id).padStart(2, "0")}
                    </span>

                    <div className="p-6 sm:p-8">
                      {/* Icon + title */}
                      <div className="flex items-start gap-4">
                        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-navy-gradient text-gold shadow-navy-glow">
                          <m.icon className="size-7" strokeWidth={1.9} />
                        </span>
                        <div className="flex-1 pr-12">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                            Métier {String(m.id).padStart(2, "0")} · {m.duration}
                          </p>
                          <h3 className="mt-1 font-serif text-xl font-bold leading-snug text-navy sm:text-2xl">
                            {m.title}
                          </h3>
                        </div>
                      </div>

                      {/* Short description */}
                      <p className="mt-4 text-sm leading-relaxed text-anthracite/70 sm:text-base">
                        {m.short}
                      </p>

                      {/* Bullet points */}
                      <ul className="mt-5 space-y-2 border-t border-navy/8 pt-5">
                        {m.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2.5 text-sm text-anthracite/80"
                          >
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-brand" />
                            {b}
                          </li>
                        ))}
                      </ul>

                      {/* Skills tags */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {m.skills.map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center gap-1.5 rounded-full border border-navy/10 bg-soft px-3 py-1.5 text-xs font-medium text-navy"
                          >
                            <Sparkles className="size-3 text-gold" />
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* "En savoir plus" button → opens popup */}
                      <button
                        type="button"
                        onClick={() => setPopupIndex(current)}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/20"
                      >
                        En savoir plus
                        <ArrowUpRight className="size-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ──── Dot indicators ──── */}
            <div className="mt-6 flex items-center justify-center gap-1.5">
              {MODULES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  aria-label={`Aller au métier ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-gold"
                      : "w-1.5 bg-navy/15 hover:bg-navy/30"
                  }`}
                />
              ))}
            </div>

            {/* Counter */}
            <p className="mt-3 text-center text-xs font-medium text-anthracite/50">
              {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
          </div>
        </Reveal>


        {/* ───────── Tools band ───────── */}
        <Reveal className="mt-16">
          <div className="rounded-3xl border border-navy/10 bg-soft p-6 md:p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
              <div className="text-center md:text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  Outils & logiciels enseignés
                </p>
                <h3 className="mt-1 font-serif text-xl font-bold text-navy">
                  Maîtrisez les outils réellement utilisés en cabinet
                </h3>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {TOOLS.map((t) => (
                  <motion.span
                    key={t.name}
                    whileHover={{ y: -3 }}
                    className="flex flex-col items-center gap-1 rounded-xl border border-navy/10 bg-white px-4 py-3 shadow-premium"
                  >
                    <span className="font-serif text-base font-bold text-navy">
                      {t.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-wide text-anthracite/55">
                      {t.tag}
                    </span>
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ═══════════ MODULE DETAIL POPUP ═══════════ */}
      {/* Partial-screen overlay — background blurred, popup doesn't cover everything */}
      <AnimatePresence>
        {popupModule && (
          <>
            {/* Backdrop — blurred & dimmed */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setPopupIndex(null)}
              aria-hidden
            />

            {/* Popup card — centered, NOT full-screen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-[8%] bottom-[8%] z-50 mx-auto max-w-xl overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-2xl sm:inset-x-0 sm:w-full"
            >
              {/* Header — navy gradient */}
              <div className="relative overflow-hidden bg-navy-gradient p-5 text-white sm:p-6">
                <div className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-gold/20 blur-3xl" />
                <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.08]" />
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setPopupIndex(null)}
                  aria-label="Fermer"
                  className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
                >
                  <X className="size-4" />
                </button>
                <div className="relative flex items-start gap-4">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient text-navy shadow-gold-glow">
                    <popupModule.icon className="size-7" strokeWidth={1.9} />
                  </span>
                  <div className="flex-1 pr-10">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                      Métier {String(popupModule.id).padStart(2, "0")} ·{" "}
                      {popupModule.duration}
                    </p>
                    <h3 className="mt-1.5 font-serif text-xl font-bold leading-tight md:text-2xl">
                      {popupModule.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-white/75">
                      {popupModule.short}
                    </p>
                  </div>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto p-5 sm:p-6" style={{ maxHeight: "calc(100% - 140px)" }}>
                {/* Présentation */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                    Présentation
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-anthracite/80">
                    {popupModule.description}
                  </p>
                </div>

                {/* Au programme */}
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                    Au programme
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {popupModule.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-sm text-anthracite/80"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-brand" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Compétences acquises */}
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                    Compétences acquises
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {popupModule.skills.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1.5 rounded-full border border-navy/10 bg-soft px-3 py-1.5 text-xs font-medium text-navy"
                      >
                        <Sparkles className="size-3 text-gold" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Objectifs pédagogiques — extra detailed content */}
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                    Objectifs pédagogiques
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-start gap-2.5 text-sm text-anthracite/80">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                      Acquérir les compétences opérationnelles nécessaires pour exercer ce métier dès le premier jour en cabinet ou en entreprise.
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-anthracite/80">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                      Maîtriser les outils, référentiels et méthodologies utilisés par les professionnels du secteur.
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-anthracite/80">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                      Développer une capacité d'analyse et de synthèse à travers des simulations de cas réels issus du terrain.
                    </li>
                    <li className="flex items-start gap-2.5 text-sm text-anthracite/80">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                      Être capable de rédiger des livrables professionnels conformes aux normes en vigueur.
                    </li>
                  </ul>
                </div>

                {/* Méthodologie */}
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                    Méthodologie
                  </p>
                  <div className="mt-3 space-y-3">
                    <div className="rounded-2xl border border-navy/10 bg-soft p-4">
                      <p className="text-sm font-semibold text-navy">📋 Cas pratiques réels</p>
                      <p className="mt-1 text-xs leading-relaxed text-anthracite/70">
                        Chaque séance s'appuie sur des cas issus de missions réelles menées par nos intervenants dans les cabinets Big Four et les multinationales.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-navy/10 bg-soft p-4">
                      <p className="text-sm font-semibold text-navy">🎯 Simulations en conditions réelles</p>
                      <p className="mt-1 text-xs leading-relaxed text-anthracite/70">
                        Vous êtes mis en situation comme si vous étiez en mission. Dossiers de travail, rapports, interactions clients — tout y est.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-navy/10 bg-soft p-4">
                      <p className="text-sm font-semibold text-navy">💻 100 % à distance, en direct</p>
                      <p className="mt-1 text-xs leading-relaxed text-anthracite/70">
                        Les séances sont tenues en direct et enregistrées pour vous permettre de rattraper et revoir le contenu à votre rythme.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Durée & format */}
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                    Durée & format
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-navy/10 bg-soft p-4 text-center">
                      <p className="font-serif text-2xl font-bold text-navy">
                        {popupModule.duration}
                      </p>
                      <p className="mt-1 text-[11px] text-anthracite/60">Durée du module</p>
                    </div>
                    <div className="rounded-2xl border border-navy/10 bg-soft p-4 text-center">
                      <p className="font-serif text-2xl font-bold text-navy">En direct</p>
                      <p className="mt-1 text-[11px] text-anthracite/60">
                        + replay disponible
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation between métiers */}
                <div className="mt-8 flex items-center justify-between gap-3 border-t border-navy/10 pt-4">
                  <button
                    type="button"
                    onClick={() => setPopupIndex((popupIndex! - 1 + MODULES.length) % MODULES.length)}
                    aria-label="Métier précédent"
                    className="flex size-10 items-center justify-center rounded-xl border border-navy/10 bg-soft text-navy transition-colors hover:bg-navy hover:text-white"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <p className="text-xs font-semibold text-anthracite/50">
                    {String(popupModule.id).padStart(2, "0")} / {String(MODULES.length).padStart(2, "0")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setPopupIndex((popupIndex! + 1) % MODULES.length)}
                    aria-label="Métier suivant"
                    className="flex size-10 items-center justify-center rounded-xl border border-navy/10 bg-soft text-navy transition-colors hover:bg-navy hover:text-white"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Pricing inquiry modal */}
      <PricingModal open={pricingOpen} onOpenChange={setPricingOpen} />
    </section>
  );
}
