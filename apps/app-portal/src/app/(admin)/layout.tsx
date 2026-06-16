import React from "react";
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
          <div>
            <h1 className="text-xl font-semibold">Admin Portal</h1>
          </div>

          <div className="flex items-center gap-4">Place user menu here</div>
        </header>
        {children}
      </main>
    </div>
  );
}
