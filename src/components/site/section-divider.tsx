"use client";

type Props = {
  variant?: "light-to-navy" | "navy-to-light" | "light-to-soft" | "soft-to-light" | "soft-to-navy" | "navy-to-soft";
  className?: string;
};

/**
 * Subtle SVG wave divider between sections for premium transitions.
 * Adapts to the brand palette (#f6f4ef soft beige, #ffffff white, #000000 navy/black).
 */
export function SectionDivider({ variant = "light-to-soft", className }: Props) {
  let colorClasses = "";

  switch (variant) {
    case "light-to-soft":
      // top is white, bottom wave fill is soft beige
      colorClasses = "bg-white text-[#f6f4ef]";
      break;
    case "soft-to-light":
      // top is soft beige, bottom wave fill is white
      colorClasses = "bg-[#f6f4ef] text-white";
      break;
    case "light-to-navy":
      // top is white, bottom wave fill is black/navy
      colorClasses = "bg-white text-[#000000]";
      break;
    case "soft-to-navy":
      // top is soft beige, bottom wave fill is black/navy
      colorClasses = "bg-[#f6f4ef] text-[#000000]";
      break;
    case "navy-to-light":
      // top is black/navy, bottom wave fill is white
      colorClasses = "bg-[#000000] text-white";
      break;
    case "navy-to-soft":
      // top is black/navy, bottom wave fill is soft beige
      colorClasses = "bg-[#000000] text-[#f6f4ef]";
      break;
  }

  return (
    <div
      className={`pointer-events-none -mt-px -mb-px w-full leading-none ${colorClasses} ${className ?? ""}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="block h-[36px] w-full sm:h-[48px] md:h-[60px]"
        fill="currentColor"
      >
        <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,24 L1440,64 L0,64 Z" />
      </svg>
    </div>
  );
}
