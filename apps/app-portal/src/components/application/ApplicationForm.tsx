"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Path, Resolver } from "react-hook-form";
import { useForm, useWatch } from "react-hook-form";
import { toast, Toaster } from "sonner";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  buildApplicationSchema,
  buildDefaultValues,
  coerceResponse,
  exceedsLimit,
} from "@/lib/application/schema";
import type {
  ApplicationResponses,
  FormSection as FormSectionType,
  RegistrationState,
} from "@/lib/application/types";

import { FormSection } from "./FormSection";

const REGISTRATION_API = "/api/v1/registration";
const AUTOSAVE_DELAY_MS = 2000;

type ApplicationSchemaValues = Record<string, string | string[] | null>;

export function ApplicationForm() {
  const router = useRouter();

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [regState, setRegState] = useState<RegistrationState | null>(null);
  const [sections, setSections] = useState<FormSectionType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveTick, setSaveTick] = useState(0);

  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>();
  // True while a debounced autosave is queued but hasn't been sent yet, so it can be flushed
  // if the page is reloaded/closed before the timer fires.
  const hasPendingSaveRef = useRef(false);
  // The section the applicant is on, sent with every save so a reload (or "Continue
  // application" from the dashboard) brings them back to it.
  const sectionIdRef = useRef<string>();

  // The question set is only known once /api/v1/registration returns the live (possibly
  // admin-edited) form config, so the zod schema has to be built dynamically. This ref lets the
  // resolver always read whatever schema was most recently built, without having to recreate the
  // whole useForm() instance (which would lose in-progress field state) once sections load.
  const schemaRef = useRef<z.ZodTypeAny>(buildApplicationSchema([], "client"));

  const form = useForm<ApplicationSchemaValues>({
    resolver: (values, context, options) => {
      // The schema is only known at runtime (built from the live, possibly admin-edited
      // section list — see the effect below), so it can't be statically typed against
      // ApplicationSchemaValues the way a module-level zod schema normally would be.
      const resolve = zodResolver(
        schemaRef.current as unknown as Parameters<typeof zodResolver>[0],
      ) as Resolver<ApplicationSchemaValues>;
      return resolve(values, context, options);
    },
    defaultValues: {},
    // Errors only appear once the applicant tries to leave a section (see handleNext) — not
    // just from clicking into a field and back out. Fields that already show an error are
    // re-validated as they change (see the watch effect below) so the error clears once fixed.
    mode: "onSubmit",
  });

  // Hydrate from API on mount
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(REGISTRATION_API);
        if (!res.ok) throw new Error();
        const state = (await res.json()) as RegistrationState;
        setRegState(state);
        setSections(state.sections);
        schemaRef.current = buildApplicationSchema(state.sections, "client");
        const responses = { ...state.responses };
        for (const section of state.sections) {
          for (const question of section.questions) {
            if (question.id in responses) {
              responses[question.id] = coerceResponse(
                question,
                responses[question.id],
              );
            }
          }
        }
        form.reset({
          ...buildDefaultValues(state.sections),
          ...responses,
        });
        const savedIndex = state.sections.findIndex(
          (section) => section.id === state.lastSectionId,
        );
        if (savedIndex > 0) setCurrentSectionIndex(savedIndex);
        if (state.updatedAt) setLastSaved(new Date(state.updatedAt));
      } catch {
        toast.error("Could not load your application. Please refresh.");
      } finally {
        setIsLoading(false);
      }
    }
    void load();
  }, [form]);

  // Live "X ago" ticker — forces re-render every 10s when there's a saved timestamp
  useEffect(() => {
    if (!lastSaved) return;
    const id = setInterval(() => setSaveTick((t) => t + 1), 10_000);
    return () => clearInterval(id);
  }, [lastSaved]);

  useEffect(() => {
    sectionIdRef.current = sections[currentSectionIndex]?.id;
  }, [sections, currentSectionIndex]);

  const buildSaveBody = useCallback(
    (sectionId: string | undefined) =>
      JSON.stringify({
        responses: toResponses(form.getValues()),
        lastSectionId: sectionId,
      }),
    [form],
  );

  // Core save — used by both autosave and the manual Save Draft button
  const doSave = useCallback(
    async (
      silent: boolean,
      sectionId: string | undefined = sectionIdRef.current,
    ): Promise<void> => {
      hasPendingSaveRef.current = false;
      setIsSaving(true);
      try {
        const res = await fetch(REGISTRATION_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: buildSaveBody(sectionId),
        });
        if (res.status === 403) {
          if (!silent) {
            const body = (await res.json().catch(() => null)) as {
              error?: string;
            } | null;
            toast.error(body?.error ?? "Registration is not open right now.");
          }
          return;
        }
        if (!res.ok) throw new Error();
        setLastSaved(new Date());
        if (!silent) toast.success("Draft saved.");
      } catch {
        if (!silent) toast.error("Could not save draft.");
      } finally {
        setIsSaving(false);
      }
    },
    [buildSaveBody],
  );

  // Debounced autosave: fires 2s after any field change
  useEffect(() => {
    if (isLoading) return;
    const { unsubscribe } = form.watch((_values, { name }) => {
      // With validation deferred to "Next", re-check a field that's already showing an
      // error as it changes, so the message goes away (or updates) once it's fixed.
      if (name && form.getFieldState(name).error) void form.trigger(name);

      hasPendingSaveRef.current = true;
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(
        () => void doSave(true),
        AUTOSAVE_DELAY_MS,
      );
    });
    return () => {
      unsubscribe();
      clearTimeout(saveTimerRef.current);
    };
  }, [form, isLoading, doSave]);

  // Without this, reloading or closing the tab within the 2s autosave window silently drops
  // the last change — easiest to hit with one-click inputs like checkboxes. keepalive lets
  // the request finish even as the page unloads.
  useEffect(() => {
    if (isLoading) return;
    const flush = () => {
      if (!hasPendingSaveRef.current) return;
      hasPendingSaveRef.current = false;
      clearTimeout(saveTimerRef.current);
      void fetch(REGISTRATION_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: buildSaveBody(sectionIdRef.current),
        keepalive: true,
      }).catch(() => undefined);
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") flush();
    };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isLoading, buildSaveBody]);

  const watchedValues = useWatch({ control: form.control });

  const currentSection = sections[currentSectionIndex];
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === sections.length - 1;

  // Answers past their character/word limit can't be submitted, so hide the "Save draft"
  // button and saved status while any exist rather than implying the draft is good to go.
  const hasOverLimitAnswer = sections.some((section) =>
    section.questions.some((q) => exceedsLimit(q, watchedValues[q.id])),
  );

  const handleSaveDraft = async () => {
    clearTimeout(saveTimerRef.current);
    await doSave(false);
  };

  const handleBack = () => {
    const previousIndex = currentSectionIndex - 1;
    clearTimeout(saveTimerRef.current);
    void doSave(true, sections[previousIndex]?.id);
    setCurrentSectionIndex(previousIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = async () => {
    setIsNavigating(true);
    const fieldIds = currentSection.questions.map(
      (q) => q.id as Path<ApplicationSchemaValues>,
    );
    const isValid = await form.trigger(fieldIds);
    if (!isValid) {
      setIsNavigating(false);
      return;
    }
    // trigger() validates the *entire* schema when a resolver is used (documented
    // react-hook-form behavior) regardless of which field names are passed in, which
    // sets "required" errors for every other untouched section too. This section is
    // confirmed valid, so clear those premature errors — later sections get validated
    // for real when the user actually tries to leave them (or on final submit).
    form.clearErrors();
    clearTimeout(saveTimerRef.current);
    const nextIndex = currentSectionIndex + 1;
    await doSave(true, sections[nextIndex]?.id);
    setCurrentSectionIndex(nextIndex);
    setIsNavigating(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitClick = async () => {
    // Validate ALL fields — user may have changed something on a previous section
    const isValid = await form.trigger();
    if (!isValid) {
      // Navigate to the first section that has errors
      const errors = form.formState.errors;
      for (let i = 0; i < sections.length; i++) {
        const hasError = sections[i].questions.some(
          (q) => errors[q.id as keyof ApplicationSchemaValues],
        );
        if (hasError) {
          setCurrentSectionIndex(i);
          toast.error("Please complete all required fields before submitting.");
          return;
        }
      }
      // trigger() returned false but no section mapped to an error — still block submit
      toast.error("Please complete all required fields before submitting.");
      return;
    }
    setShowConfirmDialog(true);
  };

  const handleSubmitConfirm = async () => {
    setShowConfirmDialog(false);
    setIsSubmitting(true);
    try {
      const res = await fetch(REGISTRATION_API, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses: toResponses(form.getValues()) }),
      });
      if (res.ok) {
        toast.success("Application submitted!");
        router.push("/dashboard");
        return;
      }
      if (res.status === 400) {
        toast.error(
          "Please fix the errors in your application before submitting.",
        );
        return;
      }
      if (res.status === 403) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        toast.error(body?.error ?? "Registration is not open right now.");
        return;
      }
      if (res.status === 409) {
        toast.message("Your application has already been submitted.");
        router.push("/dashboard");
        return;
      }
      throw new Error();
    } catch {
      toast.error("Could not submit your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingSkeleton />;

  if (regState?.registrationStatus === "before_open") {
    return <BeforeOpenScreen opensAt={regState.opensAt} />;
  }

  if (
    regState?.registrationStatus === "closed" &&
    regState.applicationStatus !== "submitted"
  ) {
    return <ClosedScreen />;
  }

  const isReadOnly =
    regState?.registrationStatus === "closed" &&
    regState?.applicationStatus === "submitted";

  const isAlreadySubmitted =
    regState?.registrationStatus === "open" &&
    regState?.applicationStatus === "submitted";

  // ── Read-only: show all sections at once ────────────────────────────────
  if (isReadOnly) {
    return (
      <>
        <Toaster richColors position="top-center" />
        <div className="mb-6 rounded-lg border border-starlightBlueLight bg-skyBlue/20 px-4 py-3 text-sm text-starlightBlueLight">
          Your application has been submitted and registration is now closed.
          This is a read-only view of what you submitted.
        </div>
        <Form {...form}>
          <form className="space-y-8">
            {sections.map((section, i) => (
              <FormSection
                key={section.id}
                section={section}
                control={form.control}
                disabled={true}
                sectionIndex={i}
                totalSections={sections.length}
              />
            ))}
          </form>
        </Form>
      </>
    );
  }

  // ── Paginated editable view (draft or submitted+open) ───────────────────

  // void saveTick so React re-renders every 10s to refresh the "X ago" label
  void saveTick;

  const saveStatusLabel = isSaving
    ? "Saving…"
    : lastSaved
      ? `Saved ${formatSaved(lastSaved)}`
      : null;

  return (
    <>
      <Toaster richColors position="top-center" />

      {/* top bar: section label + autosave status + Save Draft */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-pavement">
          Section {currentSectionIndex + 1} of {sections.length}
          <span className="ml-1 font-normal text-charcoalFogLight">
            · {currentSection.title}
          </span>
        </p>
        {!hasOverLimitAnswer && (
          <div className="flex shrink-0 items-center gap-3">
            {saveStatusLabel && (
              <span className="text-xs text-charcoalFogLight">
                {saveStatusLabel}
              </span>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void handleSaveDraft()}
              disabled={isSaving || isLoading}
            >
              {isSaving ? "Saving…" : "Save draft"}
            </Button>
          </div>
        )}
      </div>

      {/* progress bar */}
      <div className="mb-8 flex gap-1.5">
        {sections.map((_, i) => (
          <div
            key={i}
            className={[
              "h-1.5 flex-1 rounded-full transition-colors duration-300",
              i < currentSectionIndex
                ? "bg-teal"
                : i === currentSectionIndex
                  ? "bg-charcoalFogLight"
                  : "bg-heather",
            ].join(" ")}
          />
        ))}
      </div>

      {/* submitted+open banner */}
      {isAlreadySubmitted && (
        <div className="mb-6 rounded-lg border border-green bg-green/20 px-4 py-3 text-sm text-darkGreen">
          Your application has been submitted. You can still make changes
          between now and when registration closes.
        </div>
      )}

      <Form {...form}>
        <form>
          <FormSection
            section={currentSection}
            control={form.control}
            disabled={false}
            sectionIndex={currentSectionIndex}
            totalSections={sections.length}
          />

          {/* bottom navigation */}
          <div className="mt-8 flex items-center justify-between border-t border-heather pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={isFirstSection || isNavigating || isSubmitting}
            >
              ← Back
            </Button>

            {isLastSection ? (
              <Button
                type="button"
                onClick={() => void handleSubmitClick()}
                disabled={
                  isSubmitting || isNavigating || !form.formState.isValid
                }
              >
                {isSubmitting ? "Submitting…" : "Submit application"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => void handleNext()}
                disabled={isNavigating || isSubmitting}
              >
                {isNavigating ? "Saving…" : "Next →"}
              </Button>
            )}
          </div>
        </form>
      </Form>

      {/* submit confirmation dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              You can still edit your answers until registration closes.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={() => void handleSubmitConfirm()}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting…" : "Submit application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function toResponses(values: ApplicationSchemaValues): ApplicationResponses {
  const responses: ApplicationResponses = {};
  for (const [key, value] of Object.entries(values)) {
    if (Array.isArray(value)) {
      responses[key] = value;
    } else if (typeof value === "string") {
      responses[key] = value === "" ? null : value;
    } else {
      responses[key] = null;
    }
  }
  return responses;
}

// helper functions/components below

function formatOpensAt(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatSaved(date: Date): string {
  const secs = Math.floor((Date.now() - date.getTime()) / 1000);
  if (secs < 5) return "just now";
  if (secs < 60) return `${String(secs)}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${String(mins)}m ago`;
  return `${String(Math.floor(mins / 60))}h ago`;
}

//

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 animate-pulse rounded-md bg-heather/20" />
      <div className="h-64 animate-pulse rounded-lg bg-heather/20" />
    </div>
  );
}

function BeforeOpenScreen({ opensAt }: { opensAt: string }) {
  return (
    <div className="rounded-lg border border-heather bg-skyBlue/20 px-8 py-12 text-center">
      <h2 className="text-xl font-semibold text-black">
        Applications aren&apos;t open yet
      </h2>
      <p className="mt-3 text-starlightBlueLight">
        Applications open on <strong>{formatOpensAt(opensAt)}</strong>. Check
        back then!
      </p>
    </div>
  );
}

function ClosedScreen() {
  return (
    <div className="rounded-lg border border-heather bg-skyBlue/20 px-8 py-12 text-center">
      <h2 className="text-xl font-semibold text-starlightBlueLight">
        Applications are closed
      </h2>
      <p className="mt-3 text-charcoalFogLight">
        The application window has ended. Follow @HackBeanpot on social media
        for updates on future events.
      </p>
    </div>
  );
}
