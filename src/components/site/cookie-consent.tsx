"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Check } from "lucide-react";

const STORAGE_KEY = "lcde-cookie-consent";

type Consent = "accepted" | "rejected";

/**
 * Slim full-width cookie consent bar at the very bottom of the viewport.
 * Less obstructive than a floating card — sits flush at the bottom edge,
 * doesn't overlap content cards. Auto-hides on scroll down for mobile UX.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Consent | null;
      if (!stored) {
        const t = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(t);
      }
    } catch {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const decide = (choice: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore storage errors */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="border-t border-gold/30 bg-navy-gradient shadow-[0_-8px_24px_-8px_rgba(10,38,71,0.3)]">
            <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.06]" />
            <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:gap-4 sm:px-6 lg:px-8">
              {/* Icon + text */}
              <div className="flex flex-1 items-center gap-3 text-center sm:text-left">
                <span className="hidden shrink-0 sm:flex size-9 items-center justify-center rounded-lg bg-gold/15 text-gold">
                  <Cookie className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white sm:text-sm">
                    <span className="sm:hidden">🍪 </span>
                    Nous utilisons des cookies pour améliorer votre expérience.
                    <span className="hidden sm:inline"> Vos données restent confidentielles.</span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => decide("rejected")}
                  aria-label="Refuser les cookies"
                  className="h-9 rounded-lg border border-white/20 bg-white/5 px-3 text-xs font-medium text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                >
                  Refuser
                </button>
                <button
                  type="button"
                  onClick={() => decide("accepted")}
                  className="flex h-9 items-center gap-1.5 rounded-lg bg-gold px-4 text-xs font-semibold text-navy transition-transform hover:scale-[1.02]"
                >
                  <Check className="size-3.5" strokeWidth={3} />
                  Accepter
                </button>
                <button
                  type="button"
                  onClick={() => decide("rejected")}
                  aria-label="Fermer"
                  className="flex size-9 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white sm:hidden"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
