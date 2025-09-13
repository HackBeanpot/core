import { describe, expect, test } from '@jest/globals';
import { useConfirmByState } from './useConfirmByState';
import { ConfirmByState } from '../../../common/types';

const mockSystemDate = (d: Date) => {
  jest.useFakeTimers().setSystemTime(d.getTime());
};

describe('confirm by tests', () => {
  const confirmDate = new Date('1/21/2022');

  test('before', () => {
    // if the current date is jan 1, and the confirm date is jan 21, it is Before confirm date
    mockSystemDate(new Date('1/1/2022'));
    expect(useConfirmByState({ confirmBy: confirmDate })).toBe(ConfirmByState.Before);
  });

  test('after', () => {
    mockSystemDate(new Date('2/1/2022'));
    expect(useConfirmByState({ confirmBy: confirmDate })).toBe(ConfirmByState.After);
  });
});
