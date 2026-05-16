"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

import { Form } from "@/components/ui/form";
import { APPLICATION_SECTIONS } from "@/lib/application/questions";
import {
  applicationSchema,
  createDefaultValues,
  type ApplicationSchemaValues,
} from "@/lib/application/schema";
import type { ApplicationResponses } from "@/lib/application/types";

import { FormSection } from "./FormSection";
import { SubmitBar } from "./SubmitBar";

const REGISTRATION_API = "/api/v1/registration";

function toResponses(values: ApplicationSchemaValues): ApplicationResponses {
  const responses: ApplicationResponses = {};
  for (const [key, value] of Object.entries(values)) {
    if (value instanceof File) {
      continue;
    }
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

export function ApplicationForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState(true);

  const form = useForm<ApplicationSchemaValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: createDefaultValues(),
    mode: "onBlur",
  });

  const loadDraft = useCallback(async () => {
    setIsLoadingDraft(true);
    try {
      const res = await fetch(REGISTRATION_API);
      if (res.status === 501) {
        return;
      }
      if (!res.ok) {
        throw new Error("Failed to load draft");
      }
      const draft = (await res.json()) as { responses?: ApplicationResponses };
      if (draft.responses) {
        form.reset({ ...createDefaultValues(), ...draft.responses });
      }
    } catch {
      toast.error("Could not load your saved draft.");
    } finally {
      setIsLoadingDraft(false);
    }
  }, [form]);

  useEffect(() => {
    void loadDraft();
  }, [loadDraft]);

  const saveDraft = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(REGISTRATION_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses: toResponses(form.getValues()) }),
      });
      if (res.status === 501) {
        toast.message("Draft save is not available yet.");
        return;
      }
      if (!res.ok) {
        throw new Error("Failed to save draft");
      }
      toast.success("Draft saved.");
    } catch {
      toast.error("Could not save your draft.");
    } finally {
      setIsSaving(false);
    }
  };

  const submitApplication = form.handleSubmit(async (values) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(REGISTRATION_API, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses: toResponses(values) }),
      });
      if (res.status === 501) {
        toast.message("Application submission is not available yet.");
        return;
      }
      if (!res.ok) {
        throw new Error("Failed to submit application");
      }
      toast.success("Application submitted!");
    } catch {
      toast.error("Could not submit your application.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <>
      <Toaster richColors position="top-center" />
      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            void submitApplication();
          }}
        >
          {APPLICATION_SECTIONS.map((section) => (
            <FormSection
              key={section.id}
              section={section}
              control={form.control}
              disabled={isLoadingDraft}
            />
          ))}

          <SubmitBar
            onSaveDraft={() => void saveDraft()}
            onSubmit={() => void submitApplication()}
            isSaving={isSaving}
            isSubmitting={isSubmitting}
            disabled={isLoadingDraft}
          />
        </form>
      </Form>
    </>
  );
}
