/**
 * Hero layers and how each one looks in every LG state (MS-103).
 *
 * Figma: Day `5615:70522`, Dusk `5597:839`, Night `5597:5431`,
 * Title `5597:8846`, Zoom `5597:12280`; MD `5691:35814` (Day), `5691:42665`
 * (Title); SM `5615:22626`.
 *
 * Every SVG layer and component is a full `HERO_CANVAS` (1512x1024) with its
 * art in place, so stacking them in `HERO_LAYERS` order reproduces a frame.
 * Per-state changes are a transform, opacity, visibility and CSS-variable
 * colors; nothing is re-exported per state.
 *
 * Transforms are `Affine`s in artboard px: p' = scale * p + (x, y), with the
 * origin at the artboard's top-left. Put them on a wrapper the size of
 * `HERO_CANVAS` (in `--u`, top-left aligned) via `affineToCss`, never on the
 * art itself, so layers with their own position (rects, text) scale about the
 * same origin. On MD the same wrapper stays 1512 wide and the transform maps
 * it onto the 1000-wide artboard.
 *
 * Exported layers live in `public/hero/lg/`; the four whose colors change
 * are components in `./assets/`. SM is static: one image, `public/hero/sm/hero.webp`
 * (sky + moon + scene; title, tagline, logos and badge stay live on top).
 */

export const HERO_STATES = ["day", "dusk", "night", "title", "zoom"] as const;
export type HeroState = (typeof HERO_STATES)[number];

export type Affine = { x: number; y: number; scale: number };
export type Rect = { x: number; y: number; w: number; h: number };

const IDENTITY: Affine = { x: 0, y: 0, scale: 1 };

/** a ∘ b: apply `b`, then `a`. */
export const compose = (a: Affine, b: Affine): Affine => ({
  scale: a.scale * b.scale,
  x: a.scale * b.x + a.x,
  y: a.scale * b.y + a.y,
});

export const invert = (a: Affine): Affine => ({
  scale: 1 / a.scale,
  x: -a.x / a.scale,
  y: -a.y / a.scale,
});

const translate = (x: number, y: number): Affine => ({ x, y, scale: 1 });

/** Scale about a point (artboard px). */
const scaleAbout = (
  origin: { x: number; y: number },
  scale: number,
): Affine => ({
  scale,
  x: origin.x * (1 - scale),
  y: origin.y * (1 - scale),
});

/**
 * Every layer's canvas: the 1512x982 LG artboard plus 42px below it, which MD
 * shows once it scales the scene down. Wrappers are this size, top-left aligned.
 */
export const HERO_CANVAS = { w: 1512, h: 1024 } as const;

/** CSS for a layer's LG-canvas wrapper. Needs `--u` (see `lib/scroll/units.ts`). */
export const affineToCss = ({ x, y, scale }: Affine) =>
  `translate(calc(${x} * var(--u)), calc(${y} * var(--u))) scale(${scale})`;

/**
 * The door the Zoom state flies into, and that zoom: everything except the
 * sky scales by 2.1194 about (774.9, 574.2). Measured from five layer pairs
 * in Title `5597:8846` vs. Zoom `5597:12280` (all agree to 0.1px). The door
 * itself is baked into `museum.svg`.
 */
export const HERO_DOOR: Rect = { x: 713.81, y: 527.742, w: 84.294, h: 138.974 };
export const HERO_ZOOM = {
  origin: { x: 774.9, y: 574.2 },
  scale: 2.1194,
} as const;
const ZOOM = scaleAbout(HERO_ZOOM.origin, HERO_ZOOM.scale);

/** Frame fill per state; animate it as a CSS color, not an image. */
export const HERO_SKY: Record<HeroState, string> = {
  day: "#AEDFE3",
  dusk: "#7A9FBD",
  night: "#5760C3",
  title: "#0B0D21",
  zoom: "#0B0D21",
};

/**
 * - `sky`: never zooms (the sky is unscaled in Zoom).
 * - `ground`: the museum and everything in front of it; zooms into the door.
 * - `ui`: the title block and badge; only shown in Night/Title.
 */
export type HeroGroup = "sky" | "ground" | "ui";

export type HeroColorVar =
  | "--hero-skyline-light"
  | "--hero-skyline-dark"
  | "--hero-sun-glow"
  | "--hero-lens-outer"
  | "--hero-lens-inner"
  | "--hero-lens-rim";

export type LayerState = {
  visible: boolean;
  opacity: number;
  /** Already includes the Zoom state's scale for `ground` layers. */
  transform: Affine;
  /** Fill for `rect` layers. */
  fill?: string;
  /** Alpha at the end of the `gradient` layer. */
  alpha?: number;
  colors?: Partial<Record<HeroColorVar, string>>;
};

