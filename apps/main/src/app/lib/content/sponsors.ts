import type { Sponsor, SponsorsSection } from "./types";

export const sponsorsSection: SponsorsSection = {
  title: "SPONSORS",
  cta: "Interested in sponsoring us?",
  packetButtonLabel: "View Sponsorship Packet",
  inquiry: { before: "Reach out to ", after: " for more inquiries!" },
};

// TODO(content): placeholder sponsors sharing one logo; replace with the confirmed 2027 sponsors, tiers and logos
const PLACEHOLDER_LOGO = "/sponsors/logos/placeholder.webp";

export const sponsors: Sponsor[] = [
  {
    name: "Google",
    url: "https://www.google.com",
    tier: "gold",
    logo: { src: PLACEHOLDER_LOGO, alt: "Google" },
  },
  {
    name: "CarGurus",
    url: "https://www.cargurus.com",
    tier: "gold",
    logo: { src: PLACEHOLDER_LOGO, alt: "CarGurus" },
  },
  {
    name: "Meta",
    url: "https://www.meta.com",
    tier: "gold",
    logo: { src: PLACEHOLDER_LOGO, alt: "Meta" },
  },
  {
    name: "Datadog",
    url: "https://www.datadoghq.com",
    tier: "silver",
    logo: { src: PLACEHOLDER_LOGO, alt: "Datadog" },
  },
  {
    name: "SimpliSafe",
    url: "https://simplisafe.com",
    tier: "silver",
    logo: { src: PLACEHOLDER_LOGO, alt: "SimpliSafe" },
  },
  {
    name: "Yelp",
    url: "https://www.yelp.com",
    tier: "silver",
    logo: { src: PLACEHOLDER_LOGO, alt: "Yelp" },
  },
];
