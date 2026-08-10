import React from "react";
import ShowDecisionToggle from "@/components/admin/ShowDecisionToggle";
import DateControls from "@/components/admin/DateControls";
import FormConfigEditor from "@/components/admin/FormConfigEditor";

export default async function Page() {
  const [openRes, closeRes, confirmRes, showDecisionRes] = await Promise.all([
    fetch("http://localhost:3000/api/v1/dates/registration-open", {
      cache: "no-store",
    }),
    fetch("http://localhost:3000/api/v1/dates/registration-closed", {
      cache: "no-store",
    }),
    fetch("http://localhost:3000/api/v1/dates/confirm-by", {
      cache: "no-store",
    }),
    fetch("http://localhost:3000/api/v1/show-decision", {
      cache: "no-store",
    }),
  ]);

  const [openData, closeData, confirmData, showDecisionData] =
    await Promise.all([
      openRes.json(),
      closeRes.json(),
      confirmRes.json(),
      showDecisionRes.json(),
    ]);

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