export type HeroLayerSource =
  | { kind: "svg"; src: string }
  | { kind: "image"; src: string; rect: Rect; alt: string }
  | {
      kind: "component";
      component: "Skyline" | "Sun" | "SpotlightLeft" | "SpotlightRight";
    }
  | { kind: "rect"; rect: Rect }
  | {
      /** `color` fading in from `from` to `to` (artboard y), over `rect`. */
      kind: "gradient";
      rect: Rect;
      color: string;
      from: number;
      to: number;
    }
  | {
      kind: "text";
      text: string;
      rect: Rect;
      font: "amarante" | "gothic";
      size: number;
      align: "left" | "center";
    };

export type HeroLayer = HeroLayerSource & {
  group: HeroGroup;
  states: Record<HeroState, LayerState>;
};

// ---------------------------------------------------------------- builders

type StateInput = Partial<Omit<LayerState, "transform">> & {
  transform?: Affine;
};

/** Fills every state from `base`, then applies per-state overrides. */
const states = (
  base: StateInput,
  per: Partial<Record<HeroState, StateInput>> = {},
  group: HeroGroup = "ground",
): Record<HeroState, LayerState> => {
  const out = {} as Record<HeroState, LayerState>;
  for (const s of HERO_STATES) {
    const merged = { visible: true, opacity: 1, ...base, ...per[s] };
    const transform = merged.transform ?? IDENTITY;
    out[s] = {
      ...merged,
      // Ground layers zoom in the Zoom state on top of their own transform.
      transform:
        group === "ground" && s === "zoom"
          ? compose(ZOOM, transform)
          : transform,
    };
  }
  return out;
};

const only = (shown: HeroState[]): Partial<Record<HeroState, StateInput>> =>
  Object.fromEntries(
    HERO_STATES.map((s) => [s, { visible: shown.includes(s) }]),
  );

const svg = (name: string) => ({
  kind: "svg" as const,
  src: `/hero/lg/${name}.svg`,
});

const ground = (
  name: string,
  per?: Partial<Record<HeroState, StateInput>>,
): HeroLayer => ({
  ...svg(name),
  group: "ground",
  states: states({}, per),
});

// Measured offsets (Figma, artboard px).
const SUN_AT: Record<"day" | "dusk" | "night", Affine> = {
  day: IDENTITY,
  dusk: translate(277, -45),
  night: translate(1065, 4),
};
// Night/Title/Zoom skyline: Day's shape scaled 1.0474 (bounds -441.404,83.168
// 2223.405x559.021 -> -494.082,83.168 2328.76x585.51).
const SKYLINE_NIGHT: Affine = { scale: 1.0473846, x: -31.7626, y: -3.9407 };
// The fixtures are drawn raised (Night/Title); Day and Dusk lower them
// behind the bushes.
const SPOT_LEFT_DOWN = translate(0, 111.004);
const SPOT_RIGHT_DOWN = translate(0, 88.017);

const LIT = {
  "--hero-lens-outer": "#FDEBCC",
  "--hero-lens-inner": "#FDFBFB",
} as const;

