"use client";

import { notFound } from "next/navigation";
import React, { useRef } from "react";
import { SmoothScroll } from "../../../lib/scroll/SmoothScroll";
import { gsap, ScrollTrigger, useGSAP } from "../../../(landing)/scenes/gsap";
import {
  PlaceholderScene,
  placeholderAnimation,
} from "../../../(landing)/scenes/placeholder/PlaceholderScene";

/**
 * Proof of concept: one pinned scene on Lenis, scrubbing a box.
 * Check in Chrome, Safari and Firefox at /dev/scenes/poc.
 */
export default function PocPage() {
  if (process.env.NODE_ENV === "production") notFound();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      const tl = gsap.timeline({ paused: true });
      placeholderAnimation.build(root.current, tl);
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: true,
        animation: tl,
      });
    },
    { scope: root },
  );

  return (
    <SmoothScroll>
      <div className="bg-black p-6 text-white">Scroll down</div>
      <div ref={root}>
        <PlaceholderScene />
      </div>
      <div className="h-[100svh] bg-black p-6 text-white">After the pin</div>
    </SmoothScroll>
  );
}
