"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  CheckCircle2,
  FileText,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

export const LEVEL_OPTIONS = [
  "Etudiant 1ère Année",
  "Etudiant 2ème Année",
  "Etudiant 3ème Année",
  "Etudiant 4ème Année",
  "Etudiant 5ème Année",
  "Cycle Doctoral",
  "Lauréat",
  "Professionnel expérimenté",
];

export const SCHOOL_OPTIONS = [
  "ENCG Tanger",
  "ENCG Casablanca",
  "ENCG Kénitra",
  "ENCG Settat",
  "ENCG Agadir",
  "ENCG Fès",
  "ENCG Meknès",
  "ENCG Dakhla",
  "ENCG Marrakech",
  "ENCG El Jadida",
  "ENCG Béni Mellal",
  "ENCG Oujda",
  "ISCAE Casablanca",
  "ISCAE Rabat",
  "FSJES",
  "Autre Ecole Publique",
  "HEM Ecole Supérieure de Management",
  "ESCA Ecole de Management",
  "Groupe IGA",
  "Toulouse Business School",
  "Autre Ecole Privée",
];

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSffLjxWFLgOxinKTAPnYum6lphxaV6AhJvWCjOIMRL2QgiVsw/viewform";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-14 sm:scroll-mt-20 overflow-hidden bg-navy-gradient py-12 sm:py-18 md:py-24 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.08]" aria-hidden />
      
      {/* Animated background glowing orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.35, 0.15],
          x: [0, 25, 0],
          y: [0, -25, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-0 size-96 rounded-full bg-gold/20 blur-3xl"
        aria-hidden
      />
      <motion.div
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.1, 0.25, 0.1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute -right-24 bottom-0 size-96 rounded-full bg-emerald-brand/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold shadow-gold-glow/20"
          >
            <Sparkles className="size-3.5 text-gold animate-spin-slow" /> Inscription & Candidature
          </motion.span>
          <h2 className="mt-2.5 font-serif text-lg font-bold leading-snug tracking-tight text-white sm:text-2xl md:text-3xl">
            Prêt à intégrer la prochaine promotion LCDE ?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/80 max-w-xl mx-auto">
            Remplissez notre formulaire officiel de candidature en quelques minutes. Notre équipe pédagogique vous recontactera sous 24h.
          </p>
        </Reveal>

        <div className="mt-8 sm:mt-10 flex justify-center">
          <Reveal className="w-full max-w-lg">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl sm:rounded-3xl border border-white/15 bg-white/[0.06] p-6 sm:p-8 backdrop-blur-md shadow-2xl hover:border-gold/30 transition-colors text-center"
            >
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gold/10 border border-gold/25 text-gold mb-5 shadow-inner">
                <FileText className="size-7 text-gold" />
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                Formulaire Officiel de Candidature
              </h3>

              <div className="mt-5 space-y-2.5 text-left bg-white/[0.04] border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-white/80">
                <div className="flex items-center gap-2.5">
                  <Clock className="size-4 text-gold shrink-0" />
                  <span>Temps estimé : <strong className="text-white">2 à 3 minutes</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Traitement et réponse sous <strong className="text-white">24 heures</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="size-4 text-sky-400 shrink-0" />
                  <span>Données confidentielles et sécurisées</span>
                </div>
              </div>

              <div className="mt-6">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    asChild
                    size="lg"
                    className="h-12 sm:h-13 w-full rounded-xl bg-gold text-navy font-bold text-base sm:text-lg hover:bg-gold/90 hover:shadow-gold-glow flex items-center justify-center gap-2.5 shadow-lg transition-all"
                  >
                    <a
                      href={GOOGLE_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lancer la candidature
                      <ExternalLink className="size-5" />
                    </a>
                  </Button>
                </motion.div>
              </div>

              <p className="mt-3.5 text-xs text-white/60">
                Vous serez redirigé vers le formulaire Google Forms officiel
              </p>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
