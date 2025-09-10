export type ScreenToken = {
  [key: string]: string;
};

const screens = {
  mobile: { max: "1535px" },
  "mobile-xl": { max: "1279px" },
  tablet: { max: "1023px" },
  desktop: { max: "767px" },
  "desktop-xl": { max: "639px" },
  "desktop-2xl": { max: "481 px" },
};

export default screens;
