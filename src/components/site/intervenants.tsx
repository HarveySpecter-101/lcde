"use client";
import Image from "next/image";

import { useState, useEffect, useCallback } from "react";
import { SectionDecor } from "@/components/site/section-decor";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Users, Briefcase, Award, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { INTERVENANTS } from "@/lib/site-data";

export function Intervenants() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalSlides = INTERVENANTS.length; // +1 for the "et bien d'autre" slide
  

  
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-navy mb-3">
              +10 intervenants experts avec minimum <span className="text-gold-gradient">15 ans d'expérience</span>
            </h2>
            
          </Reveal>
        </div>

        <div 
          className="max-w-5xl mx-auto relative"
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
                <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-premium max-w-2xl mx-auto relative">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8">
                    <div className="flex-shrink-0">
                      {INTERVENANTS[current].photo ? (
                        <Image 
                          src={INTERVENANTS[current].photo} 
                          alt={INTERVENANTS[current].name}
                          width={128}
                          height={128}
                          loading="eager"
                          className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-soft shadow-md"
                        />
                      ) : INTERVENANTS[current].logo ? (
                        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm p-4">
                          <Image 
                            src={INTERVENANTS[current].logo} 
                            alt={INTERVENANTS[current].company || INTERVENANTS[current].name}
                            width={128}
                            height={128}
                            loading="eager"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gold-gradient flex items-center justify-center text-white text-3xl sm:text-4xl font-serif font-bold shadow-lg">
                          {INTERVENANTS[current].initials}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                      <div className="mb-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-navy mb-1">{INTERVENANTS[current].name}</h3>
                        <p className="text-gold font-medium text-sm sm:text-base mb-2">{INTERVENANTS[current].role}</p>
                        {INTERVENANTS[current].company && (
                          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-gray-500 mb-2">
                            <Briefcase className="w-4 h-4" />
                            <span className="text-xs sm:text-sm">{INTERVENANTS[current].company}</span>
                          </div>
                        )}
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
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              className="absolute left-0 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white shadow-md text-navy hover:text-gold hover:scale-105 transition-all border border-gray-100 focus:outline-none"
              onClick={() => paginate(-1)}
              aria-label="Précédent"
              data-track="A swipé ou défilé les intervenants"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              className="absolute right-0 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white shadow-md text-navy hover:text-gold hover:scale-105 transition-all border border-gray-100 focus:outline-none"
              onClick={() => paginate(1)}
              aria-label="Suivant"
              data-track="A swipé ou défilé les intervenants"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
