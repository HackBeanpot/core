import { gsap } from "../gsap";
import type { SceneAnimation } from "../types";

/**
 * Hero motion (MS-202), ported from the design prototype
 * (plabbur.github.io/hbp-mainsite-prototype, `script.js`). Two parts:
 *
 * 1. **Intro** (`playHeroIntro`): plays once on load, in real seconds, no
 *    scrolling needed. Day turns to night while the camera pushes in from
 *    0.58x to the resting framing; then the lights pop up and flicker on,
 *    the title lands and the MLH badge unrolls from behind the moon.
 *    Scrolling while it plays hurries it along (3x).
 * 2. **Scroll** (`heroAnimation.build`): only moves the camera. It pushes
 *    from the resting framing to the Figma door crop, then on through the
 *    doorway in log-scale space (constant perceived zoom rate) until the
 *    door interior is full bleed, and fades to `exitColor` for About.
 *
 * All positions are in the scene's 1512x982 design px.
 */

const W = 1512;
const H = 982;

/**
 * Night brightness per material (the prototype's `filter: brightness()`
 * end values). `HeroScene` renders a twin of each layer pre-darkened to
 * this; the intro fades the twin in instead of tweening the filter.
 */
export const NIGHT_BRIGHTNESS = { bushes: 0.55, stones: 0.78, grass: 0.44 };
/** Twilight brightness, reached part-way through the fade. */
const TWILIGHT_BRIGHTNESS = { bushes: 0.8, stones: 0.92, grass: 0.72 };
/** Twin opacity that blends to brightness `b` (the blend is linear in it). */
const twinAlpha = (b: number, night: number) => (1 - b) / (1 - night);
/** `.grass-fill` (#0d6719) at twilight and night brightness. */
const GRASS_FILL = { twilight: "#094a12", night: "#062d0b" };

type Frame = { x: number; y: number; scale: number };

/** The camera at the start of the intro: what you see on first paint. Mirrored in `hero.css`. */
export const INTRO_FRAME_START: Frame = {
  x: 300.683,
  y: 243.004,
  scale: 0.58338,
};
/** Where the intro settles; the scroll camera starts here. */
export const INTRO_FRAME: Frame = { x: 148.911, y: 160.338, scale: 0.77784 };
/** Figma's Zoom frame (`5597:12280`): the door crop the scroll passes through. */
const DOOR_CROP: Frame = { x: -867.415, y: -642.753, scale: 2.1194 };
/** Final scale of the plunge, enough for the doorway to fill any viewport. */
const PLUNGE_SCALE = 30;
const FOCUS_DOOR = { x: 755.75, y: 600 };

/** Intro timestamps (seconds) the dev harness can jump to with `&state=`. */
export const HERO_INTRO_STATES = {
  day: 0,
  twilight: 2.5,
  dusk: 4.3,
  night: 5.6,
  lit: 99,
} as const;

const compose = (a: Frame, b: Frame): Frame => ({
  scale: a.scale * b.scale,
  x: a.scale * b.x + a.x,
  y: a.scale * b.y + a.y,
});
const invert = (a: Frame): Frame => ({
  scale: 1 / a.scale,
  x: -a.x / a.scale,
  y: -a.y / a.scale,
});
/** A camera frame on a full-scene group, as viewport-independent GSAP vars. */
const frameVars = ({ x, y, scale }: Frame) => ({
  xPercent: (x / W) * 100,
  yPercent: (y / H) * 100,
  scale,
  x: 0,
  y: 0,
});

const clamp01 = gsap.utils.clamp(0, 1);
const smoothstep = (v: number) => {
  const p = clamp01(v);
  return p * p * (3 - 2 * p);
};

// ------------------------------------------------------------------ camera

const LOG_START = Math.log(INTRO_FRAME.scale);
const LOG_END = Math.log(PLUNGE_SCALE);
const U_CROP = (Math.log(DOOR_CROP.scale) - LOG_START) / (LOG_END - LOG_START);
// The prototype's camera runs T 0.01 -> 10.4 and reaches the crop at 8.15.
const T_START = 0.01;
const T_END = 10.4;
const T_CROP = (8.15 - T_START) / (T_END - T_START);
const PACE_MID_SLOPE = 0.75;
const PACE_END_SLOPE = 4.5;
const FOCUS_FRAME = {
  x: (756 - INTRO_FRAME.x) / INTRO_FRAME.scale,
  y: (491 - INTRO_FRAME.y) / INTRO_FRAME.scale,
};
const PLUNGE_FOCUS_START = {
  x: (756 - DOOR_CROP.x) / DOOR_CROP.scale,
  y: (491 - DOOR_CROP.y) / DOOR_CROP.scale,
};

