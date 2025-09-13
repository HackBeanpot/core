import React, { FC } from 'react';
import { Checkboxes, QuestionResponse } from '../../common/types';
import { Checkbox, Form, FormInstance, Row } from 'antd';

type CheckboxesProps = {
  disabled: boolean;
  question: Checkboxes;
  form: FormInstance<Record<string, QuestionResponse>>;
};
const CheckboxesQuestion: FC<CheckboxesProps> = ({
  question,
  form,
  disabled,
}) => {
  const options: string[] = [];
  question.options.map((o) => options.push(o.name));
  return (
    <Form.Item
      className="question"
      name={question.id}
      label={question.content}
      rules={[
        { required: question.required, message: 'This question is required' },
        {
          type: 'array',
          min: question.minNumber,
          message: `Select at least ${question.minNumber} option(s)`,
        },
        {
          type: 'array',
          max: question.maxNumber,
          message: `Select at most ${question.maxNumber} option(s)`,
        },
      ]}
    >
      <Checkbox.Group
        disabled={disabled}
        key={question.id}
        onChange={(e) => form.setFieldsValue({ [question.id]: e as string[] })}
      >
        {options.map((option) => (
          <Row key={option}>
            <Checkbox value={option}>{option}</Checkbox>
          </Row>
        ))}
      </Checkbox.Group>
    </Form.Item>
  );
};
export default CheckboxesQuestion;