/** Back to front. */
export const HERO_LAYERS = {
  stars: {
    ...svg("stars"),
    group: "sky",
    // Dusk `5597:841`; the frame's other streaks sit behind the museum.
    states: states(
      { opacity: 0.27 },
      { day: { visible: false, opacity: 0 } },
      "sky",
    ),
  },
  shootingStar: {
    ...svg("shootingStar"),
    group: "sky",
    // One streak of the star field, split out so it can be animated.
    states: states(
      { opacity: 0.27 },
      { day: { visible: false, opacity: 0 } },
      "sky",
    ),
  },
  sun: {
    kind: "component",
    component: "Sun",
    group: "sky",
    // Night reuses the sun as the yellow moon. Figma draws it under the stars
    // at Night; here it stays above them (stars are 27% opacity).
    states: states(
      { colors: { "--hero-sun-glow": "#FEF5D1" } },
      {
        day: { transform: SUN_AT.day },
        dusk: { transform: SUN_AT.dusk },
        night: {
          transform: SUN_AT.night,
          colors: { "--hero-sun-glow": "#FFF9B9" },
        },
        title: {
          visible: false,
          transform: SUN_AT.night,
          colors: { "--hero-sun-glow": "#FFF9B9" },
        },
        zoom: {
          visible: false,
          transform: SUN_AT.night,
          colors: { "--hero-sun-glow": "#FFF9B9" },
        },
      },
      "sky",
    ),
  },
  hbpMoon: {
    ...svg("hbpMoon"),
    group: "sky",
    states: states({}, only(["title", "zoom"]), "sky"),
  },
  skyTint: {
    kind: "gradient",
    group: "sky",
    rect: { x: -174.164, y: -90.674, w: 1757.737, h: 1046.674 },
    color: "#090912",
    from: 38.2193,
    to: 314.641,
    // Title hides the tint; Zoom makes it solid below `to`.
    states: states(
      {},
      {
        day: { alpha: 0.02 },
        dusk: { alpha: 0.02 },
        night: { alpha: 0.1 },
        title: { visible: false, alpha: 1 },
        zoom: { alpha: 1 },
      },
      "sky",
    ),
  },
  skyline: {
    kind: "component",
    component: "Skyline",
    group: "sky",
    states: states(
      {},
      {
        day: {
          colors: {
            "--hero-skyline-light": "#37A9C9",
            "--hero-skyline-dark": "#017B9D",
          },
        },
        dusk: {
          colors: {
            "--hero-skyline-light": "#37A9C9",
            "--hero-skyline-dark": "#017B9D",
          },
        },
        night: {
          transform: SKYLINE_NIGHT,
          colors: {
            "--hero-skyline-light": "#7171CB",
            "--hero-skyline-dark": "#5458A1",
          },
        },
        title: {
          transform: SKYLINE_NIGHT,
          colors: {
            "--hero-skyline-light": "#121223",
            "--hero-skyline-dark": "#24253B",
          },
        },
        zoom: {
          transform: SKYLINE_NIGHT,
          colors: {
            "--hero-skyline-light": "#121223",
            "--hero-skyline-dark": "#24253B",
          },
        },
      },
      "sky",
    ),
  },
  lawnBack: {
    kind: "rect",
    rect: { x: 0, y: 609, w: 1512, h: 283 },
    group: "ground",
    states: states(
      {},
      {
        day: { fill: "#67BF5A" },
        dusk: { fill: "#67BF5A" },
        night: { fill: "#59A14E" },
        title: { fill: "#2D5827" },
        zoom: { fill: "#2D5827" },
      },
    ),
  },
  /** Wings, side blocks, back wall + door, windows. The door is `HERO_DOOR`. */
  museum: ground("museum"),
  /** In the right window; includes the two window bars drawn over it. */
  statueSilhouette: ground("statueSilhouette", only(["title", "zoom"])),
  /** "HBP" banner. The letters are outlined: they're clipped by the banner's mask. */
  bannerHBP: ground("bannerHBP"),
  /** "2027" banner, outlined like `bannerHBP`. */
  banner2027: ground("banner2027"),
  /** Pillars and pediment, which sit in front of the banners. */
  museumFront: ground("museumFront"),
  bushes3: ground("bushes3"),
  bushes4: ground("bushes4"),
  stairsBack: ground("stairsBack"),
  spotlightLeft: {
    kind: "component",
    component: "SpotlightLeft",
    group: "ground",
    states: states(
      {},
      {
        day: { transform: SPOT_LEFT_DOWN },
        dusk: { transform: SPOT_LEFT_DOWN },
        title: { colors: LIT },
        zoom: { colors: LIT },
      },
    ),
  },
  /** Exported from Title, at the raised position like the fixture. */
  beamLeft: ground("beamLeft", only(["title", "zoom"])),
  bushes2: ground("bushes2"),
  lawnFront: {
    kind: "rect",
    rect: { x: 0, y: 846, w: 1512, h: 283 },
    group: "ground",
    states: states(
      {},
      {
        day: { fill: "#579C4D" },
        dusk: { fill: "#579C4D" },
        night: { fill: "#488140" },
        title: { fill: "#062D00" },
        zoom: { fill: "#062D00" },
      },
    ),
  },
  spotlightRight: {
    kind: "component",
    component: "SpotlightRight",
    group: "ground",
    states: states(
      {},
      {
        day: { transform: SPOT_RIGHT_DOWN },
        dusk: { transform: SPOT_RIGHT_DOWN },
        title: { colors: { ...LIT, "--hero-lens-rim": "#090912" } },
        zoom: { colors: { ...LIT, "--hero-lens-rim": "#090912" } },
      },
    ),
  },
  beamRight: ground("beamRight", only(["title", "zoom"])),
  bushes1: ground("bushes1"),
  stairsFront: ground("stairsFront"),
  /** Raster from MLH (flagged to Cole). Not in Zoom. */
  mlhBadge: {
    kind: "image",
    src: "/hero/lg/mlhBadge.webp",
    alt: "Major League Hacking 2025 Season official member event",
    rect: { x: 1279, y: -5, w: 116, h: 204.318 },
    group: "ui",
    states: states({}, only(["night", "title"]), "ui"),
  },
  /** MD only: the white tab joining the moon to the badge (`Rectangle 1346`). */
  mlhBadgeTab: {
    kind: "rect",
    // LG coordinates under the MD badge transform; see HERO_MD.
    rect: { x: 1283.5, y: -64.12, w: 106.29, h: 59.13 },
    group: "ui",
    states: states({ visible: false, fill: "#F7F7F7" }, {}, "ui"),
  },
  /** MD only: the moon moves onto the badge, drawn above it and its tab. */
  badgeMoon: {
    ...svg("hbpMoon"),
    group: "ui",
    states: states({ visible: false }, {}, "ui"),
  },
  heroTitle: {
    kind: "text",
    text: "HACKBEANPOT",
    rect: { x: 559, y: 21, w: 395, h: 80 },
    font: "amarante",
    size: 64,
    align: "left",
    group: "ui",
    states: states({}, only(["title"]), "ui"),
  },
  heroTagline: {
    kind: "text",
    text: "Brought to you by",
    rect: { x: 619, y: 106, w: 127, h: 29 },
    font: "gothic",
    size: 22,
    align: "center",
    group: "ui",
    states: states({}, only(["title"]), "ui"),
  },
  /** Raster (flagged to Cole: the source was 2560px wide for a 55px slot). */
  amazonLogo: {
    kind: "image",
    src: "/hero/lg/amazon.webp",
    alt: "amazon",
    rect: { x: 755, y: 115, w: 54.841, h: 16.559 },
    group: "ui",
    states: states({}, only(["title"]), "ui"),
  },
  /** Raster (flagged to Cole). */
  mavenLogo: {
    kind: "image",
    src: "/hero/lg/maven.webp",
    alt: "Maven AGI",
    rect: { x: 819.841, y: 115, w: 73.84, h: 12.389 },
    group: "ui",
    states: states({}, only(["title"]), "ui"),
  },
} satisfies Record<string, HeroLayer>;

