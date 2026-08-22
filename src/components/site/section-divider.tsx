"use client";

type Props = {
  variant?: "light-to-navy" | "navy-to-light" | "light-to-soft" | "soft-to-light";
  className?: string;
};

/**
 * Subtle SVG wave divider between sections for premium transitions.
 * Uses currentColor so it adapts to light/dark themes automatically.
 * - "light-to-navy" / "navy-to-light": transitions to/from always-dark sections (Trainers, Contact)
 * - "light-to-soft" / "soft-to-light": transitions between light/soft sections (adapt to dark mode)
 */
export function SectionDivider({ variant = "light-to-soft", className }: Props) {
  // In dark mode, bg-white and bg-soft both become dark navy, so dividers between
  // them should be dark too. Only dividers to/from intentionally-dark sections stay navy.
  const isDarkTransition = variant === "light-to-navy" || variant === "navy-to-light";

  return (
    <div
      className={`pointer-events-none -mt-px w-full leading-none ${
        isDarkTransition
          ? "text-[#0A2647]"
          : "text-[#F5F6F8] dark:text-[#14182a]"
      } ${className ?? ""}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="block h-[40px] w-full md:h-[56px]"
        fill="currentColor"
      >
        <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,24 L1440,64 L0,64 Z" />
      </svg>
    </div>
  );
}
