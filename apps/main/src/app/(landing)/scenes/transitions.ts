import type { gsap } from "./gsap";
import type { SceneAnimation } from "./types";

/**
 * Shared `enter` transitions. Call one from a scene's `enter`:
 *
 * @example
 * enter: (root, tl, ctx) => {
 *   fogWipe(tl, ctx.prevRoot, root, { fromColor: ctx.fromColor });
 * },
 *
 * Every transition:
 * - starts from the previous scene's `exitColor` (`opts.fromColor`), so the
 *   cut from the previous scene's tail is invisible;
 * - fills `tl` from 0 to 1 (the orchestrator stretches it over the scene's
 *   enter range), so add your own `enter` tweens at positions inside 0..1;
 * - animates only transform / opacity / visibility of the root's two layers
 *   (`[data-stage-scene]` and `[data-transition-layer]`, see `SceneSlot`) and,
 *   for `zoomThrough` / `pan`, of the previous scene;
 * - accepts `prevRoot: null` (the harness, or no previous scene).
 *
 * Preview each one at `/dev/scenes?transition=<name>&progress=0.5`.
 */
export interface TransitionOptions {
  /** The previous scene's `exitColor` (`ctx.fromColor` in `enter`). */
  fromColor: string;
  /** Ease for every tween. Default `"none"`, so scrubbing stays linear. */
  ease?: string;
}

export type Transition<O extends object = object> = (
  tl: gsap.core.Timeline,
  prevRoot: HTMLElement | null,
  root: HTMLElement,
  opts: TransitionOptions & O,
) => void;

const sceneOf = (root: HTMLElement | null) =>
  root?.querySelector<HTMLElement>(":scope > [data-stage-scene]") ?? null;

const layerOf = (root: HTMLElement) =>
  root.querySelector<HTMLElement>(":scope > [data-transition-layer]");

/** Resets the transition layer to a full-viewport flat `color` at time 0. */
const paintLayer = (
  tl: gsap.core.Timeline,
  layer: HTMLElement | null,
  vars: gsap.TweenVars,
) =>
  layer &&
  tl.set(
    layer,
    {
      top: 0,
      height: "100%",
      xPercent: 0,
      yPercent: 0,
      opacity: 1,
      ...vars,
    },
    0,
  );

/**
 * The previous color fades away to reveal this scene, which optionally
 * settles from a slight zoom (Sponsors: `scaleFrom: 1.08`).
 *
 * @param opts.scaleFrom Starting scale of this scene. Default `1` (no zoom).
 */
export const crossfade: Transition<{ scaleFrom?: number }> = (
  tl,
  _prevRoot,
  root,
  { fromColor, ease = "none", scaleFrom = 1 },
) => {
  const layer = layerOf(root);
  paintLayer(tl, layer, { background: fromColor });
  if (layer) tl.to(layer, { opacity: 0, ease, duration: 1 }, 0);
  if (scaleFrom !== 1) {
    tl.fromTo(
      sceneOf(root),
      { scale: scaleFrom },
      { scale: 1, ease, duration: 1 },
      0,
    );
  }
};

/**
 * A wall of the previous color with a soft, foggy edge slides off the
 * screen, uncovering this scene behind it (Values, Team).
 *
 * @param opts.direction `"up"` (default): the wall rises off the top, so
 *   the scene appears from the bottom. `"down"`: the reverse.
 * @param opts.feather Height of the soft edge as a fraction of the viewport.
 *   Default `0.35`.
 */
export const fogWipe: Transition<{
  direction?: "up" | "down";
  feather?: number;
}> = (
  tl,
  _prevRoot,
  root,
  { fromColor, ease = "none", direction = "up", feather = 0.35 },
) => {
  const layer = layerOf(root);
  if (!layer) return;
  const solid = `${(100 / (1 + feather)).toFixed(2)}%`;
  const up = direction === "up";
  paintLayer(tl, layer, {
    top: up ? 0 : `${-feather * 100}%`,
    height: `${(1 + feather) * 100}%`,
    background: up
      ? `linear-gradient(to bottom, ${fromColor} ${solid}, transparent)`
      : `linear-gradient(to top, ${fromColor} ${solid}, transparent)`,
  });
  tl.to(layer, { yPercent: up ? -100 : 100, ease, duration: 1 }, 0);
};

