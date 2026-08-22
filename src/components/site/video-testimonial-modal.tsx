"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { X, Play, Video } from "lucide-react";
import type { Testimonial } from "@/lib/site-data";

type Props = {
  testimonial: Testimonial | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
};

/**
 * Video testimonial modal — plays a placeholder video frame with a play button.
 * In production, replace the placeholder with the real video URL (YouTube/Vimeo/embed).
 * The modal shows the testimonial quote + a video player area.
 */
export function VideoTestimonialModal({ testimonial, open, onOpenChange }: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent showCloseButton={false} className="max-w-2xl gap-0 overflow-hidden p-0 sm:rounded-3xl">
        <DialogTitle className="sr-only">
          Témoignage vidéo de {testimonial?.name}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Témoignage vidéo d'un ancien participant de la formation LCDE.
        </DialogDescription>

        {testimonial && (
          <div>
            {/* Video player area */}
            <div className="relative aspect-video w-full overflow-hidden bg-navy-gradient">
              <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.08]" />
              <div className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-gold/20 blur-3xl" />

              {/* Close button */}
              <DialogClose asChild>
                <button
                  type="button"
                  aria-label="Fermer"
                  className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
                >
                  <X className="size-4" />
                </button>
              </DialogClose>

              {/* Play button overlay */}
              <div className="relative flex h-full flex-col items-center justify-center gap-4 text-white">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Lire la vidéo"
                  className="group flex size-20 items-center justify-center rounded-full bg-gold text-navy shadow-gold-glow"
                >
                  <Play className="size-8 fill-navy text-navy ml-1" />
                </motion.button>
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                    Témoignage vidéo
                  </p>
                  <p className="mt-1 font-serif text-lg font-bold">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-white/65">{testimonial.role}</p>
                </div>
              </div>

              {/* Placeholder note */}
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-white/40">
                [Vidéo réelle à intégrer]
              </p>
            </div>

            {/* Quote below video */}
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-navy-gradient font-serif text-base font-bold text-white">
                  {testimonial.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-base leading-relaxed text-anthracite/80 md:text-lg">
                    « {testimonial.quote} »
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {testimonial.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-navy/10 bg-soft px-2.5 py-0.5 text-[10px] font-medium text-anthracite/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
