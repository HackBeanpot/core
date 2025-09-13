import { assertUnreachable } from '../../../common/utils/utils';
import { RSVPStatus } from '../../../common/types';
import { Alert } from 'antd';
import React from 'react';

type RsvpDialogueProps = {
  rsvpStatus: Exclude<RSVPStatus, RSVPStatus.Unconfirmed>;
};

export const RsvpDialogue: React.FC<RsvpDialogueProps> = ({ rsvpStatus }) => {
  if (rsvpStatus === RSVPStatus.Confirmed) {
    return <Confirmed />;
  }

  if (rsvpStatus === RSVPStatus.NotAttending) {
    return <NotAttending />;
  }

  assertUnreachable(rsvpStatus);
};

export const Confirmed: React.FC = () => {
  return (
    <Alert
      showIcon
      type={'success'}
      message={'Attendance Confirmed'}
      description={
        <div data-testid="confirmed-dialog-text">
          We look forward to seeing you the weekend of the event! Stay on the lookout for emails
          regarding logistics closer to the date of the event, and in the meantime if you have any
          questions, don{"'"}t hesitate to email us at core@hackbeanpot.com!
        </div>
      }
    />
  );
};

export const NotAttending: React.FC = () => {
  return (
    <Alert
      type={'info'}
      showIcon
      message={'Not Attending'}
      description={
        <div data-testid="not-attending-dialog-text">
          We{"'"}re sorry that you are not able to attend HackBeanpot 2023, and appreciate you
          letting us know. We hope that you continue to apply to our events in the future!
        </div>
      }
    />
  );
};
