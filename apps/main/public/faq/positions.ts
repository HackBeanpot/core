// Figma export positions (artboard px, frame-relative, clipped to the frame).
// LG 1512×2029 (5597:20877), MD 1000×2050 (5690:4737), SM 402×1943 (5615:30055).
// Listed bottom → top in Figma layer order. Each SVG's viewBox already uses
// these frame coordinates, so x/y/w/h can be used directly for absolute layout.
export const faqAssets = {
  lg: {
    pterodactyl: {
      src: "/faq/lg/pterodactyl.svg",
      x: 0,
      y: 825,
      w: 1125,
      h: 950,
    },
    pterodactylBack: {
      src: "/faq/lg/pterodactyl-back.svg",
      x: 0,
      y: 1216,
      w: 755,
      h: 577,
    },
    dinoSkeleton: {
      src: "/faq/lg/dino-skeleton.svg",
      x: 0,
      y: 1399,
      w: 776,
      h: 630,
    },
    eyeGlow: { src: "/faq/lg/eye-glow.svg", x: 654, y: 1363, w: 63, h: 63 },
    beam1: { src: "/faq/lg/beam-1.svg", x: 0, y: 729, w: 866, h: 1099 },
    beam2: { src: "/faq/lg/beam-2.svg", x: 0, y: 688, w: 417, h: 1145 },
    beam3: { src: "/faq/lg/beam-3.svg", x: 0, y: 771, w: 994, h: 759 },
    ribbon: { src: "/faq/lg/ribbon.svg", x: 597, y: 1463, w: 915, h: 356 },
    sparkles: { src: "/faq/lg/sparkles.svg", x: 1115, y: 1533, w: 376, h: 258 },
  },
  md: {
    pterodactyl: {
      src: "/faq/md/pterodactyl.svg",
      x: 0,
      y: 1130,
      w: 776,
      h: 679,
    },
    pterodactylBack: {
      src: "/faq/md/pterodactyl-back.svg",
      x: 0,
      y: 1409,
      w: 512,
      h: 413,
    },
    dinoSkeleton: {
      src: "/faq/md/dino-skeleton.svg",
      x: 0,
      y: 1540,
      w: 527,
      h: 510,
    },
    eyeGlow: { src: "/faq/md/eye-glow.svg", x: 439, y: 1514, w: 45, h: 46 },
    beam1: { src: "/faq/md/beam-1.svg", x: 0, y: 1061, w: 591, h: 786 },
    beam2: { src: "/faq/md/beam-2.svg", x: 0, y: 1032, w: 270, h: 819 },
    beam3: { src: "/faq/md/beam-3.svg", x: 0, y: 1091, w: 682, h: 543 },
    ribbon: { src: "/faq/md/ribbon.svg", x: 399, y: 1586, w: 601, h: 255 },
    sparkles: { src: "/faq/md/sparkles.svg", x: 769, y: 1636, w: 217, h: 185 },
  },
  sm: {
    // Flattened: skeletons, beams, eye glow, ribbon + sparkles (SM is static).
    sock: { src: "/faq/sm/sock.svg", x: 0, y: 1152, w: 402, h: 751 },
  },
  // Accordion icons, identical at every size (20×20, white).
  icons: { plus: "/faq/plus.svg", minus: "/faq/minus.svg" },
} as const;
