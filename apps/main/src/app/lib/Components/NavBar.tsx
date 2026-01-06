"use client";

import React from "react";
import NavBarBase from "@repo/ui/NavBarBase";

const NavBar = () => {
  return (
    <NavBarBase
      links={[
        { pageName: "About", link: "/" },
        { pageName: "Projects", link: "/projects" },
        { pageName: "Team", link: "/team" },
        { pageName: "Sponsors", link: "/sponsors" },
      ]}
      buttonLinks={[
        { pageName: "Sponsor Us", link: "/sponsor-us" },
        {
          pageName: "Apply",
          link: "https://apply.hackbeanpot.com/",
          useExternalLink: true,
          buttonColor: "firecrackerRedLight",
        },
      ]}
    />
  );
};

export default NavBar;
