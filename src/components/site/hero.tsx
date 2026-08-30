"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, BadgeCheck } from "lucide-react";
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

export function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-soft pt-28 pb-20 md:pt-36 md:pb-28">
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
          <motion.h1
            variants={item}
            className="text-center font-serif text-4xl font-bold leading-[1.15] tracking-tight text-navy sm:text-5xl md:text-6xl lg:text-[3.5rem]"
          >
            Rejoignez{" "}
            <span className="text-gold-gradient font-extrabold drop-shadow-sm">
              la 8ème édition (2027)
            </span>{" "}
            de la formation qui vous prépare pour 13 métiers différents et complémentaires.
          </motion.h1>

          {/* Promotional info block */}
          <motion.div variants={item} className="mt-6 space-y-3">
            {PROMO_ITEMS.map((p, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-2xl border border-gold/20 bg-gold/[0.04] p-4"
              >
                <span className="shrink-0 text-xl leading-none">{p.emoji}</span>
                <p className="text-sm leading-relaxed text-anthracite/80 sm:text-[15px]">
                  {p.text}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-6 hidden flex-col gap-3 sm:flex sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="bg-gold-gradient text-navy font-semibold hover:opacity-90 hover:shadow-gold-glow">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Je rejoins la prochaine édition
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right visual — hidden on mobile to prioritize content */}
        <motion.div
          className="hidden lg:block lg:col-span-5"
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
                    Un parcours. Treize métiers du chiffre.
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
                    <p className="font-serif text-2xl font-bold text-navy">13 métiers</p>
                    <p className="mt-0.5 text-xs font-medium text-anthracite/70">Complémentaires</p>
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
