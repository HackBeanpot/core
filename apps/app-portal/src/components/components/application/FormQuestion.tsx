import { QuestionDefinition, QuestionType } from '../../common/types';
import ShortTextQuestion from '../questions/short-test-question/ShortTextQuestion';
import LongTextQuestion from '../questions/long-text-question/LongTextQuestion';
import DropdownQuestion from '../questions/DropdownQuestion';
import CheckboxesQuestion from '../questions/CheckboxesQuestion';
import FileUploadQuestion from '../questions/file-upload-question/FileUploadQuestion';
import { assertUnreachable } from '../../common/utils/utils';
import React from 'react';
import { FormInstance } from 'antd';
import RadioGroupQuestion from '../questions/RadioGroupQuestion';

export const getQuestionComponentFromType = (type: QuestionType) => {
  switch (type) {
    case QuestionType.ShortText:
      return ShortTextQuestion;
    case QuestionType.LongText:
      return LongTextQuestion;
    case QuestionType.Dropdown:
      return DropdownQuestion;
    case QuestionType.Checkboxes:
      return CheckboxesQuestion;
    case QuestionType.FileUpload:
      return FileUploadQuestion;
    case QuestionType.RadioGroup:
      return RadioGroupQuestion;
    default:
      assertUnreachable(type);
  }
};

type FormQuestionProps = {
  question: QuestionDefinition;
  form: FormInstance;
  disabled: boolean;
  submittedResume: boolean;
};

export const FormQuestion: React.FC<FormQuestionProps> = ({
  question,
  form,
  disabled,
  submittedResume,
}) => {
  const QuestionComponent = getQuestionComponentFromType(question.type);
  return React.createElement(QuestionComponent as any, {
    question,
    form,
    disabled,
    submitted: submittedResume,
  });
};
