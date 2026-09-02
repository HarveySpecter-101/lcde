"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/site/animated-counter";
import { Reveal } from "@/components/site/reveal";
import { STATS } from "@/lib/site-data";

export function Stats() {
  return (
    <section className="relative -mt-12 z-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-premium lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative bg-card p-5 text-center transition-colors hover:bg-secondary md:p-6"
              >
                {/* Gold accent bar */}
                <span className="absolute inset-x-8 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
                {/* Value — smaller, proportionate to box text */}
                <p className="font-serif text-2xl font-bold text-navy sm:text-3xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={(stat as any).prefix} />
                </p>
                <p className="mt-1.5 text-xs font-semibold leading-snug text-anthracite sm:text-sm">
                  {stat.label}
                </p>
                {stat.sub && (
                  <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-anthracite/50">
                    {stat.sub}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Subtle space-optimized separation */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3" aria-hidden>
          <div className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <span className="size-1.5 rounded-full bg-gold/60" />
          <div className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent via-gold/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
