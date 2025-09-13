import React from 'react';
import { FormInstance } from 'antd/lib/form';
import { Form } from 'antd';

export const EditableContext = React.createContext<FormInstance | null>(null);

interface EditableRowProps {
  index: number;
}

export const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
