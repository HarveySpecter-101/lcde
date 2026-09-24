"use client";

import { useState, useCallback } from "react";
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
import { SectionDecor } from "@/components/site/section-decor";

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

  /* ----- swipe handler ----- */
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) paginate(1);
    else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1);
  };

  const m = MODULES[current];

  return (
    <section
      id="formations"
      className="relative scroll-mt-20 overflow-hidden bg-navy py-12 md:py-18"
    >
      {/* Animated background decoration */}
      <SectionDecor variant="dark" pos="C" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ───────── Header ───────── */}
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-gold sm:text-4xl md:text-5xl uppercase mb-2">
            Formation 100% Pratique en 11 Métiers
          </h2>
          <div className="mt-6 flex flex-col items-start sm:items-center justify-center gap-3 text-base font-medium leading-relaxed text-white/90 sm:text-lg">
            <div className="flex items-start gap-3 text-left">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-gold" />
              <span>Simulations de missions et de problématiques telles qu'elles sont traitées sur le terrain.</span>
            </div>
            <div className="flex items-start gap-3 text-left">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-gold" />
              <span>Exploitation et analyse de documents professionnels, des données et chiffres réels ;</span>
            </div>
          </div>
        </Reveal>

        {/* ═══════════ CAROUSEL ═══════════ */}
        <Reveal delay={0.15} className="mt-10 sm:mt-12">
          <h3 className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl uppercase mb-8 text-center">
            Présentation des Métiers.
          </h3>
          <div
            className="relative mx-auto max-w-2xl"
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

            {/* Next button → */}
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
              <AnimatePresence mode="wait" custom={direction} initial={false}>
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
                  <div className="relative flex flex-col overflow-hidden rounded-3xl border border-navy/10 bg-soft shadow-premium">
                    <div className="p-6 sm:p-8">
                      {/* Icon + title */}
                      <div className="relative z-10 flex items-start sm:items-center gap-4">
                        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-navy-gradient text-gold shadow-navy-glow">
                          <m.icon className="size-7" strokeWidth={1.9} />
                        </span>
                        <div className="flex-1">
                          <h3 className="font-serif text-xl font-bold leading-snug text-navy sm:text-2xl">
                            <span className="text-gold">Métier {String(m.id).padStart(2, "0")} :</span> {m.title}
                          </h3>
                        </div>
                      </div>

                      {/* Button → opens popup */}
                      <button
                        type="button"
                        onClick={() => setPopupIndex(current)}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/20"
                      >
                        Découvrir le programme détaillé
                        <ArrowUpRight className="size-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>


        {/* ───────── Tools band ───────── */}
        <Reveal className="mt-10 sm:mt-12">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-md">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
              <div className="text-center md:text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  Outils & logiciels enseignés
                </p>
                <h3 className="mt-1 font-serif text-xl font-bold text-white">
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
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
              onClick={() => setPopupIndex(null)}
              aria-hidden
            />

            {/* Popup card — centered, NOT full-screen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-[8%] bottom-[8%] z-[60] mx-auto max-w-xl overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-2xl sm:inset-x-0 sm:w-full"
            >
              {/* Left Arrow (Absolute to Card) */}
              <button
                type="button"
                onClick={() => setPopupIndex((popupIndex! - 1 + MODULES.length) % MODULES.length)}
                aria-label="Métier précédent"
                className="absolute left-2 sm:left-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white/90 backdrop-blur-sm text-navy shadow-premium transition-all hover:bg-navy hover:text-white"
              >
                <ChevronLeft className="size-5" />
              </button>

              {/* Right Arrow (Absolute to Card) */}
              <button
                type="button"
                onClick={() => setPopupIndex((popupIndex! + 1) % MODULES.length)}
                aria-label="Métier suivant"
                className="absolute right-2 sm:right-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white/90 backdrop-blur-sm text-navy shadow-premium transition-all hover:bg-navy hover:text-white"
              >
                <ChevronRight className="size-5" />
              </button>

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
                    <p className="font-serif text-lg font-bold text-gold md:text-xl">
                      Métier {String(popupModule.id).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-serif text-xl font-bold leading-tight md:text-2xl">
                      {popupModule.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Scrollable body */}
              {/* Added pb-12 so the content doesn't end up covered by the popup container edge or padding */}
              <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6 pb-12" style={{ maxHeight: "calc(100% - 140px)" }}>
                {popupModule.details?.map((section, idx) => (
                  <div key={idx} className="mt-6 first:mt-0 px-2 sm:px-4">
                    {section.heading && (
                      <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-3">
                        {section.heading}
                      </p>
                    )}
                    {section.text && (
                      <p className="text-sm leading-relaxed text-anthracite/80 mb-3">
                        {section.text}
                      </p>
                    )}
                    {section.items && section.items.length > 0 && (
                      <ul className="space-y-2.5">
                        {section.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm text-anthracite/80"
                          >
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-brand" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
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
