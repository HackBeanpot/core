import { ApplicationStatus, DecisionStatus, RSVPStatus } from '../../../common/types';
import { Alert } from 'antd';
import React from 'react';
import {
  RegistrationState,
  useRegistrationState,
} from '../../hooks/use-registration-state/useRegistrationState';
import { ApplicationStatusDialogue } from '../application-status-dialogue/ApplicationStatusDialogue';
import { DecisionStatusDialogue } from '../decision-status-dialogue/DecisionStatusDialogue';
import { RsvpDialogue } from '../rsvp-dialogue/RsvpDialogue';
import { useConfirmByState } from '../../hooks/use-confirm-by-state/useConfirmByState';

type StatusDialogueProps = {
  applicationStatus: ApplicationStatus;
  // might not exist because of backwards compatibility
  decisionStatus?: DecisionStatus;
  rsvpStatus: RSVPStatus;
  confirmBy: Date;
  registrationClosed: Date;
  registrationOpen: Date;
  showDecision: boolean;
};

export const StatusDialogue: React.FC<StatusDialogueProps> = ({
  registrationClosed,
  registrationOpen,
  confirmBy,
  applicationStatus,
  decisionStatus,
  rsvpStatus,
  showDecision,
}) => {
  const registrationState = useRegistrationState({ registrationClosed, registrationOpen });
  const confirmByState = useConfirmByState({ confirmBy });

  if (registrationState === RegistrationState.BeforeOpen) {
    return <ApplyLater registrationOpen={format(registrationOpen)} />;
  }

  // if they don't yet have a decision, render their application status
  if (!decisionStatus || decisionStatus === DecisionStatus.Undecided) {
    return (
      <ApplicationStatusDialogue
        applicationStatus={applicationStatus}
        registrationClosed={registrationClosed}
        registrationState={registrationState}
      />
    );
  }

  // if they don't yet have an rsvp, render their decision
  if (!rsvpStatus || rsvpStatus === RSVPStatus.Unconfirmed) {
    return (
      <DecisionStatusDialogue
        decisionStatus={decisionStatus}
        confirmBy={confirmBy}
        confirmByState={confirmByState}
        showDecision={showDecision}
      />
    );
  }

  // they must have an rsvp, so render that
  return <RsvpDialogue rsvpStatus={rsvpStatus} />;
};

export const ApplyLater = ({ registrationOpen }: { registrationOpen: string }) => {
  return (
    <Alert
      showIcon
      type="info"
      message={
        <div data-testid="apply-later-dialog-text">
          Registration Opens <strong>{registrationOpen}</strong>
        </div>
      }
      description="Please come back after registration opens to complete your application!"
    />
  );
};

const OPTIONS = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
} as const;
export const format = (d: Date): string => d.toLocaleDateString('en-US', OPTIONS);
