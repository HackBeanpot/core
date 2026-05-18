import type {
  ApplicationDraft,
  ApplicationResponses,
  ApplicationSubmission,
} from "./types";

/**
 * Reads the registration-open flag from the singleton collection.
 * Stubbed true until Mongo singleton lookup is wired up.
 */
export async function isRegistrationOpen(): Promise<boolean> {
  return true;
}

/** @todo Persist draft to MongoDB */
export async function getDraft(
  userId: string,
): Promise<ApplicationDraft | null> {
  void userId;
  return null;
}

/** @todo Persist draft to MongoDB */
export async function saveDraft(
  userId: string,
  responses: ApplicationResponses,
): Promise<ApplicationDraft> {
  void userId;
  return {
    responses,
    updatedAt: new Date().toISOString(),
    status: "draft",
  };
}

/** @todo Persist submission to MongoDB */
export async function submit(
  userId: string,
  responses: ApplicationResponses,
): Promise<ApplicationSubmission> {
  void userId;
  return {
    responses,
    submittedAt: new Date().toISOString(),
    status: "submitted",
  };
}
