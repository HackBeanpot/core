import React from "react";
import UserMenu from "@/components/auth/UserMenu";
import Image from "next/image";
import icon from "@/app/icon.ico";

// Applicant shell (header, user menu); placeholder session check
export default function ApplicantLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  // TODO: pull the real email lator
  const email = "applicant@example.com";

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b p-4">
        <div className="flex flex-row items-start">
          <Image src={icon.src} alt={"HBP Logo"} width={25} height={25}/>
          <span className="font-semibold pl-2">HackBeanpot Applicant Portal</span>
        </div>
        <UserMenu email={email} />
      </header>
      <main>{children}</main>
    </div>
  );
}
