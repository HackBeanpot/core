import React from "react";
import Sidebar from "../../components/Sidebar";

export const metadata = {
  title: "Applicant Portal",
};

export default function ApplicantLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="flex w-full items-stretch">
        <Sidebar />
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
