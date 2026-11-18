import type { Sponsor, SponsorsSection } from "./types";

export const sponsorsSection: SponsorsSection = {
  title: "SPONSORS",
  cta: "Interested in sponsoring us?",
  packetButtonLabel: "View Sponsorship Packet",
  inquiry: { before: "Reach out to ", after: " for more inquiries!" },
};

export const sponsors: Sponsor[] = [
  {
    name: "Klaviyo",
    url: "https://www.klaviyo.com",
    tier: "gold",
    logo: { src: "/sponsors/logos/Klaviyo-Logo.svg", alt: "Klaviyo" },
  },
  {
    name: "Sweeney Merrigan",
    url: "https://www.sweeneymerrigan.com",
    tier: "silver",
    logo: {
      src: "/sponsors/logos/sweeney-merrigan.svg",
      alt: "Sweeney Merrigan",
    },
  },
];
