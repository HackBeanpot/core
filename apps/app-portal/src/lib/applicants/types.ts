import type { ObjectId } from "mongodb";

import type {
  ApplicationStatus,
  DecisionStatus,
  RsvpStatus,
} from "@/lib/types/user";
import type {
  ApplicationResponse,
  PostAcceptanceResponse,
} from "@/lib/types/application";

export interface ApplicantSummary {
  id: string;
  email: string;
  name?: string;
  applicationStatus: ApplicationStatus;
  decisionStatus?: DecisionStatus;
  rsvpStatus: RsvpStatus;
  appSubmissionTime?: string;
  lastSavedAt?: string;
}

export interface ApplicantDoc {
  _id: ObjectId;
  email: string;
  applicationStatus: ApplicationStatus;
  decisionStatus?: DecisionStatus;
  rsvpStatus: RsvpStatus;
  isAdmin?: boolean;
  appSubmissionTime?: string;
  rsvpSubmissionTime?: string;
  lastSavedAt?: string;
  applicationResponses?: ApplicationResponse;
  postAcceptanceResponses?: PostAcceptanceResponse;
  updatedAt?: string;
  updatedBy?: string;
}

export interface UploadedFile {
  id: string;
  filename: string;
}

export interface ApplicantDetail extends ApplicantSummary {
  applicationResponses?: ApplicationResponse;
  postAcceptanceResponses?: PostAcceptanceResponse;
  rsvpSubmissionTime?: string;
  resume?: UploadedFile;
  updatedAt?: string;
  updatedBy?: string;
}

export interface ApplicantFilters {
  search?: string;
  applicationStatus?: ApplicationStatus;
  decisionStatus?: DecisionStatus;
  rsvpStatus?: RsvpStatus;
}

export const SORT_FIELDS = [
  "name",
  "email",
  "appSubmissionTime",
  "lastSavedAt",
] as const;
export type ApplicantSortField = (typeof SORT_FIELDS)[number];

export interface ApplicantListParams {
  filters: ApplicantFilters;
  sortBy: ApplicantSortField;
  sortDir: "asc" | "desc";
  page: number;
  pageSize: number;
}

export interface ApplicantUpdate {
  decisionStatus?: DecisionStatus;
  rsvpStatus?: RsvpStatus;
}

export interface ApplicantListResult {
  rows: ApplicantSummary[];
  total: number;
  page: number;
  pageSize: number;
}
