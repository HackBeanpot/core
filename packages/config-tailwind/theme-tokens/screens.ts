export type ScreenToken = {
  [key: string]: string;
};

const screens = {
  "desktop-2xl": { max: "4080px" },
  "desktop-xl": { max: "3060px" },
  desktop: { max: "1920px" },
  "desktop-md": { min: "1600px", max: "1919px" },
  "desktop-sm": { min: "1280px", max: "1599px" },
  tablet: { min: "640px", max: "1279px" },
  "mobile-xl": { min: "482px", max: "639px" },
  mobile: { max: "481px" },
};

export default screens;
