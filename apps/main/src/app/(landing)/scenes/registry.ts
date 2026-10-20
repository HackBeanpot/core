import type { ComponentType } from "react";
import { AboutScene } from "./about/AboutScene";
import { heroAnimation } from "./hero/hero.animation";
import { HeroScene } from "./hero/HeroScene";
import { placeholder } from "./placeholder/placeholders";
import { ProjectsScene } from "./projects/ProjectsScene";
import { speakersAnimation } from "./speakers/speakers.animation";
import { SpeakersScene } from "./speakers/SpeakersScene";
import { teamAnimation } from "./team/team.animation";
import { TeamScene } from "./team/TeamScene";
import { testimonialsAnimation } from "./testimonials/testimonials.animation";
import { TestimonialsScene } from "./testimonials/TestimonialsScene";
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
  { id: "speakers", Component: SpeakersScene, animation: speakersAnimation },
  {
    id: "testimonials",
    Component: TestimonialsScene,
    animation: testimonialsAnimation,
  },
  interim("projects", ProjectsScene, "pan"), // MS-307
  placeholder("sponsors", "crossfade", { scaleFrom: 1.08 }), // MS-203, MS-402
  { id: "team", Component: TeamScene, animation: teamAnimation },
  placeholder("faq", "crossfade"), // MS-302
];
