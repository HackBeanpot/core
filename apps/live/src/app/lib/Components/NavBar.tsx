"use client";

import React from "react";
import NavBarBase from "@repo/ui/NavBarBase";

const NavBar = () => {
  return (
    <NavBarBase
      links={[
        { pageName: "Resources", link: "#resources" },
        { pageName: "Schedule", link: "#schedule" },
        { pageName: "Guest Speakers", link: "#keynote" },
        { pageName: "Mentors", link: "#mentors" },
        { pageName: "Team", link: "#team" },
      ]}
      buttonLinks={[
        { pageName: "Judging", link: "#judging", buttonColor: "starlightBlue" },
      ]}
      dropdownBgColor="bg-carouselCreamDark" // TODO NAVBAR: update the background color of the navbar dropdown once design gives u access
    />
  );
};

export default NavBar;
