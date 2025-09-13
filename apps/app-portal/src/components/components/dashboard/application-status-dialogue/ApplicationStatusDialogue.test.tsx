import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { ApplicationStatus } from '../../../common/types';
import { RegistrationState } from '../../hooks/use-registration-state/useRegistrationState';
import {
  ApplicationStatusDialogue,
  DeadlinePassed,
  Incomplete,
  Submitted,
} from './ApplicationStatusDialogue';

describe('ApplicationStatusDialogue component', () => {
  const passedRegistrationCloseDate = new Date('2012-10-01T22:40:02.000Z');
  const upcomingRegistrationCloseDate = new Date('2052-10-01T22:40:02.000Z');
  describe('with a submitted application status', () => {
    it('renders the Submitted component when registrationState is open', () => {
      render(
        <ApplicationStatusDialogue
          applicationStatus={ApplicationStatus.Submitted}
          registrationClosed={upcomingRegistrationCloseDate}
          registrationState={RegistrationState.Open}
        />
      );
      const submittedDialogText = screen.getByTestId('submitted-dialog-text');
      expect(submittedDialogText.textContent).toBeTruthy();
    });
    it('renders the Submitted component when registrationState is closed', () => {
      render(
        <ApplicationStatusDialogue
          applicationStatus={ApplicationStatus.Submitted}
          registrationClosed={new Date(passedRegistrationCloseDate)}
          registrationState={RegistrationState.Closed}
        />
      );
      const submittedDialogText = screen.getByTestId('submitted-dialog-text');
      expect(submittedDialogText.textContent).toBeTruthy();
    });
  });
  describe('with a incomplete application status ', () => {
    it('renders the app Incomplete component when registrationState is open', () => {
      render(
        <ApplicationStatusDialogue
          applicationStatus={ApplicationStatus.Incomplete}
          registrationClosed={upcomingRegistrationCloseDate}
          registrationState={RegistrationState.Open}
        />
      );
      const incompleteAppText = screen.getByTestId('incomplete-dialog-text');
      expect(incompleteAppText.textContent).toBeTruthy();
    });
    it('renders the DeadlinePassed component when registrationState is closed', () => {
      render(
        <ApplicationStatusDialogue
          applicationStatus={ApplicationStatus.Incomplete}
          registrationClosed={passedRegistrationCloseDate}
          registrationState={RegistrationState.Closed}
        />
      );
      const deadlinePassedText = screen.getByTestId('deadline-passed-dialog-text');
      expect(deadlinePassedText.textContent).toBeTruthy();
    });
  });
  describe('Application `Incomplete` component', () => {
    it('renders', () => {
      const incompleteAppExpectedText =
        'You still need to complete your application! If you do not complete your application before Monday, October 1, 2012, you will not be considered for admission.';
      render(<Incomplete registrationClosed={passedRegistrationCloseDate} />);
      const incompleteAppText = screen.getByTestId('incomplete-dialog-text');
      expect(incompleteAppText.textContent).toBe(incompleteAppExpectedText);
    });
  });
  describe('Application `DeadlinePassed` component', () => {
    it('renders', () => {
      const deadlinePassedExpectedText =
        "Unfortunately, the deadline to apply to this year's event was Monday, October 1, 2012. In the meantime, please sign up for our mailing list to stay up to get notified when applications open for next year's event!";
      render(<DeadlinePassed registrationClosed={passedRegistrationCloseDate} />);
      const deadlinePassedText = screen.getByTestId('deadline-passed-dialog-text');
      expect(deadlinePassedText.textContent).toBe(deadlinePassedExpectedText);
    });
  });
  describe('Application `Submitted` component', () => {
    it('renders', () => {
      const submittedAppExpectedText =
        'Thank you for submitting your application! We will notify you by email when there is a change in your application status.';
      render(<Submitted />);
      const submittedAppText = screen.getByTestId('submitted-dialog-text');
      expect(submittedAppText.textContent).toBe(submittedAppExpectedText);
    });
  });
});
