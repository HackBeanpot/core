import React, { ReactNode, useId } from "react";
import Image from "next/image";

export type PictureFrameVariant =
  | "copper"
  | "wood"
  | "goldBevel"
  | "silverBevel"
  | "goldMedallion"
  | "blueMedallion"
  | "greenArch"
  | "navyShield"
  | "copperRect"
  | "placeholderOval";

/** A box in the frame art's viewBox units. */
type Box = { x: number; y: number; w: number; h: number };

/** Top, right, bottom, left, in viewBox units. */
type Insets = [number, number, number, number];

/**
 * How the photo is clipped inside the opening.
 * - `rect`: no clip. The border is drawn as a 9-slice, so the frame can take any `aspect`.
 * - `ellipse`: medallions and the oval.
 * - `{ path }`: an SVG path in objectBoundingBox units (0..1) relative to the opening, e.g. the shield.
 * Shaped frames keep the art's own aspect ratio.
 */
type FrameShape = "rect" | "ellipse" | { path: string };

type FrameSpec = {
  /** Frame art exported from Figma. */
  src: string;
  viewBox: { w: number; h: number };
  /** Where the photo shows through. For a path shape, the path's bounding box. */
  opening: Box;
  shape: FrameShape;
  /**
   * Rect frames only: where to cut the 9-slice, when ornaments reach past the
   * opening (e.g. corner bolts). Defaults to the opening's edges.
   */
  slice?: Insets;
  /**
   * The opening in the art is a filled placeholder rather than a hole, so the
   * photo is drawn over the art instead of under it. Shaped frames only.
   */
  photoAbove?: boolean;
  /**
   * Figma drop shadow: offset down and to the left in viewBox units, 25% black,
   * no blur. Omitted when the frame has none or the export already includes it.
   */
  shadow?: number;
};

// Extends the photo under the border so there's no hairline gap at fractional sizes.
const BLEED = 1;

const FRAME_SPECS: Record<PictureFrameVariant, FrameSpec> = {
  goldBevel: {
    src: "/frames/goldBevel.svg",
    viewBox: { w: 202, h: 221 },
    opening: { x: 23.635, y: 23.362, w: 153.495, h: 173.676 },
    shape: "rect",
  },
  silverBevel: {
    src: "/frames/silverBevel.svg",
    viewBox: { w: 232, h: 156 },
    opening: { x: 27.294, y: 22.536, w: 177.254, h: 110.488 },
    shape: "rect",
  },
  wood: {
    src: "/frames/wood.svg",
    viewBox: { w: 318, h: 220 },
    opening: { x: 17.273, y: 28.183, w: 282.727, h: 170.909 },
    shape: "rect",
    shadow: 7.27,
  },
  copper: {
    src: "/frames/copper.svg",
    viewBox: { w: 509, h: 286 },
    opening: { x: 22.143, y: 24.155, w: 463.986, h: 237.529 },
    shape: "rect",
    // Cut outside the corner bolts, which overlap the opening.
    slice: [31.201, 29.915, 31.361, 29.188],
    shadow: 2.88,
  },
  copperRect: {
    src: "/frames/copperRect.svg",
    viewBox: { w: 172, h: 220 },
    opening: { x: 15, y: 15, w: 142, h: 190 },
    shape: "rect",
    shadow: 4.26,
  },
  greenArch: {
    src: "/frames/greenArch.svg",
    viewBox: { w: 154, h: 220 },
    opening: { x: 7.396, y: 13.867, w: 138.655, h: 193.194 },
    shape: "rect",
    shadow: 6.26,
  },
  navyShield: {
    src: "/frames/navyShield.svg",
    viewBox: { w: 181, h: 221 },
    // The inner shield (mask1 in the export), grown by BLEED so the ring hides the clip edge.
    opening: { x: 7, y: 8.765, w: 167.009, h: 203.666 },
    shape: {
      path: "M0.006 0.1031C0.006 0.1031 0.204 0.1188 0.3204 0.0859C0.396 0.0646 0.5 0.0049 0.5 0.0049C0.5 0.0049 0.6039 0.0646 0.6796 0.0859C0.796 0.1188 0.994 0.1031 0.994 0.1031V0.9133C0.994 0.9133 0.6968 0.9951 0.5 0.9951C0.3032 0.9951 0.006 0.9133 0.006 0.9133V0.1031Z",
    },
    shadow: 6.4,
  },
  placeholderOval: {
    src: "/frames/placeholderOval.svg",
    viewBox: { w: 219, h: 142 },
    // The whole export is the opening: a gray ellipse. Sized to its outermost
    // points so none of the gray shows around the photo.
    opening: { x: 0, y: 0, w: 219, h: 142 },
    shape: "ellipse",
    photoAbove: true,
  },
  goldMedallion: {
    src: "/frames/goldMedallion.svg",
    viewBox: { w: 285, h: 345 },
    // The brown placeholder circle.
    opening: { x: 20.324, y: 50.213, w: 243.893, h: 243.893 },
    shape: "ellipse",
    photoAbove: true,
    shadow: 9.56,
  },
  blueMedallion: {
    src: "/frames/blueMedallion.svg",
    viewBox: { w: 205, h: 247 },
    // The brown placeholder circle.
    opening: { x: 20.833, y: 35, w: 170, h: 170 },
    shape: "ellipse",
    photoAbove: true,
    // Shadow is baked into the export (filter0_d).
  },
};