export type HeroLayerId = keyof typeof HERO_LAYERS;

// ---------------------------------------------------------------------- MD

/**
 * MD (1000x982) isn't a crop: Figma places the LG art with one transform per
 * group, plus a few layers that moved on their own. MD only has Day and Title
 * frames; Dusk/Night/Zoom follow from the same transforms.
 */
const MD_GROUND: Affine = { scale: 0.900939, x: -180.35, y: 64.93 };
// Day skyline bounds in MD: -569,105 2003.15x503.64, in every state.
const MD_SKYLINE: Affine = { scale: 0.900938, x: -171.323, y: 30.071 };
const MD_BADGE: Affine = { scale: 0.71034, x: -858.24, y: 159.55 };
const MD_SPOT_LEFT_LIT = translate(-187, -20);
const MD_SPOT_RIGHT_LIT = translate(-311, -32.98);

const perState = (
  fn: (s: HeroState) => Affine | undefined,
): Partial<Record<HeroState, Affine>> =>
  Object.fromEntries(HERO_STATES.flatMap((s) => (fn(s) ? [[s, fn(s)]] : [])));

const lit = (s: HeroState) => s === "title" || s === "zoom";

export const HERO_MD = {
  artboard: { w: 1000, h: 982 },
  groups: {
    sky: translate(-27, 152),
    ground: MD_GROUND,
    ui: translate(-259, 63),
  } satisfies Record<HeroGroup, Affine>,
  /**
   * Replaces the group transform for these layers (still applied after the
   * layer's own LG state transform).
   */
  layerGroups: {
    sun: perState(() => ({ scale: 0.900886, x: -47.61, y: 64.93 })),
    // MD keeps the Day skyline box in every state, so undo the LG night scale.
    skyline: perState((s) =>
      s === "day" || s === "dusk"
        ? MD_SKYLINE
        : compose(MD_SKYLINE, invert(SKYLINE_NIGHT)),
    ),
    // Moon on the badge: 119px -> 76.16px at (53, 78.8).
    badgeMoon: perState(() => ({ scale: 0.64, x: -27, y: 32.72 })),
    // The sky drops 152px on MD, but the LG export has no stars above the
    // frame, so the star field only shifts sideways.
    stars: perState(() => translate(-27, 0)),
    shootingStar: perState(() => translate(-27, 0)),
    mlhBadge: perState(() => MD_BADGE),
    mlhBadgeTab: perState(() => MD_BADGE),
    // Lit fixtures and beams were pasted in at LG size in MD Title.
    spotlightLeft: perState((s) => (lit(s) ? MD_SPOT_LEFT_LIT : undefined)),
    beamLeft: perState((s) => (lit(s) ? MD_SPOT_LEFT_LIT : undefined)),
    spotlightRight: perState((s) => (lit(s) ? MD_SPOT_RIGHT_LIT : undefined)),
    beamRight: perState((s) => (lit(s) ? MD_SPOT_RIGHT_LIT : undefined)),
  } satisfies Partial<Record<HeroLayerId, Partial<Record<HeroState, Affine>>>>,
  /** MD-only visibility. */
  visible: {
    // In MD the moon sits on top of the badge from Night on.
    mlhBadgeTab: { night: true, title: true },
    hbpMoon: { title: false, zoom: false },
    badgeMoon: { title: true },
    // MD Title has no statue in the window (asked Cole whether that's intended).
    statueSilhouette: { title: false, zoom: false },
  } satisfies Partial<Record<HeroLayerId, Partial<Record<HeroState, boolean>>>>,
  /** MD-only opacity, in every state. */
  opacity: {
    mlhBadge: 0.9,
    mlhBadgeTab: 0.9,
  } satisfies Partial<Record<HeroLayerId, number>>,
  /** MD-only colors. */
  colors: {
    // MD Title swaps the skyline's two night colors.
    skyline: {
      title: {
        "--hero-skyline-light": "#24253B",
        "--hero-skyline-dark": "#121223",
      },
      zoom: {
        "--hero-skyline-light": "#24253B",
        "--hero-skyline-dark": "#121223",
      },
    },
  } satisfies Partial<
    Record<HeroLayerId, Partial<Record<HeroState, LayerState["colors"]>>>
  >,
} as const;

