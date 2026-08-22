"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK, LCDE } from "@/lib/site-data";

export function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Contacter LCDE sur WhatsApp au ${LCDE.whatsappDisplay}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 18 }}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3"
    >
      {/* Pulse ring */}
      <span className="pulse-ring relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-gold-glow transition-transform duration-300 group-hover:scale-110 animate-float">
        <MessageCircle className="size-7" strokeWidth={2.2} />
      </span>
      {/* Tooltip on hover (desktop) */}
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-lg bg-navy px-3 py-2 text-xs font-medium text-white shadow-premium md:block md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:opacity-100">
        Échangez avec un conseiller
      </span>
    </motion.a>
  );
}
