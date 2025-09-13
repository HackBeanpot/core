import {
  Checkboxes,
  Dropdown,
  FileUpload,
  LongText,
  QuestionDefinition,
  QuestionResponse,
  QuestionType,
  RadioGroup,
  RegistrationApiRequest,
  ShortText,
} from '../../common/types';
import Joi from 'joi';
import { Questions } from '../../common/questions';

export const convertQuestionDefinitionToJoiSchema = (
  question: QuestionDefinition
): Joi.Schema<QuestionResponse> => {
  if (question.type === QuestionType.Checkboxes) {
    return convertCheckboxesToJoiSchema(question);
  } else if (question.type === QuestionType.Dropdown) {
    return convertDropdownToJoiSchema(question);
  } else if (question.type === QuestionType.LongText) {
    return convertLongTextToJoiSchema(question);
  } else if (question.type === QuestionType.ShortText) {
    return convertShortTextToJoiSchema(question);
  } else if (question.type === QuestionType.FileUpload) {
    return convertFileUploadToJoiSchema(question);
  }
  else if (question.type === QuestionType.RadioGroup) {
    return convertRadioGroupToJoiSchema(question);
  }
  throw new Error(`unexpected question type on question: ${question}`);
};

// joi documentation is pretty good: checkout joi.dev/api
export const makeRequiredIfNeeded = (question: QuestionDefinition, schema: Joi.Schema): Joi.Schema => {
  // by default, joi allows undefined, but not null.
  if (question.required) {
    // required means don't allow undefined
    return schema.required();
  }
  // if not required, then allow undefined (implicitly), and null
  return schema.allow(null);
};
export const convertCheckboxesToJoiSchema = (question: Checkboxes): Joi.Schema => {
  // checkboxes expects an array of strings back
  const itemSchema = Joi.valid(...question.options.map((s) => s.name));
  const arraySchema = Joi.array().items(itemSchema).unique().min(question.minNumber).max(question.maxNumber);
  return makeRequiredIfNeeded(question, arraySchema);
};
export const convertDropdownToJoiSchema = (question: Dropdown): Joi.Schema => {
  // dropdown expects a single string
  const answerSchema = Joi.valid(...question.options.map((s) => s.name));
  return makeRequiredIfNeeded(question, answerSchema);
};

export const convertRadioGroupToJoiSchema = (question: RadioGroup): Joi.Schema => {
  // dropdown expects a single string
  const answerSchema = Joi.valid(...question.options.map((s) => s.name));
  return makeRequiredIfNeeded(question, answerSchema);
};

export const convertLongTextToJoiSchema = (question: LongText): Joi.Schema => {
  // expects a long text response
  let answerSchema;
  if (question.required) {
    answerSchema = Joi.string().trim().min(1).max(question.maxLength).label(`${question.field}`);
  } else {
    answerSchema = Joi.string().trim().min(question.minLength).max(question.maxLength);
  }
  return makeRequiredIfNeeded(question, answerSchema);
};
export const convertShortTextToJoiSchema = (question: ShortText): Joi.Schema => {
  // expects a long text response
  let answerSchema;
  if (question.required) {
    answerSchema = Joi.string().trim().min(1).max(question.maxLength).label(`${question.field}`);
  } else {
    answerSchema = Joi.string().trim().min(question.minLength).max(question.maxLength);
  }
  return makeRequiredIfNeeded(question, answerSchema);
};

export const convertFileUploadToJoiSchema = (question: FileUpload): Joi.Schema => {
  const answerSchema = Joi.string();
  return makeRequiredIfNeeded(question, answerSchema);
};

export const makeQuestionResponseSchemas = (questions: QuestionDefinition[]): Joi.Schema[] =>
  questions.map(convertQuestionDefinitionToJoiSchema);
export const makeRegistrationApiRequestSchema = (questions: QuestionDefinition[]): Joi.Schema =>
  Joi.object<RegistrationApiRequest>({
    fields: Joi.array().sparse().length(questions.length).required(),
    responses: Joi.array().sparse().length(questions.length).required(),
  });

// an array of the schema for each question in order
const QuestionResponseSchemas = makeQuestionResponseSchemas(Questions);
const RegistrationApiRequestSchema = makeRegistrationApiRequestSchema(Questions);

/**
 * attempts to validate a registration api request body. will throw if the request is invalid.
 * @param body the request body
 */
export const attemptToValidateRegistrationApiRequest = (body: unknown): RegistrationApiRequest => {
  const { fields, responses }: RegistrationApiRequest = Joi.attempt(
    body,
    RegistrationApiRequestSchema
  );
  return {
    fields,
    responses: responses.map((response, i) => Joi.attempt(response, QuestionResponseSchemas[i])),
  };
};
