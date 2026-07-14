import React from "react";
import UserMenu from "@/components/auth/UserMenu";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = session?.user as
    | { email?: string | null; isAdmin?: boolean }
    | undefined;

  if (!user) {
    redirect("/auth/signin");
  }
  if (!user.isAdmin) {
    redirect("/dashboard");
  }

  const email = user.email ?? "";

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex flex-1 flex-col desktop:ml-64">
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <h1 className="text-xl font-semibold">Admin Portal</h1>
          <UserMenu email={email} />
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
