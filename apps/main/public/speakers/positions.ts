// Boxes are px relative to the artboard's top-left at each breakpoint
export const positions = {
  lg: {
    artboard: { w: 1513.5, h: 982 },
    curtain: { x: 5, y: -1468, w: 2452.9, h: 3419 },
    gazebo: { x: 127.1, y: 184.2, w: 524.6, h: 797.9 },
    "gazebo-opening": { x: 186.1, y: 480.2, w: 407, h: 501.9 },
    balustrade: { x: 625.6, y: 672.7, w: 1021.2, h: 308.9 },
    "balustrade-left": { x: -68.1, y: 672.7, w: 214.2, h: 309.4 },
  },
  md: {
    artboard: { w: 1000, h: 982 },
    curtain: { x: -254, y: -1614, w: 2215.2, h: 3510.5 },
    gazebo: { x: 23, y: 83, w: 402, h: 624 },
    "gazebo-opening": { x: 73.7, y: 302.2, w: 301.4, h: 371.7 },
    balustrade: { x: -6, y: 743, w: 791.2, h: 239.3 },
  },
  sm: {
    artboard: { w: 402, h: 874 },
    "gazebo-opening": { x: 16.7, y: 211.7, w: 370.7, h: 457.2 },
  },
} as const;
