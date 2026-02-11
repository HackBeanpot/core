export const CABIN_RACE_BALLOON_COLORS = {
  blue: {
    primaryColor: "#3a638f",
    secondaryColor: "#173c61",
  },
  green: {
    primaryColor: "#b7c751",
    secondaryColor: "#6f9840",
  },
  yellow: {
    primaryColor: "#f0de6e",
    secondaryColor: "#fba729",
  },
  purple: {
    primaryColor: "#d392d7",
    secondaryColor: "#965f9a",
  },
  white: {
    primaryColor: "#ef6e57",
    secondaryColor: "#f5ddbb",
  },
  red: {
    primaryColor: "#ef6e57",
    secondaryColor: "#ca322d",
  },
} as const;

export type CabinRaceHotAirBalloonTheme =
  keyof typeof CABIN_RACE_BALLOON_COLORS;
