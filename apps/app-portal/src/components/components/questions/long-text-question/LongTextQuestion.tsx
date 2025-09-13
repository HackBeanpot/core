import React, { FC } from 'react';
import { LongText, QuestionResponse } from '../../../common/types';
import { Input, Form, FormInstance } from 'antd';

type LongTextProps = {
  disabled: boolean;
  question: LongText;
  form: FormInstance<Record<string, QuestionResponse>>;
};
const LongTextQuestion: FC<LongTextProps> = ({ question, form, disabled }) => {
  return (
    <>
      <Form.Item
        data-testid="longText-question"
        className="question"
        name={question.id}
        label={question.content}
        rules={[
          { required: question.required, message: 'This question is required' },
          {
            type: 'string',
            min: question.minLength,
            message: `Response must be at least ${question.minLength} characters`,
          },
          {
            type: 'string',
            max: question.maxLength,
            message: `Response is limited to at most ${question.maxLength} characters`,
          },
        ]}
      >
        <Input.TextArea
          data-testid="inputText"
          disabled={disabled}
          onChange={(e) => form.setFieldsValue({ [question.id]: e.target.value as string })}
          autoSize={{ minRows: 4 }}
          showCount
          maxLength={question.maxLength}
        />
      </Form.Item>
    </>
  );
};
export default LongTextQuestion;
