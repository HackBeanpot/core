"use client";

import React from "react";
import NavBarBase from "@repo/ui/NavBarBase";

const NavBar = () => {
  const handleApplyClick = () => {
    alert("Applications for HackBeanpot 2026 are closed! Please follow us on Instagram @HackBeanpot for more updates.");
  };

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
          link: "#",
          buttonColor: "firecrackerRedLight",
          onClick: handleApplyClick,
        },
      ]}
    />
  );
};

export default NavBar;