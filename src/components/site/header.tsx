"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { NAV_LINKS, LCDE } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#accueil");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-xl shadow-premium border-b border-navy/5"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 md:h-20">
        {/* Logo */}
        <a href="#accueil" className="flex items-center gap-2.5 group" aria-label="LCDE - Accueil">
          <span className="relative flex size-11 items-center justify-center overflow-hidden rounded-full bg-white shadow-premium ring-2 ring-gold/30 transition-transform group-hover:scale-105">
            <img
              src="/logo-lcde.png"
              alt="LCDE — Le Club Des Experts"
              className="size-full object-contain p-0.5"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-bold tracking-tight text-navy">
              LCDE
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-anthracite/60">
              Le Club Des Experts
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors",
                active === link.href
                  ? "text-gold"
                  : "text-anthracite/70 hover:text-navy"
              )}
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden md:inline-flex bg-gold text-navy font-semibold hover:bg-gold/90 hover:shadow-gold-glow"
          >
            <a href="#contact">
              Rejoindre la formation
              <ArrowRight className="size-4" />
            </a>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn("lg:hidden", scrolled ? "text-navy" : "text-navy md:text-white")}
                aria-label="Ouvrir le menu"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm border-l-navy/10 p-0">
              <SheetTitle className="sr-only">Menu de navigation LCDE</SheetTitle>
              <div className="flex h-full flex-col bg-white">
                <div className="flex items-center justify-between border-b border-navy/10 px-5 py-4">
                  <span className="font-serif text-lg font-bold text-navy">LCDE</span>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" aria-label="Fermer le menu">
                      <X className="size-5" />
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-1 flex-col gap-1 p-4">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <a
                        href={link.href}
                        className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-anthracite transition-colors hover:bg-soft hover:text-navy"
                      >
                        {link.label}
                        <ArrowRight className="size-4 text-gold" />
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                <div className="border-t border-navy/10 p-4">
                  <Button asChild className="w-full bg-gold text-navy font-semibold hover:bg-gold/90">
                    <a href="#contact">
                      Rejoindre la formation
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                  <p className="mt-3 text-center text-xs text-anthracite/60">
                    {LCDE.city}, {LCDE.country} · Actif depuis {LCDE.activeSince}
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* AnimatePresence not needed for static; keep simple */}
      <AnimatePresence>{null}</AnimatePresence>
    </header>
  );
}
