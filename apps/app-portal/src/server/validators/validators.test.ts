import { describe, expect } from '@jest/globals';
import {
  convertCheckboxesToJoiSchema,
  convertDropdownToJoiSchema,
  convertLongTextToJoiSchema,
  makeQuestionResponseSchemas,
} from './validators';
import { Checkboxes, Dropdown, LongText, QuestionType, ShortText } from '../../common/types';
import Joi from 'joi';

// convenience constructors
const n = (name: string) => ({ name });
const cb = (d?: Partial<Checkboxes>): Checkboxes => {
  const dfault: Checkboxes = {
    field: 'education',
    type: QuestionType.Checkboxes,
    id: '1',
    content: 'Your top two most proficient languages. Select at least 1, but no more than 2.',
    minNumber: 1,
    maxNumber: 2,
    options: ['English', 'Java', 'Typescript', 'Japanese'].map(n),
    required: true,
  };
  return d ? { ...dfault, ...d } : dfault;
};
const dd = (d?: Partial<Dropdown>): Dropdown => {
  const dfault: Dropdown = {
    field: 'adult',
    type: QuestionType.Dropdown,
    id: '1',
    content: 'How old are you?',
    options: ['1', '2', '3', '4+'].map(n),
    required: true,
  };
  return d ? { ...dfault, ...d } : dfault;
};
const lt = (d?: Partial<LongText>): LongText => {
  const dfault: LongText = {
    field: 'tedTalkTopic',
    type: QuestionType.LongText,
    id: '1',
    content: 'Tell me something about yourself, in 10-50 characters.',
    minLength: 1,
    maxLength: 50,
    required: true,
  };
  return d ? { ...dfault, ...d } : dfault;
};
const st = (d?: Partial<ShortText>): ShortText => {
  const dfault: ShortText = {
    field: 'firstName',
    type: QuestionType.ShortText,
    id: '1',
    content: 'Tell me your name, in 1-5 characters.',
    minLength: 1,
    maxLength: 5,
    required: true,
  };
  return d ? { ...dfault, ...d } : dfault;
};

describe('registration endpoint schema tests', () => {
  const dd1 = dd();
  const dd2 = dd({ required: false });
  const dds1 = convertDropdownToJoiSchema(dd1);
  const ddsNotRequired = convertDropdownToJoiSchema(dd2);

  describe('required', () => {
    it('throws when a required response is null/undefined', () => {
      expect(() => Joi.assert(null, dds1)).toThrow();
      expect(() => Joi.assert(undefined, dds1)).toThrow();
    });
    it('does not throw when a non-required response is null/undefined', () => {
      expect(() => Joi.assert(null, ddsNotRequired)).not.toThrow();
      expect(() => Joi.assert(undefined, ddsNotRequired)).not.toThrow();
    });
    it('throws when a response is invalid', () => {
      expect(() => Joi.assert('34', dds1)).toThrow();
    });
    it('works on a valid response', () => {
      expect(Joi.attempt('1', dds1)).toBe('1');
      expect(Joi.attempt('2', dds1)).toBe('2');
      expect(Joi.attempt('3', dds1)).toBe('3');
      expect(Joi.attempt('4+', dds1)).toBe('4+');
    });
  });

  const cb1 = cb();
  const cbs1 = convertCheckboxesToJoiSchema(cb1);

  // checkboxes-specific tests
  describe('checkboxes', () => {
    it('throws when boxes checked is less than min', () => {
      expect(() => Joi.assert([], cbs1)).toThrow();
    });
    it('throws when boxes checked is greater than max', () => {
      expect(() => Joi.assert(['Japanese', 'Java', 'English'], cbs1)).toThrow();
    });
    it('throws when response is not one of the options', () => {
      expect(() => Joi.assert(['Havanese'], cbs1)).toThrow();
    });
    it("doesn't throw when options are ok and within min/max", () => {
      expect(() => Joi.assert(['Java'], cbs1)).not.toThrow();
      expect(() => Joi.assert(['English'], cbs1)).not.toThrow();
      expect(() => Joi.assert(['English', 'Typescript'], cbs1)).not.toThrow();
      expect(() => Joi.assert(['Japanese', 'Java'], cbs1)).not.toThrow();
    });
    it('throws when duplicate options are specified', () => {
      expect(() => Joi.assert(['Java', 'Java'], cbs1)).toThrow();
    });
  });

  const lt1 = lt();
  const lts1 = convertLongTextToJoiSchema(lt());

  describe('longtext', () => {
    const zero = '';
    const ten = '1234567890';
    const fifty_one = '123456789_123456789_123456789_123456789_123456789_1';
    const fifty = '123456789_123456789_123456789_123456789_123456789_';
    it('throws when text is too short or too long', () => {
      expect(() => Joi.assert(zero, lts1)).toThrow();
      expect(() => Joi.assert(fifty_one, lts1)).toThrow();
    });
    it("doesn't throw when text length is ok", () => {
      expect(() => Joi.assert(ten, lts1)).not.toThrow();
      expect(() => Joi.assert(fifty, lts1)).not.toThrow();
      expect(() => Joi.assert("some normal length that's in the middle", lts1)).not.toThrow();
    });
  });

  const st1 = st();
  const questions = [dd1, cb1, st1, lt1];
  const questionSchemas = makeQuestionResponseSchemas(questions);

  // describe("general question schema converter", () => {
  //   it("basic example", () => {
  //     expect(() => Joi.assert([
  //       ""
  //     ], questionSchemas))
  //   })
  // })
});
