import { ConfirmByState, DecisionStatus } from '../../../common/types';
import React from 'react';
import { assertUnreachable } from '../../../common/utils/utils';
import { Alert, Button } from 'antd';
import Link from 'next/link';
import { formatDate } from '../../application/PostAcceptanceForm';

type DecisionStatusDialogueProps = {
  decisionStatus: Exclude<DecisionStatus, DecisionStatus.Undecided>;
  confirmBy: Date;
  confirmByState: ConfirmByState;
  showDecision: boolean;
};

export const DecisionStatusDialogue: React.FC<DecisionStatusDialogueProps> = ({
  decisionStatus,
  confirmBy,
  confirmByState,
  showDecision,
}) => {
  if (!showDecision) {
    return <Pending />;
  }
  if (decisionStatus === DecisionStatus.Admitted) {
    switch (confirmByState) {
      case ConfirmByState.After:
        // maybe we could show a "failed to confirm" in the future
        return <FailedToConfirm confirmBy={confirmBy} />;
      case ConfirmByState.Before:
        return <Admitted confirmBy={confirmBy} />;
      default:
        assertUnreachable(confirmByState);
    }
  }

  if (decisionStatus === DecisionStatus.Waitlisted) {
    return <Waitlisted />;
  }

  if (decisionStatus === DecisionStatus.Declined) {
    return <Declined />;
  }

  assertUnreachable(decisionStatus);
};

type AdmittedProps = {
  confirmBy: Date;
};
export const Admitted: React.FC<AdmittedProps> = ({ confirmBy }) => {
  return (
    <>
      <Alert
        type="success"
        showIcon
        message="Admitted"
        description={
          <div data-testid="admitted-dialog-text">
            Congratulations, we would love to have you attend this year{"'"}s event! Please navigate
            to the <strong>Application</strong> tab to mark your RSVP status. The deadline to
            confirm your attendance is <strong>{formatDate(confirmBy)}</strong>.
          </div>
        }
      />
      <Link href="/application" passHref>
        <Button type={'primary'} style={{ marginTop: '10px' }}>
          Go to RSVP form
        </Button>
      </Link>
    </>
  );
};

export const Waitlisted: React.FC = () => {
  return (
    <Alert
      type="warning"
      showIcon
      message={'Waitlisted'}
      description={
        <div data-testid="waitlisted-dialog-text">
          You are currently on the waitlist. However if spots open up, we will notify you by email!
        </div>
      }
    />
  );
};

export const Declined: React.FC = () => {
  return (
    <Alert
      type={'error'}
      message={'Declined'}
      description={
        <div data-testid="declined-dialog-text">
          Unfortunately, we had more applicants than we could accept. However, we would still love
          for you to apply next year! In the meantime, please sign up for our mailing list to stay
          up to get notified when applications open for next year{"'"}s event on our website:{' '}
          <a target="_blank" href="https://hackbeanpot.com/" rel="noopener noreferrer">
            https://hackbeanpot.com
          </a>
        </div>
      }
    />
  );
};

export const FailedToConfirm: React.FC<AdmittedProps> = ({ confirmBy }) => {
  return (
    <Alert
      type={'warning'}
      showIcon
      message={'Failed to confirm'}
      description={
        <div data-testid="failed-to-confirm-dialog-text">
          <p>
            You were accepted to HackBeanpot 2024 but you did not RSVP in time by
            <strong> Friday, February 16th. </strong>Please let us know at core@hackbeanpot.com if
            you would like to be added to the waitlist for if additional spots open up.
          </p>
        </div>
      }
    />
  );
};

export const Pending: React.FC = () => {
  return (
    <Alert
      type="warning"
      message={'Pending'}
      showIcon
      description={
        <div data-testid="pending-dialog-text">
          Thank you for submitting your application, we are currently reviewing it!
        </div>
      }
    />
  );
};
