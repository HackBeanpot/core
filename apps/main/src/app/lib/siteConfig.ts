// TODO(MS-108): move these into lib/content/site.ts once it merges.

/**
 * 2027 application portal URL. Waiting on the directors to confirm it
 * (last year's was https://apply.hackbeanpot.com/). While it's null, Apply
 * falls back to an alert with `APPLICATIONS_CLOSED_MESSAGE`.
 */
export const APPLICATION_URL: string | null = null;

export const APPLICATIONS_CLOSED_MESSAGE =
  "Applications for HackBeanpot 2027 aren't open yet! Follow us on Instagram @hackbeanpot for updates.";

/** Sponsor Us goes to the landing Sponsors section (swap for the packet URL if the directors prefer). */
export const SPONSOR_US_HREF = "/#sponsors";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/hackbeanpot/",
  linkedin: "https://www.linkedin.com/company/hackbeanpot-inc",
  tiktok: "https://www.tiktok.com/@hackbeanpot",
} as const;
