"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   SectionDecor — animated geometric background per section
   Trigger on viewport entry, parallax on scroll within section
   variant: "light" (white/soft bg) | "dark" (navy bg)
   position: "A" | "B" | "C" | "D" — 4 distinct compositions
═══════════════════════════════════════════════════════════ */

type Variant = "light" | "dark";
type Position = "A" | "B" | "C" | "D";

interface SectionDecorProps {
  variant?: Variant;
  pos?: Position;
}

/* colour helpers */
function c(variant: Variant) {
  return {
    gold:  (a: number) => `rgba(196,169,98,${a})`,
    ring:  variant === "dark"
      ? (a: number) => `rgba(255,255,255,${a})`
      : (a: number) => `rgba(10,38,71,${a})`,
  };
}

/* Animation spring config */
const spring = { stiffness: 60, damping: 22 };
const fadeIn = { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const };

/* ──────────────────────────────
   Position A — rings top-right + dots top-left
────────────────────────────── */
function DecorA({ col, inView }: { col: ReturnType<typeof c>; inView: boolean }) {
  return (
    <>
      {/* Large concentric rings — top-right */}
      {[700, 540, 390, 255].map((size, i) => (
        <motion.div
          key={size}
          initial={{ opacity: 0, scale: 0.75 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.75 }}
          transition={{ ...fadeIn, delay: i * 0.08 }}
          className="absolute rounded-full"
          style={{
            right: `${-size * 0.44}px`,
            top:   `${-size * 0.38}px`,
            width:  size,
            height: size,
            border: `${i < 2 ? "1.5px" : "1px"} solid ${col.gold(0.16 - i * 0.03)}`,
          }}
        />
      ))}
      {/* Dot matrix — top-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.65 } : { opacity: 0 }}
        transition={{ ...fadeIn, delay: 0.3 }}
        className="absolute top-10 left-8 sm:left-16"
        style={{
          backgroundImage: `radial-gradient(${col.gold(0.5)} 1.8px, transparent 1.8px)`,
          backgroundSize: "16px 16px",
          width: 100, height: 100,
        }}
      />
      {/* Rotated squares */}
      <motion.div initial={{ opacity:0, rotate:0 }} animate={inView ? { opacity:1, rotate:28 } : { opacity:0, rotate:0 }} transition={fadeIn} className="absolute left-6 top-20 size-[56px] rounded-xl" style={{ border: `2px solid ${col.gold(0.28)}` }} />
      <motion.div initial={{ opacity:0, rotate:0 }} animate={inView ? { opacity:1, rotate:28 } : { opacity:0, rotate:0 }} transition={{ ...fadeIn, delay:0.1 }} className="absolute left-12 top-28 size-[36px] rounded-lg" style={{ border: `1px solid ${col.gold(0.16)}` }} />
      {/* Cross accent */}
      <motion.svg initial={{ opacity:0 }} animate={inView ? { opacity:0.22 } : { opacity:0 }} transition={{ ...fadeIn, delay:0.4 }} className="absolute right-[30%] bottom-10" width="30" height="30" viewBox="0 0 30 30" fill="none">
        <line x1="15" y1="0" x2="15" y2="30" stroke={col.gold(1)} strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="15" x2="30" y2="15" stroke={col.gold(1)} strokeWidth="2" strokeLinecap="round" />
      </motion.svg>
    </>
  );
}