/** C1 Hermite pacing: (0,0,slope 0) -> (T_CROP, U_CROP, slope M) -> (1,1). */
const pace = (t: number) => {
  if (t <= T_CROP) {
    const h = t / T_CROP;
    const h2 = h * h;
    const h3 = h2 * h;
    return (h3 - h2) * T_CROP * PACE_MID_SLOPE + (-2 * h3 + 3 * h2) * U_CROP;
  }
  const span = 1 - T_CROP;
  const h = (t - T_CROP) / span;
  const h2 = h * h;
  const h3 = h2 * h;
  return (
    (2 * h3 - 3 * h2 + 1) * U_CROP +
    (h3 - 2 * h2 + h) * span * PACE_MID_SLOPE +
    (-2 * h3 + 3 * h2) +
    (h3 - h2) * span * PACE_END_SLOPE
  );
};

/** The scroll camera at prototype time T (0..10.4). Passes through DOOR_CROP exactly. */
export function scrollCamera(T: number): Frame {
  const u = pace(clamp01((T - T_START) / (T_END - T_START)));
  const scale = Math.exp(LOG_START + (LOG_END - LOG_START) * u);
  const g =
    u <= U_CROP
      ? smoothstep(u / U_CROP)
      : smoothstep((u - U_CROP) / (1 - U_CROP));
  const [from, to] =
    u <= U_CROP
      ? [FOCUS_FRAME, PLUNGE_FOCUS_START]
      : [PLUNGE_FOCUS_START, FOCUS_DOOR];
  const fx = from.x + (to.x - from.x) * g;
  const fy = from.y + (to.y - from.y) * g;
  return { x: 756 - scale * fx, y: 491 - scale * fy, scale };
}

/** Prototype time T for hero build progress 0..1. */
const T_AT = (p: number) => p * T_END;
const CAMERA_SAMPLES = 160;
/** Build progress where the zoom layer is rebuilt: the door crop and camera ~1x. */
const REBUILD_AT = [8.15 / T_END, 0.4];

/** Recreate an element's compositor layer at its current scale. */
function rebuildLayer(el: HTMLElement | null) {
  if (!el) return;
  el.style.willChange = "auto";
  // Two frames: one without the layer, then promote it again.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      el.style.willChange = "";
    }),
  );
}

/**
 * The front plane's clip box (`.fg-clip` in hero.css), in design px: what
 * of it can be on screen. The zoom layer stays this small, so the 30x dive
 * stays on the compositor (the hills and fill alone are ~5000px wide). The
 * intro starts zoomed out (0.58x) and needs the wide box; once it settles at
 * the resting framing (0.78x) the tight one is enough, and the scroll
 * camera only zooms in from there.
 */
const CLIP_TIGHT = { x: -212, y: -226, w: 1985, h: 1303 };
const clipVars = (c: typeof CLIP_TIGHT) => ({
  "--clip-x": c.x,
  "--clip-y": c.y,
  "--clip-w": c.w,
  "--clip-h": c.h,
});

const q = (root: ParentNode, sel: string) =>
  root.querySelector<HTMLElement>(sel);
const qa = (root: ParentNode, sel: string) => [
  ...root.querySelectorAll<HTMLElement>(sel),
];

export const heroAnimation: SceneAnimation = {
  id: "hero",
  build: (root, tl) => {
    const ease = "none";
    // The intro owns the outer camera; this inner one is relative to its
    // resting framing, so it starts at identity.
    const fromRest = invert(INTRO_FRAME);
    const keyframes = Array.from({ length: CAMERA_SAMPLES + 1 }, (_, i) =>
      frameVars(compose(fromRest, scrollCamera(T_AT(i / CAMERA_SAMPLES)))),
    );
    const scroll = q(root, '[data-anim="hero-fg-scroll"]');
    tl.set(scroll, { ...keyframes[0], transformOrigin: "0 0" }, 0);
    tl.to(scroll, { keyframes, duration: 1, ease }, 0);

    // The zoom layer is rasterized at the scale it last settled at; after
    // the 30x plunge that raster is far too big, and scrolling back up would
    // leave the scene half-drawn. Crossing these points (either way), drop
    // the layer for one frame so it's rebuilt at the current scale: at the
    // door crop (2.12x) and again near the resting size (~1x).
    REBUILD_AT.forEach((at) => tl.call(() => rebuildLayer(scroll), [], at));

    // The title and sponsors fade as soon as the camera starts moving.
    tl.to(
      q(root, '[data-anim="hero-hud"]'),
      { opacity: 0, duration: 1.1 / T_END, ease: "power1.in" },
      0.15 / T_END,
    );
    // The doorway is full bleed by T ~9.97; then hand off on the exit color.
    tl.fromTo(
      q(root, '[data-anim="hero-exit"]'),
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 1 - 9.97 / T_END,
        ease,
        immediateRender: false,
      },
      9.97 / T_END,
    );
  },
};

