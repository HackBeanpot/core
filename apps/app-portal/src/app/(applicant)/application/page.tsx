import React from "react";

import { ApplicationForm } from "@/components/application/ApplicationForm";
import { isRegistrationOpen } from "@/lib/application/service";

export default async function ApplicationPage() {
  const registrationOpen = await isRegistrationOpen();

  if (!registrationOpen) {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Applications are closed
        </h1>
        <p className="mt-3 text-neutral-600">
          HackBeanpot is not currently accepting applications. Follow
          @HackBeanpot on social media for updates.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          HackBeanpot application
        </h1>
        <p className="mt-2 text-neutral-600">
          Complete the form below to apply. You can save a draft and come back
          anytime before submitting.
        </p>
      </header>
      <ApplicationForm />
    </main>
  );
}
