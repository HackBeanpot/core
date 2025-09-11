export type ScreenToken = {
  [key: string]: string;
};

const screens = {
  "desktop-2xl": { max: "4080px" },
  "desktop-xl": { max: "3060px" },
  desktop: { max: "1920px" },
  tablet: { max: "1279px" },
  "mobile-xl": { max: "639px" },
  mobile: { max: "481 px" },
};

export default screens;
