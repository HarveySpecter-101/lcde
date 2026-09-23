"use client";

import { SectionDecor } from "@/components/site/section-decor";

import {
  CreditCard,
  Target,
  Users,
  FileText,
  Send,
  Briefcase,
  Award,
  GraduationCap,
  Laptop,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";

const GAIN_ITEMS = [
  {
    id: 1,
    icon: CreditCard,
    title: "Réductions et Paiements en tranches",
    sub: "N'hésites pas à nous en parler, nous sommes à ton écoute 🙏",
    points: [
      "Paiements échelonnés en plusieurs tranches sans frais adaptés à votre situation",
      "Réductions personnalisées et tarifs préférentiels selon votre profil",
      "Facilités d'accès immédiat à l'ensemble du programme d'élite et de son réseau",
    ],
  },
  {
    id: 2,
    icon: Target,
    title: "Compétences réellement opérationnelles",
    sub: "Apprises par la pratique et non la théorie.",
    points: [
      "Pratique directe sur des cas réels issus de dossiers de cabinets d'expertise et d'audit",
      "Maîtrise opérationnelle des outils du marché (Sage, SAP FI/CO, Odoo, Power BI)",
      "Capacité à être immédiatement autonome et performant dès le premier jour",
    ],
  },
  {
    id: 3,
    icon: Users,
    title: "Accompagnement à vie par nos intervenants",
    sub: "Un soutien continu même après la fin de la formation.",
    points: [
      "Assistance technique continue sur vos missions et dossiers réels en poste",
      "Conseil RH & orientation carrière personnalisée tout au long de votre parcours",
      "Mentorat direct et bienveillant assuré par des praticiens en exercice",
    ],
  },
  {
    id: 4,
    icon: FileText,
    title: "Préparation complète au marché du travail",
    sub: "CV (Classique & ATS), entretiens et soft skills.",
    points: [
      "Techniques de rédaction & optimisation du CV (Classique & format ATS)",
      "Simulations d'entretiens professionnels en conditions réelles avec débriefing",
      "Perfectionnement des soft skills indispensables pour faire la différence",
    ],
  },
  {
    id: 5,
    icon: Send,
    title: "Candidatures intelligentes & Base d'adresses vérifiées",
    sub: "Méthodes efficaces et exclusives pour postuler intelligemment.",
    points: [
      "Méthodes exclusives pour postuler intelligemment et capter l'attention",
      "Accès à une base de données exclusive d'adresses mails vérifiées de recruteurs",
      "Stratégies d'approche directe générant un taux élevé de convocation",
    ],
  },
  {
    id: 6,
    icon: Briefcase,
    title: "Réseau de partenaires & Aide aux stages et emplois",
    sub: "Priorité absolue aux offres auprès de nos partenaires professionnels.",
    points: [
      "Réseau de partenaires professionnels exclusifs (Big 4, banques, multinationales)",
      "Aide active à l'insertion : stages rémunérés, pré-embauches et emplois",
      "Priorité accordée à nos participants sur les recrutements partenaires",
    ],
  },
  {
    id: 7,
    icon: Award,
    title: "Recommandations exclusives “Le Club Des Experts”",
    sub: "Recommandations officielles et réseautage ciblé.",
    points: [
      "Recommandations exclusives appuyant officiellement votre dossier auprès des cabinets",
      "Réseautage ciblé et prioritaire avec notre écosystème de recruteurs",
      "Mise en relation privilégiée avec la communauté d'alumni déjà en poste",
    ],
  },
  {
    id: 8,
    icon: GraduationCap,
    title: "Experts et intervenants de très haut niveau",
    sub: "+10 intervenants avec un minimum de 15 ans d'expérience.",
    points: [
      "Associés & Senior Managers Big Four (PwC, Deloitte, EY, Mazars...)",
      "Commissaires aux comptes et Experts-comptables diplômés de l'OEC",
      "Partage d'expériences concrètes, méthodologies et secrets du métier",
    ],
  },
  {
    id: 9,
    icon: Laptop,
    title: "100% à distance, En Direct & Replays disponibles",
    sub: "Séances interactives en direct et simultanément enregistrées.",
    points: [
      "Séances tenues 100% en direct avec échanges et questions-réponses en temps réel",
      "Enregistrements intégraux disponibles pour revoir les séances à votre rythme",
      "Possibilité de rattraper et réviser convenablement et sans aucune pression",
    ],
  },
];

export function WhatYouGain() {
  return (
    <section
      id="ce-que-vous-gagnez"
      className="relative scroll-mt-20 overflow-hidden bg-black py-14 md:py-22"
    >
      <SectionDecor variant="dark" pos="C" />

      {/* Floating background ambient animation */}
      <style>{`
        @keyframes float-gain1 {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.15; }
          50% { transform: scale(1.25) translate(30px, -20px); opacity: 0.3; }
        }
        @keyframes float-gain2 {
          0%, 100% { transform: scale(1.2) translate(0, 0); opacity: 0.1; }
          50% { transform: scale(1) translate(-20px, 25px); opacity: 0.25; }
        }
        @keyframes wobble {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
      `}</style>
      <div
        style={{ animation: "float-gain1 9s ease-in-out infinite" }}
        className="pointer-events-none absolute -right-24 top-1/3 size-96 rounded-full bg-gold/20 blur-3xl"
        aria-hidden
      />
      <div
        style={{ animation: "float-gain2 11s ease-in-out infinite 1s" }}
        className="pointer-events-none absolute -left-20 bottom-1/4 size-80 rounded-full bg-navy/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Ce que vous <span className="text-gold-gradient">gagnez</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
            Bien plus qu'un programme de cours : découvrez vos avantages exclusifs et votre accompagnement
            complet conçus pour propulser votre carrière.
          </p>
        </Reveal>

        {/* Vertical list: every benefit is visible without a carousel interaction. */}
        <Reveal delay={0.15} className="mt-8 sm:mt-10">
          <div className="mx-auto max-w-4xl divide-y divide-white/15 rounded-3xl border border-white/15 bg-white/[0.04] px-5 sm:px-8">
            {GAIN_ITEMS.map((item) => (
              <div key={item.id} className="flex gap-4 py-5 sm:gap-6 sm:py-6">
                <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold-gradient text-navy shadow-gold-glow">
                  <item.icon className="size-5" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-serif text-lg font-bold leading-tight text-white sm:text-xl">{item.title}</h3>
                  <p className="mt-1 text-xs font-semibold text-gold sm:text-sm">{item.sub}</p>
                  <ul className="mt-2 space-y-1">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-xs leading-relaxed text-white/75 sm:text-sm">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
