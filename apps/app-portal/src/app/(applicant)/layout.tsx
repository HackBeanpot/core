import React from "react";
import Link from "next/link";
import UserMenu from "@/components/auth/UserMenu";
import Image from "next/image";
import icon from "@/app/icon.ico";
import { getSession } from "@/lib/auth/session";

export const metadata = {
  title: "Applicant Portal",
};
export default async function ApplicantLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await getSession();
  const isAdmin = !!(session?.user as { isAdmin?: boolean } | undefined)
    ?.isAdmin;

  return (
    <div className="min-h-screen">
      <header className="flex h-16 items-center justify-between border-b bg-white px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Image src={icon.src} alt={"HBP Logo"} width={25} height={25} />
            <span className="font-semibold pl-2">
              HackBeanpot Applicant Portal
            </span>
          </div>

          <nav className="ml-6 flex items-center gap-2">
            <Link
              href="/dashboard"
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Dashboard
            </Link>
            <Link
              href="/rsvp"
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              RSVP
            </Link>
            <Link
              href="/application"
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Application
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/application"
            className="hidden sm:inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Application
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Admin View
            </Link>
          )}
          <UserMenu />
        </div>
      </header>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
