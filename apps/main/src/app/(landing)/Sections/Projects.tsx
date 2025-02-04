import React from "react";
import { Section } from "@repo/ui";
import ProjectsBackground from "../../projects/background";
import ProjectsContent from "../../projects/content";

const background = ProjectsBackground();
const content = ProjectsContent();
export default function Projects(): React.ReactNode {
  return (
    <Section
      name={"Projects"}
      background={background}
      content={content}
      height={1000}
    />
  );
}
