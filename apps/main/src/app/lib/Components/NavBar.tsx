"use client";

import React from "react";
import Logo from "../Assets/SVG/HackBeanpotLogo";
import LocalLink from "./LocalLink";
import Button from "@repo/ui/Button";
// import HomeIcon from "@repo/ui/Icons/HomeIcon";
// import Hamburger from "hamburger-react";

const NavBar = () => {
  // const [isOpen, setOpen] = useState(false);
  // const isMobile = useIsMobileLgScreen();

  type LocalLinkInfo = {
    pageName: string;
    link: string;
  }

  const localLinkArr: LocalLinkInfo[] = [
    { pageName: "About", link: "/" },
    { pageName: "Projects", link: "/projects" },
    { pageName: "Sponsors", link: "/sponsors" },
    { pageName: "Team", link: "/team" },
  ];

  return (
    <div className="sticky top-0 z-[50] w-full h-fit bg-white flex flex-row">
      <div className="p-2 left-0">
        <LocalLink href={"/"}>
          <Logo />
        </LocalLink>
      </div>
      <div className="flex flex-row gap-10 w-full items-center justify-end">
        {localLinkArr.map((item) => (
          <LocalLink
            key={item.pageName}
            href={item.link}
            className="text-lg font-DMSans-Bold"
          >
            {item.pageName}
          </LocalLink>
        ))}
        <div className="flex flex-row gap-2 items-center justify-end pr-10">
          <LocalLink href={"/sponsor-us"}>
            <Button textColor="white" text="Sponsor Us" size="medium" />
          </LocalLink>
          <Button 
            textColor="white" 
            text="Apply" 
            color="firecrackerRedLight" 
            size="medium"
            onClick={() => alert("2026 Applications haven't opened yet!")}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
