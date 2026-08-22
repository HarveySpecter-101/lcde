"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter",
          email,
          profile: "other",
          objective: "Recevoir la newsletter LCDE",
          message: "Inscription newsletter depuis le footer.",
          source: "newsletter",
        }),
      });
      if (!res.ok) throw new Error("Erreur réseau");
      setDone(true);
      toast.success("Inscription confirmée — bienvenue dans le Club !");
    } catch {
      toast.error("Une erreur est survenue. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.05] p-5 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-gold">
        <Sparkles className="size-4" />
        <p className="text-xs font-semibold uppercase tracking-wider">Newsletter LCDE</p>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-white/70">
        Conseils audit & finance, dates des éditions, opportunités — une fois par mois, sans spam.
      </p>

      {done ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 flex items-center gap-3 rounded-xl bg-emerald-brand/15 p-3"
        >
          <CheckCircle2 className="size-5 shrink-0 text-emerald-brand" />
          <p className="text-xs font-medium text-white">
            Merci ! Vous recevrez la prochaine édition de la newsletter.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={submit} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/50" />
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              aria-label="Votre email pour la newsletter"
              className="h-11 border-white/20 bg-white/[0.1] pl-10 text-white placeholder:text-white/50 focus-visible:border-gold focus-visible:ring-gold/30"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="h-11 shrink-0 bg-gold text-navy font-semibold hover:bg-gold/90 hover:shadow-gold-glow"
          >
            {loading ? "…" : "S'inscrire"}
            {!loading && <Send className="size-4" />}
          </Button>
        </form>
      )}
    </div>
  );
}
