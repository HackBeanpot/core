import type { ComponentType } from "react";
import { TestimonialsScene } from "../../(landing)/scenes/testimonials/TestimonialsScene";
import type { DevSceneId, SceneAnimation } from "../../(landing)/scenes/types";

export interface SceneMapEntry {
  Component: ComponentType;
  /** Leave out while the scene is static; the harness then hides progress/enter. */
  animation?: SceneAnimation;
}

/** Each scene ticket adds one line here to show up in `/dev/scenes`. */
export const SCENE_MAP: Partial<Record<DevSceneId, SceneMapEntry>> = {
  testimonials: {
    Component: TestimonialsScene,
    // Static for now; MS-306 adds testimonials.animation.ts here.
  },
};
