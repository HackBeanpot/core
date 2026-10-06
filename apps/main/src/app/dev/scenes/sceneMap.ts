import type { ComponentType } from "react";
import {
  PLACEHOLDER_EXIT_COLOR,
  PlaceholderScene,
  placeholderAnimation,
} from "../../scenes/placeholder/PlaceholderScene";
import type { DevSceneId, SceneAnimation } from "../../scenes/types";

export interface SceneMapEntry {
  Component: ComponentType;
  animation: SceneAnimation;
  /** Only needed for scenes outside `motionSpec.ts`. */
  exitColor?: string;
}

/** Each scene ticket adds one line here to show up in `/dev/scenes`. */
export const SCENE_MAP: Partial<Record<DevSceneId, SceneMapEntry>> = {
  placeholder: {
    Component: PlaceholderScene,
    animation: placeholderAnimation,
    exitColor: PLACEHOLDER_EXIT_COLOR,
  },
};
