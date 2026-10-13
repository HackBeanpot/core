import type { ComponentType } from "react";
import { placeholder } from "./placeholder/placeholders";
import type { SceneAnimation, SceneId } from "./types";

export interface SceneEntry {
  id: SceneId;
  /** `<Name>Scene.tsx` from the static ticket: the final resting state. */
  Component: ComponentType;
  /** `<name>.animation.ts` from the animation ticket. Omit until it exists. */
  animation?: SceneAnimation;
}

/**
 * Every landing scene, in page order. `ScrollStage` plays them top to bottom
 * using `MOTION_SPEC[id]` for each scene's scroll length and exit color.
 *
 * Swap your placeholder for the real scene with a one-line change:
 *   placeholder("about", "crossfade"),
 *   -> { id: "about", Component: AboutScene },                       // static ticket
 *   -> { id: "about", Component: AboutScene, animation: aboutAnimation }, // animation ticket
 *
 * Unpinned scenes (`pinned: false` in the motion spec, i.e. FAQ) must be last.
 */
export const SCENES: SceneEntry[] = [
  placeholder("hero"),
  placeholder("about", "crossfade"),
  placeholder("values", "fogWipe"),
  placeholder("speakers", "curtain", { color: "#8f1d1a" }),
  placeholder("testimonials", "zoomThrough"),
  placeholder("projects", "pan"),
  placeholder("sponsors", "crossfade", { scaleFrom: 1.08 }),
  placeholder("team", "fogWipe", { direction: "down" }),
  placeholder("faq", "crossfade"),
];
