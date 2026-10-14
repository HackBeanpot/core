import type { ComponentType } from "react";
import { AboutScene } from "./about/AboutScene";
import { heroAnimation } from "./hero/hero.animation";
import { HeroScene } from "./hero/HeroScene";
import { placeholder } from "./placeholder/placeholders";
import { SpeakersScene } from "./speakers/SpeakersScene";
import { TeamScene } from "./team/TeamScene";
import { enterWith, type TransitionName } from "./transitions";
import type { SceneAnimation, SceneId } from "./types";

export interface SceneEntry {
  id: SceneId;
  /** `<Name>Scene.tsx` from the static ticket: the final resting state. */
  Component: ComponentType;
  /** `<name>.animation.ts` from the animation ticket. Omit until it exists. */
  animation?: SceneAnimation;
}

/**
 * A real scene whose animation ticket hasn't merged yet: it rests in its
 * final state and comes in with a stand-in transition, so the page has no
 * hard cuts in the meantime. The animation ticket replaces the whole call
 * with `{ id, Component, animation }`.
 */
function interim(
  id: SceneId,
  Component: ComponentType,
  transition: TransitionName,
  opts?: Record<string, unknown>,
): SceneEntry {
  return {
    id,
    Component,
    animation: { id, enter: enterWith(transition, opts), build: () => {} },
  };
}

/**
 * Every landing scene, in page order. `ScrollStage` plays them top to bottom
 * using `MOTION_SPEC[id]` for each scene's scroll length and exit color.
 *
 * Swap your placeholder for the real scene with a one-line change:
 *   placeholder("values", "fogWipe"),
 *   -> interim("values", ValuesScene, "fogWipe"),                    // static ticket
 *   -> { id: "values", Component: ValuesScene, animation: valuesAnimation }, // animation ticket
 *
 * Unpinned scenes (`pinned: false` in the motion spec, i.e. FAQ) must be last.
 */
export const SCENES: SceneEntry[] = [
  { id: "hero", Component: HeroScene, animation: heroAnimation },
  interim("about", AboutScene, "crossfade"), // MS-303
  placeholder("values", "fogWipe"), // MS-205, MS-304
  interim("speakers", SpeakersScene, "curtain", { color: "#8f1d1a" }), // MS-305
  placeholder("testimonials", "zoomThrough"), // MS-207, MS-306
  placeholder("projects", "pan"), // MS-208, MS-307
  placeholder("sponsors", "crossfade", { scaleFrom: 1.08 }), // MS-203, MS-402
  interim("team", TeamScene, "fogWipe", { direction: "down" }), // MS-308
  placeholder("faq", "crossfade"), // MS-302
];
