"use client";

import { SectionDecor } from "@/components/site/section-decor";
import { Reveal } from "@/components/site/reveal";
import { Check, Briefcase, Sparkles } from "lucide-react";

const PROFILE_POINTS = [
  "Raisonner comme un praticien sur des cas réels",
  "Devenir opérationnel dès le premier jour, capable d'identifier, d'analyser et de résoudre des problématiques complexes",
  "Maîtriser les techniques et outils utilisés sur le marché du travail",
  "Parler le même langage que les praticiens de niveau Senior et Senior Manager",
  "Avoir une forte maîtrise des outils et logiciels informatiques",
  "Développer une posture professionnelle adaptée aux attentes des recruteurs",
  "Passer les entretiens PFE et embauche avec aisance et confiance",
];

export function BeforeAfter() {
  return (
    <section id="avant-apres" className="relative overflow-hidden bg-green-50 py-16 md:py-24">
      <SectionDecor variant="light" pos="B" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-green-700">
            <Sparkles className="size-4" /> En résumé
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-green-950 sm:text-5xl md:text-6xl">
            Votre nouveau profil
          </h2>
          <p className="mt-5 text-base leading-relaxed text-green-900/75 sm:text-lg">
            Un programme exclusif pour vous former au vrai terrain et vous faire vivre le quotidien des grands cabinets d'audit et de conseil, des banques et des multinationales.
          </p>
        </Reveal>

        <Reveal className="mt-10 sm:mt-14">
          <div className="rounded-3xl border border-green-200 bg-white/75 p-6 shadow-sm backdrop-blur-sm md:p-10">
            <div className="flex items-start gap-4 border-b border-green-200 pb-6">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg">
                <Briefcase className="size-7" />
              </span>
              <div>
                <h3 className="font-serif text-2xl font-bold text-green-950 sm:text-3xl">Le praticien opérationnel</h3>
                <p className="mt-1 text-sm font-medium text-green-700">Après la formation LCDE</p>
              </div>
            </div>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {PROFILE_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-green-950/85 sm:text-base">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-green-200 text-green-700">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
