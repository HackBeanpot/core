import type {
  ApplicationDraft,
  ApplicationResponses,
  ApplicationSubmission,
  RegistrationState,
} from "./types";

// Change these values to test every application state end-to-end.
// registrationStatus: "before_open" | "open" | "closed"
// applicationStatus:  "draft" | "submitted"
const MOCK_REGISTRATION_STATE: RegistrationState = {
  registrationStatus: "closed",
  opensAt: "2026-09-01T00:00:00Z",
  closesAt: "2026-12-01T00:00:00Z",
  applicationStatus: "submitted",
  responses: {},
  updatedAt: null,
};

export async function getRegistrationState(): Promise<RegistrationState> {
  return MOCK_REGISTRATION_STATE;
}

export async function isRegistrationOpen(): Promise<boolean> {
  const state = await getRegistrationState();
  return state.registrationStatus === "open";
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
