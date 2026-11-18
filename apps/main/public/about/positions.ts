// Boxes are px relative to the artboard's top-left at each breakpoint
export const positions = {
  lg: {
    artboard: { w: 1512, h: 982 },
    "cloud-top-1": { x: -177, y: -88, w: 688, h: 359.9 },
    "cloud-top-2": { x: -419, y: -139, w: 808.6, h: 423 },
    "cloud-bottom-1": { x: 470, y: 427, w: 1173.6, h: 1191.6 },
    "cloud-bottom-2": { x: 987, y: 476, w: 927, h: 941.3 },
    "candle-1": { x: -83, y: 427, w: 380, h: 619.5 },
    "candle-2": { x: 14, y: 547, w: 380, h: 619.5 },
  },
  md: {
    artboard: { w: 1000, h: 982 },
    "cloud-top-1": { x: -177, y: -88, w: 688, h: 359.9 },
    "cloud-top-2": { x: -419, y: -139, w: 808.6, h: 423 },
    "candle-1": { x: 525, y: 491, w: 380, h: 619.5 },
    "candle-2": { x: 622, y: 611, w: 380, h: 619.5 },
  },
  sm: {
    artboard: { w: 402, h: 874 },
  },
} as const;
