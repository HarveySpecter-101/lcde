"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Mail,
  MessageCircle,
  Phone,
  Instagram,
  Facebook,
  Linkedin,
  Send,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  Check,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LCDE, WHATSAPP_LINK } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const PROFILES = [
  { id: "company", label: "Entreprise / Recruteur", icon: Briefcase },
  { id: "candidate", label: "Candidat", icon: User },
  { id: "other", label: "Autre", icon: User },
];

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Localisation",
    value: `${LCDE.city}, ${LCDE.country}`,
    sub: "Sessions en présentiel",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: LCDE.whatsappDisplay,
    href: WHATSAPP_LINK,
    sub: "Réponse rapide",
  },
  {
    icon: Mail,
    label: "Email",
    value: LCDE.email,
    href: `mailto:${LCDE.email}`,
    sub: "Réponse sous 24 h",
  },
];

const SOCIALS = [
  { icon: Instagram, href: LCDE.instagram, label: LCDE.instagramHandle, key: "instagram" },
  { icon: Facebook, href: LCDE.facebook, label: LCDE.facebookName, key: "facebook" },
  { icon: Linkedin, href: LCDE.linkedin, label: LCDE.linkedinName, key: "linkedin" },
];

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    profile: "company",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(1); // 1: profil, 2: coordonnées, 3: message

  const update = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const canProceed = () => {
    if (step === 1) return !!form.profile;
    if (step === 2) return !!form.name && !!form.email;
    return true;
  };

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          objective: "Rejoindre la prochaine édition",
          source: "contact",
        }),
      });
      if (!res.ok) throw new Error("Erreur réseau");
      setDone(true);
      toast.success("Inscription envoyée ! Notre équipe vous recontacte sous 24 h.");
    } catch {
      toast.error("Une erreur est survenue. Réessayez ou écrivez-nous sur WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-navy-gradient py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.08]" aria-hidden />
      <div className="pointer-events-none absolute -left-24 top-0 size-80 rounded-full bg-gold/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-96 rounded-full bg-emerald-brand/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
            <Sparkles className="size-3.5" /> Contact & inscription
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Rejoignez la prochaine édition
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
            Laissez vos coordonnées : un conseiller LCDE vous recontacte sous 24 h pour étudier votre projet.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Form */}
          <Reveal direction="right" className="lg:col-span-3">
            <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-md md:p-8">
              {done ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-12 text-center"
                >
                  <span className="flex size-16 items-center justify-center rounded-full bg-emerald-brand text-white">
                    <CheckCircle2 className="size-9" />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-bold text-white">Bien reçu, {form.name || "à bientôt"} !</h3>
                  <p className="mt-2 max-w-sm text-sm text-white/75">
                    Votre demande est enregistrée. Notre équipe vous recontacte sous 24 h.
                  </p>
                  <Button
                    onClick={() => {
                      setDone(false);
                      setForm({ name: "", email: "", phone: "", profile: "company", message: "" });
                      setStep(1);
                    }}
                    variant="outline"
                    className="mt-6 border-white/25 text-white hover:bg-white/10 hover:text-white"
                  >
                    Envoyer une autre demande
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  {/* Step progress indicator */}
                  <div className="mb-6 flex items-center justify-between">
                    {[
                      { n: 1, label: "Profil" },
                      { n: 2, label: "Coordonnées" },
                      { n: 3, label: "Message" },
                    ].map((s, i) => (
                      <div key={s.n} className="flex flex-1 items-center">
                        <div className="flex flex-col items-center gap-1.5">
                          <span
                            className={cn(
                              "flex size-8 items-center justify-center rounded-full text-xs font-bold transition-all",
                              step === s.n
                                ? "bg-gold text-navy shadow-gold-glow"
                                : step > s.n
                                  ? "bg-emerald-brand text-white"
                                  : "bg-white/10 text-white/50"
                            )}
                          >
                            {step > s.n ? <Check className="size-4" strokeWidth={3} /> : s.n}
                          </span>
                          <span
                            className={cn(
                              "text-[10px] font-medium transition-colors",
                              step >= s.n ? "text-white" : "text-white/40"
                            )}
                          >
                            {s.label}
                          </span>
                        </div>
                        {i < 2 && (
                          <span
                            className={cn(
                              "mx-2 h-0.5 flex-1 rounded-full transition-colors",
                              step > s.n ? "bg-emerald-brand" : "bg-white/10"
                            )}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {/* Step 1 — Profile */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <div>
                          <Label className="mb-2 block text-xs font-medium uppercase tracking-wide text-white/70">
                            Votre profil
                          </Label>
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                            {PROFILES.map((p) => {
                              const active = form.profile === p.id;
                              return (
                                <button
                                  key={p.id}
                                  type="button"
                                  onClick={() => update("profile", p.id)}
                                  className={cn(
                                    "flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium transition-all",
                                    active
                                      ? "border-gold bg-gold text-navy shadow-gold-glow"
                                      : "border-white/20 bg-white/[0.08] text-white/85 hover:border-gold/50 hover:bg-white/[0.12]"
                                  )}
                                >
                                  <p.icon className="size-4 shrink-0" />
                                  <span className="text-left leading-tight">{p.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <Button
                          type="button"
                          onClick={next}
                          disabled={!canProceed()}
                          size="lg"
                          className="w-full bg-gold text-navy font-semibold hover:bg-gold/90 hover:shadow-gold-glow"
                        >
                          Continuer
                          <ArrowRight className="size-4" />
                        </Button>
                      </motion.div>
                    )}

                    {/* Step 2 — Coordonnées */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <div>
                          <Label htmlFor="c-name" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/70">
                            Nom complet *
                          </Label>
                          <Input
                            id="c-name"
                            required
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="Votre nom"
                            className="h-11 border-white/20 bg-white/[0.1] text-white placeholder:text-white/50 focus-visible:border-gold focus-visible:ring-gold/30"
                          />
                        </div>
                        <div>
                          <Label htmlFor="c-email" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/70">
                            Email *
                          </Label>
                          <Input
                            id="c-email"
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            placeholder="vous@exemple.com"
                            className="h-11 border-white/20 bg-white/[0.1] text-white placeholder:text-white/50 focus-visible:border-gold focus-visible:ring-gold/30"
                          />
                        </div>
                        <div>
                          <Label htmlFor="c-phone" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/70">
                            Téléphone
                          </Label>
                          <Input
                            id="c-phone"
                            type="tel"
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            placeholder="+212 6 00 00 00 00"
                            className="h-11 border-white/20 bg-white/[0.1] text-white placeholder:text-white/50 focus-visible:border-gold focus-visible:ring-gold/30"
                          />
                        </div>
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            onClick={prev}
                            variant="outline"
                            size="lg"
                            className="border-white/25 text-white hover:bg-white/10 hover:text-white"
                          >
                            <ArrowLeft className="size-4" />
                            Retour
                          </Button>
                          <Button
                            type="button"
                            onClick={next}
                            disabled={!canProceed()}
                            size="lg"
                            className="flex-1 bg-gold text-navy font-semibold hover:bg-gold/90 hover:shadow-gold-glow"
                          >
                            Continuer
                            <ArrowRight className="size-4" />
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3 — Message */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {/* Recap */}
                        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-gold">Récapitulatif</p>
                          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/70">
                            <span>👤 {PROFILES.find((p) => p.id === form.profile)?.label}</span>
                            {form.name && <span>✓ {form.name}</span>}
                            {form.email && <span>✉ {form.email}</span>}
                            {form.phone && <span>☎ {form.phone}</span>}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="c-msg" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/70">
                            Votre projet / message
                          </Label>
                          <Textarea
                            id="c-msg"
                            rows={4}
                            value={form.message}
                            onChange={(e) => update("message", e.target.value)}
                            placeholder="Parlez-nous de votre parcours et de vos objectifs…"
                            className="resize-none border-white/20 bg-white/[0.1] text-white placeholder:text-white/50 focus-visible:border-gold focus-visible:ring-gold/30"
                          />
                        </div>
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            onClick={prev}
                            variant="outline"
                            size="lg"
                            className="border-white/25 text-white hover:bg-white/10 hover:text-white"
                          >
                            <ArrowLeft className="size-4" />
                            Retour
                          </Button>
                          <Button
                            type="submit"
                            size="lg"
                            disabled={loading}
                            className="flex-1 bg-gold text-navy font-semibold hover:bg-gold/90 hover:shadow-gold-glow"
                          >
                            {loading ? "Envoi en cours…" : "Je m'inscris"}
                            {!loading && <Send className="size-4" />}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <p className="text-center text-[11px] text-white/50">
                    En soumettant ce formulaire, vous acceptez d'être recontacté par LCDE.
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* Contact info */}
          <Reveal direction="left" delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              {CONTACT_INFO.map((c) => {
                const Inner = (
                  <div className="flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-md transition-colors hover:bg-white/[0.08]">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gold text-navy">
                      <c.icon className="size-6" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-white/55">{c.label}</p>
                      <p className="truncate font-semibold text-white">{c.value}</p>
                      <p className="text-[11px] text-white/50">{c.sub}</p>
                    </div>
                  </div>
                );
                return c.href ? (
                  <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {Inner}
                  </a>
                ) : (
                  <div key={c.label}>{Inner}</div>
                );
              })}

              {/* Socials */}
              <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-md">
                <p className="text-[11px] font-medium uppercase tracking-wide text-white/55">Suivez LCDE</p>
                <div className="mt-3 flex gap-2.5">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.key}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white/80 transition-all hover:bg-gold hover:text-navy"
                    >
                      <s.icon className="size-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl bg-[#25D366] p-5 text-white shadow-gold-glow transition-transform hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="size-6" />
                  <div>
                    <p className="font-semibold">Discuter sur WhatsApp</p>
                    <p className="text-xs text-white/80">{LCDE.whatsappDisplay}</p>
                  </div>
                </div>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
