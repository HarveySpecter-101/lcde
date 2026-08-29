"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Send,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const update = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Veuillez renseigner votre nom et votre adresse email.");
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      toast.error("Veuillez renseigner une adresse email valide.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          profile: "candidate",
          message: "Je souhaite rejoindre la prochaine promotion.",
          objective: "Rejoindre la prochaine édition",
          source: "contact",
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Une erreur est survenue lors de l'envoi.");
      }
      setSubmittedName(form.name.trim());
      setDone(true);
      toast.success("Inscription envoyée ! Notre équipe vous recontacte sous 24 h.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Une erreur est survenue. Réessayez ou écrivez-nous sur WhatsApp.";
      toast.error(msg);
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
          <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Rejoignez la prochaine édition
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
            Laissez vos coordonnées : un conseiller LCDE vous recontacte sous 24 h pour étudier votre projet.
          </p>
        </Reveal>

        <div className="mt-12 flex justify-center">
          <Reveal className="w-full max-w-xl">
            <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-md md:p-8">
              {done ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-12 text-center"
                >
                  <span className="flex size-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                    <CheckCircle2 className="size-9" />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-bold text-white">Merci {submittedName}</h3>
                  <p className="mt-2 max-w-sm text-sm text-white/75">
                    Vous allez être contacté sous 24 heures.
                  </p>
                  <Button
                    onClick={() => {
                      setDone(false);
                      setForm({ name: "", email: "", phone: "" });
                    }}
                    className="mt-6 bg-gold text-navy font-semibold hover:bg-gold/90 hover:shadow-gold-glow"
                  >
                    Envoyer une autre demande
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-6">
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
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full bg-gold text-navy font-semibold hover:bg-gold/90 hover:shadow-gold-glow flex items-center justify-center gap-2"
                  >
                    {loading ? "Envoi en cours…" : "Je m'inscris"}
                    {!loading && <Send className="size-4" />}
                  </Button>
                  
                  <p className="text-center text-[11px] text-white/50 mt-4">
                    En soumettant ce formulaire, vous acceptez d'être recontacté par LCDE.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
