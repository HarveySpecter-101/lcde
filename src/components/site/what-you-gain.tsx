"use client";

import { SectionDecor } from "@/components/site/section-decor";
import { Reveal } from "@/components/site/reveal";
import {
  CreditCard,
  Target,
  Users,
  FileText,
  Briefcase,
  Laptop,
  HeartHandshake,
  Video
} from "lucide-react";

const GAIN_ITEMS = [
  {
    icon: Target,
    title: "Maitrise des Compétences et Connaissances Réellement Opérationnelles dans les métiers les plus demandés et recherchés, avec des salaires attirants dans des postes de haut calibre."
  },
  {
    icon: Laptop,
    title: "Maitrise des Outils et Logiciels Informatiques : Sage, SAP, Power Bi, Excel, VBA, …"
  },
  {
    icon: Users,
    title: "Intervenants Experts de Haut Niveau",
    points: [
      "Experts Comptables, Associés & Senior Managers Big4, Commissaires aux Comptes, Consultants Senior, …",
      "Chaque métier est animé par un spécialiste.",
      "Vous bénéficiez de leurs conseils, astuces et leurs expériences professionnelles."
    ]
  },
  {
    icon: HeartHandshake,
    title: "Accompagnement A Vie : Soutien continu même après la fin de la formation."
  },
  {
    icon: FileText,
    title: "Préparation Complète au Marché de l’Emploi : Rédaction et optimisation du CV Classique & ATS, Simulations d’entretiens professionnels, Méthodes exclusives pour postuler intelligemment, Accès à une base de données exclusives d’adresses mails vérifiées."
  },
  {
    icon: Briefcase,
    title: "Réseautage, Recommandations et Aide aux Stages et Embauche : Priorité absolue auprès de nos partenaires professionnels + Aide aux stages rémunérés et emplois."
  },
  {
    icon: Video,
    title: "Formation Live + Replays : Séances tenues 100% en Direct, et qui seront enregistrées afin de vous permettre de rattraper et les regarder convenablement à votre rythme et sans pression."
  },
  {
    icon: CreditCard,
    title: "Réductions exclusives et Paiements par tranches.",
    points: [
      "En addition, les membres inscrits à la formation complète bénéficieront d’une réduction spéciale allant jusqu'à 30% sur la formation préparatoire au concours d’accès au cycle d’expertise comptable."
    ]
  }
];

export function WhatYouGain() {
  return (
    <section
      id="ce-que-vous-gagnez"
      className="relative overflow-hidden bg-soft py-14 md:py-22"
    >
      <SectionDecor variant="light" pos="C" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
            Ce que vous <span className="text-gold">gagnez</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 sm:mt-12">
          <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
            {GAIN_ITEMS.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <span className="mt-0.5 flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-xl bg-soft text-gold shadow-sm border border-navy/5">
                  <item.icon className="size-5 sm:size-6" strokeWidth={2} />
                </span>
                <div className="flex-1 mt-1">
                  <p className="font-semibold leading-relaxed text-navy text-sm sm:text-base">
                    {item.title}
                  </p>
                  {item.points && item.points.length > 0 && (
                    <ul className="mt-3 space-y-2.5">
                      {item.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-sm leading-relaxed text-anthracite/80">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
