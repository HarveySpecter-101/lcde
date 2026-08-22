"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, MessageCircle, Sparkles, CheckCircle2, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LCDE, WHATSAPP_LINK } from "@/lib/site-data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-white pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Decorative gold accents */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.04]" aria-hidden />
      <div className="pointer-events-none absolute -left-32 top-24 size-72 rounded-full bg-gold/15 blur-3xl animate-orb-1" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-96 rounded-full bg-gold/10 blur-3xl animate-orb-2" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-1/3 size-64 rounded-full bg-gold/8 blur-3xl animate-orb-3" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Left content */}
        <motion.div
          className="lg:col-span-7"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-xs font-medium text-gold backdrop-blur-sm">
            <Sparkles className="size-3.5" />
            Formation « 10 en 1 » · 12 mois · 100 % pratique
            <span className="hidden sm:inline">· {LCDE.edition}</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-5 font-serif text-4xl font-bold leading-[1.05] tracking-tight text-navy sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            Créons les experts
            <br />
            de <span className="text-gold-gradient">demain.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-anthracite/70 sm:text-lg">
            La formation 100 % pratique en <strong className="font-semibold text-navy">Audit, Finance, Fiscalité et Comptabilité</strong> qui rend chaque candidat opérationnel dès le premier jour.
          </motion.p>

          <motion.div variants={item} className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="bg-gold-gradient text-navy font-semibold hover:opacity-90 hover:shadow-gold-glow">
              <a href="#contact">
                Je rejoins la prochaine édition
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-gold/50 text-gold hover:bg-gold/10 hover:text-gold hover:border-gold">
              <a href="#ressources">
                <Download className="size-4" />
                Télécharger le programme complet
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-navy hover:bg-gold/10 hover:text-navy">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4 text-[#25D366]" />
                WhatsApp
              </a>
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.ul variants={item} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-anthracite/75">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-brand" />
              Experts-comptables OEC
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-brand" />
              Seniors issus des Big Four
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-brand" />
              Docteurs en gestion
            </li>
          </motion.ul>
        </motion.div>

        {/* Right visual */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            {/* Main card — light premium composition */}
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-gold/20 bg-white p-6 shadow-premium">
              {/* Inner gold glow accents */}
              <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-gold/15 blur-3xl" />
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-gold/[0.04] to-transparent" />

              {/* Top: avatar + verified */}
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-gold-gradient text-navy font-serif text-lg font-bold shadow-gold-glow">
                    LC
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">Le Club Des Experts</p>
                    <p className="text-xs text-anthracite/70">{LCDE.city}, {LCDE.country}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald-brand/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-brand">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-brand" /> Édition en cours
                </span>
              </div>

              {/* Middle: differentiators */}
              <div className="relative mt-6 space-y-3">
                {/* Headline value prop */}
                <div className="rounded-2xl border border-gold/25 bg-gold/[0.06] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                    L'avantage LCDE
                  </p>
                  <p className="mt-2 font-serif text-2xl font-bold leading-tight text-navy">
                    Un parcours. Dix métiers du chiffre.
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-anthracite/70">
                    Du socle comptable aux opérations de M&A — tout le spectre en une seule formation.
                  </p>
                </div>

                {/* Key differentiators grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-navy/10 bg-soft p-4">
                    <p className="font-serif text-2xl font-bold text-navy">12 mois</p>
                    <p className="mt-0.5 text-xs font-medium text-anthracite/70">Janvier → Décembre</p>
                  </div>
                  <div className="rounded-2xl border border-navy/10 bg-soft p-4">
                    <p className="font-serif text-2xl font-bold text-navy">5 outils</p>
                    <p className="mt-0.5 text-xs font-medium text-anthracite/70">Sage · SAP · Odoo · BI</p>
                  </div>
                </div>
              </div>

              {/* Bottom: instructors row */}
              <div className="relative mt-5 flex items-center gap-3 rounded-2xl border border-navy/10 bg-soft p-3">
                <div className="flex -space-x-2.5">
                  {["OEC", "BF", "DG", "TS"].map((t, i) => (
                    <span
                      key={t}
                      className="flex size-9 items-center justify-center rounded-full border-2 border-white bg-gold-gradient font-serif text-[11px] font-bold text-navy"
                      style={{ zIndex: 10 - i }}
                      title={["Ordre des Experts-Comptables", "Big Four", "Docteur en gestion", "Transaction Services"][i]}
                    >
                      {t}
                    </span>
                  ))}
                  <span className="z-0 flex size-9 items-center justify-center rounded-full border-2 border-white bg-navy/10 font-serif text-[11px] font-bold text-navy">
                    +
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-navy">Intervenants praticiens</p>
                  <p className="text-[11px] text-anthracite/70">OEC · Big Four · Docteurs · Advisory</p>
                </div>
              </div>
            </div>

            {/* Floating badge — top right (anchored to card corner) */}
            <motion.div
              className="absolute -right-4 top-12 z-20 rounded-2xl border border-gold/40 bg-white p-3 shadow-gold-glow"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-brand text-white">
                  <CheckCircle2 className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-navy">Opérationnel</p>
                  <p className="text-[10px] font-medium text-anthracite/70">dès le 1ᵉʳ jour</p>
                </div>
              </div>
            </motion.div>

            {/* Floating badge — bottom left (anchored to card corner) */}
            <motion.div
              className="absolute -left-4 bottom-8 z-20 rounded-2xl border border-navy/10 bg-white p-3 shadow-premium"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-xl bg-navy-gradient text-gold">
                  <BadgeCheck className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-navy">OEC certifié</p>
                  <p className="text-[10px] font-medium text-anthracite/70">intervenants agréés</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave divider */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden />
    </section>
  );
}
