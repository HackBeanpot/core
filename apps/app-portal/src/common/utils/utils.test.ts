import { describe, expect, test } from '@jest/globals';
import { ConfirmByState } from '../types';
import { getConfirmByState, isAfterRegistrationClosed, isBeforeRegistrationOpens } from './utils';

const mockSystemDate = (d: Date) => {
  jest.useFakeTimers().setSystemTime(d.getTime());
};

describe('confirm by tests', () => {
  const confirmDate = new Date('1/21/2023');

  test('before', () => {
    // if the current date is jan 1, and the confirm date is jan 21, it is Before confirm date
    mockSystemDate(new Date('1/1/2023'));
    expect(getConfirmByState(confirmDate)).toBe(ConfirmByState.Before);
  });

  test('after', () => {
    mockSystemDate(new Date('2/1/2023'));
    expect(getConfirmByState(confirmDate)).toBe(ConfirmByState.After);
  });
});

describe('date utils', () => {
  const longTimeAgo = new Date(1999, 1, 1);
  const farInTheFuture = new Date(9001, 1, 1);

  test('isBeforeRegistrationOpens', () => {
    // if the open date was a long time ago...
    let openDate = longTimeAgo;
    // registration has already opened
    expect(isBeforeRegistrationOpens(openDate)).toBe(false);

    // if open date is far in the future...
    openDate = farInTheFuture;
    // registration has not yet opened
    expect(isBeforeRegistrationOpens(openDate)).toBe(true);
  });

  test('isAfterRegistrationClosed', () => {
    // if the close date was a long time ago...
    let closeDate = longTimeAgo;
    // registration has already closed
    expect(isAfterRegistrationClosed(closeDate)).toBe(true);

    // if close date is far in the future...
    closeDate = farInTheFuture;
    // registration has not yet closed
    expect(isAfterRegistrationClosed(closeDate)).toBe(false);
  });
});
