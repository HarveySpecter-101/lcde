"use client";

import { useEffect, useRef, useCallback } from "react";

function generateSessionId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getBrowserInfo() {
  if (typeof navigator === "undefined") {
    return { browser: "Unknown", os: "Unknown", device: "Desktop" };
  }

  const ua = navigator.userAgent;
  let browser = "Unknown";
  let os = "Unknown";
  let device = "Desktop";

  if (ua.includes("WhatsApp")) browser = "WhatsApp Webview";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("OPR") || ua.includes("Opera")) browser = "Opera";
  else if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Safari")) browser = "Safari";

  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac")) os = "macOS";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Linux")) os = "Linux";

  if (/Mobi|Android|iPhone/i.test(ua)) device = "Mobile";
  else if (/iPad|Tablet/i.test(ua)) device = "Tablet";

  return { browser, os, device };
}

function detectTrafficSource(): string {
  if (typeof window === "undefined") return "Direct";

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource =
      urlParams.get("utm_source") ||
      urlParams.get("ref") ||
      urlParams.get("source") ||
      urlParams.get("utm_medium");

    if (utmSource) {
      if (/whatsapp/i.test(utmSource)) return "WhatsApp";
      if (/instagram|ig/i.test(utmSource)) return "Instagram";
      if (/facebook|fb/i.test(utmSource)) return "Facebook";
      if (/linkedin/i.test(utmSource)) return "LinkedIn";
      if (/tiktok/i.test(utmSource)) return "TikTok";
      if (/google/i.test(utmSource)) return "Google";
      return utmSource;
    }

    const ref = (document.referrer || "").trim();
    const ua = navigator.userAgent || "";

    // WhatsApp detection (Android intent, in-app browser, wa.me referrer)
    if (
      /whatsapp/i.test(ref) ||
      /com\.whatsapp/i.test(ref) ||
      /l\.whatsapp\.com/i.test(ref) ||
      /whatsapp/i.test(ua)
    ) {
      return "WhatsApp";
    }

    if (/instagram/i.test(ref) || /instagram/i.test(ua)) return "Instagram";
    if (/facebook|fb\.com|fbclid/i.test(ref) || /fbclid/i.test(window.location.search)) return "Facebook";
    if (/linkedin/i.test(ref)) return "LinkedIn";
    if (/google\./i.test(ref)) return "Google";

    if (ref) {
      try {
        const hostname = new URL(ref).hostname.replace(/^www\./, "");
        if (hostname) return hostname;
      } catch {
        return ref.slice(0, 50);
      }
    }
  } catch {}

  return "Accès direct";
}

function getScrollPercent(): number {
  if (typeof window === "undefined" || typeof document === "undefined") return 0;
  const doc = document.documentElement;
  const body = document.body;
  const scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop || 0;
  const scrollHeight =
    Math.max(
      doc.scrollHeight,
      body.scrollHeight,
      doc.offsetHeight,
      body.offsetHeight
    ) - window.innerHeight;

  if (scrollHeight <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((scrollTop / scrollHeight) * 100)));
}

type SectionData = {
  enterTime: number;
  totalTime: number;
  visible: boolean;
};

type TrackingEvent = {
  type: string;
  target?: string;
  section?: string;
  time: number;
};

