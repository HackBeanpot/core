/**
 * Singleton values for date-based keys are stored as ISO 8601 strings.
 *
 * Example:
 * "2026-02-15T18:00:00.000Z"
 */

export enum SingletonKey {
  RegistrationOpen = "registration-open",
  RegistrationClosed = "registration-closed",
  ConfirmBy = "confirm-by",
  ShowDecision = "show-decision",
}

export interface SingletonRecord {
  _id: SingletonKey;
  key: SingletonKey;
  value: unknown;
  updatedAt: Date;
  updatedBy: string;
}
