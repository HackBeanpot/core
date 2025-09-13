import { describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { Form, Input } from 'antd';
import { LongText, QuestionResponse, QuestionType } from '../../../common/types';
import LongTextQuestion from './LongTextQuestion';

//for render
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('LongTextQuestion component', () => {
  const questionText =
    'If you’ve attended a hackathon (in person or virtual) previously, what did you like or dislike about it? If you’ve never attended a hackathon, what would you like to see at HackBeanpot?';
  const shortTextExample: LongText = {
    type: QuestionType.LongText,
    content: questionText,
    maxLength: 200,
    minLength: 1,
    field: 'firstName',
    id: '1',
    required: true,
  };

  const LongTextQuestionWrapper = () => {
    const form = Form.useForm<Record<string, QuestionResponse>>()[0];

    return <LongTextQuestion question={shortTextExample} form={form} disabled={false} />;
  };

  it('renders correctly', () => {
    render(<LongTextQuestionWrapper />);
    const confirmedDialogText = screen.getByTestId('longText-question');
    expect(confirmedDialogText.textContent).toContain(questionText);
    expect(confirmedDialogText.textContent).toContain(
      'If you’ve attended a hackathon (in person or virtual) previously, what did you like or dislike about it? If you’ve never attended a hackathon, what would you like to see at HackBeanpot?'
    );
  });
});

describe('Input.TextArea component', () => {
  const questionText =
    'If you’ve attended a hackathon (in person or virtual) previously, what did you like or dislike about it? If you’ve never attended a hackathon, what would you like to see at HackBeanpot?';
  const longTextExample: LongText = {
    type: QuestionType.LongText,
    content: questionText,
    maxLength: 200,
    minLength: 1,
    field: 'firstName',
    id: '1',
    required: true,
  };

  const LongTextQuestionWrapper = () => {
    const form = Form.useForm<Record<string, QuestionResponse>>()[0];
    return (
      <LongTextQuestion question={longTextExample} form={form} disabled={false}>
        <Input />
      </LongTextQuestion>
    );
  };

  it('changes display text when field text changes', () => {
    render(<LongTextQuestionWrapper />);
    const inputElement = screen.getByTestId('inputText');
    fireEvent.change(inputElement, { target: { value: 'hi, I love Hackbeanpot so much' } });
    expect(inputElement.textContent).toBe('hi, I love Hackbeanpot so much');
  });
});
