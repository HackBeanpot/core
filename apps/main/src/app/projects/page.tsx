"use client";

import React from "react";
import Project from "./components/Project";

const projectData = [
  {
    projectImage: "/projects/memora.png",
    projectName: "Memora",
    award: "Best Overall Tech",
    members: "Jalen Wu, Caleb Lee, Kyle Sung, Elaine Min, Dewi Kalis",
    description:
      "Poqua is an aquarium tank monitor software app that gives users a platform to simulate their aquarium when away from home.",
    link: "https://devpost.com/software/poqua",
  },
  // ADD MORE PROJECTS
];

export default function Page() {
  return (
    <main className="flex flex-col items-center min-h-screen relative">
      <div className="absolute top-10">
        {projectData.map((project, index) => (
          <Project
            key={index}
            projectImage={project.projectImage}
            projectName={project.projectName}
            url={project.link}
            members={project.members}
            description={project.description}
          />
        ))}
      </div>
    </main>
  );
}
