"use client";

import {
  MapPin,
  Mail,
  MessageCircle,
  Phone,
  Instagram,
  Facebook,
  Linkedin,
  Heart,
} from "lucide-react";
import { LCDE, NAV_LINKS, WHATSAPP_LINK } from "@/lib/site-data";

const MODULE_LINKS = [
  "Comptabilité & Consolidation",
  "Normes IFRS",
  "Fiscalité Marocaine",
  "Droit des Affaires",
  "Audit des États Financiers",
  "Commissariat aux Comptes",
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden bg-[#071c33] text-white">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.05]" aria-hidden />
      <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-gold/10 blur-3xl" aria-hidden />

      {/* Top quote strip */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 text-center">
          <p className="font-serif text-xl font-bold text-white md:text-2xl">
            « Créons les experts de demain… »
          </p>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#accueil" className="flex items-center gap-2.5" aria-label="LCDE - Accueil">
              <span className="relative flex size-11 items-center justify-center overflow-hidden rounded-full bg-white/5 ring-2 ring-gold/30">
                <img
                  src="/logo-lcde.png"
                  alt="LCDE — Le Club Des Experts"
                  className="size-full object-contain p-0.5"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-lg font-bold">LCDE</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/60">
                  Le Club Des Experts
                </span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Formation 100 % pratique en Audit, Finance, Fiscalité et Comptabilité à Casablanca.
              Opérationnel dès le premier jour.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { icon: Instagram, href: LCDE.instagram, label: LCDE.instagramHandle, key: "instagram" },
                { icon: Facebook, href: LCDE.facebook, label: LCDE.facebookName, key: "facebook" },
                { icon: Linkedin, href: LCDE.linkedin, label: LCDE.linkedinName, key: "linkedin" },
              ].map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] text-white/80 transition-all hover:scale-105 hover:bg-gold hover:text-navy"
                >
                  <s.icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-gold">Navigation</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/65 transition-colors hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq" className="text-sm text-white/65 transition-colors hover:text-gold">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#programme" className="text-sm text-white/65 transition-colors hover:text-gold">
                  Programme 12 mois
                </a>
              </li>
            </ul>
          </div>

          {/* Modules */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-gold">Formations</h3>
            <ul className="mt-4 space-y-2.5">
              {MODULE_LINKS.map((m) => (
                <li key={m}>
                  <a href="#formations" className="text-sm text-white/65 transition-colors hover:text-gold">
                    {m}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-gold">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>{LCDE.city}, {LCDE.country}</span>
              </li>
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 text-sm text-white/70 transition-colors hover:text-gold">
                  <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span>{LCDE.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${LCDE.email}`} className="flex items-start gap-2.5 text-sm text-white/70 transition-colors hover:text-gold">
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span className="break-all">{LCDE.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>Actif depuis {LCDE.activeSince} · {LCDE.edition}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/50">
            © {year} {LCDE.name} (LCDE). Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/50">
            <a href="#" className="transition-colors hover:text-gold">Mentions légales</a>
            <span className="size-1 rounded-full bg-white/20" />
            <a href="#" className="transition-colors hover:text-gold">Confidentialité</a>
            <span className="size-1 rounded-full bg-white/20" />
            <a href="#accueil" className="transition-colors hover:text-gold">Plan du site</a>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-white/50">
            Conçu avec <Heart className="size-3.5 fill-gold text-gold" /> à Casablanca
          </p>
        </div>
      </div>
    </footer>
  );
}
