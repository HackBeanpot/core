import type { Project, SectionHeading } from "./types";

export const projectsSection: SectionHeading = {
  title: "PAST PROJECTS",
};

export const projects: Project[] = [
  {
    title: "Impact Trail",
    url: "https://devpost.com/software/impact-trail",
    members: [
      "Jackson Zheng",
      "Matt Eng",
      "Seifer Mathias",
      "Yash Kishore Maheshwari",
      "Rida Malik",
    ],
    description:
      "Impact Trail allows people to connect to their community after receiving a daily quest. Regardless of where you stand in the community, a citizen, business, or a organization we have a place for you.",
    media: {
      type: "embed",
      url: "https://www.youtube-nocookie.com/embed/XVDpaBWwDxI",
      title: "Impact Trail demo video",
    },
  },
  {
    title: "FairOps",
    url: "https://devpost.com/software/fairops",
    members: ["Henry Lodge", "Shiv Patel"],
    description:
      "FairOps is an AI-powered operations platform for events that replaces spreadsheets, paper maps, and cash handshakes with AI-optimized layouts, on-chain vendor payments, and dashboards to manage it all",
    media: {
      type: "embed",
      url: "https://www.youtube-nocookie.com/embed/ChBEzdS4zik",
      title: "FairOps demo video",
    },
  },
];
