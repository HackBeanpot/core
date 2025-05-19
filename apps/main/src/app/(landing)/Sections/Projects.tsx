import React from "react";
import ProjectsBackground from "../../projects/background";
import ProjectsContent from "../../projects/content";

export default function Projects(): React.ReactNode {
  return (
    <div>
      {/* not right, plz look into background  */}
        <ProjectsBackground />
        <ProjectsContent />
    </div>
  );
}
