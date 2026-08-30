"use client";

import { motion } from "framer-motion";
import {
  Target,
  Users,
  FileText,
  Send,
  Briefcase,
  Award,
  GraduationCap,
  Laptop,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  ArrowRight,
  Heart,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

const GAIN_ITEMS = [
  {
    icon: Target,
    badge: "100% Pratique",
    title: "Compétences réellement opérationnelles",
    sub: "Apprises par la pratique et non la théorie.",
    points: [
      "Pratique directe sur des cas réels issus de dossiers de cabinets d'expertise et d'audit",
      "Maîtrise opérationnelle des outils du marché (Sage, SAP FI/CO, Odoo, Power BI)",
      "Capacité à être immédiatement autonome et performant dès le premier jour",
    ],
  },
  {
    icon: Users,
    badge: "Technique & RH",
    title: "Accompagnement à vie par nos intervenants",
    sub: "Un soutien continu même après la fin de la formation.",
    points: [
      "Assistance technique continue sur vos missions et dossiers réels en poste",
      "Conseil RH & orientation carrière personnalisée tout au long de votre parcours",
      "Mentorat direct et bienveillant assuré par des praticiens en exercice",
    ],
  },
  {
    icon: FileText,
    badge: "CV & Entretiens",
    title: "Préparation complète au marché du travail",
    sub: "CV (Classique & ATS), entretiens et soft skills.",
    points: [
      "Techniques de rédaction & optimisation du CV (Classique & format ATS)",
      "Simulations d'entretiens professionnels en conditions réelles avec débriefing",
      "Perfectionnement des soft skills indispensables pour faire la différence",
    ],
  },
  {
    icon: Send,
    badge: "Accès Exclusif",
    title: "Candidatures intelligentes & Base d'adresses vérifiées",
    sub: "Méthodes efficaces et exclusives pour postuler intelligemment.",
    points: [
      "Méthodes exclusives pour postuler intelligemment et capter l'attention",
      "Accès à une base de données exclusive d'adresses mails vérifiées de recruteurs",
      "Stratégies d'approche directe générant un taux élevé de convocation",
    ],
  },
  {
    icon: Briefcase,
    badge: "Insertion Pro",
    title: "Réseau de partenaires & Aide aux stages et emplois",
    sub: "Priorité absolue aux offres auprès de nos partenaires professionnels.",
    points: [
      "Réseau de partenaires professionnels exclusifs (Big 4, banques, multinationales)",
      "Aide active à l'insertion : stages rémunérés, pré-embauches et emplois",
      "Priorité accordée à nos participants sur les recrutements partenaires",
    ],
  },
  {
    icon: Award,
    badge: "Recommandation LCDE",
    title: "Recommandations exclusives “Le Club Des Experts”",
    sub: "Recommandations officielles et réseautage ciblé.",
    points: [
      "Recommandations exclusives appuyant officiellement votre dossier auprès des cabinets",
      "Réseautage ciblé et prioritaire avec notre écosystème de recruteurs",
      "Mise en relation privilégiée avec la communauté d'alumni déjà en poste",
    ],
  },
  {
    icon: GraduationCap,
    badge: "+15 ans d'expérience",
    title: "Experts et intervenants de très haut niveau",
    sub: "+10 intervenants avec un minimum de 15 ans d'expérience.",
    points: [
      "Associés & Senior Managers Big Four (PwC, Deloitte, EY, Mazars...)",
      "Commissaires aux comptes et Experts-comptables diplômés de l'OEC",
      "Partage d'expériences concrètes, méthodologies et secrets du métier",
    ],
  },
  {
    icon: Laptop,
    badge: "Flexibilité Totale",
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
  const whatsappPaymentLink = `https://wa.me/212777293083?text=${encodeURIComponent(
    "Bonjour Le Club Des Experts, je souhaite avoir des informations sur les réductions et facilités de paiements en tranches pour la formation."
  )}`;

  return (
    <section
      id="ce-que-vous-gagnez"
      className="relative scroll-mt-20 overflow-hidden bg-[#faf9f5] py-20 md:py-28 border-b border-navy/5"
    >
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.06]" aria-hidden />
      <div className="pointer-events-none absolute -right-24 top-1/4 size-96 rounded-full bg-gold/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-24 bottom-1/4 size-96 rounded-full bg-navy/5 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy border border-navy/10">
            <Sparkles className="size-3.5 text-gold" /> Avantages & Valeur Exclusifs
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-navy sm:text-5xl md:text-6xl">
            Ce que vous <span className="text-gold-gradient">gagnez</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-anthracite/75 sm:text-lg">
            Bien plus qu'un programme de cours : un accompagnement complet, des opportunités d'exception
            et des compétences directement opérationnelles pour garantir votre réussite professionnelle.
          </p>
        </Reveal>

        {/* 8 Main Advantages Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-8">
          {GAIN_ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-navy/10 bg-white p-6 shadow-premium transition-all duration-300 hover:border-gold/40 hover:shadow-gold-glow md:p-8"
              >
                {/* Gold accent line at top on hover */}
                <span className="absolute inset-x-8 top-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />

                <div>
                  {/* Top row: Icon + Badge */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-navy-gradient text-gold shadow-navy-glow transition-transform duration-300 group-hover:scale-105">
                      <item.icon className="size-7" strokeWidth={1.9} />
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-soft px-3 py-1 text-xs font-semibold text-navy border border-navy/10">
                      <Sparkles className="size-3 text-gold" />
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="mt-5 font-serif text-xl font-bold leading-snug text-navy md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-gold font-sans">
                    {item.sub}
                  </p>

                  {/* Bullet points */}
                  <ul className="mt-5 space-y-2.5 border-t border-navy/5 pt-5">
                    {item.points.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed text-anthracite/80">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-brand" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Highlight Card: Réductions et Paiements en tranches */}
        <Reveal delay={0.2} className="mt-12">
          <div className="relative overflow-hidden rounded-3xl border-2 border-gold/30 bg-navy-gradient p-8 text-white shadow-navy-glow md:p-10">
            {/* Ambient gold glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-gold/20 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-dots opacity-10" />

            <div className="relative z-10 flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold backdrop-blur-sm border border-white/10 mb-4">
                  <Heart className="size-3.5 fill-red-500 text-red-500" /> Facilités de paiement
                </div>
                <h3 className="font-serif text-2xl font-bold sm:text-3xl md:text-4xl text-white">
                  ❤️ Réductions et Paiements en tranches
                </h3>
                <p className="mt-2 text-base sm:text-lg font-medium text-gold">
                  N'hésites pas à nous en parler, nous sommes à ton écoute 🙏
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                  Nous croyons fermement que l'aspect financier ne doit jamais être un obstacle à votre insertion
                  et votre progression. Des facilités de paiement échelonné adaptées à votre profil ainsi que des réductions
                  personnalisées sont mises à votre disposition.
                </p>
              </div>

              {/* Call to action buttons */}
              <div className="flex flex-col sm:flex-row shrink-0 gap-3 w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-600 text-white font-semibold hover:bg-emerald-500 shadow-md hover:shadow-lg transition-all"
                >
                  <a
                    href={whatsappPaymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="size-5" />
                    Échanger sur WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-gold text-navy font-semibold hover:bg-gold/90 shadow-gold-glow transition-all"
                >
                  <a href="#contact" className="inline-flex items-center justify-center gap-2">
                    Nous contacter
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
