import {
  StatusApiResponse,
  RegistrationApiRequest,
  User,
  DatesApiResponse,
  RegistrationApiResponse,
  ApplicantsApiResponse,
  PostAcceptanceApiRequest,
} from "./types";
import Axios, { AxiosResponse } from "axios";
import { TablePaginationConfig } from "antd";
import { TableFilters, TableSorter } from "../components/admin-tabs/Applicants";

export function getAdminById(id: number) {
  return Axios.get<User>(`/api/v1/admin/${id}`);
}

export function updateAdminById(id: number, user: User) {
  Axios.post(`/api/v1/admin/${id}`, user);
}

export function getAllAdmins() {
  return Axios.get<Array<User>>(`/api/v1/admin`);
}

export const getUser = (): Promise<AxiosResponse<User>> =>
  Axios.get(`/api/v1/user`);

export const updateApplicantById = (
  id: string,
  user: User
): Promise<AxiosResponse> => Axios.post(`/api/v1/applicants/${id}`, user);

export const getApplicantResponses = (): Promise<
  AxiosResponse<RegistrationApiResponse>
> => Axios.get("/api/v1/registration");

export const addApplicantResponses = (
  responses: RegistrationApiRequest
): Promise<AxiosResponse<string | null>> =>
  Axios.post(`/api/v1/registration`, responses, { validateStatus: () => true });

export const updateApplicantResponses = (
  responses: RegistrationApiRequest
): Promise<AxiosResponse<string | null>> =>
  Axios.put(`/api/v1/registration`, responses, { validateStatus: () => true });

export const saveApplicantResponses = (
  responses: RegistrationApiRequest
): Promise<AxiosResponse<string | null>> =>
  Axios.patch(`/api/v1/registration`, responses, {
    validateStatus: () => true,
  });

export function getAllApplicants(
  pagination: TablePaginationConfig,
  filters: TableFilters,
  sorter: TableSorter
): Promise<AxiosResponse<ApplicantsApiResponse>> {
  return Axios.get<ApplicantsApiResponse>(`/api/v1/applicants`, {
    params: {
      page: pagination.current,
      pageSize: pagination.pageSize,
      filters,
      sorter,
    },
  });
}

export function getStats() {
  return Axios.get("/api/v1/stats");
}

export function getStatus(): Promise<AxiosResponse<StatusApiResponse>> {
  return Axios.get(`/api/v1/status`);
}

export function getConfirmBy(): Promise<AxiosResponse<DatesApiResponse>> {
  return Axios.get(`/api/v1/dates/confirm-by`);
}

export function updateConfirmBy(
  date: string
): Promise<AxiosResponse<DatesApiResponse>> {
  return Axios.post(`/api/v1/dates/confirm-by`, { date });
}

export function getRegistrationClosed(): Promise<
  AxiosResponse<DatesApiResponse>
> {
  return Axios.get(`/api/v1/dates/registration-closed`);
}

export function updateRegistrationClosed(
  date: string
): Promise<AxiosResponse<DatesApiResponse>> {
  return Axios.post(`/api/v1/dates/registration-closed`, { date });
}

export function getRegistrationOpen(): Promise<
  AxiosResponse<DatesApiResponse>
> {
  return Axios.get(`/api/v1/dates/registration-open`);
}

export function updateRegistrationOpen(
  date: string
): Promise<AxiosResponse<DatesApiResponse>> {
  return Axios.post(`/api/v1/dates/registration-open`, { date });
}

export function updateShowDecision(
  showDecision: boolean
): Promise<AxiosResponse<boolean>> {
  return Axios.post(`/api/v1/show-decision`, { showDecision: showDecision });
}

export function getShowDecision(): Promise<AxiosResponse<boolean>> {
  return Axios.get(`/api/v1/show-decision`);
}

export function updatePostAcceptanceFormResponses(
  body: PostAcceptanceApiRequest
): Promise<AxiosResponse> {
  return Axios.post(`/api/v1/post-acceptance`, body, {
    validateStatus: () => true,
  });
}
