import React from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4">
        <h2 className="font-bold mb-4">Admin</h2>

        <nav className="flex flex-col gap-2">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/settings">Settings</Link>
          <Link href="/admin/applicants">Applicants</Link>
          <Link href="/admin/stats">Stats</Link>
        </nav>
      </aside>

      <main className="flex-1">
        <header className="border-b p-4">
          <h1 className="text-xl font-semibold">Admin Portal</h1>
        </header>
        {children}
      </main>
    </div>
  );
}
