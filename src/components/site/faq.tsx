"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/lib/site-data";
import { SectionDecor } from "@/components/site/section-decor";

export function Faq() {
  return (
    <section id="faq" className="relative scroll-mt-20 overflow-hidden bg-white py-14 md:py-20">
      {/* Background animated geometric elements */}
      <SectionDecor variant="light" pos="D" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy">
            <HelpCircle className="size-3.5 text-gold" /> FAQ formation
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-navy sm:text-5xl md:text-6xl">
            Questions fréquentes
          </h2>
          <p className="mt-5 text-base text-anthracite/70 sm:text-lg">
            Tout ce qu'il faut savoir avant de rejoindre la prochaine édition.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="rounded-3xl border border-navy/10 bg-soft p-2 shadow-premium">
            <Accordion type="single" collapsible className="w-full">
              {FAQ.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`item-${i}`}
                  className="border-b border-navy/8 last:border-b-0"
                >
                  <AccordionTrigger className="group px-5 py-5 text-left font-serif text-base font-semibold text-navy hover:no-underline hover:text-gold">
                    <span className="flex items-center gap-3 pr-2">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-navy text-xs font-bold text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 text-sm leading-relaxed text-anthracite/75 sm:pl-[3.85rem]">
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.a}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
