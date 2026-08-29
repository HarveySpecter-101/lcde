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
                className="group relative bg-card p-6 text-center transition-colors hover:bg-secondary md:p-8"
              >
                {/* Gold accent bar */}
                <span className="absolute inset-x-8 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
                <p className="font-serif text-3xl font-bold text-navy sm:text-4xl md:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={(stat as any).prefix} />
                </p>
                <p className="mt-2 text-sm font-semibold text-anthracite sm:text-base">
                  {stat.label}
                </p>
                {stat.sub && (
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-anthracite/50">
                    {stat.sub}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
