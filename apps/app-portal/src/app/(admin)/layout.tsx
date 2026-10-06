import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminContentArea from "@/components/admin/AdminContentArea";
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

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <AdminContentArea>{children}</AdminContentArea>
    </div>
  );
}
