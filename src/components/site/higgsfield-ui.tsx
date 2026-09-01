"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   HIGGSFIELD UI KIT
   Bleeding-edge interactive components inspired by Higgsfield AI
═══════════════════════════════════════════════════════════ */

/* ── 1. HOLOGRAPHIC TILT CARD ── */
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HiggsfieldTiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the 3D rotation
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Calculate mouse position relative to the center of the card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseXPos = e.clientX - rect.left - centerX;
    const mouseYPos = e.clientY - rect.top - centerY;
    
    x.set(mouseXPos);
    y.set(mouseYPos);
  }

  function onMouseLeave() {
    // Reset to flat when mouse leaves
    x.set(0);
    y.set(0);
  }

  // Map mouse position to rotation angles (max 10 degrees)
  const rotateX = useTransform(mouseY, [-200, 200], [8, -8]);
  const rotateY = useTransform(mouseX, [-200, 200], [-8, 8]);

  // Spotlight effect (glare) variables
  const glareX = useTransform(mouseX, [-200, 200], [0, 100]);
  const glareY = useTransform(mouseY, [-200, 200], [0, 100]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-2xl border border-gold/20 bg-white/70 shadow-premium backdrop-blur-sm transition-colors hover:border-gold/50 hover:bg-white/90 ${className}`}
    >
      {/* Dynamic Glare Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl opacity-0 mix-blend-overlay transition-opacity duration-300 hover:opacity-100 group-hover:opacity-100"
        style={{
          background: "radial-gradient(circle at center, rgba(196,169,98,0.4) 0%, transparent 60%)",
          left: useTransform(glareX, (val) => `${val}%`),
          top: useTransform(glareY, (val) => `${val}%`),
          transform: "translate(-50%, -50%)",
          width: "200%",
          height: "200%",
        }}
      />
      
      {/* Content (pushed slightly forward in 3D space) */}
      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

/* ── 2. LASER BORDER BUTTON ── */
interface LaserButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function HiggsfieldLaserButton({ children, className = "", asChild, ...props }: LaserButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // If we wanted to use asChild (like Radix), we would handle it differently, 
  // but for simplicity we wrap the content.
  const Comp = asChild ? "div" : "button";

  return (
    <Comp
      className={`relative group flex items-center justify-center rounded-full bg-navy px-8 py-4 font-semibold text-white shadow-navy-glow transition-all active:scale-95 overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...(props as any)}
    >
      {/* Spinning Laser Border */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-full">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-100%] z-0"
          style={{
            background: "conic-gradient(from 0deg, transparent 60%, rgba(196,169,98,1) 90%, transparent 100%)",
            opacity: isHovered ? 1 : 0.4,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>
      
      {/* Inner Button Core (Masks the center so only the border is visible from the conic gradient) */}
      <div className="absolute inset-[2px] z-10 rounded-full bg-navy transition-colors group-hover:bg-[#0f325c]" />
      
      {/* Text Content */}
      <div className="relative z-20 flex items-center gap-2">
        {children}
      </div>
    </Comp>
  );
}
