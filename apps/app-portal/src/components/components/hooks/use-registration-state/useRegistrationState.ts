import { isAfterRegistrationClosed, isBeforeRegistrationOpens } from '../../../common/utils/utils';

export enum RegistrationState {
  BeforeOpen = 'Before',
  Open = 'Open',
  Closed = 'Closed',
}

type UseRegistrationStateProps = {
  registrationClosed: Date;
  registrationOpen: Date;
};

export const useRegistrationState = ({
  registrationClosed,
  registrationOpen,
}: UseRegistrationStateProps): RegistrationState => {
  const isBeforeOpen = isBeforeRegistrationOpens(registrationOpen);
  const isAfterClose = isAfterRegistrationClosed(registrationClosed);
  if (isBeforeOpen && !isAfterClose) {
    return RegistrationState.BeforeOpen;
  } else if (!isBeforeOpen && isAfterClose) {
    return RegistrationState.Closed;
  } else if (!isBeforeOpen && !isAfterClose) {
    return RegistrationState.Open;
  } else {
    throw new Error('invalid registration date configuration');
  }
};
