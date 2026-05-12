"use client";

import React from "react";
import { useForm } from "react-hook-form";

type RsvpFormValues = {
  attending: "yes" | "no";
};

export default function RsvpForm(): JSX.Element {
  const { register, handleSubmit } = useForm<RsvpFormValues>();

  const onSubmit = (values: RsvpFormValues) => {
    void values;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Attending?
        <select {...register("attending", { required: true })} defaultValue="">
          <option value="" disabled>
            Are you attending?
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>

      <button type="submit">Submit RSVP</button>
    </form>
  );
}