// ------------------------------------------------------------------- intro

const orbit = (phase: number) => ({
  x: 1415 * phase,
  y: -140 * Math.sin(Math.PI * phase) + 300 * phase ** 3,
});

/**
 * The day-to-night intro as a paused timeline (real seconds, ~6.6s).
 * Also puts every element in its t=0 state, which matches `hero.css`.
 */
export function createHeroIntro(root: HTMLElement) {
  const el = (sel: string) => q(root, sel);
  const all = (sel: string) => qa(root, sel);
  const fit = el(".hero-fit");
  /** One design px in CSS px right now (for filters and px offsets). */
  const k = (fit?.offsetWidth ?? W) / W;

  const viewport = el('[data-anim="hero-viewport"]') ?? root;
  const fg = el('[data-anim="hero-fg"]');
  const sky = el(".sky");
  const skyShade = el(".sky-shade");
  const starsFar = el(".star-field--far");
  const starsNear = el(".star-field--near");
  const shooting = el(".shooting-stars");
  const sun = el(".sun");
  const moon = el(".moon");
  const banner = el(".mlh-banner");
  const skylineTwilight = el(".skyline--twilight");
  const skylineNight = el(".skyline--night");
  const museumNight = el(".museum--night");
  const shadow = el(".museum-shadow");
  const grassFill = el(".grass-fill");
  const dark = (sel: string) => all(`${sel}.layer-dark`);
  const lit = (sel: string) => all(`${sel}:not(.layer-dark)`);
  const lights = all(".light-off");
  const spotLeft = el(".spotlight--left");
  const spotRight = el(".spotlight--right");
  const title = el(".event-title");
  const sponsors = el(".sponsor-lockup");

  const sunMotion = { progress: 0 };
  const moonMotion = { progress: 0 };
  const updateSun = () => {
    const p = sunMotion.progress;
    const fade = smoothstep((p - 0.84) / 0.14);
    const pos = orbit(p);
    gsap.set(sun, {
      x: pos.x * k,
      y: pos.y * k,
      opacity: 1 - fade,
      scale: 1 - 0.04 * smoothstep((p - 0.72) / 0.28),
    });
    // The museum's shadow leans away from the sun and fades as it sets.
    const lean = (756 - (154.5 + pos.x)) / 28;
    gsap.set(shadow, {
      skewX: lean,
      x: lean * 2.2 * k,
      scaleX: 1 + Math.abs(lean) / 55,
      opacity: 0.8 * (1 - fade),
    });
  };
  const updateMoon = () => {
    const p = moonMotion.progress;
    const e = smoothstep(p);
    const pos = orbit(-0.28 * (1 - e));
    gsap.set(moon, {
      x: pos.x * k,
      y: pos.y * k,
      opacity: smoothstep((p - 0.18) / 0.32),
      scale: 0.8 + 0.2 * e,
      rotation: -5 * (1 - e),
    });
  };

  // t = 0 (the same values hero.css paints before JS runs).
  gsap.set(fg, { ...frameVars(INTRO_FRAME_START), transformOrigin: "0 0" });
  gsap.set([sun, moon], { transformOrigin: "50% 50%" });
  gsap.set(shadow, { transformOrigin: "50% 0" });
  gsap.set(sun, {
    filter: `sepia(0) saturate(1) hue-rotate(0deg) drop-shadow(0 0 ${12 * k}px rgba(255, 245, 166, 0.28))`,
  });
  updateSun();
  updateMoon();
  gsap.set(title, { y: -18 * k, scale: 0.95, transformOrigin: "50% 50%" });
  gsap.set(sponsors, { y: -10 * k });
  gsap.set(banner, { y: -210 * k });
  gsap.set(lights, { y: 90 * k });
  const twins = (["bushes", "stones", "grass"] as const).map((m) => ({
    m,
    sel: { bushes: ".bushes", stones: ".staircase", grass: ".grass-hills" }[m],
  }));
  twins.forEach(({ sel }) => gsap.set(dark(sel), { opacity: 0 }));

  const intro = gsap.timeline({ paused: true, defaults: { ease: "none" } });

  // Slow camera push from 0.58x to the resting framing while day turns to night.
  intro.to(
    fg,
    { ...frameVars(INTRO_FRAME), duration: 5, ease: "power1.inOut" },
    0.2,
  );
  intro.to(
    sunMotion,
    { progress: 1, duration: 3.4, ease: "power1.inOut", onUpdate: updateSun },
    0.5,
  );
  intro.to(
    sun,
    {
      filter: `sepia(0.45) saturate(1.6) hue-rotate(-12deg) drop-shadow(0 0 ${18 * k}px rgba(255, 178, 83, 0.45))`,
      duration: 1.6,
    },
    1.7,
  );

  // Day -> twilight. Later skylines fade in over the earlier ones.
  intro
    .to(sky, { backgroundColor: "#7a9fbd", duration: 1.6 }, 0.9)
    .to(viewport, { "--backdrop-sky": "#7a9fbd", duration: 1.6 }, 0.9)
    .to(starsFar, { opacity: 0.7, duration: 1.6 }, 0.9)
    .to(starsNear, { opacity: 0.34, duration: 1.6 }, 0.9)
    .to(
      grassFill,
      { backgroundColor: GRASS_FILL.twilight, duration: 1.6 },
      0.9,
    );
  twins.forEach(({ m, sel }) =>
    intro.to(
      dark(sel),
      {
        opacity: twinAlpha(TWILIGHT_BRIGHTNESS[m], NIGHT_BRIGHTNESS[m]),
        duration: 1.6,
      },
      0.9,
    ),
  );

  // Twilight -> dusk -> night.
  intro
    .to(sky, { backgroundColor: "#5760c3", duration: 1.5 }, 2.7)
    .to(
      viewport,
      {
        "--backdrop-sky": "#5760c3",
        "--backdrop-grass": "#2d5827",
        duration: 1.5,
      },
      2.7,
    )
    .to(sky, { backgroundColor: "#0b0d21", duration: 1.4 }, 4.4)
    .to(viewport, { "--backdrop-sky": "#0b0d21", duration: 1.4 }, 4.4)
    .to(skylineNight, { opacity: 1, duration: 1.4 }, 4.4)
    .to(skyShade, { opacity: 0.1, duration: 1.5 }, 2.7)
    .to(skyShade, { opacity: 1, duration: 1.4 }, 4.4)
    .to(starsFar, { opacity: 1, duration: 1.5 }, 2.7)
    .to(starsNear, { opacity: 0.78, duration: 1.5 }, 2.7)
    .to(shooting, { opacity: 1, duration: 1.5 }, 2.7)
    .to(skylineTwilight, { opacity: 1, duration: 1.4 }, 2.7)
    .to(museumNight, { opacity: 1, duration: 1 }, 3.1)
    .to(grassFill, { backgroundColor: GRASS_FILL.night, duration: 1.5 }, 2.7)
    .to(moonMotion, { progress: 1, duration: 1.9, onUpdate: updateMoon }, 3.5);
  twins.forEach(({ sel }) => {
    intro.to(dark(sel), { opacity: 1, duration: 1.5 }, 2.7);
    // Once night has settled the originals are fully covered: stop painting
    // them and let the twins drop their compositor layers.
    intro.set(lit(sel), { visibility: "hidden" }, 4.2);
    intro.set(dark(sel), { willChange: "auto" }, 4.2);
  });

  // The ground lights pop up from behind the bushes, then flicker on.
  intro
    .set(lights, { opacity: 1 }, 5.55)
    .to(
      lights,
      { y: 0, duration: 0.5, ease: "back.out(1.5)", stagger: 0.12 },
      5.55,
    )
    .to(lights, { opacity: 0, duration: 0.08 }, 6.25)
    .to(spotLeft, { opacity: 0.78, duration: 0.06 }, 6.25)
    .to(spotLeft, { opacity: 0.12, duration: 0.05 }, 6.31)
    .to(spotLeft, { opacity: 1, duration: 0.08 }, 6.36)
    .to(spotLeft, { opacity: 0.42, duration: 0.05 }, 6.44)
    .to(spotLeft, { opacity: 1, duration: 0.12 }, 6.49)
    .to(spotRight, { opacity: 0.65, duration: 0.05 }, 6.31)
    .to(spotRight, { opacity: 0.08, duration: 0.04 }, 6.36)
    .to(spotRight, { opacity: 0.85, duration: 0.07 }, 6.4)
    .to(spotRight, { opacity: 0.24, duration: 0.04 }, 6.47)
    .to(spotRight, { opacity: 1, duration: 0.13 }, 6.51);

  // The title lands while the museum is still small; the badge unrolls
  // from behind the moon once it has settled.
  intro
    .to(
      title,
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.7)" },
      5.1,
    )
    .to(sponsors, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 5.3)
    .to(banner, { y: 0, duration: 0.85, ease: "back.out(1.3)" }, 5.45);

  // Settled: shrink the front plane's clip box and drop the intro-only
  // compositor layers, so only the camera group stays promoted.
  intro.set(
    el('[data-anim="hero-fg-clip"]'),
    clipVars(CLIP_TIGHT),
    intro.duration(),
  );
  intro.set(
    [
      fg,
      ...all(
        ".grass-fill, .grass-hills, .museum-shadow, .spotlight, .hud-intro, .event-title, .sponsor-lockup",
      ),
    ],
    { willChange: "auto" },
    intro.duration(),
  );

  return intro;
}

