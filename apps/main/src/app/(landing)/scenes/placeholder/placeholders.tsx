import React from "react";
import { u } from "../../../lib/scroll/units";
import { MOTION_SPEC } from "../motionSpec";
import { SceneFrame } from "../SceneFrame";
import { enterWith, type TransitionName } from "../transitions";
import type { SceneAnimation, SceneId } from "../types";
import type { SceneEntry } from "../registry";

/**
 * A colored stand-in for a real scene (MS-201). The background is the scene's
 * own `exitColor`, so transitions read correctly; the box scrubs across the
 * artboard during `build`, so you can see where each scene's range sits.
 * Section tickets replace the whole `placeholder(...)` call in `registry.ts`.
 */
export function placeholder(
  id: SceneId,
  transition?: TransitionName,
  transitionOpts?: Record<string, unknown>,
): SceneEntry {
  const Component = () => (
    <SceneFrame
      sceneId={id}
      background={
        <div
          className="h-full w-full"
          style={{ background: MOTION_SPEC[id].exitColor }}
        />
      }
      content={
        <>
          <div className="absolute inset-0 border-2 border-dashed border-white/30" />
          <p
            data-anim="label"
            className="absolute inset-x-0 text-center font-gothic uppercase text-white"
            style={{ top: u(380), fontSize: u(120), lineHeight: 1 }}
          >
            {id}
          </p>
          <p
            className="absolute inset-x-0 text-center font-mono text-white/60"
            style={{ top: u(520), fontSize: u(24) }}
          >
            {transition ?? "no enter"}
          </p>
          <div
            data-anim="box"
            className="absolute rounded-md bg-[#fbbf24]"
            style={{ left: u(100), top: u(700), width: u(120), height: u(120) }}
          />
        </>
      }
    />
  );
  Component.displayName = `Placeholder(${id})`;

  const animation: SceneAnimation = {
    id,
    ...(transition && { enter: enterWith(transition, transitionOpts) }),
    build: (root, tl) => {
      tl.fromTo(
        root.querySelector('[data-anim="box"]'),
        { x: 0, rotate: 0 },
        {
          x: () => root.clientWidth * 0.7,
          rotate: 360,
          ease: "none",
          duration: 1,
        },
      );
    },
  };

  return { id, Component, animation };
}
