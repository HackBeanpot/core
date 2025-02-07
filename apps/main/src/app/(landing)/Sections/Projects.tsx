import React from "react";
import { Section } from "@repo/ui";
import ProjectsBackground from "../../projects/background";
import ProjectsContent from "../../projects/content";

export default function Projects(): React.ReactNode {
  return (
    <Section
      name={"Projects"}
      background={<ProjectsBackground />}
      content={<ProjectsContent />}
      height={1000}
    />
  );
}
