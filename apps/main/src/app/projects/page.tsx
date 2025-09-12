"use client";

import React from "react";
import Project from "./components/Project";

const projectData = [
  {
    projectImage: "/projects/memora.png",
    projectName: "Memora",
    award: "Leave No Trace",
    members: "Kaleb Cole, Yaroslav Petrashko, Shrey Agarwal, Aditya",
    description:
      "Memora is a mobile app that acts as a personalized road map through memories, designed for individuals in the early to moderate stages of dementia and their families. Using personal family photos – snapshots from life's journey – Memora stimulates memory recall through engaging quizzes and a user-friendly interface.",
    link: "https://devpost.com/software/memora-bmi4zw",
  },
  {
    projectImage: "/projects/memora.png",
    projectName: "Memora",
    award: "Leave No Trace",
    members: "Kaleb Cole, Yaroslav Petrashko, Shrey Agarwal, Aditya",
    description:
      "Memora is a mobile app that acts as a personalized road map through memories, designed for individuals in the early to moderate stages of dementia and their families. Using personal family photos – snapshots from life's journey – Memora stimulates memory recall through engaging quizzes and a user-friendly interface.",
    link: "https://devpost.com/software/memora-bmi4zw",
  },
  {
    projectImage: "/projects/memora.png",
    projectName: "Memora",
    award: "Leave No Trace",
    members: "Kaleb Cole, Yaroslav Petrashko, Shrey Agarwal, Aditya",
    description:
      "Memora is a mobile app that acts as a personalized road map through memories, designed for individuals in the early to moderate stages of dementia and their families. Using personal family photos – snapshots from life's journey – Memora stimulates memory recall through engaging quizzes and a user-friendly interface.",
    link: "https://devpost.com/software/memora-bmi4zw",
  },
  // TODO: ADD MORE PROJECTS
];

export default function Page() {
  return (
    <main className="flex flex-col items-center min-h-screen relative">
      <div className="absolute top-24">
        {projectData.map((project, index) => (
          // TODO: add title component here when done
          <div key={index} className="pt-24">
            <Project
              projectImage={project.projectImage}
              projectName={project.projectName}
              url={project.link}
              members={project.members}
              description={project.description}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
