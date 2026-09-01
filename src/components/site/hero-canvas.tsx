"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   LAYER 1 — Canvas particle system
   60 particles on desktop · 30 on mobile
   Each particle: gold or navy tint, slow drift, mouse attraction
───────────────────────────────────────────────────────── */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  baseVy: number;
}

const GOLD = "196,169,98";
const NAVY = "10,38,71";

function createParticle(w: number, h: number): Particle {
  const isGold = Math.random() > 0.4;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: -(Math.random() * 0.4 + 0.1),
    baseVy: -(Math.random() * 0.4 + 0.1),
    radius: Math.random() * 2.2 + 0.8,
    color: isGold ? GOLD : NAVY,
    opacity: Math.random() * 0.5 + 0.25,
  };
}

function useParticleCanvas(sectionRef: React.RefObject<HTMLElement | null>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const scrollVelRef = useRef(0);
  const lastScrollY = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 30 : 60;

    let w = canvas.width = section.offsetWidth;
    let h = canvas.height = section.offsetHeight;

    let particles: Particle[] = Array.from({ length: COUNT }, () => createParticle(w, h));

    const resize = () => {
      w = canvas.width = section.offsetWidth;
      h = canvas.height = section.offsetHeight;
      particles = Array.from({ length: COUNT }, () => createParticle(w, h));
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onScroll = () => {
      scrollVelRef.current = (window.scrollY - lastScrollY.current) * 0.12;
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("resize", resize);
    section.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Decay scroll velocity
      scrollVelRef.current *= 0.9;

      particles.forEach((p) => {
        // Mouse attraction
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130 && dist > 0) {
          const force = (130 - dist) / 130;
          p.vx += (dx / dist) * force * 0.025;
          p.vy += (dy / dist) * force * 0.025;
        }

        // Drift toward base velocity
        p.vx += (0 - p.vx) * 0.015;
        p.vy += (p.baseVy - p.vy) * 0.015;

        // Scroll influence — particles accelerate upward on scroll
        p.y += p.vy - scrollVelRef.current;
        p.x += p.vx;

        // Wrap around
        if (p.y < -10) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.y > h + 10) { p.y = -5; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 5;
        if (p.x > w + 10) p.x = -5;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      section.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [sectionRef]);

  return canvasRef;
}

/* ─────────────────────────────────────────────────────────
   LAYER 3 — Mouse spotlight (desktop only)
───────────────────────────────────────────────────────── */
function useMouseSpotlight(sectionRef: React.RefObject<HTMLElement | null>) {
  const rawX = useMotionValue(-600);
  const rawY = useMotionValue(-600);

  const spotX = useSpring(rawX, { stiffness: 55, damping: 22 });
  const spotY = useSpring(rawY, { stiffness: 55, damping: 22 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      rawX.set(e.clientX - rect.left - 300);
      rawY.set(e.clientY - rect.top - 300);
    };

    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, [sectionRef, rawX, rawY]);

  return { spotX, spotY };
}

/* ─────────────────────────────────────────────────────────
   MAIN EXPORT — HeroCanvas
   Mounts all interactive layers on top of the hero section
───────────────────────────────────────────────────────── */
interface HeroCanvasProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

export function HeroCanvas({ sectionRef }: HeroCanvasProps) {
  /* LAYER 2 — Parallax scroll */
  const { scrollY } = useScroll();

  // Orbs — fastest layer
  const orbsY = useSpring(
    useTransform(scrollY, [0, 600], [0, -210]),
    { stiffness: 80, damping: 30 }
  );

  // Rings top-right
  const ringsTopY = useSpring(
    useTransform(scrollY, [0, 600], [0, -150]),
    { stiffness: 70, damping: 28 }
  );

  // Rings bottom-left
  const ringsBotY = useSpring(
    useTransform(scrollY, [0, 600], [0, 108]),
    { stiffness: 70, damping: 28 }
  );

  // Watermark — slower + fades out
  const wmY = useSpring(
    useTransform(scrollY, [0, 500], [0, -72]),
    { stiffness: 60, damping: 25 }
  );
  const wmOpacity = useTransform(scrollY, [0, 320], [0.025, 0]);

  /* LAYER 1 — Canvas */
  const canvasRef = useParticleCanvas(sectionRef);

  /* LAYER 3 — Spotlight */
  const { spotX, spotY } = useMouseSpotlight(sectionRef);

  return (
    <>
      {/* ── CANVAS — particle field ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden
      />

      {/* ── SPOTLIGHT ── */}
      <motion.div
        className="absolute z-0 pointer-events-none rounded-full"
        style={{
          x: spotX,
          y: spotY,
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(196,169,98,0.09) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* ── ORBS — parallax fast ── */}
      <motion.div style={{ y: orbsY, willChange: "transform" }} className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <div className="absolute -left-24 top-12 size-[26rem] rounded-full bg-gold/20 blur-[80px] animate-orb-1" />
        <div className="absolute -right-20 -bottom-8 size-[32rem] rounded-full bg-gold/14 blur-[100px] animate-orb-2" />
        <div className="absolute left-[35%] top-[30%] size-80 rounded-full bg-navy/10 blur-[70px] animate-orb-3" />
      </motion.div>

      {/* ── RINGS top-right — parallax medium ── */}
      <motion.div style={{ y: ringsTopY, willChange: "transform" }} className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -right-40 -top-40 size-[640px] rounded-full border-2 border-gold/20" />
        <div className="absolute -right-28 -top-28 size-[500px] rounded-full border border-gold/15" />
        <div className="absolute -right-16 -top-16 size-[360px] rounded-full border border-gold/11" />
        <div className="absolute -right-6  -top-6  size-[240px] rounded-full border border-gold/[0.07]" />
      </motion.div>

      {/* ── RINGS bottom-left — parallax medium ── */}
      <motion.div style={{ y: ringsBotY, willChange: "transform" }} className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -left-40 -bottom-40 size-[560px] rounded-full border-2 border-navy/12" />
        <div className="absolute -left-28 -bottom-28 size-[420px] rounded-full border border-navy/9" />
        <div className="absolute -left-14 -bottom-14 size-[300px] rounded-full border border-gold/[0.10]" />
      </motion.div>

      {/* ── WATERMARK — parallax slow + fade ── */}
      <motion.div
        style={{ y: wmY, opacity: wmOpacity, willChange: "transform, opacity" }}
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden select-none"
        aria-hidden
      >
        <span
          className="font-serif font-extrabold uppercase text-navy leading-none"
          style={{ fontSize: "clamp(120px, 22vw, 280px)", letterSpacing: "-0.04em" }}
        >
          LCDE
        </span>
      </motion.div>

      {/* ── STATIC GEOMETRY — diagonal SVG ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        {/* Grid baseline */}
        <div className="absolute inset-0 bg-grid opacity-[0.07]" />

        {/* Diagonal sweep */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(196,169,98,0.07) 0%, transparent 40%, rgba(10,38,71,0.05) 100%)" }}
        />

        {/* SVG lines */}
        <svg className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="none">
          <defs>
            <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="rgba(196,169,98,0)" />
              <stop offset="25%"  stopColor="rgba(196,169,98,0.25)" />
              <stop offset="75%"  stopColor="rgba(196,169,98,0.25)" />
              <stop offset="100%" stopColor="rgba(196,169,98,0)" />
            </linearGradient>
            <linearGradient id="dg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="rgba(196,169,98,0.15)" />
              <stop offset="100%" stopColor="rgba(196,169,98,0)" />
            </linearGradient>
            <linearGradient id="dn1" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="rgba(10,38,71,0.12)" />
              <stop offset="100%" stopColor="rgba(10,38,71,0)" />
            </linearGradient>
          </defs>
          <line x1="0" y1="0" x2="28%" y2="100%" stroke="url(#dg1)" strokeWidth="1.5" />
          <line x1="6%" y1="0" x2="34%" y2="100%" stroke="rgba(196,169,98,0.07)" strokeWidth="1" />
          <line x1="100%" y1="0" x2="72%" y2="100%" stroke="url(#dn1)" strokeWidth="1.5" />
          <line x1="94%" y1="0" x2="66%" y2="100%" stroke="rgba(10,38,71,0.06)" strokeWidth="1" />
          <line x1="4%" y1="62%" x2="96%" y2="62%" stroke="url(#hg)" strokeWidth="1" />
          <line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(196,169,98,0.12)" strokeWidth="1" />
          <line x1="0" y1="100%" x2="100%" y2="100%" stroke="rgba(196,169,98,0.20)" strokeWidth="1" />
        </svg>

        {/* Dot matrices */}
        <div className="absolute top-16 right-6 sm:right-20" style={{ backgroundImage: "radial-gradient(rgba(196,169,98,0.55) 1.8px, transparent 1.8px)", backgroundSize: "16px 16px", width: 112, height: 112, opacity: 0.65 }} />
        <div className="absolute bottom-10 left-6 sm:left-20" style={{ backgroundImage: "radial-gradient(rgba(10,38,71,0.30) 1.8px, transparent 1.8px)", backgroundSize: "16px 16px", width: 96, height: 96, opacity: 0.70 }} />

        {/* Rotated accent squares */}
        <div className="absolute left-5 top-24 size-[60px] rotate-[28deg] rounded-xl border-2 border-gold/30" />
        <div className="absolute left-10 top-32 size-[38px] rotate-[28deg] rounded-lg border border-gold/15" />
        <div className="absolute right-5 top-28 size-[44px] rotate-[-16deg] rounded-xl border-2 border-navy/18" />
        <div className="absolute bottom-10 right-[12%] size-[50px] rotate-[20deg] rounded-xl border border-gold/22" />
        <div className="absolute bottom-16 left-[14%] size-[32px] rotate-[45deg] rounded-md border-2 border-gold/20" />

        {/* Cross accents */}
        <svg className="absolute left-[42%] top-5 opacity-[0.22]" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <line x1="14" y1="0" x2="14" y2="28" stroke="#c4a962" strokeWidth="2" strokeLinecap="round" />
          <line x1="0" y1="14" x2="28" y2="14" stroke="#c4a962" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <svg className="absolute right-[22%] bottom-8 opacity-[0.18]" width="22" height="22" viewBox="0 0 22 22" fill="none">
          <line x1="11" y1="0" x2="11" y2="22" stroke="#c4a962" strokeWidth="2" strokeLinecap="round" />
          <line x1="0" y1="11" x2="22" y2="11" stroke="#c4a962" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <svg className="absolute left-[18%] bottom-20 opacity-[0.14]" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <line x1="9" y1="0" x2="9" y2="18" stroke="#0a2647" strokeWidth="2" strokeLinecap="round" />
          <line x1="0" y1="9" x2="18" y2="9" stroke="#0a2647" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </>
  );
}