/** The door's zoom origin on MD. */
export const HERO_MD_ZOOM_ORIGIN = {
  x: MD_GROUND.scale * HERO_ZOOM.origin.x + MD_GROUND.x,
  y: MD_GROUND.scale * HERO_ZOOM.origin.y + MD_GROUND.y,
};

/** A layer's resolved state at a breakpoint. */
export function heroLayerState(
  id: HeroLayerId,
  state: HeroState,
  breakpoint: "lg" | "md" = "lg",
): LayerState {
  const layer: HeroLayer = HERO_LAYERS[id];
  const lg = layer.states[state];
  if (breakpoint === "lg") return lg;

  const groups: Partial<
    Record<HeroLayerId, Partial<Record<HeroState, Affine>>>
  > = HERO_MD.layerGroups;
  const visible: Partial<
    Record<HeroLayerId, Partial<Record<HeroState, boolean>>>
  > = HERO_MD.visible;
  const colors: Partial<
    Record<HeroLayerId, Partial<Record<HeroState, LayerState["colors"]>>>
  > = HERO_MD.colors;
  const group = groups[id]?.[state] ?? HERO_MD.groups[layer.group];
  return {
    ...lg,
    visible: visible[id]?.[state] ?? lg.visible,
    opacity:
      (HERO_MD.opacity as Partial<Record<HeroLayerId, number>>)[id] ??
      lg.opacity,
    colors: colors[id]?.[state] ?? lg.colors,
    transform: compose(group, lg.transform),
  };
}

// ---------------------------------------------------------------------- SM

/** SM is static (no states). Positions in the 402x874 artboard. */
export const HERO_SM = {
  artboard: { w: 402, h: 874 },
  /** Sky, moon and scene flattened, @2x. Everything below stays live on top. */
  background: "/hero/sm/hero.webp",
  title: {
    text: "HACKBEANPOT",
    rect: { x: 25, y: 181, w: 351, h: 71 },
    font: "amarante",
    size: 56.913,
  },
  tagline: {
    text: "Brought to you by",
    rect: { x: 60, y: 254.34, w: 131, h: 29 },
    font: "gothic",
    size: 22.645,
  },
  amazonLogo: {
    src: "/hero/lg/amazon.webp",
    rect: { x: 199.99, y: 263.61, w: 56.45, h: 17.05 },
  },
  mavenLogo: {
    src: "/hero/lg/maven.webp",
    rect: { x: 266.73, y: 263.61, w: 76.01, h: 12.75 },
  },
  badge: {
    src: "/hero/lg/mlhBadge.webp",
    rect: { x: 15, y: -2, w: 82.4, h: 146.4 },
  },
} as const;
