import type { Site } from "./types";

const SPONSORSHIP_PACKET_URL =
  "https://drive.google.com/file/d/1aBjnFHtW3LLpWVZT4qtleM1BtFfCx00W/view?usp=sharing";

export const site: Site = {
  // TODO(content): 2027 application portal URL, once the directors confirm it
  // (last year's was https://apply.hackbeanpot.com/).
  applicationUrl: null,
  applicationsClosedMessage:
    "Applications for HackBeanpot 2027 aren't open yet! Follow us on Instagram @hackbeanpot for updates.",
  // TODO(content): 2027 sponsorship packet URL
  sponsorshipPacketUrl: SPONSORSHIP_PACKET_URL,
  // The landing Sponsors section (swap for the packet URL if the directors prefer).
  sponsorUsHref: SPONSORSHIP_PACKET_URL,
  // MLH trust-badge link, matching the "2025 Season" badge art.
  // TODO(content): bump the campaign if MLH sends a newer season badge.
  mlhBadgeUrl:
    "https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=white",
  contactEmail: "core@hackbeanpot.com",
  socials: [
    {
      platform: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/hackbeanpot/",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/hackbeanpot-inc",
    },
    {
      platform: "tiktok",
      label: "TikTok",
      url: "https://www.tiktok.com/@hackbeanpot",
    },
  ],
};
