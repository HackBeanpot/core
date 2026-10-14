"use client";

import { useEffect, useState, type RefObject } from "react";

export type ArtboardBreakpoint = "lg" | "md";

/**
 * Which artboard a scene is laid out on: LG (1512 wide) or MD (1000 wide).
 *
 * Reads `--ab-w` from an element inside the scene. `globals.css` switches it
 * with a media query, and the dev harness overrides it for `&w=1000`, so this
 * covers real tablets and the harness alike (a media query alone would miss
 * the harness).
 *
 * Returns "lg" on the server and first render, then corrects after mount.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const bp = useArtboardBreakpoint(ref);
 * const layout = LAYOUT[bp];
 * // …
 * <div ref={ref} className="pointer-events-none absolute inset-0" aria-hidden />
 */
export function useArtboardBreakpoint(
  ref: RefObject<HTMLElement>,
): ArtboardBreakpoint {
  const [bp, setBp] = useState<ArtboardBreakpoint>("lg");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => {
      const w = parseFloat(getComputedStyle(el).getPropertyValue("--ab-w"));
      setBp(w > 0 && w <= 1000 ? "md" : "lg");
    };
    read();
    const observer = new ResizeObserver(read);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return bp;
}
