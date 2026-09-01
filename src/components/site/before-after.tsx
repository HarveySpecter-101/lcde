"use client";

import { SectionDecor } from "@/components/site/section-decor";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, GitCompareArrows, GraduationCap, Briefcase } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

const BEFORE = [
  <>Savoir académique <strong className="font-bold text-red-600">théorique</strong>, peu confronté à la réalité des dossiers</>,
  <><strong className="font-bold text-red-600">Méconnaissance</strong> des outils réels (Sage, SAP, Odoo, Power BI)</>,
  <>Pas de <strong className="font-bold text-red-600">méthodologie d'audit</strong> structurée</>,
  <><strong className="font-bold text-red-600">Difficulté</strong> à tenir en entretien PFE et en mission</>,
  <><strong className="font-bold text-red-600">Écart</strong> ressenti entre la fac et les attentes des cabinets</>,
];

const AFTER = [
  <><strong className="font-bold text-green-600">Raisonner</strong> comme un praticien sur des cas réels</>,
  <><strong className="font-bold text-green-600">Maîtriser</strong> les outils utilisés en cabinet et en entreprise</>,
  <>Appliquer une <strong className="font-bold text-green-600">démarche d'audit</strong> (ISA / CNCC) de bout en bout</>,
  <>Arriver <strong className="font-bold text-green-600">opérationnel</strong> dès le premier jour en stage ou en poste</>,
  <>Parler le même <strong className="font-bold text-green-600">langage</strong> que les seniors des Big Four</>,
];

export function BeforeAfter() {
  const [activeTab, setActiveTab] = useState<"avant" | "apres">("avant");

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <SectionDecor variant="light" pos="B" />
      
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy">
            <GitCompareArrows className="size-3.5 text-gold" /> L'effet LCDE
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-navy sm:text-5xl md:text-6xl">
            Avant / Après LCDE
          </h2>
          <p className="mt-5 text-base leading-relaxed text-anthracite/70 sm:text-lg">
            Nous comblons l'écart entre la théorie académique et les attentes réelles des cabinets.
            Voici ce qui change concrètement.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 max-w-3xl">
          {/* Toggle Buttons */}
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("avant")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 sm:py-4 transition-all duration-300 ${
                  activeTab === "avant"
                    ? "border-[#dc2626] bg-[#dc2626] text-white shadow-lg"
                    : "border-gray-200 bg-transparent text-gray-500 hover:border-[#dc2626]/50 hover:text-[#dc2626]"
                }`}
              >
                <GraduationCap className="size-5" />
                <span className="font-semibold">Avant</span>
              </button>
              <button
                onClick={() => setActiveTab("apres")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 sm:py-4 transition-all duration-300 ${
                  activeTab === "apres"
                    ? "border-[#16a34a] bg-[#16a34a] text-white shadow-lg"
                    : "border-gray-200 bg-transparent text-gray-500 hover:border-[#16a34a]/50 hover:text-[#16a34a]"
                }`}
              >
                <Briefcase className="size-5" />
                <span className="font-semibold">Après</span>
              </button>
            </div>
          </Reveal>

          {/* Content Area */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              {activeTab === "avant" && (
                <motion.div
                  key="avant"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm md:p-8"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                      <GraduationCap className="size-7" />
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-red-950">Le profil académique</h3>
                      <p className="text-sm font-medium text-red-600/80">Avant la formation LCDE</p>
                    </div>
                  </div>
                  <ul className="mt-8 space-y-4">
                    {BEFORE.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-base text-red-900/80">
                        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-red-200 text-red-600">
                          <X className="size-4" strokeWidth={2.5} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === "apres" && (
                <motion.div
                  key="apres"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm md:p-8"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                      <Briefcase className="size-7" />
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-green-950">Le profil opérationnel</h3>
                      <p className="text-sm font-medium text-green-600/80">Après la formation LCDE</p>
                    </div>
                  </div>
                  <ul className="mt-8 space-y-4">
                    {AFTER.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-base text-green-900/80">
                        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-green-200 text-green-600">
                          <Check className="size-4" strokeWidth={3} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
