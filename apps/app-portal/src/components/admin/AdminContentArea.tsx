"use client";

import React from "react";
import useDevice from "@repo/util/hooks/useDevice";
import UserMenu from "@/components/auth/UserMenu";

// Offsets for AdminSidebar's fixed-position width. Driven by the same isMobile check
// AdminSidebar itself uses (rather than a CSS breakpoint) so the two can never drift
// apart — the previous `desktop:ml-64`/`desktop:w-64` pairing relied on this repo's
// custom "desktop" Tailwind breakpoint, which is a *max-width* 1920px query, not a
// min-width one. Above 1920px both classes silently stopped applying, leaving the fixed
// sidebar overlapping the content instead of being offset by it.
export default function AdminContentArea({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { isMobile } = useDevice();

  return (
    <div className={`flex flex-1 flex-col ${isMobile ? "" : "ml-64"}`}>
      <header className="flex h-16 items-center justify-between border-b bg-white px-6">
        <h1 className="text-xl font-semibold">Admin Portal</h1>
        <UserMenu />
      </header>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
