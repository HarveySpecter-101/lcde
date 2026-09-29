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
  // Pair 1: Medium text
  {
    icon: Target,
    title: "Maitrise des Compétences et Connaissances Réellement Opérationnelles",
    desc: " dans les métiers les plus demandés et recherchés, avec des salaires attirants dans des postes de haut calibre."
  },
  {
    icon: Briefcase,
    title: "Réseautage, Recommandations et Aide aux Stages et Embauche :",
    desc: " Priorité absolue auprès de nos partenaires professionnels + Aide aux stages rémunérés et emplois."
  },
  // Pair 2: Short text
  {
    icon: Laptop,
    title: "Maitrise des Outils et Logiciels Informatiques :",
    desc: " Sage, SAP, Power Bi, Excel, VBA, …"
  },
  {
    icon: HeartHandshake,
    title: "Accompagnement A Vie :",
    desc: " Soutien continu même après la fin de la formation."
  },
  // Pair 3: Long text
  {
    icon: Video,
    title: "Formation Live + Replays :",
    desc: " Séances tenues 100% en Direct, et qui seront enregistrées afin de vous permettre de rattraper et les regarder convenablement à votre rythme et sans pression."
  },
  {
    icon: FileText,
    title: "Préparation Complète au Marché de l’Emploi :",
    desc: " Rédaction et optimisation du CV Classique & ATS, Simulations d’entretiens professionnels, Méthodes exclusives pour postuler intelligemment, Accès à une base de données exclusives d’adresses mails vérifiées."
  },
  // Pair 4: Points/Lists
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

        <Reveal delay={0.15} className="mt-8 sm:mt-12">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2">
            {GAIN_ITEMS.map((item, idx) => {
              return (
                <div key={idx} className="flex h-full flex-col gap-2 rounded-xl bg-white p-3.5 sm:p-4 shadow-sm border border-navy/10 hover:border-gold/30 hover:shadow-gold-glow transition-all">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-soft text-gold border border-navy/5">
                      <item.icon className="size-3.5" strokeWidth={2.5} />
                    </span>
                    <div className="flex-1">
                      <p className="text-[13px] sm:text-[14px] leading-relaxed text-anthracite/90">
                        <strong className="font-bold text-navy">{item.title}</strong>
                        {item.desc && <span>{item.desc}</span>}
                      </p>
                      {item.points && item.points.length > 0 && (
                        <ul className="mt-2 space-y-1.5">
                          {item.points.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2 text-[12px] sm:text-[13px] leading-relaxed text-anthracite/80">
                              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-gold" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
