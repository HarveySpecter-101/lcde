"use client";

import { SectionDecor } from "@/components/site/section-decor";
import { Reveal } from "@/components/site/reveal";
import { XCircle, CheckCircle2, AlertCircle, Target } from "lucide-react";

export function PracticeSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <SectionDecor variant="light" pos="A" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl uppercase">
            Formation 100% Pratique
          </h2>
        </Reveal>

        <div className="mt-12 sm:mt-16 grid gap-8 lg:grid-cols-2">
          {/* Red Block */}
          <Reveal delay={0.1}>
            <div className="h-full flex flex-col rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm sm:p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <AlertCircle className="size-32 text-red-600" />
              </div>
              <div className="relative z-10 flex items-start gap-4 border-b border-red-200 pb-5 sm:pb-6">
                <span className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg">
                  <XCircle className="size-6 sm:size-7" />
                </span>
                <div className="flex items-center">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-red-950">
                    La réalité du marché
                  </h3>
                </div>
              </div>
              
              <ul className="mt-6 sm:mt-7 space-y-4 flex-1">
                <li className="flex items-start gap-3 text-sm leading-relaxed text-red-950/85 sm:text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-200 text-red-700">
                    <XCircle className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>Les bonnes notes à l'école ou une mention “Très Bien” ne suffisent pas pour décrocher les meilleures opportunités.</span>
                </li>
                <li className="flex items-start gap-3 text-sm leading-relaxed text-red-950/85 sm:text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-200 text-red-700">
                    <XCircle className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span><strong>La vérité que personne ne dit :</strong> les recruteurs ne s'intéressent pas uniquement à ta filière, et exigent, par ailleurs, des compétences de haut calibre, qui ne sont généralement pas abordées à l'école.</span>
                </li>
                <li className="flex items-start gap-3 text-sm leading-relaxed text-red-950/85 sm:text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-200 text-red-700">
                    <XCircle className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>Les recruteurs n'évaluent pas tes connaissances académiques.</span>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Green Block */}
          <Reveal delay={0.2}>
            <div className="h-full flex flex-col rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm sm:p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <Target className="size-32 text-green-600" />
              </div>
              <div className="relative z-10 flex items-start gap-4 border-b border-green-200 pb-5 sm:pb-6">
                <span className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg">
                  <CheckCircle2 className="size-6 sm:size-7" />
                </span>
                <div className="flex items-center">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-green-950">
                    Ce que recherchent les recruteurs
                  </h3>
                </div>
              </div>

              <div className="mt-6 sm:mt-7 text-sm font-medium leading-relaxed text-green-900/90 sm:text-base mb-4 relative z-10">
                Le marché de travail cherche des praticiens rares capables de créer de la valeur dès le premier jour :
              </div>
              
              <ul className="space-y-4 relative z-10 flex-1">
                <li className="flex items-start gap-3 text-sm leading-relaxed text-green-950/85 sm:text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-200 text-green-700">
                    <CheckCircle2 className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>Développer des réflexes professionnels avancés et faire preuve d’un niveau d’analyse et de raisonnement supérieur ;</span>
                </li>
                <li className="flex items-start gap-3 text-sm leading-relaxed text-green-950/85 sm:text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-200 text-green-700">
                    <CheckCircle2 className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>Détecter les risques, relever les anomalies significatives et en mesurer les impacts ;</span>
                </li>
                <li className="flex items-start gap-3 text-sm leading-relaxed text-green-950/85 sm:text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-200 text-green-700">
                    <CheckCircle2 className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>Proposer des solutions concrètes, pertinentes et efficaces ;</span>
                </li>
                <li className="flex items-start gap-3 text-sm leading-relaxed text-green-950/85 sm:text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-200 text-green-700">
                    <CheckCircle2 className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>Résoudre des problématiques réelles et complexes.</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
