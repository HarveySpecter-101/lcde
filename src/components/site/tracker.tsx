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
  const ua = navigator.userAgent;
  let browser = "Unknown";
  let os = "Unknown";
  let device = "Desktop";

  if (ua.includes("Firefox")) browser = "Firefox";
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

  const sendData = useCallback((isEnd: boolean = false) => {
    // Throttle non-end sends to avoid spam
    const now = Date.now();
    if (!isEnd && now - lastSendRef.current < 10000) return;
    lastSendRef.current = now;

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
      events: eventsRef.current.slice(-200), // Cap at 200 events
      maxScrollPercent: maxScrollRef.current,
      duration: now - startTimeRef.current,
      totalClicks: clickCountRef.current,
      isEnd,
    });

    const url = "/api/tracking/update";

    if (isEnd && navigator.sendBeacon) {
      navigator.sendBeacon(
        url,
        new Blob([payload], { type: "application/json" })
      );
    } else {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Check if on admin page — don't track
    if (window.location.pathname.startsWith("/admin")) return;

    // Session ID management
    const existingSession = sessionStorage.getItem("lcde_track_sid");
    if (existingSession) {
      sessionIdRef.current = existingSession;
    } else {
      sessionIdRef.current = generateSessionId();
      sessionStorage.setItem("lcde_track_sid", sessionIdRef.current);
    }

    const { browser, os, device } = getBrowserInfo();

    // Initialize visit
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
        referrer: document.referrer || null,
        entryPage: window.location.pathname,
      }),
    }).catch(() => {});

    // Section tracking — observe all <section id="...">
    const setupObserver = () => {
      const sections = document.querySelectorAll("section[id]");
      if (sections.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = entry.target.id;
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
        },
        { threshold: 0.25 }
      );

      sections.forEach((s) => observer.observe(s));
      return observer;
    };

    // Wait a tick for DOM to be ready
    const observerRef = { current: null as IntersectionObserver | null };
    const setupTimer = setTimeout(() => {
      observerRef.current = setupObserver() || null;
    }, 1000);

    // Scroll tracking (throttled)
    let scrollRAF: number | null = null;
    const handleScroll = () => {
      if (scrollRAF) return;
      scrollRAF = requestAnimationFrame(() => {
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight > 0) {
          const percent = Math.round((window.scrollY / scrollHeight) * 100);
          if (percent > maxScrollRef.current) {
            maxScrollRef.current = percent;
          }
        }
        scrollRAF = null;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Click tracking
    const handleClick = (e: MouseEvent) => {
      clickCountRef.current++;
      const target = e.target as HTMLElement;
      const closestId = target.id || target.closest("[id]")?.id || "";
      const tagName = target.tagName.toLowerCase();
      const text = (target.textContent || "").trim().slice(0, 40);
      const cls = target.className?.toString().slice(0, 50) || "";

      eventsRef.current.push({
        type: "click",
        target: [tagName, closestId, text].filter(Boolean).join(" | "),
        time: Date.now() - startTimeRef.current,
      });

      // Keep events array from growing too large
      if (eventsRef.current.length > 300) {
        eventsRef.current = eventsRef.current.slice(-200);
      }
    };
    document.addEventListener("click", handleClick);

    // Periodic update (every 30s)
    const interval = setInterval(() => sendData(false), 30000);

    // End session on unload
    const handleBeforeUnload = () => sendData(true);
    window.addEventListener("beforeunload", handleBeforeUnload);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendData(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(setupTimer);
      observerRef.current?.disconnect();
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [sendData]);

  return null; // Invisible tracking component
}