type PictureFrameContent =
  | {
      src: string;
      alt: string;
      /** next/image `sizes`; frames top out at 500px wide. */
      sizes?: string;
      priority?: boolean;
      children?: never;
    }
  | {
      /** Logo on white, video, iframe… fills the opening. */
      children: ReactNode;
      src?: never;
      alt?: never;
      sizes?: never;
      priority?: never;
    };

export type PictureFrameProps = PictureFrameContent & {
  variant: PictureFrameVariant;
  /** Any CSS length, e.g. `u(163)`, `"240px"` or `"100%"`. */
  width: string;
  /**
   * Outer width / height, as a number or `"4 / 5"`. Defaults to the Figma
   * art's ratio. Ignored by shaped frames (medallion, shield, oval).
   */
  aspect?: number | string;
  className?: string;
  /** Classes for the opening, e.g. `bg-white` behind a logo. */
  innerClassName?: string;
};

const pct = (n: number, of: number) => `${(n / of) * 100}%`;

// Grows a box out to whole viewBox units (Figma px): top/left floor,
// right/bottom ceil, so the photo never leaves a transparent line under the art.
const toWholePixels = ({ x, y, w, h }: Box): Box => {
  const left = Math.floor(x);
  const top = Math.floor(y);
  return {
    x: left,
    y: top,
    w: Math.ceil(x + w) - left,
    h: Math.ceil(y + h) - top,
  };
};

const insetsOf = (o: Box, vb: FrameSpec["viewBox"]): Insets => [
  o.y,
  vb.w - (o.x + o.w),
  vb.h - (o.y + o.h),
  o.x,
];
const cqw = (n: number, of: number) => `${(n / of) * 100}cqw`;
// Photo box insets round down to whole pixels, so every edge snaps outward and
// a partial pixel never shows a seam between the photo and the frame.
const snap = (length: string) => `round(down, ${length}, 1px)`;

const PictureFrame = ({
  variant,
  width,
  aspect,
  className = "",
  innerClassName = "",
  ...content
}: PictureFrameProps) => {
  const clipId = useId();
  const spec = FRAME_SPECS[variant];

  const photo =
    content.src !== undefined ? (
      <Image
        src={content.src}
        alt={content.alt}
        fill
        sizes={content.sizes ?? "500px"}
        priority={content.priority}
        className="object-cover"
      />
    ) : (
      content.children
    );

  const { viewBox: vb, shape } = spec;
  const o = toWholePixels(spec.opening);

  // Shadow offsets and border widths follow the frame's width, so they're in
  // container query units. Only children of the container can use them, hence
  // the inner `layers` div.
  const filter =
    spec.shadow !== undefined
      ? `drop-shadow(-${cqw(spec.shadow, vb.w)} ${cqw(spec.shadow, vb.w)} 0 rgba(0, 0, 0, 0.25))`
      : undefined;

  const frame = (ratio: number | string, layers: ReactNode) => (
    <div
      className={`relative ${className}`}
      style={{ width, aspectRatio: ratio, containerType: "inline-size" }}
    >
      <div className="absolute inset-0" style={{ filter }}>
        {layers}
      </div>
    </div>
  );

  if (shape === "rect") {
    const opening = insetsOf(o, vb);
    // The 9-slice cuts the art itself, so it keeps the exact Figma edges.
    const slice = spec.slice ?? insetsOf(spec.opening, vb);
    const inset = (n: number) => snap(cqw(Math.max(n - BLEED, 0), vb.w));

    return frame(
      aspect ?? `${vb.w} / ${vb.h}`,
      <>
        <div
          className={`absolute overflow-hidden ${innerClassName}`}
          style={{
            top: inset(opening[0]),
            right: inset(opening[1]),
            bottom: inset(opening[2]),
            left: inset(opening[3]),
          }}
        >
          {photo}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            borderStyle: "solid",
            borderWidth: slice.map((n) => cqw(n, vb.w)).join(" "),
            borderImage: `url("${spec.src}") ${slice.join(" ")} / 1 / 0 stretch`,
          }}
        />
      </>,
    );
  }

  const svgClipId = `pf-clip-${clipId.replace(/:/g, "")}`;
  const clipPath =
    shape === "ellipse" ? "ellipse(50% 50% at 50% 50%)" : `url(#${svgClipId})`;

  const art = (
    <Image
      src={spec.src}
      alt=""
      aria-hidden
      fill
      unoptimized
      className="pointer-events-none"
    />
  );

  return frame(
    `${vb.w} / ${vb.h}`,
    <>
      {spec.photoAbove && art}
      {typeof shape === "object" && (
        // Not display:none, or Safari and Firefox drop the clipPath.
        <svg aria-hidden width="0" height="0" className="absolute">
          <clipPath id={svgClipId} clipPathUnits="objectBoundingBox">
            <path d={shape.path} />
          </clipPath>
        </svg>
      )}
      <div
        className={`absolute overflow-hidden ${innerClassName}`}
        style={{
          top: snap(pct(o.y, vb.h)),
          right: snap(pct(vb.w - (o.x + o.w), vb.w)),
          bottom: snap(pct(vb.h - (o.y + o.h), vb.h)),
          left: snap(pct(o.x, vb.w)),
          clipPath,
        }}
      >
        {photo}
      </div>
      {!spec.photoAbove && art}
    </>,
  );
};

export default PictureFrame;
