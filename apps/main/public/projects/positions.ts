// Figma export positions (artboard px, frame-relative, clipped to the frame).
// LG 1512×982 (5597:21587), MD 1000×982 (5687:2813), SM 402×874 (5615:26385).
// Listed bottom → top in Figma stacking order. Not exported (use CSS, values in the PR):
// - base: linear-gradient(#060825 → #602a80) behind everything (SM: #73678d → #352f5a)
// - doorway lighting: two gradient rects between ropeStanchions and doorwayFog (Rectangle 1327/1326)
// - lighting overlay: full-frame #ffe5b2 → #32127c, opacity 0.2, color-burn, topmost
export const projectsAssets = {
  lg: {
    doorwayPlinth: {
      src: "/projects/lg/doorway-plinth.svg",
      x: 0,
      y: 880,
      w: 715,
      h: 93,
    },
    dinosaur: {
      src: "/projects/lg/dinosaur.svg",
      x: 226,
      y: 185,
      w: 878,
      h: 797,
    },
    ropeStanchions: {
      src: "/projects/lg/rope-stanchions.svg",
      x: 0,
      y: 865,
      w: 652,
      h: 117,
    },
    doorwayFog: {
      src: "/projects/lg/doorway-fog.svg",
      x: 0,
      y: 185,
      w: 1104,
      h: 797,
    },
    wall: { src: "/projects/lg/wall.svg", x: 0, y: 0, w: 1512, h: 982 },
    archLeft: {
      src: "/projects/lg/arch-left.svg",
      x: 0,
      y: 231,
      w: 289,
      h: 751,
    },
    archRight: {
      src: "/projects/lg/arch-right.svg",
      x: 192,
      y: 231,
      w: 550,
      h: 751,
    },
    ceilingStrip: {
      src: "/projects/lg/ceiling-strip.svg",
      x: 0,
      y: 0,
      w: 1512,
      h: 118,
    },
    externalLink: {
      src: "/projects/lg/external-link.svg",
      x: 939,
      y: 565,
      w: 20,
      h: 20,
    },
  },
  md: {
    doorwayPlinth: {
      src: "/projects/md/doorway-plinth.svg",
      x: 0,
      y: 880,
      w: 502,
      h: 93,
    },
    dinosaur: {
      src: "/projects/md/dinosaur.svg",
      x: 13,
      y: 185,
      w: 878,
      h: 797,
    },
    ropeStanchions: {
      src: "/projects/md/rope-stanchions.svg",
      x: 0,
      y: 865,
      w: 439,
      h: 117,
    },
    doorwayFog: {
      src: "/projects/md/doorway-fog.svg",
      x: 0,
      y: 185,
      w: 891,
      h: 797,
    },
    wall: { src: "/projects/md/wall.svg", x: 0, y: 0, w: 1000, h: 982 },
    archLeft: {
      src: "/projects/md/arch-left.svg",
      x: 0,
      y: 231,
      w: 77,
      h: 751,
    },
    archRight: {
      src: "/projects/md/arch-right.svg",
      x: 0,
      y: 231,
      w: 530,
      h: 751,
    },
    ceilingStrip: {
      src: "/projects/md/ceiling-strip.svg",
      x: 0,
      y: 0,
      w: 1000,
      h: 118,
    },
    externalLink: {
      src: "/projects/md/external-link.svg",
      x: 653,
      y: 480,
      w: 20,
      h: 20,
    },
  },
  sm: {
    background: {
      src: "/projects/sm/background.webp",
      x: 0,
      y: 0,
      w: 402,
      h: 874,
    },
    externalLink: {
      src: "/projects/sm/external-link.svg",
      x: 122,
      y: 324,
      w: 20,
      h: 20,
    },
  },
} as const;
