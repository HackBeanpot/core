import type { ComponentType } from "react";
import { AboutScene } from "../../(landing)/scenes/about/AboutScene";
import {
  HERO_PREVIEW,
  heroAnimation,
} from "../../(landing)/scenes/hero/hero.animation";
import { HeroScene } from "../../(landing)/scenes/hero/HeroScene";
import { ProjectsScene } from "../../(landing)/scenes/projects/ProjectsScene";
import { SpeakersScene } from "../../(landing)/scenes/speakers/SpeakersScene";
import { speakersAnimation } from "../../(landing)/scenes/speakers/speakers.animation";
import { teamAnimation } from "../../(landing)/scenes/team/team.animation";
import { aboutAnimation } from "../../(landing)/scenes/about/About.animation";
import { TeamScene } from "../../(landing)/scenes/team/TeamScene";
import { testimonialsAnimation } from "../../(landing)/scenes/testimonials/testimonials.animation";
import { TestimonialsScene } from "../../(landing)/scenes/testimonials/TestimonialsScene";
import { SponsorsScene } from "../../(landing)/scenes/sponsors/SponsorsScene";
import type { DevSceneId, SceneAnimation } from "../../(landing)/scenes/types";

export interface SceneMapEntry {
  Component: ComponentType;
  /** Leave out while the scene is static; the harness then hides progress/enter. */
  animation?: SceneAnimation;
  /** Named states for `&state=<name>` (e.g. moments in the hero's intro). */
  states?: {
    names: readonly string[];
    /** Applied when the URL has no `state`. */
    default?: string;
    apply: (root: HTMLElement, state: string) => void;
  };
}

/** Each scene ticket adds one line here to show up in `/dev/scenes`. */
export const SCENE_MAP: Partial<Record<DevSceneId, SceneMapEntry>> = {
  hero: {
    Component: HeroScene,
    animation: heroAnimation,
    states: HERO_PREVIEW,
  },
  about: {
    Component: AboutScene,
    animation: aboutAnimation,
  },
  speakers: {
    Component: SpeakersScene,
    animation: speakersAnimation,
  },
  // Static until the projects animation ticket adds `projects.animation.ts`.
  projects: {
    Component: ProjectsScene,
    animation: { id: "projects", build: () => {} },
  },
  testimonials: {
    Component: TestimonialsScene,
    animation: testimonialsAnimation,
  },
  sponsors: {
    Component: SponsorsScene,
    animation: { id: "sponsors", build: () => {} },
  },
  team: { Component: TeamScene, animation: teamAnimation },
};
