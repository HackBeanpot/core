// Boxes are px relative to the artboard's top-left at each breakpoint

// corridor-*: apply the 0.4 once, on a wrapper around all three layers, not per layer
export const positions = {
  lg: {
    artboard: { w: 1512, h: 982 },
    "corridor-far": { x: 361.8, y: 154.9, w: 788.8, h: 897.1, opacity: 0.4 },
    "corridor-mid": { x: 474.9, y: 457.4, w: 559.9, h: 506.5, opacity: 0.4 },
    "corridor-near": { x: -427, y: 148, w: 2366.5, h: 904, opacity: 0.4 },
    "footprint-pair": { x: 775.7, y: 854.8, w: 51.2, h: 44.8, opacity: 0.5 },
  },
  md: {
    artboard: { w: 1000, h: 982 },
    "corridor-far": { x: 105.8, y: 144.9, w: 788.8, h: 897.1, opacity: 0.4 },
    "corridor-mid": { x: 218.9, y: 447.4, w: 559.9, h: 506.5, opacity: 0.4 },
    "corridor-near": { x: -683, y: 138, w: 2366.5, h: 904, opacity: 0.4 },
    "footprint-pair": { x: 509.7, y: 842.8, w: 51.2, h: 44.8, opacity: 0.5 },
  },
  sm: {
    artboard: { w: 402, h: 874 },
  },
} as const;
