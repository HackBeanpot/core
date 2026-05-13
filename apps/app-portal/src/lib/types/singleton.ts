export enum SingletonKey {
  RegistrationOpen = "registration-open",
  RegistrationClosed = "registration-closed",
  ConfirmBy = "confirm-by",
  ShowDecision = "show-decision",
}

export type SingletonValue = string | boolean | number | null;

export interface SingletonRecord {
  key: SingletonKey;
  value: SingletonValue;
  updatedAt?: string;
}
