import type { Project, SectionHeading } from "./types";

export const projectsSection: SectionHeading = {
  title: "PAST PROJECTS",
};

export const projects: Project[] = [
  // TODO(content): placeholder project; replace with real past projects, media and URLs
  {
    title: "Memora",
    url: "#",
    members: ["Kaleb Cole", "Yaroslav Petrashko", "Shrey Agarwal", "Aditya"],
    description:
      "Memora acts as a personalized road map through memories, designed for individuals in the early to moderate stages of dementia and their families. Using personal family photos, Memora stimulates memory recall through engaging quizzes and a user-friendly interface.",
    media: {
      type: "image",
      src: "/projects/media/placeholder.webp",
      alt: "Memora logo: a brain with a puzzle piece",
    },
  },
];
