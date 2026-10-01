export type QuestionType =
  | "short_text"
  | "long_text"
  | "select"
  | "multi_select"
  | "file_upload";

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  options?: readonly QuestionOption[];
  required: boolean;
  description?: string;
  /** Max character length; only meaningful for short_text/long_text. */
  maxLength?: number;
  /** Max word count; only meaningful for long_text. */
  maxWords?: number;
  /** Accepted MIME types; only meaningful for file_upload. Defaults to the app-wide allow-list. */
  accept?: readonly string[];
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export type ApplicationResponses = Record<string, string | string[] | null>;

export interface ApplicationDraft {
  responses: ApplicationResponses;
  updatedAt: string;
  status: "draft";
}

export interface ApplicationSubmission {
  responses: ApplicationResponses;
  submittedAt: string;
  status: "submitted";
}

export type ApplicationFormValues = Record<
  string,
  string | string[] | null | undefined
>;

export type RegistrationStatus = "before_open" | "open" | "closed";

export interface RegistrationState {
  registrationStatus: RegistrationStatus;
  opensAt: string;
  closesAt: string;
  applicationStatus: "draft" | "submitted";
  responses: ApplicationResponses;
  updatedAt: string | null;
  /** The live, admin-editable question set this application should render/validate against. */
  sections: FormSection[];
}
