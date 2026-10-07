// Figma export positions (artboard px, frame-relative, clipped to the frame).
// LG 1512×982 (5597:20455), MD 1000×982 (5690:3059), SM 402×874 (5681:1281;
// 5685:18775 has identical art). The background is a CSS gradient, not a file:
// linear-gradient(180deg, #37a9c9 0%, #024354 90.8%) (Figma stop 100% sits at
// 1/1.101 of the frame height; on LG the gradient frame spans y -39..1020).
// floor.svg = baseboard strip (#017b9d) + patterned floor in one file.
// Both benches use the same bench.svg.
export const teamAssets = {
  lg: {
    floor: { src: "/team/lg/floor.svg", x: 0, y: 912, w: 1512, h: 70 },
    benchLeft: { src: "/team/lg/bench.svg", x: 220, y: 876, w: 506, h: 106 },
    benchRight: { src: "/team/lg/bench.svg", x: 786, y: 876, w: 506, h: 106 },
  },
  md: {
    floor: { src: "/team/md/floor.svg", x: 0, y: 922, w: 1000, h: 60 },
    benchLeft: { src: "/team/md/bench.svg", x: 56, y: 890, w: 416, h: 92 },
    benchRight: { src: "/team/md/bench.svg", x: 510, y: 890, w: 416, h: 92 },
  },
  sm: {
    // Flattened: baseboard + floor + single bench
    floor: { src: "/team/sm/floor.svg", x: 0, y: 770, w: 402, h: 104 },
  },
} as const;
