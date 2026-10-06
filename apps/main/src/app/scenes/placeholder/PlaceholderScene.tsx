import React from "react";
import { u } from "../../lib/scroll/units";
import { gsap } from "../gsap";
import { SceneFrame } from "../SceneFrame";
import type { SceneAnimation } from "../types";

/** Exit color of the placeholder, standing in for a `motionSpec.ts` entry. */
export const PLACEHOLDER_EXIT_COLOR = "#1f6f96";

export function PlaceholderScene() {
  return (
    <SceneFrame
      sceneId="placeholder"
      background={<div className="h-full w-full bg-[#14124a]" />}
      content={
        <>
          {/* 1512x982 test grid: a border and a cross at the artboard center */}
          <div
            className="absolute inset-0 border-2 border-white/60"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
              backgroundSize: `${u(100)} ${u(100)}`,
            }}
          />
          <div
            data-anim="box"
            className="absolute rounded-md bg-amber-400"
            style={{ left: u(100), top: u(391), width: u(200), height: u(200) }}
          />
        </>
      }
    />
  );
}

export const placeholderAnimation: SceneAnimation = {
  enter: (root) =>
    gsap
      .timeline({ paused: true })
      .fromTo(
        root.querySelectorAll('[data-anim="background"]'),
        { opacity: 0 },
        { opacity: 1, ease: "none", duration: 1 },
      ),
  build: (root) =>
    gsap
      .timeline({ paused: true, defaults: { ease: "none" } })
      .fromTo(
        root.querySelector('[data-anim="box"]'),
        { xPercent: 0, rotate: 0 },
        { xPercent: 600, rotate: 360, duration: 1 },
      ),
};
