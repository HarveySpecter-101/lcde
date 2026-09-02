"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HiggsfieldTiltCard } from "@/components/site/higgsfield-ui";
import { Reveal } from "@/components/site/reveal";

const PROMO_ITEMS = [
  {
    emoji: "💯",
    text: "Une formation certifiée et reconnue, 100% pratique et complète, destinée à toutes les filières. On te prépare pour 13 métiers différents et liés entre eux, et pour toute la carrière : bien au-delà des entretiens PFE et CDI.",
  },
  {
    emoji: "✅",
    text: "+4 500 personnes formées dont +95% font leur carrière dans des postes à haute responsabilité, et les métiers les plus rémunérés sur le marché d'emploi marocain et international.",
  },
  {
    emoji: "💼",
    text: "Chaque métier est assuré par un spécialiste ; nos intervenants sont des experts comptables diplômés, des directeurs en audit, des managers au sein des cabinets Big4, des consultants financiers et des docteurs en sciences de gestion.",
  },
];

export function FormationIntro() {
  return (
    <section className="relative overflow-hidden bg-soft pt-10 pb-16 md:pt-14 md:pb-20">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          {/* Promotional cards */}
          <div className="w-full space-y-4 text-left">
            {PROMO_ITEMS.map((p, i) => (
              <HiggsfieldTiltCard key={i}>
                <div className="px-5 py-5 sm:px-6">
                  <p className="text-[15px] leading-relaxed text-anthracite sm:text-base">
                    <span className="mr-2 text-lg">{p.emoji}</span>
                    {p.text}
                  </p>
                </div>
              </HiggsfieldTiltCard>
            ))}
          </div>

          {/* CTA button */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-gold-gradient text-navy font-semibold shadow-gold-glow transition-transform hover:scale-105 active:scale-95"
            >
              <a href="#contact" className="inline-flex items-center gap-2">
                Je rejoins la prochaine édition
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
