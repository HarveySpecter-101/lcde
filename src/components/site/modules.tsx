"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Layers,
  Clock,
  Wrench,
  GraduationCap,
  X,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MODULES, TOOLS, type Module } from "@/lib/site-data";
import { PricingModal } from "@/components/site/pricing-modal";

export function Modules() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [pricingOpen, setPricingOpen] = useState(false);
  const selected = selectedIndex !== null ? MODULES[selectedIndex] : null;

  const goNext = useCallback(() => {
    setSelectedIndex((i) => (i === null ? i : (i + 1) % MODULES.length));
  }, []);
  const goPrev = useCallback(() => {
    setSelectedIndex((i) => (i === null ? i : (i - 1 + MODULES.length) % MODULES.length));
  }, []);

  return (
    <section id="formations" className="relative scroll-mt-20 overflow-hidden bg-white py-20 md:py-28 dark:bg-[oklch(0.16_0.02_255)]">
      {/* Decorative top line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
            <Layers className="size-3.5" /> Nos formations
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl dark:text-white">
            13 métiers en 1 formation
          </h2>
          <p className="mt-5 text-base leading-relaxed text-anthracite/70 sm:text-lg dark:text-white/70">
            Un parcours complet de <strong className="font-semibold text-navy dark:text-white">12 mois</strong> (janvier → décembre),
            100 % pratique, couvrant tout le spectre de l'audit, de la finance, de la fiscalité et de la comptabilité.
          </p>
        </Reveal>

        {/* Key facts strip */}
        <Reveal delay={0.1} className="mt-10">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {[
              { icon: Clock, label: "12 mois", sub: "Janvier → Décembre" },
              { icon: Wrench, label: "100 % pratique", sub: "Cas réels & dossiers" },
              { icon: GraduationCap, label: "Experts OEC", sub: "& seniors Big Four" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-3 rounded-2xl border border-navy/10 bg-soft px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-navy text-gold">
                  <f.icon className="size-4.5" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-navy dark:text-white">{f.label}</p>
                  <p className="text-[11px] text-anthracite/60 dark:text-white/60">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Modules grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MODULES.map((m, i) => (
            <Reveal key={m.id} delay={(i % 4) * 0.06} direction="up">
              <motion.button
                type="button"
                onClick={() => setSelectedIndex(i)}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Voir le détail du module ${m.title}`}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white p-6 text-left shadow-premium transition-shadow hover:shadow-navy-glow dark:border-white/10 dark:bg-[oklch(0.2_0.025_255)]"
              >
                {/* Number watermark */}
                <span className="pointer-events-none absolute right-4 top-3 font-serif text-6xl font-bold text-navy/[0.04] transition-colors group-hover:text-gold/15 dark:text-white/[0.04]">
                  {String(m.id).padStart(2, "0")}
                </span>

                {/* Icon */}
                <span className="relative flex size-12 items-center justify-center rounded-xl bg-navy-gradient text-gold shadow-navy-glow transition-transform group-hover:scale-110">
                  <m.icon className="size-6" strokeWidth={1.9} />
                </span>

                <h3 className="relative mt-4 font-serif text-lg font-bold leading-snug text-navy dark:text-white">
                  {m.title}
                </h3>
                <p className="relative mt-2 text-sm text-anthracite/65 dark:text-white/65">{m.short}</p>

                <ul className="relative mt-4 space-y-1.5 border-t border-navy/8 pt-4 dark:border-white/10">
                  {m.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[13px] text-anthracite/75 dark:text-white/75">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Hover arrow — clickability cue */}
                <span className="relative mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold">
                  En savoir plus <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </motion.button>
            </Reveal>
          ))}

          {/* 11th card — CTA */}
          <Reveal delay={0.18} direction="up">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-navy-gradient p-6 text-white shadow-navy-glow">
              <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-gold/20 blur-2xl" />
              <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.08]" />
              <div className="relative">
                <h3 className="font-serif text-xl font-bold leading-tight">
                  Le programme <span className="text-gold-gradient">complet</span>
                </h3>
                <p className="mt-2 text-sm text-white/75">
                  Calendrier, détails des modules, témoignages — et tarifs sur demande.
                </p>
              </div>
              <div className="relative mt-6 space-y-2">
                <button
                  type="button"
                  onClick={() => setPricingOpen(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-semibold text-navy transition-transform hover:scale-[1.02]"
                >
                  Demander le tarif
                  <ArrowUpRight className="size-4" />
                </button>
                <a
                  href="#contact"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Ou rejoindre la formation
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Tools band */}
        <Reveal className="mt-16">
          <div className="rounded-3xl border border-navy/10 bg-soft p-6 md:p-8 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
              <div className="text-center md:text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">Outils & logiciels enseignés</p>
                <h3 className="mt-1 font-serif text-xl font-bold text-navy dark:text-white">
                  Maîtrisez les outils réellement utilisés en cabinet
                </h3>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {TOOLS.map((t) => (
                  <motion.span
                    key={t.name}
                    whileHover={{ y: -3 }}
                    className="flex flex-col items-center gap-1 rounded-xl border border-navy/10 bg-white px-4 py-3 shadow-premium dark:border-white/10 dark:bg-[oklch(0.2_0.025_255)]"
                  >
                    <span className="font-serif text-base font-bold text-navy dark:text-white">{t.name}</span>
                    <span className="text-[10px] uppercase tracking-wide text-anthracite/55 dark:text-white/55">{t.tag}</span>
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Module detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelectedIndex(null)}>
        <DialogContent showCloseButton={false} className="max-w-2xl gap-0 overflow-hidden p-0 sm:rounded-3xl">
          <DialogTitle className="sr-only">Détail du module {selected?.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Présentation détaillée du module de formation {selected?.title}.
          </DialogDescription>
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header — navy gradient */}
                <div className="relative overflow-hidden bg-navy-gradient p-6 text-white md:p-8">
                  <div className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-gold/20 blur-3xl" />
                  <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.08]" />
                  {/* Custom close button */}
                  <DialogClose asChild>
                    <button
                      type="button"
                      aria-label="Fermer"
                      className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
                    >
                      <X className="size-4" />
                    </button>
                  </DialogClose>
                  <div className="relative flex items-start gap-4">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient text-navy shadow-gold-glow">
                      <selected.icon className="size-7" strokeWidth={1.9} />
                    </span>
                    <div className="flex-1 pr-10">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                        Module {String(selected.id).padStart(2, "0")} · {selected.duration}
                      </p>
                      <h3 className="mt-1.5 font-serif text-xl font-bold leading-tight md:text-2xl">
                        {selected.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-white/75">{selected.short}</p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="max-h-[55vh] overflow-y-auto p-6 md:p-8">
                  {/* Description */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">Présentation</p>
                    <p className="mt-2 text-sm leading-relaxed text-anthracite/80 dark:text-white/80">
                      {selected.description}
                    </p>
                  </div>

                  {/* Programme points */}
                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">Au programme</p>
                    <ul className="mt-3 space-y-2">
                      {selected.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 text-sm text-anthracite/80 dark:text-white/80"
                        >
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-brand" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills acquired */}
                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">Compétences acquises</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selected.skills.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center gap-1.5 rounded-full border border-navy/10 bg-soft px-3 py-1.5 text-xs font-medium text-navy dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
                        >
                          <Sparkles className="size-3 text-gold" />
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer — navigation + CTA */}
                <div className="border-t border-navy/10 p-4 dark:border-white/10">
                  <div className="flex items-center justify-between gap-3">
                    {/* Previous */}
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="Module précédent"
                      className="flex size-10 items-center justify-center rounded-xl border border-navy/10 bg-soft text-navy transition-colors hover:bg-navy hover:text-white dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/10"
                    >
                      <ChevronLeft className="size-5" />
                    </button>

                    {/* Module indicator */}
                    <div className="flex flex-col items-center px-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-anthracite/50 dark:text-white/50">
                        {String(selected.id).padStart(2, "0")} / 13
                      </p>
                      <div className="mt-1.5 flex gap-1">
                        {MODULES.map((_, i) => (
                          <span
                            key={i}
                            className={`h-1 rounded-full transition-all ${
                              i === selectedIndex ? "w-4 bg-gold" : "w-1 bg-navy/15 dark:bg-white/15"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Next */}
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Module suivant"
                      className="flex size-10 items-center justify-center rounded-xl border border-navy/10 bg-soft text-navy transition-colors hover:bg-navy hover:text-white dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/10"
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  </div>

                  {/* CTA */}
                  <Button
                    asChild
                    className="mt-3 w-full bg-gold text-navy font-semibold hover:bg-gold/90 hover:shadow-gold-glow"
                  >
                    <a href="#contact" onClick={() => setSelectedIndex(null)}>
                      Je m'inscris à la formation
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      {/* Pricing inquiry modal */}
      <PricingModal open={pricingOpen} onOpenChange={setPricingOpen} />
    </section>
  );
}
