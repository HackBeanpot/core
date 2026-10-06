import type { gsap } from "./gsap";

export const SCENE_IDS = [
  "hero",
  "about",
  "values",
  "speakers",
  "testimonials",
  "projects",
  "sponsors",
  "team",
  "faq",
] as const;

export type SceneId = (typeof SCENE_IDS)[number];

/** Scenes the dev harness can render: the real scenes plus the S2 placeholder. */
export type DevSceneId = SceneId | "placeholder";

/** Static, per-scene numbers confirmed in the motion spec. Lives in `motionSpec.ts`. */
export interface SceneSpec {
  /** Scroll distance the scene is pinned for, in vh. */
  scrollLength: number;
  /** Color the scene leaves behind; the next scene's `enter` starts from it. */
  exitColor: string;
  /** Whether the scene is pinned while its `build` timeline scrubs. */
  pinned: boolean;
}

/**
 * The two timelines a scene exports. The orchestrator (MS-201) and the dev
 * harness (`/dev/scenes`) both consume this shape, so scenes never touch
 * ScrollTrigger themselves.
 *
 * ## How to write a scene
 *
 * 1. **Query by `data-anim`, never by class or tag.** Mark animated nodes with
 *    `data-anim="sun"`, `data-anim="title"`, ... and select with
 *    `root.querySelector('[data-anim="sun"]')` or `gsap.utils.selector(root)`.
 * 2. **Animate only `transform` and `opacity`** (x, y, scale, rotate, autoAlpha).
 *    No top/left/width/height/filter/box-shadow tweens: they trigger layout or
 *    repaint and will drop frames while scrubbing.
 * 3. **Read lengths and colors from `motionSpec.ts`** (`scrollLength`,
 *    `exitColor`). Don't hard-code them in the scene.
 * 4. **Build with the harness.** Run `/dev/scenes?scene=<id>&progress=0.5`
 *    (and `&enter=1` for the enter transition) and add your scene to
 *    `dev/scenes/sceneMap.ts` before opening a PR.
 * 5. **Timelines are paused and unit-less.** Return a timeline with a total
 *    duration of ~1 and position tweens as fractions of it with
 *    `ease: "none"`; the caller scrubs it. Don't set `scrollTrigger` yourself.
 * 6. **Size with `u(n)` / `var(--u)`** from `lib/scroll/units.ts` so the scene
 *    scales with the artboard.
 */
export interface SceneAnimation {
  /**
   * Transition in from the previous scene's `exitColor`. Fade/slide the
   * scene's own layers over the color already behind them. Optional: scenes
   * with no special enter (e.g. `hero`) omit it.
   */
  enter?: (root: HTMLElement) => gsap.core.Timeline;
  /** The scrubbed build while the scene is pinned. Must be returned paused. */
  build: (root: HTMLElement) => gsap.core.Timeline;
}
