import React from "react";
import UserMenu from "@/components/auth/UserMenu";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { redirect } from "next/navigation";

// TODO: pull the real email from session later
const email = "admin@example.com";

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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex flex-1 flex-col desktop:ml-64">
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <h1 className="text-xl font-semibold">Admin Portal</h1>
          <UserMenu email={email} />
        </header>
        {children}
      </main>
    </div>
  );
}
