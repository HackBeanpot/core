import type { ComponentType } from "react";
import { AboutScene } from "./about/AboutScene";
import { FaqScene } from "./faq/FaqScene";
import { heroAnimation } from "./hero/hero.animation";
import { HeroScene } from "./hero/HeroScene";
import { projectsAnimation } from "./projects/projects.animation";
import { ProjectsScene } from "./projects/ProjectsScene";
import { speakersAnimation } from "./speakers/speakers.animation";
import { SpeakersScene } from "./speakers/SpeakersScene";
import { sponsorsAnimation } from "./sponsors/sponsors.animation";
import { SponsorsScene } from "./sponsors/SponsorsScene";
import { teamAnimation } from "./team/team.animation";
import { TeamScene } from "./team/TeamScene";
import { testimonialsAnimation } from "./testimonials/testimonials.animation";
import { TestimonialsScene } from "./testimonials/TestimonialsScene";
import { valuesAnimation } from "./values/values.animation";
import { ValuesScene } from "./values/ValuesScene";
import { enterWith, type TransitionName } from "./transitions";
import type { SceneAnimation, SceneId } from "./types";
import { aboutAnimation } from "./about/About.animation";

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
export function interim(
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
  { id: "about", Component: AboutScene, animation: aboutAnimation },
  { id: "values", Component: ValuesScene, animation: valuesAnimation },
  { id: "speakers", Component: SpeakersScene, animation: speakersAnimation },
  {
    id: "testimonials",
    Component: TestimonialsScene,
    animation: testimonialsAnimation,
  },
  { id: "projects", Component: ProjectsScene, animation: projectsAnimation },
  { id: "sponsors", Component: SponsorsScene, animation: sponsorsAnimation },
  { id: "team", Component: TeamScene, animation: teamAnimation },
  interim("faq", FaqScene, "crossfade"), // MS-403
];
