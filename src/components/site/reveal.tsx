"use client";

import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "fade";

type Props = {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  once?: boolean;
  amount?: number;
};

export function Reveal({
  children,
  className,
}: Props) {
  // Content is always visible immediately — no lazy reveal animation
  return (
    <div className={className}>
      {children}
    </div>
  );
}
