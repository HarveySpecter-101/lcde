"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/site-data";

/**
 * Sticky bottom CTA bar for mobile only.
 * Appears after the user scrolls past the hero (600px), providing persistent
 * conversion access ("S'inscrire" + WhatsApp) without covering the floating
 * WhatsApp button (which sits above this bar).
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after hero, hide near the contact section (avoid redundancy)
      const y = window.scrollY;
      const contact = document.getElementById("contact");
      const contactTop = contact ? contact.getBoundingClientRect().top + window.scrollY : Infinity;
      const contactVisible = contactTop - window.innerHeight < 200;
      setVisible(y > 600 && !contactVisible);
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
          className="fixed inset-x-0 bottom-0 z-30 md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="border-t border-navy/10 bg-white/95 backdrop-blur-lg shadow-[0_-8px_24px_-8px_rgba(10,38,71,0.18)] dark:border-white/10 dark:bg-[oklch(0.16_0.02_255)]/95">
            <div className="flex items-center gap-2 px-3 py-2.5">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contacter LCDE sur WhatsApp"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-sm transition-transform active:scale-95"
              >
                <MessageCircle className="size-5" strokeWidth={2.2} />
              </a>
              <a
                href="#contact"
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gold text-sm font-semibold text-navy shadow-gold-glow transition-transform active:scale-[0.98]"
              >
                S'inscrire à la formation
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