/** Endless background motion: drifting star fields and a few shooting stars. */
function startAmbient(root: HTMLElement) {
  const far = q(root, ".star-field--far");
  const near = q(root, ".star-field--near");
  gsap.set([far, near], { scale: 1.15, transformOrigin: "50% 50%" });
  gsap.to(far, { rotation: 360, duration: 420, repeat: -1, ease: "none" });
  gsap.to(near, { rotation: -360, duration: 300, repeat: -1, ease: "none" });

  const fit = q(root, ".hero-fit");
  const k = () => (fit?.offsetWidth ?? W) / W;
  const r = gsap.utils.random;
  qa(root, ".shooting-star").forEach((star, i) => {
    // repeatRefresh re-rolls every function-based value on each pass.
    const path = { fromX: 0, fromY: 0, angle: 0, dist: 0 };
    const roll = () => {
      path.fromX = r(120, 1250);
      path.fromY = r(40, 330);
      path.angle = r(18, 34);
      path.dist = r(240, 460);
    };
    roll();
    const rad = () => (path.angle * Math.PI) / 180;
    gsap
      .timeline({
        repeat: -1,
        repeatRefresh: true,
        delay: i * 1.7,
        onRepeat: roll,
      })
      .to({}, { duration: () => r(1.5, 7.5) })
      .set(star, {
        x: () => path.fromX * k(),
        y: () => path.fromY * k(),
        rotation: () => path.angle,
        scaleX: 0.4,
        opacity: 0,
      })
      .to(star, { opacity: 1, duration: 0.15, ease: "none" }, "<")
      .to(
        star,
        {
          x: () => (path.fromX + Math.cos(rad()) * path.dist) * k(),
          y: () => (path.fromY + Math.sin(rad()) * path.dist) * k(),
          scaleX: 1,
          duration: () => r(0.55, 0.85),
          ease: "power1.in",
        },
        "<",
      )
      .to(star, { opacity: 0, duration: 0.25, ease: "power1.out" }, ">-0.25");
  });
}

