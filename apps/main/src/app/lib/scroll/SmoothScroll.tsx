"use client";

import Lenis from "lenis";
// Lenis' required base styles. The `scroll-behavior` override is in globals.css.
import "lenis/dist/lenis.css";
import React, { createContext, useContext, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "../../(landing)/scenes/gsap";

const LenisContext = createContext<Lenis | null>(null);

/** The active Lenis instance, or `null` below 640px / with reduced motion. */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

/**
 * Lenis smooth scroll driven by the GSAP ticker, so ScrollTrigger and Lenis
 * share one clock. Only active at >= 640px and without reduced motion;
 * otherwise the page uses native scrolling.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 640px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let instance: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    const stop = () => {
      if (!instance || !tick) return;
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33); // gsap defaults
      instance.destroy();
      instance = null;
      tick = null;
      setLenis(null);
    };

    const start = () => {
      if (instance) return;
      const next = new Lenis({ autoRaf: false });
      next.on("scroll", ScrollTrigger.update);
      tick = (time: number) => next.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      instance = next;
      setLenis(next);
    };

    const sync = () => (wide.matches && !reduced.matches ? start() : stop());

    sync();
    wide.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
