"use client";

type Props = {
  variant?:
    | "light-to-navy"
    | "navy-to-light"
    | "light-to-soft"
    | "soft-to-light"
    | "soft-to-navy"
    | "navy-to-soft"
    | "stories-to-navy"
    | "pink-to-navy"
    | "soft-to-green"
    | "green-to-blue";
  className?: string;
};

/**
 * Subtle SVG wave divider between sections for premium transitions.
 * Adapts to the brand palette (#f6f4ef soft beige, #ffffff white, #000000 navy/black, #ffebf0 pink).
 */
export function SectionDivider({ variant = "light-to-soft", className }: Props) {
  let colorClasses = "";
  let flipY = false;
  let customMargin = "-mt-1 -mb-1";

  switch (variant) {
    case "light-to-soft":
      colorClasses = "bg-white text-[#f6f4ef]";
      break;
    case "soft-to-light":
      // Transparent background so the complex HeroCanvas shows through.
      // We pull it up by exactly its height so it overlaps the Hero section.
      colorClasses = "bg-transparent text-white";
      customMargin = "-mt-[24px] sm:-mt-[32px] md:-mt-[40px] mb-0";
      flipY = false;
      break;
    case "soft-to-green":
      colorClasses = "bg-[#f6f4ef] text-[#f0fdf4]";
      break;
    case "green-to-blue":
      colorClasses = "bg-[#f0fdf4] text-[#e6f2ff]";
      break;
    case "light-to-navy":
      colorClasses = "bg-white text-[#000000]";
      break;
    case "stories-to-navy":
    case "pink-to-navy":
      colorClasses = "bg-[#ffebf0] text-[#000000]";
      break;
    case "soft-to-navy":
      colorClasses = "bg-[#f6f4ef] text-[#000000]";
      break;
    case "navy-to-light":
      colorClasses = "bg-[#000000] text-white";
      break;
    case "navy-to-soft":
      colorClasses = "bg-[#000000] text-[#f6f4ef]";
      break;
  }

  return (
    <div
      className={`pointer-events-none w-full leading-none relative z-10 ${customMargin} ${colorClasses} ${className ?? ""}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className={`block h-[24px] w-full sm:h-[32px] md:h-[40px] ${flipY ? "scale-y-[-1]" : ""}`}
        fill="currentColor"
      >
        <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,24 L1440,64 L0,64 Z" />
      </svg>
    </div>
  );
}
