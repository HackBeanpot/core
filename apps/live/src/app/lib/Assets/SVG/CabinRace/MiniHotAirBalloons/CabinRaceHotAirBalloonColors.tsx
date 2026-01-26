export const CABIN_RACE_BALLOON_COLORS = {
  blue: {
    primaryColor: "#2563eb",
    secondaryColor: "#93c5fd",
  },
  green: {
    primaryColor: "#16a34a",
    secondaryColor: "#86efac",
  },
  yellow: {
    primaryColor: "#e74c3c",
    secondaryColor: "#e74c3c",
  },
  purple: {
    primaryColor: "#e74c3c",
    secondaryColor: "#e74c3c",
  },
  white: {
    primaryColor: "#e74c3c",
    secondaryColor: "#e74c3c",
  },
  red: {
    primaryColor: "#e74c3c",
    secondaryColor: "#e74c3c",
  },
} as const;

export type CabinRaceHotAirBalloonTheme =
    keyof typeof CABIN_RACE_BALLOON_COLORS;
