"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

/* ═══════════════════════════════════════════════════
   PARTICLE ENGINE — 80 particles (40 mobile)
   Gold + Navy drift, mouse attraction, scroll boost
═══════════════════════════════════════════════════ */

interface Particle {
  x: number; y: number;
  vx: number; vy: number; baseVy: number;
  radius: number; color: string; opacity: number;
}

const GOLD = "196,169,98";
const NAVY = "10,38,71";

function mkParticle(w: number, h: number): Particle {
  const g = Math.random() > 0.38;
  return {
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -(Math.random() * 0.45 + 0.08),
    baseVy: -(Math.random() * 0.45 + 0.08),
    radius: Math.random() * 2.6 + 0.7,
    color: g ? GOLD : NAVY,
    opacity: Math.random() * 0.55 + 0.2,
  };
}

function useGlobalParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const scrollVRef = useRef(0);
  const lastSY = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mobile = window.innerWidth < 768;
    const COUNT = mobile ? 40 : 80;

    let w = canvas.width  = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    let pts: Particle[] = Array.from({ length: COUNT }, () => mkParticle(w, h));

    const onResize = () => {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
      pts = Array.from({ length: COUNT }, () => mkParticle(w, h));
    };
    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onScroll = () => {
      scrollVRef.current = (window.scrollY - lastSY.current) * 0.14;
      lastSY.current = window.scrollY;
    };

    window.addEventListener("resize",    onResize);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll",    onScroll, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      scrollVRef.current *= 0.88;

      pts.forEach((p) => {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 140 && d > 0) {
          const f = (140 - d) / 140;
          p.vx += (dx / d) * f * 0.028;
          p.vy += (dy / d) * f * 0.028;
        }
        p.vx += (0       - p.vx)    * 0.012;
        p.vy += (p.baseVy - p.vy)   * 0.012;
        p.y  += p.vy - scrollVRef.current;
        p.x  += p.vx;

        if (p.y < -12) { p.y = h + 6; p.x = Math.random() * w; }
        if (p.y > h+12) { p.y = -6;   p.x = Math.random() * w; }
        if (p.x < -12) p.x = w + 6;
        if (p.x > w+12) p.x = -6;

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
      window.removeEventListener("resize",    onResize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll",    onScroll);
    };
  }, []);

  return canvasRef;
}