/**
 * Starts the hero on the real page: ambient motion plus the intro, which
 * plays once the page has loaded. Skips straight to night (no intro) with
 * reduced motion, on a deep link, or if the page opens already scrolled.
 * Call inside `useGSAP` so everything is reverted on unmount.
 */
export function playHeroIntro(root: HTMLElement) {
  const intro = createHeroIntro(root);
  const wide = window.matchMedia("(min-width: 640px)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!wide || reduced) {
    intro.progress(1);
    return;
  }
  startAmbient(root);
  if (window.location.hash || window.scrollY > 10) {
    intro.progress(1);
    return;
  }

  const start = () => intro.play();
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
  // Scrolling mid-sunset hurries the intro along.
  const hurry = () => {
    if (window.scrollY > 20 && intro.isActive()) intro.timeScale(3);
  };
  window.addEventListener("scroll", hurry, { passive: true });
  return () => {
    window.removeEventListener("load", start);
    window.removeEventListener("scroll", hurry);
  };
}

/**
 * For the harness's `&state=`: puts the intro at one moment
 * (`HERO_INTRO_STATES`); `&progress=` still scrubs the scroll camera.
 */
export const HERO_PREVIEW = {
  names: Object.keys(HERO_INTRO_STATES),
  // Scroll happens after the intro, so camera previews start lit.
  default: "lit",
  apply: (root: HTMLElement, state: string) => {
    const intro = createHeroIntro(root);
    const t = HERO_INTRO_STATES[state as keyof typeof HERO_INTRO_STATES] ?? 0;
    intro.time(Math.min(t, intro.duration()));
  },
};
