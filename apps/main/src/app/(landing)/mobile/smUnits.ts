import type { CSSProperties } from "react";

/** The SM artboard width (Figma frames are 402px wide). */
export const SM_ARTBOARD_W = 402;

/**
 * Set on an SM section root so `sm(n)` scales with the viewport width:
 * one artboard px at 402, ~0.8px at 320, ~1.59px at 639.
 */
export const smUnitVar = {
  "--smu": `calc(100vw / ${SM_ARTBOARD_W})`,
} as CSSProperties;

/** `n` SM artboard px, scaled to the viewport width (needs `smUnitVar` above). */
export const sm = (n: number) => `calc(${n} * var(--smu))`;

type Box = { x: number; y: number; w: number; h: number };

/** Absolutely places a Figma box (artboard px) with `sm()`. */
export const smBox = (box: Box): CSSProperties => ({
  position: "absolute",
  left: sm(box.x),
  top: sm(box.y),
  width: sm(box.w),
  height: sm(box.h),
});
