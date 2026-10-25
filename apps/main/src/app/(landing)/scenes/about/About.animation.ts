import { gsap } from "../gsap";
import { crossfade } from "../transitions";
import type { SceneAnimation } from "../types";

const q = (root: HTMLElement, name: string) =>
  Array.from(root.querySelectorAll<HTMLElement>(`[data-anim="${name}"]`));

export const aboutAnimation: SceneAnimation = {
  id: "about",
  buildSeconds: 1.3,

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

  build: (root, tl) => {
    const q = gsap.utils.selector(root);
    const ease = "power2.out";

    const plaque = q('[data-anim="about-plaque"]');
    const frame = q('[data-anim="about-frame"]');
    const candle1 = q('[data-anim="about-candle-left"]');
    const candle2 = q('[data-anim="about-candle-right"]');

    tl.fromTo(
      plaque,
      {
        autoAlpha: 0,
        yPercent: -100,
        rotation: -3,
        transformOrigin: "50% 0%",
      },
      {
        autoAlpha: 1,
        yPercent: 0,
        rotation: 2,
        duration: 0.55,
        ease: "power2.out",
      },
      0,
    );

    tl.to(
      plaque,
      {
        rotation: 0,
        duration: 0.25,
        ease: "sine.out",
      },
      0.55,
    );

    tl.fromTo(
      frame,
      {
        autoAlpha: 0,
        xPercent: 100,
        rotation: 4,
        transformOrigin: "50% 50%",
      },
      {
        autoAlpha: 1,
        xPercent: 0,
        rotation: -2,
        duration: 0.65,
        ease: "power2.out",
      },
      0.25,
    );

    tl.to(
      frame,
      {
        rotation: 0,
        duration: 0.25,
        ease: "sine.out",
      },
      0.9,
    );

    const textLines = q('[data-anim="about-text-line"]');

    tl.fromTo(
      textLines,
      {
        autoAlpha: 0,
        y: 15,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.2,
        ease: "power2.out",
      },
      0.65,
    );

    tl.fromTo(
      candle1,
      {
        autoAlpha: 0,
        yPercent: 100,
      },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.5,
        ease,
      },
      0.75,
    );
    tl.fromTo(
      candle2,
      {
        autoAlpha: 0,
        yPercent: 100,
      },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.5,
        ease,
      },
      0.75,
    );

    tl.to({}, { duration: 1 }, 0);
  },
};
