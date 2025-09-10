export type ScreenToken = {
  [key: string]: string;
};

const screens = {
  "desktop-2xl": { max: "1535px" },
  "desktop-xl": { max: "1279px" },
  desktop: { max: "1023px" },
  tablet: { max: "767px" },
  "mobile-xl": { max: "639px" },
  mobile: { max: "481 px" },
};

export default screens;
