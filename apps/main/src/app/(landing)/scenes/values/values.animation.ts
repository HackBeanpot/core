import { gsap } from "../gsap";
import { ABOUT_BACKGROUND } from "../about/AboutScene";
import { morph } from "../transitions";
import type { SceneAnimation } from "../types";

/**
 * Our Values motion (MS-304). Hooks are the `data-anim` names on
 * `ValuesScene`; positions are fractions of a 0..1 timeline.
 *
 * - `enter`: About's content fades off its navy, which then blends into
 *   the teal room (`morph`).
 * - `build`: the spotlight switches on (drops open from its lamp, with a
 *   flicker); the pillars rise from below, left → middle → right; each stone
 *   pops as its pillar lands, then its text fades up; the vases slide up in
 *   a stagger. It plays by itself (`buildSeconds`) once the morph ends.
 *
 * Not done (optional in the ticket, waiting on Cole): the spotlight sweeping
 * across the three values while scrolling.
 */

/** Order the columns rise in. */
const COLUMNS = [0, 1, 2] as const;
const PILLAR = { start: 0.12, stagger: 0.12, duration: 0.4 };
const STONE = { lead: 0.05, duration: 0.2 };
const TEXT = { delay: 0.08, duration: 0.2 };
const VASES = { start: 0.4, stagger: 0.05, duration: 0.3, count: 6 };

export const valuesAnimation: SceneAnimation = {
  id: "values",
  buildSeconds: 1.8,

  enter: (root, tl, ctx) => {
    // About's navy becomes the teal room in place, rather than a second
    // gradient wiping across it.
    morph(tl, ctx.prevRoot, root, {
      fromColor: ctx.fromColor,
      fromBackground: ABOUT_BACKGROUND,
    });
  },

  build: (root, tl) => {
    const q = gsap.utils.selector(root);

    // Title is up as soon as the morph ends.
    tl.fromTo(
      q('[data-anim="values-title"]'),
      { autoAlpha: 0, y: -20 },
      { autoAlpha: 1, y: 0, duration: 0.15, ease: "power2.out" },
      0,
    );

    // Spotlight: opens down from the lamp, then flickers before holding.
    const spot = q('[data-anim="values-spotlight"]');
    tl.fromTo(
      spot,
      { scaleY: 0, transformOrigin: "50% 0%" },
      { scaleY: 1, duration: 0.2, ease: "power2.out" },
      0,
    );
    tl.fromTo(
      spot,
      { autoAlpha: 0 },
      {
        keyframes: [
          { autoAlpha: 1, duration: 0.04 },
          { autoAlpha: 0.25, duration: 0.03 },
          { autoAlpha: 0.9, duration: 0.03 },
          { autoAlpha: 0.4, duration: 0.02 },
          { autoAlpha: 1, duration: 0.04 },
        ],
        ease: "none",
      },
      0,
    );

    COLUMNS.forEach((i, order) => {
      const start = PILLAR.start + order * PILLAR.stagger;
      const lands = start + PILLAR.duration;

      tl.fromTo(
        q(`[data-anim="values-pillar-${i}"]`),
        { yPercent: 100, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: PILLAR.duration,
          ease: "power3.out",
        },
        start,
      );

      tl.fromTo(
        q(`[data-anim="values-stone-${i}"]`),
        { scale: 0, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: STONE.duration,
          ease: "back.out(2.5)",
        },
        lands - STONE.lead,
      );

      tl.fromTo(
        q(`[data-anim="values-text-${i}"]`),
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: TEXT.duration, ease: "power2.out" },
        lands - STONE.lead + TEXT.delay,
      );
    });

    const vases = Array.from({ length: VASES.count }, (_, i) =>
      q(`[data-anim="values-vase-${i}"]`),
    ).flat();
    tl.fromTo(
      vases,
      { yPercent: 110, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: VASES.duration,
        stagger: VASES.stagger,
        ease: "power2.out",
      },
      VASES.start,
    );

    // Pin the timeline length to 1 so the fractions above hold.
    tl.to({}, { duration: 1 }, 0);
  },
};
