import { gsap } from "../gsap";
import { morph } from "../transitions";
import type { SceneAnimation } from "../types";

/**
 * Meet the Team motion (MS-308), matched to the prototype recording. Hooks
 * are the `data-anim` names on `TeamScene`; positions are fractions of a
 * 0..1 timeline.
 *
 * - `enter`: Sponsors' content fades off, then its navy blends into the teal
 *   room in place (`morph`).
 * - `build`: the title rises in, the two rows fade up one after the other,
 *   the arrows fade in, and the floor and benches slide up from the bottom.
 *   It plays by itself (`buildSeconds`) once the morph ends.
 *
 * The scroll track owns `scrollLeft`, so nothing here moves it sideways;
 * the rows only move vertically.
 */

/** The prototype's timings, in seconds; divided by `TOTAL` below. */
const TOTAL = 1;

export const teamAnimation: SceneAnimation = {
  id: "team",
  // Plays in full as soon as the morph ends; no extra scrolling.
  buildSeconds: 1,

  enter: (root, tl, ctx) => {
    morph(tl, ctx.prevRoot, root, { fromColor: ctx.fromColor });
  },

  build: (root, tl) => {
    const q = gsap.utils.selector(root);
    const at = (seconds: number) => seconds / TOTAL;
    const rise = (n: number) => () =>
      n * (parseFloat(getComputedStyle(root).getPropertyValue("--u")) || 1);

    tl.fromTo(
      q('[data-anim="team-title"]'),
      { autoAlpha: 0, y: rise(26) },
      { autoAlpha: 1, y: 0, duration: at(0.55), ease: "power3.out" },
      0,
    );

    tl.fromTo(
      q('[data-anim="team-row-0"], [data-anim="team-row-1"]'),
      { autoAlpha: 0, y: rise(24) },
      {
        autoAlpha: 1,
        y: 0,
        duration: at(0.6),
        stagger: at(0.15),
        ease: "power2.out",
      },
      at(0.15),
    );

    tl.fromTo(
      q('[data-anim="team-arrows"]'),
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: at(0.5), ease: "power1.out" },
      at(0.4),
    );

    tl.fromTo(
      q('[data-anim="team-floor"], [data-anim="team-benches"]'),
      { y: rise(90) },
      { y: 0, duration: at(0.7), ease: "power3.out" },
      at(0.1),
    );

    tl.to({}, { duration: 1 }, 0);
  },
};
