import { isBefore } from 'date-fns';
import { ConfirmByState } from '../types';

export function isBeforeRegistrationOpens(registrationOpenDate: Date): boolean {
  const NOW = new Date();
  return isBefore(NOW, registrationOpenDate);
}

export function isAfterRegistrationClosed(registrationClosed: Date): boolean {
  const NOW = new Date();
  return isBefore(registrationClosed, NOW);
}

export function getConfirmByState(confirmBy: Date): ConfirmByState {
  const NOW = new Date();
  const isBeforeState = isBefore(NOW, confirmBy);
  if (isBeforeState) {
    return ConfirmByState.Before;
  }
  return ConfirmByState.After;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}
