import { gsap } from "../gsap";
import { crossfade } from "../transitions";
import type { SceneAnimation } from "../types";

const q = (root: HTMLElement, name: string) =>
  Array.from(root.querySelectorAll<HTMLElement>(`[data-anim="${name}"]`));

export const aboutAnimation: SceneAnimation = {
  id: "about",
  buildSeconds: 1.55,

  enter: (root, tl, ctx) => {
    const topFog = q(root, "about-fog-tl");
    const topFog2 = q(root, "about-fog-tl-2");
    const bottomFog = q(root, "about-fog-br");
    const bottomFog2 = q(root, "about-fog-br-2");

    crossfade(tl, ctx.prevRoot, root, {
      fromColor: ctx.fromColor,
    });

    tl.fromTo(
      topFog,
      { xPercent: -40, autoAlpha: 0 },
      { xPercent: 0, autoAlpha: 1, ease: "none", duration: 1 },
      0,
    )
      .fromTo(
        topFog2,
        { xPercent: -40, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, ease: "none", duration: 1 },
        0,
      )
      .fromTo(
        bottomFog,
        { xPercent: 40, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, ease: "none", duration: 1 },
        0,
      )
      .fromTo(
        bottomFog2,
        { xPercent: 40, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, ease: "none", duration: 1 },
        0,
      );
  },

  /**
   * Matches the prototype recording: everything fades up into place with no
   * rotation, so nothing shakes. The plaque, then its title and text, rise
   * in; the photo frame fades up from a slight scale; the candles rise from
   * below. Positions are the prototype's seconds over `TOTAL`, so the
   * timeline stays length 1.
   */
  build: (root, tl) => {
    const q = gsap.utils.selector(root);
    const TOTAL = 1.55;
    const at = (seconds: number) => seconds / TOTAL;
    const len = (seconds: number) => seconds / TOTAL;
    const rise = (n: number) => () =>
      n * (parseFloat(getComputedStyle(root).getPropertyValue("--u")) || 1);

    tl.fromTo(
      q('[data-anim="about-plaque"]'),
      { autoAlpha: 0, y: rise(30) },
      { autoAlpha: 1, y: 0, duration: len(0.6), ease: "power3.out" },
      at(0.08),
    );

    tl.fromTo(
      q('[data-anim="about-text-line"]'),
      { autoAlpha: 0, y: rise(30) },
      {
        autoAlpha: 1,
        y: 0,
        duration: len(0.6),
        stagger: len(0.13),
        ease: "power3.out",
      },
      at(0.15),
    );

    tl.fromTo(
      q('[data-anim="about-frame"]'),
      { autoAlpha: 0, y: rise(26), scale: 0.95, transformOrigin: "50% 50%" },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: len(0.75),
        ease: "back.out(1.3)",
      },
      at(0.3),
    );

    tl.fromTo(
      q('[data-anim="about-candle-left"], [data-anim="about-candle-right"]'),
      { yPercent: 55 },
      {
        yPercent: 0,
        duration: len(0.9),
        stagger: len(0.18),
        ease: "power2.out",
      },
      at(0.45),
    );

    tl.to({}, { duration: 1 }, 0);
  },
};