/* ═══════════════════════════════════════════════════
   MOUSE SPOTLIGHT — gold radial, follows cursor
═══════════════════════════════════════════════════ */
function useGlobalSpotlight() {
  const rawX = useMotionValue(-600);
  const rawY = useMotionValue(-600);
  const x = useSpring(rawX, { stiffness: 50, damping: 20 });
  const y = useSpring(rawY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const fn = (e: MouseEvent) => { rawX.set(e.clientX - 350); rawY.set(e.clientY - 350); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [rawX, rawY]);

  return { x, y };
}

/* ═══════════════════════════════════════════════════
   GLOBAL CANVAS EXPORT
   position:fixed, z-index:-1, pointer-events:none
   Visible behind ALL sections throughout the whole page
═══════════════════════════════════════════════════ */
export function GlobalCanvas() {
  const canvasRef = useGlobalParticleCanvas();
  const { x: spotX, y: spotY } = useGlobalSpotlight();

  /* Slow-drifting parallax shapes tied to global scrollY */
  const { scrollY } = useScroll();
  const totalH = typeof document !== "undefined" ? document.documentElement.scrollHeight - window.innerHeight : 3000;

  // Top-right ring cluster — moves up as user scrolls
  const ring1Y = useSpring(useTransform(scrollY, [0, totalH], [0, -totalH * 0.22]), { stiffness: 40, damping: 30 });
  const ring1X = useSpring(useTransform(scrollY, [0, totalH], [0, totalH * 0.04]), { stiffness: 40, damping: 30 });

  // Bottom-left ring cluster — moves down
  const ring2Y = useSpring(useTransform(scrollY, [0, totalH], [0, totalH * 0.18]), { stiffness: 35, damping: 28 });

  // Mid floating ring — diagonal drift
  const ring3Y = useSpring(useTransform(scrollY, [0, totalH], [0, -totalH * 0.10]), { stiffness: 45, damping: 32 });
  const ring3X = useSpring(useTransform(scrollY, [0, totalH], [0, -totalH * 0.06]), { stiffness: 45, damping: 32 });

  // Large bg diagonal line rotation
  const lineRot = useTransform(scrollY, [0, totalH], [0, 18]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden" aria-hidden>

      {/* ── Canvas particles ── */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* ── Mouse spotlight ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: spotX, y: spotY,
          width: 700, height: 700,
          background: "radial-gradient(circle, rgba(196,169,98,0.10) 0%, transparent 70%)",
        }}
      />

      {/* ── Ring cluster A — top-right, drifts upward on scroll ── */}
      <motion.div style={{ y: ring1Y, x: ring1X, willChange: "transform" }} className="absolute">
        <div className="absolute -right-[280px] top-[-200px] size-[900px] rounded-full border border-gold/[0.11]" style={{ right: "calc(100vw - 92vw)" }} />
        <div style={{ position:"fixed", right:"-220px", top:"-160px", width:"720px", height:"720px", borderRadius:"50%", border:"1.5px solid rgba(196,169,98,0.14)" }} />
        <div style={{ position:"fixed", right:"-150px", top:"-100px", width:"560px", height:"560px", borderRadius:"50%", border:"1px solid rgba(196,169,98,0.10)" }} />
        <div style={{ position:"fixed", right:"-80px",  top:"-50px",  width:"400px", height:"400px", borderRadius:"50%", border:"1px solid rgba(196,169,98,0.07)" }} />
      </motion.div>

      {/* ── Ring cluster B — bottom-left, drifts down on scroll ── */}
      <motion.div style={{ y: ring2Y, willChange: "transform" }} className="absolute inset-0">
        <div style={{ position:"fixed", left:"-240px", bottom:"-200px", width:"800px", height:"800px", borderRadius:"50%", border:"1.5px solid rgba(10,38,71,0.10)" }} />
        <div style={{ position:"fixed", left:"-170px", bottom:"-140px", width:"620px", height:"620px", borderRadius:"50%", border:"1px solid rgba(10,38,71,0.08)" }} />
        <div style={{ position:"fixed", left:"-100px", bottom:"-80px",  width:"460px", height:"460px", borderRadius:"50%", border:"1px solid rgba(196,169,98,0.09)" }} />
      </motion.div>

      {/* ── Ring cluster C — mid page, diagonal drift ── */}
      <motion.div style={{ y: ring3Y, x: ring3X, willChange: "transform" }} className="absolute inset-0">
        <div style={{ position:"fixed", left:"38%",  top:"30%", width:"600px", height:"600px", borderRadius:"50%", border:"1px solid rgba(196,169,98,0.07)", transform:"translate(-50%,-50%)" }} />
        <div style={{ position:"fixed", left:"62%",  top:"60%", width:"400px", height:"400px", borderRadius:"50%", border:"1px solid rgba(10,38,71,0.06)",  transform:"translate(-50%,-50%)" }} />
      </motion.div>

      {/* ── Global diagonal SVG lines (slow rotate on scroll) ── */}
      <motion.div style={{ rotate: lineRot, willChange: "transform" }} className="absolute inset-0 origin-center">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gl-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="rgba(196,169,98,0.12)" />
              <stop offset="50%"  stopColor="rgba(196,169,98,0.06)" />
              <stop offset="100%" stopColor="rgba(196,169,98,0)" />
            </linearGradient>
            <linearGradient id="gl-navy" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="rgba(10,38,71,0.09)" />
              <stop offset="100%" stopColor="rgba(10,38,71,0)" />
            </linearGradient>
          </defs>
          <line x1="0" y1="0" x2="30%" y2="100%" stroke="url(#gl-gold)" strokeWidth="1.5" />
          <line x1="7%" y1="0" x2="37%" y2="100%" stroke="rgba(196,169,98,0.05)" strokeWidth="1" />
          <line x1="100%" y1="0" x2="70%" y2="100%" stroke="url(#gl-navy)" strokeWidth="1.5" />
          <line x1="93%" y1="0" x2="63%" y2="100%" stroke="rgba(10,38,71,0.05)" strokeWidth="1" />
        </svg>
      </motion.div>

    </div>
  );
}
