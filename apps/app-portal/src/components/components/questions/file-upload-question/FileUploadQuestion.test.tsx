import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { Form, Upload } from 'antd';
import { FileUpload, QuestionResponse, QuestionType } from '../../../common/types';
import FileUploadQuestion from './FileUploadQuestion';

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

describe('FileUploadQuestion component', () => {
  const questionText = 'Upload File Please';
  const fileUploadExample: FileUpload = {
    type: QuestionType.FileUpload,
    accept: '',
    multiple: false,
    limit: 0,
    field: 'adult',
    content: questionText,
    id: '1',
    required: true,
    submittedText: 'abcd',
  };

  const mock = jest.fn;

  const FileUploadQuestionWrapper = () => {
    const form = Form.useForm<Record<string, QuestionResponse>>()[0];
    return (
      <FileUploadQuestion
        question={fileUploadExample}
        form={form}
        disabled={false}
        submitted={false}
      >
        <Upload onChange={mock} />
      </FileUploadQuestion>
    );
  };

  it('renders', () => {
    render(<FileUploadQuestionWrapper />);
    const confirmedDialogText = screen.getByTestId('fileUpload-question');
    expect(confirmedDialogText.textContent).toContain(questionText);
    expect(confirmedDialogText.textContent).toContain('Upload File Please');
  });
});
