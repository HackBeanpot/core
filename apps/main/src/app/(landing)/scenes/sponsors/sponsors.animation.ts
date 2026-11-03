import { enterWith } from "../transitions";
import type { SceneAnimation } from "../types";

const q = (root: HTMLElement, name: string) =>
  Array.from(root.querySelectorAll<HTMLElement>(`[data-anim="${name}"]`));

/** Frames are hooked `sponsor-gold-0`, `sponsor-gold-1`, ... in DOM order. */
const tierFrames = (root: HTMLElement, tier: "gold" | "silver") =>
  Array.from(root.querySelectorAll<HTMLElement>(`[data-anim^="sponsor-${tier}-"]`));

/** px per artboard unit, so offsets scale like u(n). */
const unit = (root: HTMLElement) =>
  parseFloat(getComputedStyle(root).getPropertyValue("--u")) || 1;

// Build slots, as fractions of the build timeline (which always ends at 1).
const TITLE = { at: 0, dur: 0.2 };
const FRAMES = { start: 0.15, end: 0.85 };
const FRAME_DUR = 0.18;
/** Cap on the gap between drops, so 3 sponsors don't crawl in. */
const MAX_GAP = 0.12;
const CTA = { at: 0.85, dur: 0.15 };

export const sponsorsAnimation: SceneAnimation = {
  id: "sponsors",

  // Projects' lavender fades away; the scene settles from a slight zoom.
  enter: enterWith("crossfade", { scaleFrom: 1.08 }),

  build: (root, tl) => {
    const [title] = q(root, "sponsors-title");
    const cta = q(root, "sponsors-cta");
    const u = () => unit(root);

    // TODO(MS-402): windows/statues parallax is blocked. The background is
    // one flattened image (see public/sponsors/positions.ts). Pending a
    // decision on re-exporting those layers.

    if (title) {
      tl.from(title, { autoAlpha: 0, y: () => -24 * u(), ease: "none", duration: TITLE.dur }, TITLE.at);
    }

    // Gold first, then silver, one at a time. The gap shrinks as the count
    // grows, so the last frame always lands by FRAMES.end.
    const frames = [...tierFrames(root, "gold"), ...tierFrames(root, "silver")];
    const span = FRAMES.end - FRAMES.start - FRAME_DUR;
    const gap = frames.length > 1 ? Math.min(MAX_GAP, span / (frames.length - 1)) : 0;

    frames.forEach((frame, i) => {
      const at = FRAMES.start + i * gap;
      // Drop and settle: back.out overshoots slightly, which reads as landing.
      tl.from(frame, {
        y: () => -40 * u(),
        ease: "back.out(1.7)",
        duration: FRAME_DUR,
      }, at)
        // Opacity gets its own linear tween so back.out doesn't push it past 1.
        .from(frame, { autoAlpha: 0, ease: "none", duration: FRAME_DUR * 0.4 }, at);
    });

    tl.from(cta, { autoAlpha: 0, y: () => 24 * u(), ease: "none", duration: CTA.dur }, CTA.at);
  },
};