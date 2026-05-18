import React from "react";
import ShowDecisionToggle from "@/components/admin/ShowDecisionToggle";
import DateControls from "@/components/admin/DateControl";
import FormConfigEditor from "@/components/admin/FormConfigEditor";

export default function Page() {
  return (
    <div>
      <ShowDecisionToggle />
      <DateControls />
      <FormConfigEditor />
    </div>
  );
}
