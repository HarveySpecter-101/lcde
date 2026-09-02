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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

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

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    level: "",
    school: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const update = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.level || !form.school) {
      toast.error("Veuillez renseigner tous les champs obligatoires (Nom, Email, WhatsApp, Niveau actuel et École).");
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
          level: form.level,
          school: form.school,
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
      toast.success("Demande envoyée ! Notre équipe vous recontacte sous 24 h.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Une erreur est survenue. Réessayez ou écrivez-nous sur WhatsApp.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-14 sm:scroll-mt-20 overflow-hidden bg-navy-gradient py-10 sm:py-16 md:py-20 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.08]" aria-hidden />
      <div className="pointer-events-none absolute -left-24 top-0 size-80 rounded-full bg-gold/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-96 rounded-full bg-emerald-brand/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
            <Sparkles className="size-3.5" /> Contact & inscription
          </span>
          <h2 className="mt-2.5 font-serif text-lg font-bold leading-snug tracking-tight text-white sm:text-2xl md:text-3xl">
            Laissez vos coordonnées, un conseiller LCDE vous recontacte sous 24h pour lancer la démarche d'inscription.
          </h2>
        </Reveal>

        <div className="mt-5 sm:mt-8 flex justify-center">
          <Reveal className="w-full max-w-lg">
            <div className="rounded-2xl sm:rounded-3xl border border-white/12 bg-white/[0.05] p-5 sm:p-7 backdrop-blur-md shadow-2xl">
              {done ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <span className="flex size-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                    <CheckCircle2 className="size-8" />
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-bold text-white">Merci {submittedName}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/90">
                    Vous allez être recontacté sous 24 heures pour lancer votre démarche d'inscription.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-3 sm:space-y-3.5">
                  <div>
                    <Label htmlFor="c-name" className="mb-1 block text-xs font-medium uppercase tracking-wide text-white/80">
                      Nom complet *
                    </Label>
                    <Input
                      id="c-name"
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Votre nom complet"
                      className="h-10 sm:h-11 rounded-xl border-white/20 bg-white/[0.1] text-sm text-white placeholder:text-white/45 focus-visible:border-gold focus-visible:ring-gold/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="c-email" className="mb-1 block text-xs font-medium uppercase tracking-wide text-white/80">
                      Email *
                    </Label>
                    <Input
                      id="c-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="vous@exemple.com"
                      className="h-10 sm:h-11 rounded-xl border-white/20 bg-white/[0.1] text-sm text-white placeholder:text-white/45 focus-visible:border-gold focus-visible:ring-gold/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="c-phone" className="mb-1 block text-xs font-medium uppercase tracking-wide text-white/80">
                      WhatsApp *
                    </Label>
                    <Input
                      id="c-phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+212 6 00 00 00 00"
                      className="h-10 sm:h-11 rounded-xl border-white/20 bg-white/[0.1] text-sm text-white placeholder:text-white/45 focus-visible:border-gold focus-visible:ring-gold/30"
                    />
                  </div>

                  <div>
                    <Label htmlFor="c-level" className="mb-1 block text-xs font-medium uppercase tracking-wide text-white/80">
                      Niveau actuel *
                    </Label>
                    <Select value={form.level} onValueChange={(val) => update("level", val)}>
                      <SelectTrigger
                        id="c-level"
                        className="h-10 sm:h-11 w-full rounded-xl border border-white/20 bg-white/[0.08] px-3.5 text-sm text-white hover:border-gold/50 hover:bg-white/[0.12] focus:border-gold focus:ring-2 focus:ring-gold/40 focus:ring-offset-0 data-[placeholder]:text-white/45 [&>span]:truncate"
                      >
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent className="z-[999] max-h-60 rounded-2xl border border-gold/40 bg-[#071930] text-white shadow-2xl backdrop-blur-2xl p-1.5">
                        {LEVEL_OPTIONS.map((lvl) => (
                          <SelectItem
                            key={lvl}
                            value={lvl}
                            className="rounded-xl px-3 py-2 text-xs sm:text-sm text-white/90 hover:bg-white/10 hover:text-gold focus:bg-gold/20 focus:text-gold data-[state=checked]:bg-gold/25 data-[state=checked]:text-gold data-[state=checked]:font-semibold cursor-pointer"
                          >
                            {lvl}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="c-school" className="mb-1 block text-xs font-medium uppercase tracking-wide text-white/80">
                      École *
                    </Label>
                    <Select value={form.school} onValueChange={(val) => update("school", val)}>
                      <SelectTrigger
                        id="c-school"
                        className="h-10 sm:h-11 w-full rounded-xl border border-white/20 bg-white/[0.08] px-3.5 text-sm text-white hover:border-gold/50 hover:bg-white/[0.12] focus:border-gold focus:ring-2 focus:ring-gold/40 focus:ring-offset-0 data-[placeholder]:text-white/45 [&>span]:truncate"
                      >
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent className="z-[999] max-h-60 rounded-2xl border border-gold/40 bg-[#071930] text-white shadow-2xl backdrop-blur-2xl p-1.5">
                        {SCHOOL_OPTIONS.map((sch) => (
                          <SelectItem
                            key={sch}
                            value={sch}
                            className="rounded-xl px-3 py-2 text-xs sm:text-sm text-white/90 hover:bg-white/10 hover:text-gold focus:bg-gold/20 focus:text-gold data-[state=checked]:bg-gold/25 data-[state=checked]:text-gold data-[state=checked]:font-semibold cursor-pointer"
                          >
                            {sch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="mt-2 h-11 sm:h-12 w-full rounded-xl bg-gold text-navy font-bold text-sm sm:text-base hover:bg-gold/90 hover:shadow-gold-glow flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98]"
                  >
                    {loading ? "Envoi en cours…" : "J'envoie ma demande"}
                    {!loading && <Send className="size-4" />}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
