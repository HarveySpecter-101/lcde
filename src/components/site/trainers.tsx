"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, Quote } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { TRAINERS } from "@/lib/site-data";

const REASONS = [
  {
    icon: Award,
    title: "Inscrits à l'OEC",
    desc: "Experts-comptables agréés, exerçant en cabinet, au fait des dernières normes.",
  },
  {
    icon: Briefcase,
    title: "Seniors Big Four",
    desc: "Auditeurs et consultants issus des grands cabinets internationaux.",
  },
  {
    icon: GraduationCap,
    title: "Docteurs en gestion",
    desc: "Académiques qui relient rigueur théorique et pratique de terrain.",
  },
];

export function Trainers() {
  return (
    <section id="formateurs" className="relative scroll-mt-20 overflow-hidden bg-navy-gradient py-20 text-white md:py-28">
      {/* Decorative */}
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.08]" aria-hidden />
      <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-gold/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-emerald-brand/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
            <Briefcase className="size-3.5" /> Les formateurs
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Appris par ceux qui font, au quotidien.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
            Tous nos intervenants sont des praticiens actifs : experts-comptables inscrits à l'Ordre,
            docteurs en gestion et auditeurs/consultants seniors issus de grands cabinets.
          </p>
        </Reveal>

        {/* Reasons */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-6 backdrop-blur-md transition-colors hover:border-gold/30 hover:bg-white/[0.12]"
              >
                {/* Gold accent line on hover */}
                <span className="absolute inset-x-6 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
                <span className="flex size-12 items-center justify-center rounded-xl bg-gold-gradient text-navy shadow-gold-glow">
                  <r.icon className="size-6" />
                </span>
                <h3 className="mt-4 font-serif text-lg font-bold text-white">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{r.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Trainer profile cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRAINERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} direction="up">
              <motion.article
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-md transition-colors hover:border-gold/30"
              >
                {/* Photo placeholder */}
                <div className="relative mx-auto flex size-24 items-center justify-center rounded-2xl bg-gold-gradient font-serif text-2xl font-bold text-navy shadow-gold-glow">
                  {t.initials}
                  <div className="absolute inset-0 flex items-end justify-center rounded-2xl bg-navy/80 p-2 text-center text-[9px] font-medium uppercase tracking-wide text-white opacity-0 transition-opacity group-hover:opacity-100">
                    [Photo réelle formateur]
                  </div>
                </div>
                <h3 className="mt-4 text-center font-serif text-base font-bold text-white">{t.name}</h3>
                <p className="mt-1 text-center text-xs font-medium text-gold">{t.role}</p>
                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-gold/20 bg-gold/10 px-2 py-0.5 text-[10px] font-medium text-gold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        {/* Quote */}
        <Reveal delay={0.15} className="mt-14">
          <blockquote className="relative mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm md:p-10">
            <Quote className="mx-auto size-8 text-gold" />
            <p className="mt-4 font-serif text-xl font-medium leading-relaxed text-white md:text-2xl">
              « L'objectif n'est pas que vous sachiez, c'est que vous sachiez faire — dès le premier jour en mission. »
            </p>
            <footer className="mt-4 text-sm text-white/60">— L'équipe pédagogique LCDE</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
