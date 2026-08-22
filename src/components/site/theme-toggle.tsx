"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  scrolled?: boolean;
  className?: string;
};

export function ThemeToggle({ scrolled, className }: Props) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- required by next-themes to avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  const isDark = (mounted ? resolvedTheme ?? theme : undefined) === "dark";

  if (!mounted) {
    // Placeholder to avoid hydration mismatch
    return <span className="size-9" aria-hidden />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      className={cn(
        "relative flex size-9 items-center justify-center rounded-lg border transition-colors",
        scrolled
          ? "border-navy/15 bg-white/60 text-navy hover:bg-navy hover:text-white"
          : "border-white/20 bg-white/10 text-white hover:bg-white/20",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25 }}
          >
            <Sun className="size-4.5" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25 }}
          >
            <Moon className="size-4.5" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
