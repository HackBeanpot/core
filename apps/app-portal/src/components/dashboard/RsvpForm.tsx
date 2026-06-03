"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const rsvpSchema = z.object({
  attending: z.enum(["yes", "no"], {
    required_error: "Please choose whether you’re attending.",
  }),
  dietaryRestrictions: z.string().max(240).optional().or(z.literal("")),
  tshirtSize: z.enum(["xs", "s", "m", "l", "xl"], {
    required_error: "Please choose a t-shirt size.",
  }),
  accessibilityNeeds: z.string().max(240).optional().or(z.literal("")),
  additionalNotes: z.string().max(400).optional().or(z.literal("")),
});

type RsvpFormValues = z.infer<typeof rsvpSchema>;

type RsvpFormProps = {
  confirmBy: string;
};

const sizeOptions = [
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
] as const;

export default function RsvpForm({ confirmBy }: RsvpFormProps): JSX.Element {
  const router = useRouter();
  const [toast, setToast] = React.useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attending: "yes",
      dietaryRestrictions: "",
      tshirtSize: "m",
      accessibilityNeeds: "",
      additionalNotes: "",
    },
  });

  React.useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const isExpired = new Date() > new Date(confirmBy);

  const onSubmit = async (values: RsvpFormValues) => {
    if (isExpired) {
      setToast({
        type: "error",
        message: "The confirm-by deadline has passed.",
      });
      return;
    }

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
        throw new Error("Unable to submit RSVP");
      }

      setToast({
        type: "success",
        message: "RSVP submitted successfully. Redirecting to your dashboard.",
      });

      window.setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1000);
    } catch {
      setToast({
        type: "error",
        message: "We couldn’t submit your RSVP. Please try again.",
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
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Are you attending?</span>
            <select
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-950"
              {...register("attending")}
            >
              <option value="yes">Yes, I’m coming</option>
              <option value="no">No, I can’t make it</option>
            </select>
            {errors.attending && (
              <p className="text-sm text-rose-600">{errors.attending.message}</p>
            )}
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
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
              <p className="text-sm text-rose-600">{errors.tshirtSize.message}</p>
            )}
          </label>
        </div>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Dietary restrictions</span>
          <input
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950"
            placeholder="Vegetarian, halal, nut allergy, etc."
            type="text"
            {...register("dietaryRestrictions")}
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Accessibility needs</span>
          <textarea
            className="min-h-28 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950"
            placeholder="Anything we should know to support your experience?"
            {...register("accessibilityNeeds")}
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Additional notes</span>
          <textarea
            className="min-h-28 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950"
            placeholder="Optional logistics, questions, or anything else the team should know."
            {...register("additionalNotes")}
          />
        </label>

        <button
          className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={isExpired || isSubmitting}
          type="submit"
        >
          {isExpired
            ? "RSVP closed"
            : isSubmitting
              ? "Submitting..."
              : "Submit RSVP"}
        </button>
      </form>
    </div>
  );
}
