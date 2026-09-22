"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { rsvpSchema } from "../../lib/status/rsvp";
import type { RsvpSubmission } from "../../lib/status/rsvp";

type RsvpFormValues = z.infer<typeof rsvpSchema>;

type RsvpFormProps = {
  inverted?: boolean;
  alreadySubmitted?: boolean;
  /** Past the confirm-by deadline, the attendance decision itself is frozen — see
   * saveRsvp() in lib/status/service.ts, which enforces this server-side too. */
  attendingLocked?: boolean;
  /** Pre-fills the form when the applicant already has a saved RSVP to edit. */
  initialValues?: Partial<RsvpSubmission>;
};

const sizeOptions = [
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
] as const;

export default function RsvpForm({
  inverted = false,
  alreadySubmitted = false,
  attendingLocked = false,
  initialValues,
}: RsvpFormProps): JSX.Element {
  const router = useRouter();
  const [toast, setToast] = React.useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attending: initialValues?.attending ?? "confirmed",
      dietaryRestrictions: initialValues?.dietaryRestrictions ?? "",
      tshirtSize: initialValues?.tshirtSize ?? "m",
      accessibilityNeeds: initialValues?.accessibilityNeeds ?? "",
      additionalNotes: initialValues?.additionalNotes ?? "",
    },
  });

  React.useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const onSubmit = async (values: RsvpFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/v1/post-acceptance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          typeof body?.error === "string" ? body.error : "Unable to submit RSVP",
        );
      }

      setToast({
        type: "success",
        message: alreadySubmitted
          ? "RSVP updated successfully. Redirecting to your dashboard."
          : "RSVP submitted successfully. Redirecting to your dashboard.",
      });

      window.setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1000);
    } catch (err) {
      setToast({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "We couldn’t submit your RSVP. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {toast && (
        <div
          className={`fixed right-4 top-4 z-50 max-w-sm rounded-2xl px-4 py-3 text-sm shadow-2xl sm:right-6 sm:top-6 ${toast.type === "success" ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"}`}
        >
          {toast.message}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label
            className={`space-y-2 text-sm font-medium ${inverted ? "text-white" : "text-slate-700"}`}
          >
            <span>Are you attending?</span>
            <select
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={attendingLocked}
              {...register("attending")}
            >
              <option value="confirmed">Yes, I’m coming</option>
              <option value="unconfirmed">No, I can’t make it</option>
            </select>
            {attendingLocked ? (
              <p className="text-xs text-slate-500">
                Locked this close to the event.
              </p>
            ) : (
              errors.attending && (
                <p className="text-sm text-rose-600">
                  {errors.attending.message}
                </p>
              )
            )}
          </label>

          <label
            className={`space-y-2 text-sm font-medium ${inverted ? "text-white" : "text-slate-700"}`}
          >
            <span>T-shirt size</span>
            <select
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-950"
              {...register("tshirtSize")}
            >
              {sizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.tshirtSize && (
              <p className="text-sm text-rose-600">
                {errors.tshirtSize.message}
              </p>
            )}
          </label>
        </div>

        <label
          className={`space-y-2 text-sm font-medium ${inverted ? "text-white" : "text-slate-700"}`}
        >
          <span>Dietary restrictions</span>
          <input
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950"
            placeholder="Vegetarian, halal, nut allergy, etc."
            type="text"
            {...register("dietaryRestrictions")}
          />
        </label>

        <label
          className={`space-y-2 text-sm font-medium ${inverted ? "text-white" : "text-slate-700"}`}
        >
          <span>Accessibility needs</span>
          <textarea
            className="min-h-28 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950"
            placeholder="Anything we should know to support your experience?"
            {...register("accessibilityNeeds")}
          />
        </label>

        <label
          className={`space-y-2 text-sm font-medium ${inverted ? "text-white" : "text-slate-700"}`}
        >
          <span>Additional notes</span>
          <textarea
            className="min-h-28 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950"
            placeholder="Optional logistics, questions, or anything else the team should know."
            {...register("additionalNotes")}
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
            isSubmitting
              ? "bg-slate-200 text-slate-500 cursor-not-allowed"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          {isSubmitting
            ? "Saving..."
            : alreadySubmitted
              ? "Save changes"
              : "Submit RSVP"}
        </button>
      </form>
    </div>
  );
}
