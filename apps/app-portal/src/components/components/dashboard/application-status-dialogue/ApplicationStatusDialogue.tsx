import { ApplicationStatus } from '../../../common/types';
import { Alert, Button } from 'antd';
import Link from 'next/link';
import { format } from '../status-dialogue/StatusDialogue';
import React from 'react';
import { RegistrationState } from '../../hooks/use-registration-state/useRegistrationState';
import { assertUnreachable } from '../../../common/utils/utils';

type ApplicationStatusDialogueProps = {
  applicationStatus: ApplicationStatus;
  registrationClosed: Date;
  registrationState: Exclude<RegistrationState, RegistrationState.BeforeOpen>;
};

export const ApplicationStatusDialogue: React.FC<ApplicationStatusDialogueProps> = ({
  applicationStatus,
  registrationClosed,
  registrationState,
}) => {
  if (applicationStatus === ApplicationStatus.Submitted) {
    return <Submitted />;
  }

  if (applicationStatus === ApplicationStatus.Incomplete) {
    switch (registrationState) {
      case RegistrationState.Closed:
        return <DeadlinePassed registrationClosed={registrationClosed} />;
      case RegistrationState.Open:
        return <Incomplete registrationClosed={registrationClosed} />;
      default:
        assertUnreachable(registrationState);
    }
  }

  assertUnreachable(applicationStatus);
};

type IncompleteProps = {
  registrationClosed: Date;
};
export const Incomplete: React.FC<IncompleteProps> = ({ registrationClosed }) => {
  const date = format(registrationClosed);
  return (
    <>
      <Alert
        type="warning"
        showIcon
        message="Incomplete"
        description={
          <div data-testid="incomplete-dialog-text">
            You still need to complete your application! If you do not complete your application
            before <strong>{date}</strong>, you will not be considered for admission.
          </div>
        }
      />
      <Link href="/application" passHref>
        <Button type={'primary'} style={{ marginTop: '10px' }}>
          Go to application
        </Button>
      </Link>
    </>
  );
};

export const DeadlinePassed: React.FC<IncompleteProps> = ({ registrationClosed }) => {
  const date = format(registrationClosed);
  return (
    <Alert
      type="error"
      message="Registration Deadline Passed"
      description={
        <div data-testid="deadline-passed-dialog-text">
          Unfortunately, the deadline to apply to this year{"'"}s event was <strong>{date}</strong>.
          In the meantime, please sign up for our mailing list to stay up to get notified when
          applications open for next year{"'"}s event!
        </div>
      }
    />
  );
};

export const Submitted: React.FC = () => {
  return (
    <Alert
      type="info"
      showIcon
      message="Application Submitted"
      description={
        <div data-testid="submitted-dialog-text">
          Thank you for submitting your application! We will notify you by email when there is a
          change in your application status.
        </div>
      }
    />
  );
};
