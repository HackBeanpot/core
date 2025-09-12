export type ScreenToken = {
  [key: string]: string;
};

const screens = {
  "desktop-2xl": { max: "4080px" },
  "desktop-xl": { max: "3060px" },
  desktop: { max: "1920px" },
  tablet: { min: "640px", max: "1279px" },
  "mobile-xl": { min:"482px", max: "639px" },
  mobile: { max: "481px" },
};

export default screens;
