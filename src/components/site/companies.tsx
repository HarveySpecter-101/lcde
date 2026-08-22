"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, ArrowRight, BriefcaseBusiness, Users2, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { EMPLOYER_SECTORS } from "@/lib/site-data";
import { PricingModal } from "@/components/site/pricing-modal";

const B2B_OFFERS = [
  {
    icon: BriefcaseBusiness,
    title: "Formation sur-mesure pour vos équipes",
    desc: "Programmes adaptés à votre secteur et à vos outils, animés par des experts-comptables et seniors de l'audit.",
  },
  {
    icon: Users2,
    title: "Vivier de profils formés et recrutables",
    desc: "Accédez à des candidats déjà opérationnels en audit, finance, fiscalité et comptabilité.",
  },
  {
    icon: ShieldCheck,
    title: "Certifié par des praticiens OEC",
    desc: "Une garantie de niveau : chaque diplômé a été évalué selon les standards des cabinets.",
  },
];

export function Companies() {
  const [pricingOpen, setPricingOpen] = useState(false);
  return (
    <section id="entreprises" className="relative scroll-mt-20 overflow-hidden bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left */}
          <Reveal direction="right">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
              <Building2 className="size-3.5" /> Espace entreprises
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
              Vos futurs collaborateurs, déjà formés par des experts-comptables et des seniors de l'audit.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-anthracite/70 sm:text-lg">
              LCDE accompagne les entreprises sur deux leviers : former vos équipes en interne
              et recruter des profils directement opérationnels. Une réponse B2B pensée pour les
              directions financières, RH et les cabinets en croissance.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <Button
                type="button"
                onClick={() => setPricingOpen(true)}
                size="lg"
                className="h-12 bg-navy text-white font-semibold hover:bg-navy/90 hover:shadow-navy-glow"
              >
                Obtenir un devis personnalisé
                <ArrowRight className="size-4" />
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-navy/20 text-navy hover:bg-navy hover:text-white">
                <a href="#contact">Recruter un profil</a>
              </Button>
            </div>

            {/* Sector badges */}
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-anthracite/50">
                Secteurs visés par nos diplômés
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {EMPLOYER_SECTORS.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    whileHover={{ y: -3 }}
                    className="rounded-xl border border-navy/10 bg-soft p-3 text-center"
                  >
                    <p className="text-sm font-bold text-navy">{s.name}</p>
                    <p className="mt-0.5 text-[10px] leading-tight text-anthracite/55">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-anthracite/45">
                * Catégories génériques — les logos d'entreprises partenaires seront ajoutés après accord du client.
              </p>
            </div>
          </Reveal>

          {/* Right — offer cards */}
          <Reveal direction="left" delay={0.1}>
            <div className="space-y-4">
              {B2B_OFFERS.map((o, i) => (
                <motion.div
                  key={o.title}
                  whileHover={{ y: -3 }}
                  className="group relative flex h-full gap-4 overflow-hidden rounded-2xl border border-navy/10 bg-white p-5 shadow-premium transition-shadow hover:shadow-navy-glow sm:p-6"
                >
                  {/* Gold accent line on hover */}
                  <span className="absolute inset-y-0 left-0 w-1 origin-y scale-y-0 bg-gold transition-transform duration-300 group-hover:scale-y-100" />
                  <span className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-navy-gradient text-gold shadow-navy-glow">
                    <o.icon className="size-7" strokeWidth={1.8} />
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-gold font-serif text-[11px] font-bold text-navy">
                      {i + 1}
                    </span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-lg font-bold text-navy">{o.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-anthracite/70">{o.desc}</p>
                  </div>
                </motion.div>
              ))}

              {/* Highlight card */}
              <div className="relative overflow-hidden rounded-2xl bg-navy-gradient p-6 text-white shadow-navy-glow">
                <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-gold/20 blur-2xl" />
                <div className="relative flex items-center gap-3">
                  <Sparkles className="size-5 text-gold" />
                  <p className="text-sm font-medium text-white/90">
                    Plus de <strong className="font-bold text-white">1 500 profils</strong> accompagnés depuis 2020,
                    avec un taux d'insertion allant jusqu'à <strong className="text-gold">96 %</strong>.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Pricing inquiry modal */}
      <PricingModal open={pricingOpen} onOpenChange={setPricingOpen} />
    </section>
  );
}
