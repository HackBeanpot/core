import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import UploadsDemoClient from "./UploadsDemoClient";

// Internal demo page for exercising <FileUpload /> in isolation (see UploadsDemoClient).
// Not applicant-facing — gated to admins only, same pattern as (admin)/layout.tsx.
export default async function Page(): Promise<JSX.Element> {
  const session = await getSession();
  const user = session?.user as { isAdmin?: boolean } | undefined;

  if (!user) {
    redirect("/auth/signin");
  }
  if (!user.isAdmin) {
    redirect("/dashboard");
  }

  return <UploadsDemoClient />;
}
