import { describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { Form, Input } from 'antd';
import { QuestionResponse, QuestionType, ShortText } from '../../../common/types';
import ShortTextQuestion from './ShortTextQuestion';

//for render
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('ShortTextQuestion component', () => {
  const questionText = 'What is your name?';
  const shortTextExample: ShortText = {
    type: QuestionType.ShortText,
    content: questionText,
    placeholder: 'Name',
    maxLength: 20,
    minLength: 1,
    field: 'adult',
    id: '1',
    required: true,
  };

  const ShortTextQuestionWrapper = () => {
    const form = Form.useForm<Record<string, QuestionResponse>>()[0];
    return <ShortTextQuestion question={shortTextExample} form={form} disabled={false} />;
  };

  it('renders', () => {
    render(<ShortTextQuestionWrapper />);
    const confirmedDialogText = screen.getByTestId('shortText-question');

    expect(confirmedDialogText.textContent).toContain(questionText);
    expect(confirmedDialogText.textContent).toContain('What is your name?');
  });
});

describe('Input component', () => {
  const questionText = 'What is your name?';
  const shortTextExample: ShortText = {
    type: QuestionType.ShortText,
    content: questionText,
    placeholder: 'Name',
    maxLength: 20,
    minLength: 1,
    field: 'firstName',
    id: '1',
    required: true,
  };

  const ShortTextQuestionInputWrapper = () => {
    const form = Form.useForm<Record<string, QuestionResponse>>()[0];
    return (
      <ShortTextQuestion question={shortTextExample} form={form} disabled={false}>
        <Input />
      </ShortTextQuestion>
    );
  };

  it('changes display text when field text changes', () => {
    render(<ShortTextQuestionInputWrapper />);
    const inputElement = screen.getByTestId('inputText3');
    fireEvent.change(inputElement, { target: { value: 'mike' } });
    expect(inputElement.textContent).toBe('');
  });
});
