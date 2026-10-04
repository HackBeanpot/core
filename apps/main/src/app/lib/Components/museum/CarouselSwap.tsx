"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { CarouselDirection } from "./useCarousel";

// useLayoutEffect warns during SSR on older React; fall back to useEffect on the server.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const SLIDE_DISTANCE_PX = 16;

type CarouselSwapProps = {
  swapKey: React.Key;
  direction: CarouselDirection;
  animated?: boolean;
  durationMs?: number;
  className?: string;
  children: ReactNode;
};

type OutgoingSlide = { key: React.Key; node: ReactNode };

const CarouselSwap = ({
  swapKey,
  direction,
  animated = true,
  durationMs = 300,
  className = "",
  children,
}: CarouselSwapProps) => {
  const incomingRef = useRef<HTMLDivElement>(null);
  const outgoingRef = useRef<HTMLDivElement>(null);

  // Children from the last committed render, so the old slide can stay
  // on screen while it fades out.
  const lastChildren = useRef<ReactNode>(children);
  useEffect(() => {
    lastChildren.current = children;
  });

  const [currentKey, setCurrentKey] = useState(swapKey);
  const [outgoing, setOutgoing] = useState<OutgoingSlide | null>(null);

  // Detect the slide change during render so both slides appear in the same frame.
  if (swapKey !== currentKey) {
    setCurrentKey(swapKey);
    setOutgoing(
      animated ? { key: currentKey, node: lastChildren.current } : null,
    );
  }

  useIsoLayoutEffect(() => {
    if (!outgoing) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const shift = reduceMotion ? 0 : SLIDE_DISTANCE_PX * direction;
    const timing: KeyframeAnimationOptions = {
      duration: durationMs,
      easing: "ease-out",
      fill: "both",
    };

    const animations = [
      incomingRef.current?.animate(
        [
          { opacity: 0, transform: `translateX(${shift}px)` },
          { opacity: 1, transform: "translateX(0)" },
        ],
        timing,
      ),
      outgoingRef.current?.animate(
        [
          { opacity: 1, transform: "translateX(0)" },
          { opacity: 0, transform: `translateX(${-shift}px)` },
        ],
        timing,
      ),
    ];

    const timer = window.setTimeout(() => setOutgoing(null), durationMs);
    return () => {
      window.clearTimeout(timer);
      animations.forEach((a) => a?.cancel());
    };
  }, [outgoing]);

  return (
    // Both slides share one grid cell, so the layout doesn't jump mid-crossfade.
    <div className={`grid overflow-hidden ${className}`} aria-live="polite">
      {outgoing && (
        <div
          key={`out-${String(outgoing.key)}`}
          ref={outgoingRef}
          className="[grid-area:1/1] pointer-events-none"
          aria-hidden="true"
        >
          {outgoing.node}
        </div>
      )}
      <div
        key={`in-${String(currentKey)}`}
        ref={incomingRef}
        className="[grid-area:1/1]"
      >
        {children}
      </div>
    </div>
  );
};

export default CarouselSwap;
