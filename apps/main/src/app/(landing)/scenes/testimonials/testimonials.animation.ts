import { gsap } from "../gsap";
import { crossfade } from "../transitions";
import type { SceneAnimation } from "../types";

/**
 * Hacker Testimonials motion (MS-306). Hooks are the `data-anim` names on
 * `TestimonialsScene`; positions are fractions of a 0..1 timeline.
 *
 * - `enter`, the "walk in": Speakers' exit color fades away while the corridor
 *   settles from a zoom, nearest layer most (parallax), so it reads as stepping
 *   into the hall.
 * - `build`: the fog drifts in from the edges, sparkles pop in, the medallion
 *   fades up into place, footprints appear one by one
 *   from the bottom up, walking into the hall, then the quote and arrows fade
 *   up. It plays by itself (`buildSeconds`) once the walk-in ends.
 */

/** Starting scale of each corridor layer in `enter`; all end at 1. */
const WALK_IN = { near: 1.25, mid: 1.15, far: 1.08 };
/**
 * The corridor's vanishing point, as a transform origin on the full-artboard
 * layer wrappers (Figma: far arch centered at x 756, its opening ~y 560).
 */
const VANISHING_POINT = "50% 57%";

/** Fog: how far each piece starts outside its resting spot, in its own widths. */
const FOG_DRIFT = 35;

export const testimonialsAnimation: SceneAnimation = {
  id: "testimonials",
  // Plays in full as soon as the walk-in ends; no extra scrolling.
  buildSeconds: 1.6,

  enter: (root, tl, ctx) => {
    const q = gsap.utils.selector(root);
    crossfade(tl, ctx.prevRoot, root, { fromColor: ctx.fromColor });
    (["near", "mid", "far"] as const).forEach((layer) => {
      tl.fromTo(
        q(`[data-anim="testimonials-${layer}"]`),
        { scale: WALK_IN[layer], transformOrigin: VANISHING_POINT },
        { scale: 1, duration: 1, ease: "power1.out" },
        0,
      );
    });
  },

  build: (root, tl) => {
    const q = gsap.utils.selector(root);
    const ease = "none";

    // Fog drifts in from the screen edges.
    tl.fromTo(
      q(
        '[data-anim="testimonials-fog-cornerTopLeft"], [data-anim="testimonials-fog-cornerBottomLeft"]',
      ),
      { xPercent: -FOG_DRIFT, autoAlpha: 0.3 },
      { xPercent: 0, autoAlpha: 1, duration: 0.5, ease },
      0,
    );
    tl.fromTo(
      q('[data-anim="testimonials-fog-sideRight"]'),
      { xPercent: FOG_DRIFT, autoAlpha: 0.3 },
      { xPercent: 0, autoAlpha: 1, duration: 0.5, ease },
      0,
    );

    // Sparkles pop in one after another; their CSS twinkle keeps running.
    tl.fromTo(
      q('[data-anim="testimonials-sparkle"]'),
      { autoAlpha: 0, scale: 0.3 },
      { autoAlpha: 1, scale: 1, duration: 0.1, stagger: 0.04, ease },
      0.1,
    );

    // The portrait medallion fades up into place, like the prototype
    // recording; no swing, so it doesn't shake on entrance.
    tl.fromTo(
      q('[data-anim="testimonials-medallion"]'),
      { autoAlpha: 0, yPercent: 8 },
      { autoAlpha: 1, yPercent: 0, duration: 0.2, ease: "power2.out" },
      0.15,
    );

    // Footprints appear one by one from the bottom of the screen up, walking
    // into the hall. The hooks are numbered farthest first, so reverse them.
    const feet = q('[data-anim^="testimonials-foot-"]').reverse();
    feet.forEach((foot, i) => {
      tl.fromTo(
        foot,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.06, ease },
        0.25 + (i * 0.55) / feet.length,
      );
    });

    // The quote, name and school fade up, then the arrows.
    tl.fromTo(
      q('[data-anim="testimonials-quote"]'),
      { autoAlpha: 0, yPercent: 12 },
      { autoAlpha: 1, yPercent: 0, duration: 0.2, ease },
      0.45,
    );
    tl.fromTo(
      q('[data-anim="testimonials-arrows"]'),
      { autoAlpha: 0, yPercent: 40 },
      { autoAlpha: 1, yPercent: 0, duration: 0.15, ease },
      0.6,
    );
  },
};
