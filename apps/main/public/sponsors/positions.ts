// Figma export positions (artboard px, frame-relative, clipped to the frame).
// LG 1512×982 (5597:19671), MD 1000×982 (5687:3854), SM 402×874 (5615:28693).
// LG/MD files are artboard-sized canvases with the art in place, so every
// layer sits at 0,0 and stacks in this order (first = bottom). `blend` is CSS
// the builder must put on the <img> (blends inside a file don't reach other
// files). SM is one flattened background.
const lg = { x: 0, y: 0, w: 1512, h: 982 } as const;
const md = { x: 0, y: 0, w: 1000, h: 982 } as const;

export const sponsorsAssets = {
  lg: {
    hallBackground: { src: "/sponsors/lg/hall-background.svg", ...lg },
    windows: { src: "/sponsors/lg/windows.svg", ...lg }, // art bbox 232,521 1046×389
    statues: { src: "/sponsors/lg/statues.svg", ...lg }, // masked to the window panes
    pillars: { src: "/sponsors/lg/pillars.svg", ...lg }, // marble columns, frieze, plinths
    vignette: { src: "/sponsors/lg/vignette.svg", ...lg },
    glow: { src: "/sponsors/lg/glow.svg", ...lg, blend: "plus-lighter" },
  },
  md: {
    hallBackground: { src: "/sponsors/md/hall-background.svg", ...md },
    windows: { src: "/sponsors/md/windows.svg", ...md }, // art bbox 2,495 994×370
    statues: { src: "/sponsors/md/statues.svg", ...md },
    pillars: { src: "/sponsors/md/pillars.svg", ...md },
    vignette: { src: "/sponsors/md/vignette.svg", ...md },
    glow: { src: "/sponsors/md/glow.svg", ...md, blend: "plus-lighter" },
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