/**
 * The camera pushes through the previous scene: it scales up as the screen
 * fills with its exit color, then this scene arrives from a slight zoom
 * (Testimonials' "walk in").
 *
 * @param opts.prevScale Scale the previous scene reaches. Default `1.6`.
 * @param opts.scale Scale this scene starts at before settling to 1.
 *   Default `1.25`.
 */
export const zoomThrough: Transition<{ prevScale?: number; scale?: number }> = (
  tl,
  prevRoot,
  root,
  { fromColor, ease = "none", prevScale = 1.6, scale = 1.25 },
) => {
  const layer = layerOf(root);
  const scene = sceneOf(root);
  const prevScene = sceneOf(prevRoot);
  paintLayer(tl, layer, { background: fromColor, opacity: 0 });
  tl.set(scene, { autoAlpha: 0 }, 0);
  if (prevScene) {
    tl.to(prevScene, { scale: prevScale, ease, duration: 0.5 }, 0);
  }
  if (layer) tl.to(layer, { opacity: 1, ease, duration: 0.5 }, 0);
  tl.set(scene, { autoAlpha: 1 }, 0.5);
  tl.fromTo(scene, { scale }, { scale: 1, ease, duration: 0.5 }, 0.5);
  if (layer) tl.to(layer, { opacity: 0, ease, duration: 0.5 }, 0.5);
};

/**
 * A curtain sweeps across the previous scene and on out the other side,
 * revealing this scene behind it (Speakers).
 *
 * @param opts.color Curtain color. Default `fromColor`.
 * @param opts.from Side the curtain enters from. Default `"right"`.
 */
export const curtain: Transition<{
  color?: string;
  from?: "left" | "right";
}> = (
  tl,
  _prevRoot,
  root,
  { fromColor, ease = "none", color = fromColor, from = "right" },
) => {
  const layer = layerOf(root);
  const scene = sceneOf(root);
  const sign = from === "right" ? 1 : -1;
  paintLayer(tl, layer, { background: color, xPercent: 100 * sign });
  tl.set(scene, { autoAlpha: 0 }, 0);
  if (layer) tl.to(layer, { xPercent: 0, ease, duration: 0.5 }, 0);
  tl.set(scene, { autoAlpha: 1 }, 0.5);
  if (layer) tl.to(layer, { xPercent: -100 * sign, ease, duration: 0.5 }, 0.5);
};

/**
 * A horizontal camera pan: the previous scene slides out as this one slides
 * in beside it, like walking into the next room (Projects).
 *
 * @param opts.direction Direction the content moves. `"left"` (default)
 *   brings this scene in from the right.
 */
export const pan: Transition<{ direction?: "left" | "right" }> = (
  tl,
  prevRoot,
  root,
  { ease = "none", direction = "left" },
) => {
  const sign = direction === "left" ? 1 : -1;
  const prevScene = sceneOf(prevRoot);
  if (prevScene) {
    tl.to(prevScene, { xPercent: -100 * sign, ease, duration: 1 }, 0);
  }
  tl.fromTo(
    sceneOf(root),
    { xPercent: 100 * sign },
    { xPercent: 0, ease, duration: 1 },
    0,
  );
};

export const TRANSITIONS = {
  fogWipe,
  crossfade,
  zoomThrough,
  curtain,
  pan,
} satisfies Record<string, Transition>;

export type TransitionName = keyof typeof TRANSITIONS;

/**
 * A scene `enter` that runs one of the transitions above with fixed options.
 *
 * @example
 * enter: enterWith("fogWipe", { direction: "down" }),
 */
export const enterWith =
  (
    name: TransitionName,
    opts: Record<string, unknown> = {},
  ): NonNullable<SceneAnimation["enter"]> =>
  (root, tl, { prevRoot, fromColor }) =>
    TRANSITIONS[name](tl, prevRoot, root, { fromColor, ...opts });
