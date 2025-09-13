import { describe, expect, test } from '@jest/globals';
import { RegistrationState, useRegistrationState } from './useRegistrationState';

const mockSystemDate = (d: Date) => {
  jest.useFakeTimers().setSystemTime(d.getTime());
};

const toProps = (registrationOpen: Date, registrationClosed: Date) => ({
  registrationClosed,
  registrationOpen,
});

describe('registration state hook tests', () => {
  const open = new Date('12/1/2021');
  const close = new Date('1/21/2022');

  test('valid before', () => {
    mockSystemDate(new Date('11/1/2021'));
    expect(useRegistrationState(toProps(open, close))).toBe(RegistrationState.BeforeOpen);
  });

  test('valid open', () => {
    mockSystemDate(new Date('1/10/2022'));
    expect(useRegistrationState(toProps(open, close))).toBe(RegistrationState.Open);
  });

  test('valid closed', () => {
    mockSystemDate(new Date('2/10/2022'));
    expect(useRegistrationState(toProps(open, close))).toBe(RegistrationState.Closed);
  });

  test('invalid', () => {
    // close is before open
    const open = new Date('1/21/2022');
    const close = new Date('12/1/2021');
    mockSystemDate(new Date('1/10/2022'));
    expect(() => useRegistrationState(toProps(open, close))).toThrow();
  });
});
