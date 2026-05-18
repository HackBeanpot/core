import React from "react";

// Applicant shell (header, user menu); placeholder session check
export default function ApplicantLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="min-h-screen">
      <header className="border-b p-4">
        <span className="font-semibold">HackBeanpot Applicant Portal</span>
      </header>
      <main>{children}</main>
    </div>
  );
}
