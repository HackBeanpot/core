import { gsap } from "../gsap";
import { fogWipe } from "../transitions";
import type { SceneAnimation } from "../types";

/**
 * Meet the Team motion (MS-308). Hooks are the `data-anim` names on
 * `TeamScene`; positions are fractions of a 0..1 timeline.
 *
 * - `enter`: Sponsors' exit color (navy) fog-wipes down off the teal room.
 * - `build`: the title drops; the top row slides in from the right, then the
 *   bottom row; the portraits settle from ±2° to straight; the benches rise
 *   from the floor. The arrows aren't animated, so they page the strip at any
 *   progress. It plays by itself (`buildSeconds`) once the wipe ends.
 *
 * The scroll track owns `scrollLeft`, so nothing here transforms it. The
 * strip slides on its wrapper (`team-strip`), and the top row only ever moves
 * left of its resting spot: a transform to the right inside the track would
 * grow its `scrollWidth`, and the arrows would think there's more to scroll.
 */

/** When the strip (and with it the bottom row) slides in. */
const STRIP = { start: 0.1, end: 0.6 };
/** The top row lands this early, ahead of the bottom row. */
const TOP_ROW_LANDS = 0.4;
/** Portraits start tilted this many degrees, alternating sides. */
const TILT = 2;

export const teamAnimation: SceneAnimation = {
  id: "team",
  // Plays in full as soon as the fog wipe ends; no extra scrolling.
  buildSeconds: 1.4,

  enter: (root, tl, ctx) => {
    fogWipe(tl, ctx.prevRoot, root, {
      fromColor: ctx.fromColor,
      direction: "down",
    });
  },

  build: (root, tl) => {
    const q = gsap.utils.selector(root);
    const ease = "none";

    // The title drops into place.
    tl.fromTo(
      q('[data-anim="team-title"]'),
      { autoAlpha: 0, yPercent: -80 },
      { autoAlpha: 1, yPercent: 0, duration: 0.2, ease },
      0,
    );

    // The strip slides in from off the right edge, carrying both rows; the
    // bottom row lands when it does. The top row is pulled ahead by exactly
    // the strip's remaining offset at TOP_ROW_LANDS, then eases back by the
    // same amount the strip still moves, so it lands early and stays put.
    // Both tweens are linear, which keeps the two offsets cancelling.
    const strip = q('[data-anim="team-strip"]')[0];
    const stripLength = STRIP.end - STRIP.start;
    const leftAtLanding = (STRIP.end - TOP_ROW_LANDS) / stripLength;
    const lead = () => -leftAtLanding * (strip?.offsetWidth ?? 0);
    const topRow = q('[data-anim="team-row-0"]');

    tl.fromTo(
      strip,
      { xPercent: 100 },
      { xPercent: 0, duration: stripLength, ease },
      STRIP.start,
    );
    tl.fromTo(
      topRow,
      { x: 0 },
      { x: lead, duration: TOP_ROW_LANDS - STRIP.start, ease },
      STRIP.start,
    );
    tl.fromTo(
      topRow,
      { x: lead },
      {
        x: 0,
        duration: STRIP.end - TOP_ROW_LANDS,
        ease,
        immediateRender: false,
      },
      TOP_ROW_LANDS,
    );

    // Each row's portraits settle as that row lands, alternating left/right
    // tilt along the row.
    [0, 1].forEach((row) => {
      const members = q(
        `[data-anim="team-row-${row}"] [data-anim^="team-member-"]`,
      );
      tl.fromTo(
        members,
        { rotation: (i: number) => (i % 2 ? TILT : -TILT) },
        {
          rotation: 0,
          duration: 0.15,
          stagger: { amount: 0.05 },
          ease: "sine.out",
        },
        row === 0 ? TOP_ROW_LANDS - 0.05 : STRIP.end - 0.05,
      );
    });

    // The benches rise from the floor.
    tl.fromTo(
      q('[data-anim="team-bench"]'),
      { autoAlpha: 0, yPercent: 40 },
      { autoAlpha: 1, yPercent: 0, duration: 0.2, stagger: 0.05, ease },
      0.55,
    );
  },
};
