"use client";
import Image from "next/image";

import { SectionDecor } from "@/components/site/section-decor";
import { Reveal } from "@/components/site/reveal";
import { Sparkles } from "lucide-react";

const FOUNDERS = [
  {
    name: "Rachad GHALI",
    bio: "Manager Audit & Financial Advisory, Consultant spécialisé dans l'Audit et le Métier du secteur Bancaire.",
    photo: "/founders/rachad-ghali.jpg",
  },
  {
    name: "Rida MOUTIK",
    bio: "Expert Comptable Mémorialiste, Manager Audit & Financial Advisory, Spécialiste en Due Diligence (financière, fiscale, sociale et juridique).",
    photo: "/founders/rida-moutik.jpg",
  },
];

export function Founders() {
  return (
    <section id="fondateurs" className="relative scroll-mt-20 overflow-hidden bg-[#000000] py-14 md:py-24">
      <SectionDecor variant="dark" pos="A" />

      {/* Animated floating background ambient orbs */}
      <style>{`
        @keyframes float-orb1 {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.08; }
          50% { transform: scale(1.2) translate(20px, -20px); opacity: 0.15; }
        }
        @keyframes float-orb2 {
          0%, 100% { transform: scale(1.2) translate(0, 0); opacity: 0.05; }
          50% { transform: scale(1) translate(-30px, 30px); opacity: 0.1; }
        }
      `}</style>
      <div
        style={{ animation: "float-orb1 8s ease-in-out infinite" }}
        className="pointer-events-none absolute -left-20 top-1/4 size-80 rounded-full bg-gold/20 blur-3xl"
        aria-hidden
      />
      <div
        style={{ animation: "float-orb2 10s ease-in-out infinite 1s" }}
        className="pointer-events-none absolute -right-20 bottom-1/4 size-96 rounded-full bg-white/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl uppercase">
            Les <span className="text-gold-gradient">fondateurs</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            Deux praticiens complémentaires qui ont bâti LCDE sur une conviction : la formation
            doit se confronter à la réalité des dossiers.
          </p>
        </Reveal>

        <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.15} direction={i === 0 ? "right" : "left"}>
              <article
                className="group relative h-full rounded-3xl bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-2xl transition-transform hover:-translate-y-1"
              >
                {/* Founder photo */}
                <div className="shrink-0 mx-auto sm:mx-0">
                  <div className="relative size-32 overflow-hidden rounded-2xl sm:size-[120px]">
                    <Image
                      src={f.photo}
                      alt={`Photo de ${f.name}`}
                      width={128}
                      height={128}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left flex flex-col justify-center h-full pt-1 sm:pt-0">
                  <h3 className="font-serif text-[22px] sm:text-2xl font-extrabold text-[#0f172a]">
                    {f.name}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-[15px] font-medium leading-relaxed text-[#334155]">
                    {f.bio}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
