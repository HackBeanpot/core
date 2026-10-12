import React from "react";
import Link from "next/link";
import UserMenu from "@/components/auth/UserMenu";
import Image from "next/image";
import icon from "@/app/icon.ico";
import { getSession } from "@/lib/auth/session";
import { getPortalStatus } from "@/lib/status/service";

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
  // Hide the link if status can't be loaded; the RSVP page enforces the same rule anyway.
  const rsvpAvailable = await getPortalStatus()
    .then((s) => s.rsvpAvailable)
    .catch(() => false);

  return (
    <div className="min-h-screen">
      <header className="flex flex-wrap items-center justify-between gap-y-2 border-b bg-white px-6 py-3 sm:h-16 sm:flex-nowrap sm:py-0">
        <div className="contents sm:flex sm:items-center sm:gap-4">
          <div className="flex shrink-0 items-center whitespace-nowrap">
          <Image src={icon.src} alt={"HBP Logo"} width={25} height={25} />
            <span className="font-semibold pl-2">
            HackBeanpot Applicant Portal
          </span>
        </div>

          <nav className="order-last -ml-3 flex w-full items-center gap-2 sm:order-none sm:ml-6 sm:w-auto">
          <Link
            href="/dashboard"
            className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Dashboard
          </Link>
          {rsvpAvailable && (
            <Link
              href="/rsvp"
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              RSVP
            </Link>
          )}
          <Link
            href="/application"
            className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Application
          </Link>
        </nav>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          {isAdmin && (
            <Link
              href="/admin"
              className="hidden md:inline-flex items-center whitespace-nowrap rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
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
