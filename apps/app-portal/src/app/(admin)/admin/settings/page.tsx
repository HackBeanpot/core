import React from "react";
import ShowDecisionToggle from "@/components/admin/ShowDecisionToggle";
import DateControls from "@/components/admin/DateControls";
import FormConfigEditor from "@/components/admin/FormConfigEditor";
import { getSingleton } from "@/lib/admin/singleton-service";
import { SingletonKey } from "@/lib/types/singleton";

export const dynamic = "force-dynamic";

export default async function Page() {
  // Read singletons directly (same pattern as admin/stats and admin/applicants) instead of
  // self-fetching our own API routes over HTTP — that previously relied on a hardcoded
  // http://localhost:3000 origin, which breaks in every deployed environment.
  const [openValue, closeValue, confirmValue, showDecisionValue] =
    await Promise.all([
      getSingleton(SingletonKey.RegistrationOpen),
      getSingleton(SingletonKey.RegistrationClosed),
      getSingleton(SingletonKey.ConfirmBy),
      getSingleton(SingletonKey.ShowDecision),
    ]);

  const openData = { value: openValue ?? undefined };
  const closeData = { value: closeValue ?? undefined };
  const confirmData = { value: confirmValue ?? undefined };
  const showDecisionData = { value: showDecisionValue ?? false };

  return (
    <div>
      <h1 className="text-3xl font-bold">Configure Portal Settings</h1>

      <div className="flex flex-col gap-8">
        <section>
          <h2 className="mb-4 text-xl font-semibold">Dates</h2>
          <div className="flex flex-col gap-4">
            <DateControls
              label="Registration Opens:"
              endpoint="/api/v1/dates/registration-open"
              initialValue={openData.value}
            />

            <DateControls
              label="Registration Closes:"
              endpoint="/api/v1/dates/registration-closed"
              initialValue={closeData.value}
            />

            <DateControls
              label="Confirm By:"
              endpoint="/api/v1/dates/confirm-by"
              initialValue={confirmData.value}
            />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Display</h2>
          <ShowDecisionToggle initialValue={showDecisionData.value} />
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Form Configuration</h2>
          <FormConfigEditor />
        </section>
      </div>
    </div>
  );
}
