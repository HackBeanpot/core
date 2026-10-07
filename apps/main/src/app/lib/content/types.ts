/** `src` is a path under `apps/main/public`, e.g. `/team/members/example.webp`. */
export type ImageAsset = {
  src: string;
  alt: string;
};

export type SectionHeading = {
  title: string;
};

// TODO: replace with `PictureFrameVariant` from `lib/Components/museum` once MS-105 exports it.
export type PictureFrameVariant =
  | "copper"
  | "wood"
  | "goldBevel"
  | "silverBevel"
  | "goldMedallion"
  | "blueMedallion"
  | "greenArch"
  | "navyShield"
  | "copperRect";

export type About = SectionHeading & {
  body: string;
  photo: ImageAsset;
};

export type Value = {
  title: string;
  body: string;
};

export type Speaker = {
  name: string;
  role: string;
  bio: string;
  photo: ImageAsset;
};

export type Testimonial = {
  quote: string;
  name: string;
  school: string;
  classYear: number;
  photo: ImageAsset;
};

export type ProjectMedia =
  | ({ type: "image" } & ImageAsset)
  | { type: "video"; src: string; alt: string; poster?: string }
  | { type: "embed"; url: string; title: string };

export type Project = {
  title: string;
  url: string;
  members: string[];
  description: string;
  media: ProjectMedia;
};

export type SponsorTier = "gold" | "silver";

export type Sponsor = {
  name: string;
  url: string;
  tier: SponsorTier;
  logo: ImageAsset;
};

export type SponsorsSection = SectionHeading & {
  cta: string;
  packetButtonLabel: string;
  /** Rendered around `site.contactEmail` as a `mailto:` link. */
  inquiry: { before: string; after: string };
};

export type Department =
  | "directors"
  | "design"
  | "tech"
  | "sponsorship"
  | "operations"
  | "marketing";

export type TeamMember = {
  name: string;
  role: string;
  department: Department;
  frame: PictureFrameVariant;
  photo: ImageAsset;
  linkedinUrl?: string;
};

export type FaqCategory = "general" | "application" | "logistics";

export type FaqItem = {
  category: FaqCategory;
  question: string;
  answer: string;
};

export type Labeled<Id extends string> = {
  id: Id;
  label: string;
};

export type SocialPlatform = "instagram" | "linkedin" | "tiktok";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  url: string;
};

export type Site = {
  applicationUrl: string;
  sponsorshipPacketUrl: string;
  contactEmail: string;
  socials: SocialLink[];
};
