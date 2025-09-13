import React, { FC, useState } from 'react';
import { FileUpload, QuestionResponse } from '../../../common/types';
import { Button, Form, FormInstance, Upload } from 'antd';
import type { UploadProps } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
interface FileUploadProps {
  disabled: boolean;
  question: FileUpload;
  form: FormInstance<Record<string, QuestionResponse>>;
  submitted: boolean;
}

const FileUploadQuestion: FC<FileUploadProps> = ({ disabled, question, form, submitted }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const readFile = (file: File) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString().replace(/^data:(.*,)?/, '') ?? '');
    });

  const handleUpload: UploadProps['onChange'] = async (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-question.limit);
    const fileStr = newFileList[0]?.originFileObj
      ? ((await readFile(newFileList[0].originFileObj)) as string)
      : '';
    form.setFieldsValue({
      [question.id]: newFileList.length === 1 ? fileStr : '',
    });
    setFileList(newFileList);
  };

  return (
    <div>
      <div>{question.content}</div>
      <Form.Item
        data-testid="fileUpload-question"
        className="question"
        name={question.id}
        rules={[{ required: question.required, message: 'This question is required' }]}
        extra={submitted ? <div className="file-upload-label">{question.submittedText}</div> : ''}
      >
        <Upload
          data-testid="upload"
          accept={question.accept}
          listType="picture"
          multiple={question.multiple}
          onChange={handleUpload}
          fileList={fileList}
          action={'api/noop'} // see pages/api/noop.tsx
        >
          <Button data-testid="button" disabled={disabled} icon={<UploadOutlined />}>
            Upload
          </Button>
        </Upload>
      </Form.Item>
    </div>
  );
};

export default FileUploadQuestion;
