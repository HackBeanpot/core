"use client";

import React from "react";
import Link from "next/link";
import HackBeanpotLogo from "../../../../../packages/ui/src/Logos/HackBeanpotLogo";
import { usePathname } from "next/navigation";
import useDevice from "@repo/util/hooks/useDevice";
import { MenuIcon } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { isMobile } = useDevice();
  const [open, setOpen] = React.useState(false);

  const Active = (href: string) => {
    const isActive =
      href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

    return isActive
      ? {
          backgroundColor: "#1890ff",
          color: "white",
          fontWeight: "bold" as const,
        }
      : {
          color: "#808080",
        };
  };

  const NavLinks = () => (
    <>
      <Link href="/">
        <HackBeanpotLogo className="text-white" />
      </Link>

      <Link
        href="/admin"
        style={Active("/admin")}
        className="block rounded px-3 py-2 text-lg"
      >
        Admin
      </Link>

      <Link
        href="/admin/settings"
        style={Active("/admin/settings")}
        className="block rounded px-3 py-2 text-lg"
      >
        Portal Settings
      </Link>

      <Link
        href="/admin/applicants"
        style={Active("/admin/applicants")}
        className="block rounded px-3 py-2 text-lg"
      >
        Applicants
      </Link>

      <Link
        href="/admin/stats"
        style={Active("/admin/stats")}
        className="block rounded px-3 py-2 text-lg"
      >
        Stats
      </Link>
    </>
  );

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          style={{ backgroundColor: "transparent", color: "blue" }}
          className="fixed top-4 left-4 z-100 rounded p-2"
        >
          <MenuIcon />
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setOpen(false)}
            />

            <aside className="fixed left-0 top-0 z-50 h-screen bg-[#001529] p-4">
              <NavLinks />
            </aside>
          </>
        )}
      </>
    );
  }

  return (
    <div
      style={{ backgroundColor: "#001529" }}
      className="fixed left-0 top-0 h-full shadow desktop:w-64 border-r p-4"
    >
      <NavLinks />
    </div>
  );
}