export function SiteTracker() {
  const sessionIdRef = useRef("");
  const startTimeRef = useRef(Date.now());
  const sectionsRef = useRef<Map<string, SectionData>>(new Map());
  const eventsRef = useRef<TrackingEvent[]>([]);
  const maxScrollRef = useRef(0);
  const clickCountRef = useRef(0);
  const initializedRef = useRef(false);
  const lastSendRef = useRef(0);
  const trafficSourceRef = useRef("Accès direct");
  const scrollDebounceTimer = useRef<NodeJS.Timeout | null>(null);

  const sendData = useCallback((isEnd: boolean = false) => {
    if (!sessionIdRef.current) return;

    const now = Date.now();
    // Allow immediate send if isEnd, otherwise minimum 2s between rapid sends
    if (!isEnd && now - lastSendRef.current < 2000) return;
    lastSendRef.current = now;

    // Refresh scroll before sending
    const currentScroll = getScrollPercent();
    if (currentScroll > maxScrollRef.current) {
      maxScrollRef.current = currentScroll;
    }

    const sections = Array.from(sectionsRef.current.entries()).map(
      ([name, data]) => ({
        name,
        totalTime: Math.round(
          data.totalTime + (data.visible ? now - data.enterTime : 0)
        ),
      })
    );

    const payload = JSON.stringify({
      sessionId: sessionIdRef.current,
      sectionsVisited: sections,
      events: eventsRef.current.slice(-200),
      maxScrollPercent: maxScrollRef.current,
      duration: Math.max(1000, now - startTimeRef.current),
      totalClicks: clickCountRef.current,
      referrer: trafficSourceRef.current,
      isEnd,
    });

    const url = "/api/tracking/update";

    // Modern keepalive fetch first (preferred on mobile)
    try {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {
        // Fallback to sendBeacon if fetch fails on unload
        if (isEnd && typeof navigator !== "undefined" && navigator.sendBeacon) {
          navigator.sendBeacon(url, new Blob([payload], { type: "application/json" }));
        }
      });
    } catch {
      if (isEnd && typeof navigator !== "undefined" && navigator.sendBeacon) {
        navigator.sendBeacon(url, new Blob([payload], { type: "application/json" }));
      }
    }
  }, []);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Do not track admin portal
    if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
      return;
    }

    // Session ID management
    const existingSession = sessionStorage.getItem("lcde_track_sid");
    if (existingSession) {
      sessionIdRef.current = existingSession;
    } else {
      sessionIdRef.current = generateSessionId();
      sessionStorage.setItem("lcde_track_sid", sessionIdRef.current);
    }

    const trafficSource = detectTrafficSource();
    trafficSourceRef.current = trafficSource;

    const { browser, os, device } = getBrowserInfo();

    // 1. Initialiser la visite
    fetch("/api/tracking/init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: sessionIdRef.current,
        userAgent: navigator.userAgent,
        browser,
        os,
        device,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        referrer: trafficSource,
        entryPage: window.location.pathname,
      }),
    }).catch(() => {});

    // 2. Observer toutes les sections avec seuil très bas pour le mobile
    const setupObserver = () => {
      const sections = document.querySelectorAll("section[id]");
      if (sections.length === 0) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          let hasNewEnter = false;
          entries.forEach((entry) => {
            const id = entry.target.id;
            if (!id) return;

            if (!sectionsRef.current.has(id)) {
              sectionsRef.current.set(id, {
                enterTime: 0,
                totalTime: 0,
                visible: false,
              });
            }
            const data = sectionsRef.current.get(id)!;

            if (entry.isIntersecting && !data.visible) {
              data.visible = true;
              data.enterTime = Date.now();
              hasNewEnter = true;
              eventsRef.current.push({
                type: "section_enter",
                section: id,
                time: Date.now() - startTimeRef.current,
              });
            } else if (!entry.isIntersecting && data.visible) {
              data.visible = false;
              data.totalTime += Date.now() - data.enterTime;
              eventsRef.current.push({
                type: "section_leave",
                section: id,
                time: Date.now() - startTimeRef.current,
              });
            }
          });

          // Dès qu'une nouvelle section est atteinte, on synchronise sans attendre !
          if (hasNewEnter) {
            sendData(false);
          }
        },
        { threshold: [0.05, 0.15], rootMargin: "0px 0px -5% 0px" }
      );

      sections.forEach((s) => observer.observe(s));
      return observer;
    };

    // Attachement immédiat + rafraîchissement
    let observer = setupObserver();
    const t1 = setTimeout(() => {
      if (!observer) observer = setupObserver();
    }, 400);
    const t2 = setTimeout(() => {
      if (!observer) observer = setupObserver();
    }, 1500);

    // 3. Suivi du Scroll (Mobile touch + scroll classique)
    const handleScrollUpdate = () => {
      const p = getScrollPercent();
      if (p > maxScrollRef.current) {
        maxScrollRef.current = p;
      }

      // Debounce sync 1.5s après l'arrêt du défilement
      if (scrollDebounceTimer.current) clearTimeout(scrollDebounceTimer.current);
      scrollDebounceTimer.current = setTimeout(() => {
        sendData(false);
      }, 1500);
    };

    window.addEventListener("scroll", handleScrollUpdate, { passive: true });
    window.addEventListener("touchmove", handleScrollUpdate, { passive: true });

    // 4. Suivi des Clics
    const handleClick = (e: MouseEvent) => {
      clickCountRef.current++;
      const target = e.target as HTMLElement;
      const closestId = target.id || target.closest("[id]")?.id || "";
      const tagName = target.tagName ? target.tagName.toLowerCase() : "";
      const text = (target.textContent || "").trim().slice(0, 40);

      eventsRef.current.push({
        type: "click",
        target: [tagName, closestId, text].filter(Boolean).join(" | "),
        time: Date.now() - startTimeRef.current,
      });

      if (eventsRef.current.length > 300) {
        eventsRef.current = eventsRef.current.slice(-200);
      }
    };
    document.addEventListener("click", handleClick, { passive: true });

    // 5. Synchronisations automatiques rapprochées
    // 2s, 6s, 12s, puis toutes les 8s (pour ne JAMAIS perdre une visite rapide mobile)
    const earlySync1 = setTimeout(() => sendData(false), 2000);
    const earlySync2 = setTimeout(() => sendData(false), 6000);
    const earlySync3 = setTimeout(() => sendData(false), 12000);
    const interval = setInterval(() => sendData(false), 8000);

    // 6. Gestion ultra-fiable des sorties sur Mobile (pagehide + visibilitychange)
    const handleExit = () => {
      sendData(true);
    };

    window.addEventListener("pagehide", handleExit);
    window.addEventListener("beforeunload", handleExit);

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        sendData(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(earlySync1);
      clearTimeout(earlySync2);
      clearTimeout(earlySync3);
      if (scrollDebounceTimer.current) clearTimeout(scrollDebounceTimer.current);
      clearInterval(interval);
      observer?.disconnect();
      window.removeEventListener("scroll", handleScrollUpdate);
      window.removeEventListener("touchmove", handleScrollUpdate);
      document.removeEventListener("click", handleClick);
      window.removeEventListener("pagehide", handleExit);
      window.removeEventListener("beforeunload", handleExit);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [sendData]);

  return null;
}
