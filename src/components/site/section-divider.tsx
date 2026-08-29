"use client";

type Props = {
  variant?: "light-to-navy" | "navy-to-light" | "light-to-soft" | "soft-to-light" | "soft-to-navy";
  className?: string;
};

/**
 * Subtle SVG wave divider between sections for premium transitions.
 * Uses currentColor so it adapts to light/dark themes automatically.
 * - "light-to-navy" / "navy-to-light": transitions to/from always-dark sections (Trainers, Contact)
 * - "light-to-soft" / "soft-to-light": transitions between light/soft sections (adapt to dark mode)
 */
export function SectionDivider({ variant = "light-to-soft", className }: Props) {
  let colorClasses = "";

  switch (variant) {
    case "light-to-soft":
      // top is light (transparent bg), bottom is soft (svg fill)
      colorClasses = "text-[#F5F6F8] dark:text-[#14182a]";
      break;
    case "soft-to-light":
      // top is soft (bg), bottom is light (svg fill)
      colorClasses = "bg-[#F5F6F8] text-white dark:bg-[#14182a] dark:text-background";
      break;
    case "light-to-navy":
      // top is light (transparent bg), bottom is navy (svg fill)
      colorClasses = "text-[#0A2647]";
      break;
    case "soft-to-navy":
      // top is soft (bg), bottom is navy (svg fill)
      colorClasses = "bg-[#F5F6F8] text-[#0A2647] dark:bg-[#14182a]";
      break;
    case "navy-to-light":
      // top is navy (bg), bottom is light (svg fill)
      colorClasses = "bg-[#0A2647] text-white dark:text-background";
      break;
  }

  return (
    <div
      className={`pointer-events-none -mt-px w-full leading-none ${colorClasses} ${className ?? ""}`}
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