/* ──────────────────────────────
   Position B — rings bottom-left + dots bottom-right
────────────────────────────── */
function DecorB({ col, inView }: { col: ReturnType<typeof c>; inView: boolean }) {
  return (
    <>
      {[680, 520, 375, 240].map((size, i) => (
        <motion.div
          key={size}
          initial={{ opacity: 0, scale: 0.75 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.75 }}
          transition={{ ...fadeIn, delay: i * 0.09 }}
          className="absolute rounded-full"
          style={{
            left:   `${-size * 0.42}px`,
            bottom: `${-size * 0.40}px`,
            width:   size,
            height:  size,
            border: `${i < 2 ? "1.5px" : "1px"} solid ${col.ring(0.13 - i * 0.025)}`,
          }}
        />
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.60 } : { opacity: 0 }}
        transition={{ ...fadeIn, delay: 0.3 }}
        className="absolute bottom-10 right-10 sm:right-16"
        style={{
          backgroundImage: `radial-gradient(${col.gold(0.48)} 1.8px, transparent 1.8px)`,
          backgroundSize: "16px 16px",
          width: 96, height: 96,
        }}
      />
      <motion.div initial={{ opacity:0, rotate:0 }} animate={inView ? { opacity:1, rotate:-20 } : { opacity:0, rotate:0 }} transition={fadeIn} className="absolute right-6 top-16 size-[50px] rounded-xl" style={{ border: `2px solid ${col.ring(0.18)}` }} />
      <motion.div initial={{ opacity:0, rotate:0 }} animate={inView ? { opacity:1, rotate:45 } : { opacity:0, rotate:0 }} transition={{ ...fadeIn, delay:0.15 }} className="absolute right-[15%] bottom-20 size-[32px] rounded-md" style={{ border: `1.5px solid ${col.gold(0.22)}` }} />
      <motion.svg initial={{ opacity:0 }} animate={inView ? { opacity:0.20 } : { opacity:0 }} transition={{ ...fadeIn, delay:0.4 }} className="absolute left-[28%] top-8" width="26" height="26" viewBox="0 0 26 26" fill="none">
        <line x1="13" y1="0" x2="13" y2="26" stroke={col.gold(1)} strokeWidth="2" strokeLinecap="round" />
        <line x1="0"  y1="13" x2="26" y2="13" stroke={col.gold(1)} strokeWidth="2" strokeLinecap="round" />
      </motion.svg>
    </>
  );
}

/* ──────────────────────────────
   Position C — both corners large rings
────────────────────────────── */
function DecorC({ col, inView }: { col: ReturnType<typeof c>; inView: boolean }) {
  return (
    <>
      {/* Top-right rings */}
      {[600, 440, 300].map((size, i) => (
        <motion.div key={`tr${size}`} initial={{ opacity:0, scale:0.8 }} animate={inView ? { opacity:1, scale:1 } : { opacity:0, scale:0.8 }} transition={{ ...fadeIn, delay: i * 0.1 }} className="absolute rounded-full" style={{ right:`${-size*0.4}px`, top:`${-size*0.35}px`, width:size, height:size, border:`${i===0?"1.5px":"1px"} solid ${col.gold(0.15 - i*0.03)}` }} />
      ))}
      {/* Bottom-left rings */}
      {[580, 420, 280].map((size, i) => (
        <motion.div key={`bl${size}`} initial={{ opacity:0, scale:0.8 }} animate={inView ? { opacity:1, scale:1 } : { opacity:0, scale:0.8 }} transition={{ ...fadeIn, delay: i * 0.1 + 0.15 }} className="absolute rounded-full" style={{ left:`${-size*0.4}px`, bottom:`${-size*0.35}px`, width:size, height:size, border:`${i===0?"1.5px":"1px"} solid ${col.ring(0.12 - i*0.02)}` }} />
      ))}
      {/* Diagonal dot grids both sides */}
      <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:0.60 } : { opacity:0 }} transition={{ ...fadeIn, delay:0.25 }} className="absolute top-12 left-8" style={{ backgroundImage:`radial-gradient(${col.gold(0.45)} 1.8px, transparent 1.8px)`, backgroundSize:"16px 16px", width:90, height:90 }} />
      <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:0.55 } : { opacity:0 }} transition={{ ...fadeIn, delay:0.35 }} className="absolute bottom-12 right-8" style={{ backgroundImage:`radial-gradient(${col.ring(0.22)} 1.8px, transparent 1.8px)`, backgroundSize:"16px 16px", width:80, height:80 }} />
      {/* SVG horizontal rule */}
      <motion.svg initial={{ opacity:0 }} animate={inView ? { opacity:1 } : { opacity:0 }} transition={{ ...fadeIn, delay:0.4 }} className="absolute inset-x-0 top-[55%] h-[2px] w-full" style={{ overflow:"visible" }}>
        <defs>
          <linearGradient id={`hg-c`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(196,169,98,0)" />
            <stop offset="30%"  stopColor={col.gold(0.22)} />
            <stop offset="70%"  stopColor={col.gold(0.22)} />
            <stop offset="100%" stopColor="rgba(196,169,98,0)" />
          </linearGradient>
        </defs>
        <line x1="4%" y1="1" x2="96%" y2="1" stroke={`url(#hg-c)`} strokeWidth="1" />
      </motion.svg>
    </>
  );
}

