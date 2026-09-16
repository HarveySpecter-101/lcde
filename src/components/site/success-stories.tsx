"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, Star, Quote } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SUCCESS_STORIES } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const FloatingEmoji = ({ emoji, className, delay = 0, duration = 4 }: { emoji: string, className: string, delay?: number, duration?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: [0, 1, 1, 0], y: [20, -20, -40, -60], x: [0, 10, -10, 0] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    className={cn("absolute text-4xl sm:text-5xl drop-shadow-xl z-0", className)}
  >
    {emoji}
  </motion.div>
);

export function SuccessStories() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = SUCCESS_STORIES.length;

  const go = (dir: number) => setIndex((p) => (p + dir + total) % total);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % total), 5000);
    return () => clearInterval(id);
  }, [paused, total]);

  const active = SUCCESS_STORIES[index];

  return (
    <section
      id="resultats"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#e6f2ff] to-[#ffebf0] py-12 md:py-18"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center opacity-10 overflow-hidden z-0" aria-hidden>
        <div className="font-sans text-[15vw] font-black uppercase italic tracking-tighter text-gold leading-none transform -skew-x-12">CONGRATS</div>
        <div className="font-sans text-[15vw] font-black uppercase italic tracking-tighter text-gold leading-none transform -skew-x-12 mt-4">CONGRATS</div>
        <div className="font-sans text-[15vw] font-black uppercase italic tracking-tighter text-gold leading-none transform -skew-x-12 mt-4">CONGRATS</div>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <FloatingEmoji emoji="❤️" className="top-[15%] left-[5%] sm:left-[15%]" delay={0} duration={6} />
        <FloatingEmoji emoji="👍" className="top-[40%] left-[2%] sm:left-[10%]" delay={1.5} duration={7} />
        <FloatingEmoji emoji="❤️" className="top-[70%] left-[8%] sm:left-[20%]" delay={3} duration={5} />
        <FloatingEmoji emoji="👍" className="top-[20%] right-[5%] sm:right-[15%]" delay={0.5} duration={6} />
        <FloatingEmoji emoji="❤️" className="top-[50%] right-[2%] sm:right-[10%]" delay={2} duration={5} />
        <FloatingEmoji emoji="👍" className="top-[80%] right-[8%] sm:right-[20%]" delay={1} duration={7} />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold uppercase tracking-wider text-navy shadow-sm">
            <Star className="size-4 text-gold fill-gold" /> Résultats
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
            Où sont les participants des anciennes éditions ?
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-6 sm:size-7 fill-gold text-gold drop-shadow-sm" />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 sm:mt-10">
          <div className="relative mx-auto max-w-2xl">
            {/* Side Navigation Button: Left */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Résultat précédent"
              className="absolute -left-3 sm:-left-16 top-1/2 z-30 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-lg transition-all hover:bg-navy hover:text-white hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Side Navigation Button: Right */}
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Résultat suivant"
              className="absolute -right-3 sm:-right-16 top-1/2 z-30 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-lg transition-all hover:bg-navy hover:text-white hover:scale-110 active:scale-95"
            >
              <ChevronRight className="size-6" />
            </button>

            <div className="relative min-h-[22rem] sm:min-h-[20rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative mx-auto max-w-lg rounded-[2rem] border-2 border-gold/40 bg-white p-8 shadow-2xl md:p-10"
                >
                  <div className="absolute -left-4 -top-4 flex size-12 items-center justify-center rounded-full bg-navy text-white shadow-lg"><Quote className="size-5 fill-white" /></div>
                  <div className="absolute -bottom-4 -right-4 flex size-12 items-center justify-center rounded-full bg-navy text-white shadow-lg rotate-180"><Quote className="size-5 fill-white" /></div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-navy">{active.name}</h3>
                    <p className="mt-1.5 text-lg font-medium text-anthracite/80">{active.school}</p>
                    <p className="mt-1 text-sm font-bold text-navy">Participant(e) à la formation</p>
                    
                    <div className="mt-8 text-left">
                      <p className="text-xl font-bold text-navy mb-4">Admis(e) chez :</p>
                      <ul className="space-y-3">
                        {active.admissions.map((firm, i) => (
                          <li key={i} className="flex items-center gap-3 text-lg font-medium text-anthracite">
                            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white"><CheckCircle2 className="size-4" /></div>
                            {firm}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="mt-10 font-bold text-xl text-navy">Bonne continuation !</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
