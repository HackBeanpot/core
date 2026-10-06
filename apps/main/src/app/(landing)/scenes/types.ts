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
 * A scene's animation, exported from `<name>.animation.ts`. The orchestrator
 * (MS-201) and the dev harness (`/dev/scenes`) both consume this shape, so
 * scenes never touch ScrollTrigger themselves.
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
 * 5. **Add tweens to the timeline you're given; don't create or play one.**
 *    The caller (the orchestrator in MS-201, or the harness) creates it
 *    paused, attaches it to ScrollTrigger, and scrubs it. Position tweens as
 *    fractions of a total duration of 1, with `ease: "none"`, and never set
 *    `scrollTrigger` yourself.
 * 6. **Size with `u(n)` / `var(--u)`** from `lib/scroll/units.ts` so the scene
 *    scales with the artboard.
 *
 * @example
 * export const aboutAnimation: SceneAnimation = {
 *   id: "about",
 *   enter: (root, tl) => {
 *     tl.from(root.querySelector('[data-anim="about-plaque"]'), { autoAlpha: 0, y: 40 });
 *   },
 *   build: (root, tl) => {
 *     tl.to(root.querySelector('[data-anim="about-frame"]'), { x: 0, duration: 1 });
 *   },
 * };
 */
export interface SceneAnimation {
  id: DevSceneId;
  /**
   * Transition in from the previous scene's `exitColor`: fade/slide this
   * scene's layers over the color already behind them. Optional (the hero
   * has no enter).
   */
  enter?: (root: HTMLElement, tl: gsap.core.Timeline) => void;
  /** The in-scene animation, scrubbed while the scene is pinned. */
  build: (root: HTMLElement, tl: gsap.core.Timeline) => void;
}
