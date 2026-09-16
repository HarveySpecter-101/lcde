"use client";

import { useState, useEffect, useCallback } from "react";
import { SectionDecor } from "@/components/site/section-decor";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Users, Briefcase, Award, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { INTERVENANTS, ANONYMOUS_INTERVENANTS } from "@/lib/site-data";

export function Intervenants() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalSlides = INTERVENANTS.length + 1; // +1 for the "et bien d'autre" slide
  
  // Auto-advance
  const [paused, setPaused] = useState(false);
  
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 7000);
    return () => clearInterval(timer);
  }, [paused, totalSlides]);
  
  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = totalSlides - 1;
      if (next >= totalSlides) next = 0;
      return next;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      z: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      z: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section id="intervenants" className="py-12 sm:py-16 md:py-18 bg-white relative overflow-hidden">
      <SectionDecor variant="light" pos="D" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft border border-gray-200 mb-3 sm:mb-4">
              <Users className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-navy uppercase tracking-wider">Nos intervenants</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-navy mb-3">
              Des experts de <span className="text-gold-gradient">terrain</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Des praticiens issus des Big Four, des experts-comptables et des directeurs financiers qui partagent leur expérience concrète et leurs méthodes de travail au quotidien.
            </p>
          </Reveal>
        </div>

        <div 
          className="max-w-5xl mx-auto relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative min-h-[560px] sm:min-h-[460px] md:min-h-[420px] w-full flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full px-4 sm:px-12 cursor-grab active:cursor-grabbing"
              >
                {current < INTERVENANTS.length ? (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-premium max-w-2xl mx-auto relative">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8">
                      <div className="flex-shrink-0">
                        {INTERVENANTS[current].photo ? (
                          <img 
                            src={INTERVENANTS[current].photo} 
                            alt={INTERVENANTS[current].name}
                            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-soft shadow-md"
                          />
                        ) : (
                          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gold-gradient flex items-center justify-center text-white text-3xl sm:text-4xl font-serif font-bold shadow-lg">
                            {INTERVENANTS[current].initials}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-grow text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-navy mb-1">{INTERVENANTS[current].name}</h3>
                        {INTERVENANTS[current].company && (
                          <p className="text-gray-500 font-medium text-sm sm:text-base mb-3">{INTERVENANTS[current].company}</p>
                        )}
                        
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft text-xs sm:text-sm font-medium text-navy">
                            <Briefcase className="w-3.5 h-3.5 text-gold" />
                            {INTERVENANTS[current].role}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft text-xs sm:text-sm font-medium text-navy">
                            <Award className="w-3.5 h-3.5 text-gold" />
                            {INTERVENANTS[current].experience}
                          </span>
                        </div>
                        
                        <ul className="space-y-1.5 sm:space-y-2 text-left">
                          {INTERVENANTS[current].specialties.map((spec, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700">
                              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0 mt-0.5" />
                              <span className="text-xs sm:text-sm md:text-base">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-8 border border-gray-100 shadow-premium max-w-4xl mx-auto relative">
                    <div className="text-center mb-5 sm:mb-6">
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-navy mb-1">Et bien d'autres...</h3>
                      <p className="text-gray-600 font-medium text-xs sm:text-sm">+10 intervenants avec minimum +5 ans d'expérience</p>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5">
                      {ANONYMOUS_INTERVENANTS.map((anon, idx) => (
                        <div key={idx} className="bg-soft/80 hover:bg-soft rounded-2xl p-3 sm:p-4 flex flex-col items-center text-center border border-navy/5 transition-colors">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-2 shadow-xs">
                            <Users className="w-4 h-4 text-gold" />
                          </div>
                          <h4 className="font-bold text-navy text-xs sm:text-sm mb-1 line-clamp-2 leading-tight">{anon.role}</h4>
                          <span className="text-[11px] font-semibold text-gold mb-1">{anon.experience}</span>
                          <p className="text-[11px] sm:text-xs text-gray-600 line-clamp-2 leading-snug">{anon.specialty}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              className="absolute left-0 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white shadow-md text-navy hover:text-gold hover:scale-105 transition-all border border-gray-100 focus:outline-none"
              onClick={() => paginate(-1)}
              aria-label="Précédent"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              className="absolute right-0 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white shadow-md text-navy hover:text-gold hover:scale-105 transition-all border border-gray-100 focus:outline-none"
              onClick={() => paginate(1)}
              aria-label="Suivant"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
