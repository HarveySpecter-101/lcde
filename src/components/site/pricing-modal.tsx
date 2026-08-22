"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  X,
  Send,
  CheckCircle2,
  Sparkles,
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Building2,
  Euro,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PRICING_FAQ = [
  {
    q: "Le tarif est-il le même pour tous ?",
    a: "Non. Le tarif dépend de votre profil (étudiant, entreprise, particulier) et du parcours choisi. Chaque devis est personnalisé.",
  },
  {
    q: "Existe-t-il des facilités de paiement ?",
    a: "Oui, nous proposons des échéanciers adaptés. Précisez votre besoin dans le message et notre équipe vous proposera une solution.",
  },
  {
    q: "Y a-t-il une garantie de résultat ?",
    a: "Notre engagement repose sur un taux d'insertion allant jusqu'à 96 % et un accompagnement personnalisé par des praticiens OEC.",
  },
];

type Profil = "student" | "company" | "other";

const PROFIL_OPTIONS: { id: Profil; label: string; icon: typeof User }[] = [
  { id: "student", label: "Étudiant", icon: GraduationCap },
  { id: "company", label: "Entreprise", icon: Building2 },
  { id: "other", label: "Autre", icon: User },
];

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
};

export function PricingModal({ open, onOpenChange }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    profile: "student" as Profil,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          objective: "Demander le tarif",
          source: "pricing-modal",
        }),
      });
      if (!res.ok) throw new Error("Erreur réseau");
      setDone(true);
      toast.success("Demande de tarif envoyée ! Réponse sous 24 h.");
    } catch {
      toast.error("Une erreur est survenue. Réessayez ou écrivez-nous sur WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setDone(false);
    setForm({ name: "", email: "", phone: "", profile: "student", message: "" });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setTimeout(reset, 200);
      }}
    >
      <DialogContent showCloseButton={false} className="max-w-lg gap-0 overflow-hidden p-0 sm:rounded-3xl">
        <DialogTitle className="sr-only">Demander le tarif personnalisé</DialogTitle>
        <DialogDescription className="sr-only">
          Formulaire de demande de tarif pour la formation LCDE.
        </DialogDescription>

        {done ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center p-10 text-center"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-emerald-brand text-white">
              <CheckCircle2 className="size-9" />
            </span>
            <h3 className="mt-5 font-serif text-2xl font-bold text-navy">Demande envoyée !</h3>
            <p className="mt-2 max-w-sm text-sm text-anthracite/70">
              Merci {form.name || ""}. Notre équipe vous recontacte sous 24 h avec une proposition de tarif personnalisée.
            </p>
            <DialogClose asChild>
              <Button className="mt-6 bg-gold text-navy font-semibold hover:bg-gold/90 hover:shadow-gold-glow">
                Fermer
              </Button>
            </DialogClose>
          </motion.div>
        ) : (
          <form onSubmit={submit}>
            {/* Header — navy gradient */}
            <div className="relative overflow-hidden bg-navy-gradient p-6 text-white md:p-7">
              <div className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-gold/20 blur-3xl" />
              <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.08]" />
              <DialogClose asChild>
                <button
                  type="button"
                  aria-label="Fermer"
                  className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
                >
                  <X className="size-4" />
                </button>
              </DialogClose>
              <div className="relative flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient text-navy shadow-gold-glow">
                  <Euro className="size-6" />
                </span>
                <div className="flex-1 pr-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                    Demande de tarif
                  </p>
                  <h3 className="mt-1 font-serif text-xl font-bold leading-tight">
                    Recevez un devis personnalisé
                  </h3>
                  <p className="mt-1 text-sm text-white/75">
                    Réponse sous 24 h, adaptée à votre profil.
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="max-h-[60vh] space-y-4 overflow-y-auto p-6">
              {/* Profile */}
              <div>
                <Label className="mb-2 block text-xs font-medium uppercase tracking-wide text-anthracite/60">
                  Votre profil
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {PROFIL_OPTIONS.map((p) => {
                    const active = form.profile === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => update("profile", p.id)}
                        className={cn(
                          "flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2 text-xs font-medium transition-all",
                          active
                            ? "border-gold bg-gold text-navy shadow-gold-glow"
                            : "border-navy/15 bg-soft text-anthracite/70 hover:border-gold/40 hover:bg-gold/5"
                        )}
                      >
                        <p.icon className="size-4" />
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name */}
              <div>
                <Label htmlFor="p-name" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-anthracite/60">
                  Nom complet *
                </Label>
                <Input
                  id="p-name"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Votre nom"
                  className="h-11 border-navy/15 bg-soft focus-visible:border-gold focus-visible:ring-gold/30"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="p-email" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-anthracite/60">
                    Email *
                  </Label>
                  <Input
                    id="p-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="vous@exemple.com"
                    className="h-11 border-navy/15 bg-soft focus-visible:border-gold focus-visible:ring-gold/30"
                  />
                </div>
                <div>
                  <Label htmlFor="p-phone" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-anthracite/60">
                    Téléphone
                  </Label>
                  <Input
                    id="p-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+212 6 00 00 00 00"
                    className="h-11 border-navy/15 bg-soft focus-visible:border-gold focus-visible:ring-gold/30"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="p-msg" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-anthracite/60">
                  Votre besoin (optionnel)
                </Label>
                <Textarea
                  id="p-msg"
                  rows={3}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Parlez-nous de votre projet : financement, échéance, mode…"
                  className="resize-none border-navy/15 bg-soft focus-visible:border-gold focus-visible:ring-gold/30"
                />
              </div>

              {/* Trust note */}
              <div className="flex items-start gap-2 rounded-xl bg-gold/5 p-3">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-gold" />
                <p className="text-xs leading-relaxed text-anthracite/70">
                  Le tarif dépend de votre profil et du parcours choisi. Nous vous proposons une offre adaptée — sans engagement.
                </p>
              </div>

              {/* Mini FAQ */}
              <div className="rounded-xl border border-navy/10 bg-soft p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gold">
                  Questions fréquentes
                </p>
                <Accordion type="single" collapsible className="w-full">
                  {PRICING_FAQ.map((item, i) => (
                    <AccordionItem key={i} value={`pf-${i}`} className="border-b border-navy/8 last:border-b-0">
                      <AccordionTrigger className="group py-2 text-left text-xs font-medium text-navy hover:no-underline hover:text-gold [&[data-state=open]>svg]:rotate-180">
                        {item.q}
                        <ChevronDown className="size-3.5 shrink-0 text-gold transition-transform duration-300" />
                      </AccordionTrigger>
                      <AccordionContent className="pb-2 text-[11px] leading-relaxed text-anthracite/70">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="border-t border-navy/10 p-4">
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-gold text-navy font-semibold hover:bg-gold/90 hover:shadow-gold-glow"
              >
                {loading ? "Envoi en cours…" : "Recevoir mon devis"}
                {!loading && <Send className="size-4" />}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
