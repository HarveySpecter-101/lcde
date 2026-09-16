"use client";

import { motion, type Variants } from "framer-motion";
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

const offset = 28;

const buildVariants = (direction: Direction): Variants => {
  const hidden: Record<string, number> = { opacity: 0 };
  if (direction === "up") hidden.y = offset;
  if (direction === "down") hidden.y = -offset;
  if (direction === "left") hidden.x = offset;
  if (direction === "right") hidden.x = -offset;

  return {
    hidden,
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  once = true,
  amount = 0.2,
}: Props) {
  const variants = buildVariants(direction);
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
