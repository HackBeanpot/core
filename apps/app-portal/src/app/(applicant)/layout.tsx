import React from "react";
import Sidebar from "@/components/Sidebar";
import UserMenu from "@/components/auth/UserMenu";
import Image from "next/image";
import icon from "@/app/icon.ico";

export const metadata = {
  title: "Applicant Portal",
};
export default function ApplicantLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const email = "applicant@example.com";

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col desktop:ml-64">
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <div className="flex flex-row items-start">
            <Image src={icon.src} alt={"HBP Logo"} width={25} height={25} />
            <span className="font-semibold pl-2">HackBeanpot Applicant Portal</span>
          </div>
          <UserMenu email={email} />
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
