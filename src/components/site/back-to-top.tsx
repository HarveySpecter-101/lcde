"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Revenir en haut de page"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3 }}
          className="group fixed bottom-24 left-5 z-40 flex size-11 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-premium transition-colors hover:bg-navy hover:text-white md:bottom-6 md:left-6"
        >
          <ArrowUp className="size-5 transition-transform group-hover:-translate-y-0.5" strokeWidth={2.4} />
          {/* Progress ring */}
          <svg className="pointer-events-none absolute inset-0 -rotate-90" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="2" className="text-gold/40" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
