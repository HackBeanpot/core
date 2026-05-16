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
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  questions: readonly Question[];
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
  string | string[] | File | null | undefined
>;
