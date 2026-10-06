import type { ComponentType } from "react";
import {
  PlaceholderScene,
  placeholderAnimation,
} from "../../(landing)/scenes/placeholder/PlaceholderScene";
import type { DevSceneId, SceneAnimation } from "../../(landing)/scenes/types";

export interface SceneMapEntry {
  Component: ComponentType;
  animation: SceneAnimation;
}

/** Each scene ticket adds one line here to show up in `/dev/scenes`. */
export const SCENE_MAP: Partial<Record<DevSceneId, SceneMapEntry>> = {
  placeholder: {
    Component: PlaceholderScene,
    animation: placeholderAnimation,
  },
};