/* ──────────────────────────────
   Position D — centered large ring + corner details
────────────────────────────── */
function DecorD({ col, inView }: { col: ReturnType<typeof c>; inView: boolean }) {
  return (
    <>
      {/* Centered large rings */}
      {[800, 620, 450, 300].map((size, i) => (
        <motion.div key={size} initial={{ opacity:0, scale:0.7 }} animate={inView ? { opacity:1, scale:1 } : { opacity:0, scale:0.7 }} transition={{ ...fadeIn, delay: i * 0.1 }} className="absolute rounded-full" style={{ left:"50%", top:"50%", width:size, height:size, marginLeft:-size/2, marginTop:-size/2, border:`${i===0?"2px":i===1?"1.5px":"1px"} solid ${col.gold(0.12 - i*0.02)}` }} />
      ))}
      <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:0.65 } : { opacity:0 }} transition={{ ...fadeIn, delay:0.3 }} className="absolute top-8 right-10" style={{ backgroundImage:`radial-gradient(${col.gold(0.5)} 1.8px, transparent 1.8px)`, backgroundSize:"16px 16px", width:110, height:110 }} />
      <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:0.60 } : { opacity:0 }} transition={{ ...fadeIn, delay:0.4 }} className="absolute bottom-8 left-10" style={{ backgroundImage:`radial-gradient(${col.ring(0.25)} 1.8px, transparent 1.8px)`, backgroundSize:"16px 16px", width:90, height:90 }} />
      <motion.div initial={{ opacity:0, rotate:0 }} animate={inView ? { opacity:1, rotate:30 } : { opacity:0, rotate:0 }} transition={fadeIn} className="absolute right-8 bottom-20 size-[60px] rounded-xl" style={{ border:`2px solid ${col.gold(0.26)}` }} />
      <motion.div initial={{ opacity:0, rotate:0 }} animate={inView ? { opacity:1, rotate:30 } : { opacity:0, rotate:0 }} transition={{ ...fadeIn, delay:0.1 }} className="absolute right-14 bottom-28 size-[38px] rounded-lg" style={{ border:`1px solid ${col.gold(0.16)}` }} />
      <motion.svg initial={{ opacity:0 }} animate={inView ? { opacity:0.24 } : { opacity:0 }} transition={{ ...fadeIn, delay:0.5 }} className="absolute left-[40%] top-6" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <line x1="16" y1="0" x2="16" y2="32" stroke={col.gold(1)} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="0" y1="16" x2="32" y2="16" stroke={col.gold(1)} strokeWidth="2.5" strokeLinecap="round" />
      </motion.svg>
    </>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export function SectionDecor({ variant = "light", pos = "A" }: SectionDecorProps) {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px 0px" });
  const col   = c(variant);

  /* Subtle parallax inside the section */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yInner = useSpring(useTransform(scrollYProgress, [0, 1], [-40, 40]), spring);

  const DecorComponent =
    pos === "A" ? DecorA :
    pos === "B" ? DecorB :
    pos === "C" ? DecorC :
                  DecorD;

  return (
    <motion.div
      ref={ref}
      style={{ y: yInner, willChange: "transform" }}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      <DecorComponent col={col} inView={inView} />
    </motion.div>
  );
}
