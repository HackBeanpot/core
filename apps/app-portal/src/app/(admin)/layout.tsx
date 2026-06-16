import React from "react";
import Link from "next/link";
import UserMenu from "@/components/auth/UserMenu";

export default function AdminLayout() {
  // TODO: pull the real email from session later
  const email = "admin@example.com";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { redirect } from "next/navigation";

async function requireAdmin(): Promise<boolean> {
  return true;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await requireAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex flex-1 flex-col desktop:ml-64">
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <div>
            <h1 className="text-xl font-semibold">Admin Portal</h1>
          </div>

      <main className="flex-1">
        <header className="flex items-center justify-between border-b p-4">
          <h1 className="text-xl font-semibold">Admin Portal</h1>
          <UserMenu email={email} />
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
