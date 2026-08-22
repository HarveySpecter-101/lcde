"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquareQuote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { TESTIMONIALS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;

  const go = (dir: number) => setIndex((p) => (p + dir + total) % total);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % total), 5500);
    return () => clearInterval(id);
  }, [paused, total]);

  const active = TESTIMONIALS[index];

  return (
    <section
      id="temoignages"
      className="relative scroll-mt-20 overflow-hidden bg-soft py-20 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.04]" aria-hidden />
      <div className="pointer-events-none absolute -right-20 top-10 size-72 rounded-full bg-gold/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy">
            <MessageSquareQuote className="size-3.5 text-gold" /> Témoignages & résultats
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
            Ce que disent nos diplômés
          </h2>
          <p className="mt-5 text-base leading-relaxed text-anthracite/70 sm:text-lg">
            Un taux d'insertion professionnelle allant jusqu'à <strong className="font-semibold text-navy">96 %</strong> et
            un taux de satisfaction revendiqué de <strong className="font-semibold text-navy">100 %</strong>.
          </p>
        </Reveal>

        {/* Insertion bar */}
        <Reveal delay={0.1} className="mt-10">
          <div className="mx-auto max-w-2xl rounded-2xl border border-navy/10 bg-white p-5 shadow-premium">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-navy">Taux d'insertion professionnelle</span>
              <span className="font-serif text-2xl font-bold text-emerald-brand">96 %</span>
            </div>
            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-navy/8">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "96%" }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-brand to-emerald-brand/70"
              />
            </div>
          </div>
        </Reveal>

        {/* Carousel */}
        <Reveal delay={0.15} className="mt-12">
          <div className="relative mx-auto max-w-4xl">
            <div className="relative min-h-[20rem] sm:min-h-[17rem]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-3xl border border-navy/10 bg-white p-8 shadow-premium md:p-10"
                >
                  <Quote className="size-9 text-gold/40" />
                  <p className="mt-4 font-serif text-lg leading-relaxed text-anthracite md:text-xl">
                    {active.quote}
                  </p>

                  <footer className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-12 items-center justify-center rounded-full bg-navy-gradient font-serif text-base font-bold text-white">
                        {active.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-navy">{active.name}</p>
                        <p className="text-xs text-anthracite/60">{active.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {active.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-navy/10 bg-soft px-2.5 py-0.5 text-[10px] font-medium text-anthracite/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </footer>

                  <div className="mt-5 flex items-center gap-1 border-t border-navy/8 pt-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-gold text-gold" />
                    ))}
                    <span className="ml-2 text-xs text-anthracite/55">Promotion vérifiée</span>
                  </div>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => go(-1)}
                aria-label="Témoignage précédent"
                className="rounded-full border-navy/20 text-navy hover:bg-navy hover:text-white"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Aller au témoignage ${i + 1}`}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === index ? "w-8 bg-gold" : "w-2 bg-navy/20 hover:bg-navy/40"
                    )}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => go(1)}
                aria-label="Témoignage suivant"
                className="rounded-full border-navy/20 text-navy hover:bg-navy hover:text-white"
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
