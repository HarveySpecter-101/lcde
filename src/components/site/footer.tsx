"use client";

import {
  MapPin,
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Linkedin,
  Heart,
} from "lucide-react";
import { LCDE, WHATSAPP_LINK } from "@/lib/site-data";

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
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Réseaux sociaux */}
          <div>
            <h3 className="font-serif text-base font-bold uppercase tracking-wider text-gold">Réseaux sociaux</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Suivez toute notre actualité et nos conseils exclusifs.
            </p>
            <div className="mt-4 flex gap-3">
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

          {/* Contact */}
          <div>
            <h3 className="font-serif text-base font-bold uppercase tracking-wider text-gold">Contact</h3>
            <ul className="mt-4 space-y-3.5">
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>Casablanca, Maroc</span>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contacter LCDE sur WhatsApp"
                  className="flex items-start gap-2.5 text-sm text-white/70 transition-colors hover:text-gold"
                >
                  <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span>{LCDE.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@leclubdesexperts.com"
                  aria-label="Envoyer un email à LCDE"
                  className="flex items-start gap-2.5 text-sm text-white/70 transition-colors hover:text-gold"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span className="break-all">contact@leclubdesexperts.com</span>
                </a>
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
