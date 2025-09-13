import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { ConfirmByState, DecisionStatus } from '../../../common/types';
import {
  Admitted,
  DecisionStatusDialogue,
  Declined,
  FailedToConfirm,
  Pending,
  Waitlisted,
} from './DecisionStatusDialogue';
const decisionConfirmByDate = new Date('2052-10-01T22:40:02.000Z');
const decisionConfirmByDatePast = new Date('2012-10-01T22:40:02.000Z');
const decisionConfirmByDateHumanized = 'Tuesday, October 1, 2052';
const decisionConfirmByDatePastHumanized = 'Monday, October 1, 2012';
describe('DecisionStatusDialogue', () => {
  it('renders an Pending component while decisions have not been released', () => {
    render(
      <DecisionStatusDialogue
        decisionStatus={DecisionStatus.Waitlisted}
        confirmBy={decisionConfirmByDate}
        confirmByState={ConfirmByState.Before}
        showDecision={false}
      />
    );
    const pendingDecisionText = screen.getByTestId('pending-dialog-text');
    expect(pendingDecisionText.textContent).toBeTruthy();
  });
  it('renders an Admitted component for applicants who have not yet confirmed attendance', () => {
    render(
      <DecisionStatusDialogue
        decisionStatus={DecisionStatus.Admitted}
        confirmBy={decisionConfirmByDate}
        confirmByState={ConfirmByState.Before}
        showDecision={true}
      />
    );
    const admittedDecisionText = screen.getByTestId('admitted-dialog-text');
    expect(admittedDecisionText.textContent).toBeTruthy();
  });
  it('renders a FailedToConfirm component for applicants who did not confirm attendance in time', () => {
    render(
      <DecisionStatusDialogue
        decisionStatus={DecisionStatus.Admitted}
        confirmBy={decisionConfirmByDatePast}
        confirmByState={ConfirmByState.After}
        showDecision={true}
      />
    );
    const failedToConfirmDecisionText = screen.getByTestId('failed-to-confirm-dialog-text');
    expect(failedToConfirmDecisionText.textContent).toBeTruthy();
  });
  it('renders a waitlisted notice to waitlisted applicants', () => {
    render(
      <DecisionStatusDialogue
        decisionStatus={DecisionStatus.Waitlisted}
        confirmBy={decisionConfirmByDate}
        confirmByState={ConfirmByState.Before}
        showDecision={true}
      />
    );
    const waitlistedDecisionText = screen.getByTestId('waitlisted-dialog-text');
    expect(waitlistedDecisionText.textContent).toBeTruthy();
  });
  it('renders a rejection notice to declined applicants', () => {
    render(
      <DecisionStatusDialogue
        decisionStatus={DecisionStatus.Declined}
        confirmBy={decisionConfirmByDate}
        confirmByState={ConfirmByState.Before}
        showDecision={true}
      />
    );
    const waitlistedDecisionText = screen.getByTestId('declined-dialog-text');
    expect(waitlistedDecisionText.textContent).toBeTruthy();
  });
});
describe('`Admitted` decision component', () => {
  it('renders', () => {
    const admittedDecisionExpectedText =
      "Congratulations, we would love to have you attend this year's event! Please navigate to the Application tab to mark your RSVP status. The deadline to confirm your attendance is Friday, February 16th by 11:59pm.";
    render(
      <DecisionStatusDialogue
        decisionStatus={DecisionStatus.Declined}
        confirmBy={decisionConfirmByDate}
        confirmByState={ConfirmByState.Before}
        showDecision={true}
      />
    );
    render(<Admitted confirmBy={decisionConfirmByDate} />);
    const admittedDecisionText = screen.getByTestId('admitted-dialog-text');
    expect(admittedDecisionText.textContent).toBe(admittedDecisionExpectedText);
  });
});
describe('`Waitlisted` decision component', () => {
  it('renders', () => {
    const waitlistedDecisionExpectedText =
      'You are currently on the waitlist. However if spots open up, we will notify you by email!';
    render(<Waitlisted />);
    const waitlistedDecisionText = screen.getByTestId('waitlisted-dialog-text');
    expect(waitlistedDecisionText.textContent).toBe(waitlistedDecisionExpectedText);
  });
});
describe('`Declined` decision component', () => {
  it('renders', () => {
    const waitlistedDecisionExpectedText =
      "Unfortunately, we had more applicants than we could accept. However, we would still love for you to apply next year! In the meantime, please sign up for our mailing list to stay up to get notified when applications open for next year's event on our website: https://hackbeanpot.com";
    render(<Declined />);
    const waitlistedDecisionText = screen.getByTestId('declined-dialog-text');
    expect(waitlistedDecisionText.textContent).toBe(waitlistedDecisionExpectedText);
  });
});
describe('`FailedToConfirm` decision component', () => {
  it('renders', () => {
    const failedToConfirmDecisionExpectedText =
      'You were accepted to HackBeanpot 2024 but you did not RSVP in time by Friday, February 16th. Please let us know at core@hackbeanpot.com if you would like to be added to the waitlist for if additional spots open up.';
    render(<FailedToConfirm confirmBy={decisionConfirmByDatePast} />);
    const failedToConfirmDecisionText = screen.getByTestId('failed-to-confirm-dialog-text');
    expect(failedToConfirmDecisionText.textContent).toBe(failedToConfirmDecisionExpectedText);
  });
});
describe('`Pending` decision component', () => {
  it('renders', () => {
    const pendingDecisionExpectedText =
      'Thank you for submitting your application, we are currently reviewing it!';
    render(<Pending />);
    const pendingDecisionText = screen.getByTestId('pending-dialog-text');
    expect(pendingDecisionText.textContent).toBe(pendingDecisionExpectedText);
  });
});
