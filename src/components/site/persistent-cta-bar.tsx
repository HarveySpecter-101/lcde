"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/site-data";

/**
 * Persistent CTA bar — replaces the floating WhatsApp circle.
 * Two buttons always visible at the bottom of the screen:
 * 1. "Télécharger le programme" — triggers download
 * 2. "Rejoins la 8ème édition" — scrolls to contact form
 *
 * Features a subtle pulse/glow animation every ~4 seconds.
 * Hides when the contact section is in view (to avoid redundancy).
 */
export function PersistentCtaBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      if (!contact) {
        setVisible(true);
        return;
      }
      const contactTop = contact.getBoundingClientRect().top;
      const contactVisible = contactTop - window.innerHeight < 100;
      setVisible(!contactVisible);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex w-full max-w-[800px] items-center gap-3 pointer-events-auto">
            {/* Main CTA button */}
            <a
              href="#contact"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gold-gradient text-sm font-semibold tracking-wide text-navy shadow-gold-glow transition-transform active:scale-[0.98] hover:scale-[1.01] cta-pulse-gold"
            >
              Je souhaite m'inscrire
              <ArrowRight className="size-4" />
            </a>

            {/* WhatsApp button */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contacter LCDE sur WhatsApp"
              className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366] border border-white/20 text-white shadow-lg transition-transform active:scale-95 hover:scale-105 hover:bg-[#20b858] cta-pulse-whatsapp"
            >
              <MessageCircle className="size-6" strokeWidth={2.2} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
