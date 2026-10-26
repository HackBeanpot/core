// Figma export positions (artboard px, frame-relative, clipped to the frame).
// LG 1512×982 (5597:19671), MD 1000×982 (5687:3854), SM 402×874 (5615:28693).
// LG/MD are the frame's whole "bg image" group (LG 5597:19672, MD 5687:3855)
// exported flat at 2x. The marble pillars rely on Figma blend modes that
// browsers can't reproduce from a layered SVG export, so don't split it.
// `edge` is the left/right edge colour top to bottom, for the viewport bleed.
// SM is one flattened background.
export const sponsorsAssets = {
  lg: {
    background: {
      src: "/sponsors/lg/background.webp",
      x: 0,
      y: 0,
      w: 1512,
      h: 982,
    },
    edge: [
      "#2a315f",
      "#1d234c",
      "#1b1f44",
      "#191d3e",
      "#181a38",
      "#151733",
      "#10122d",
      "#0d0f2a",
    ],
  },
  md: {
    background: {
      src: "/sponsors/md/background.webp",
      x: 0,
      y: 0,
      w: 1000,
      h: 982,
    },
    edge: [
      "#272e5b",
      "#212449",
      "#252544",
      "#343245",
      "#433c49",
      "#433a45",
      "#322c3c",
      "#1e1b31",
    ],
  },
  sm: {
    background: {
      src: "/sponsors/sm/background.svg",
      x: 0,
      y: 0,
      w: 402,
      h: 874,
    },
  },
} as const;
