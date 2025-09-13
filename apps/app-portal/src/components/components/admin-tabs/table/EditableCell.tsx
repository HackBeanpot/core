import { SingleRecordType } from '../Applicants';
import { KeyedMutator } from 'swr';
import { ApplicantsApiResponse } from '../../../common/types';
import { useContext, useState } from 'react';
import { EditableContext } from './EditableRow';
import { updateApplicantById } from '../../../common/apiClient';
import { Form, notification, Select } from 'antd';

// code based on https://ant.design/components/table/#components-table-demo-edit-cell

const { Option } = Select;

const notifyArg = (message: string) => ({
  placement: 'bottomRight' as const,
  bottom: 50,
  duration: 3,
  message,
});

export interface EditableCellProps {
  title: string;
  editable: boolean;
  dataIndex: keyof SingleRecordType;
  record: SingleRecordType;
  mutate: KeyedMutator<ApplicantsApiResponse>;
  options?: Array<{ key: string; value: string }>;
  index: number;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  mutate,
  options,
  index,
  ...restProps
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useContext(EditableContext)!;

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleIsEditing();
      const updatedRecord = { ...record, ...values };
      await updateApplicantById(record._id, updatedRecord);
      // update the cache value so the table displays correct data before fetch returns
      await mutate((response) => {
        if (!response) return response;
        response.data[index] = updatedRecord;
        return { ...response, data: [...response.data] };
      }, true);
      notification.success(
        notifyArg(`Successfully updated application status for ${record.email}`)
      );
    } catch (e) {
      notification.error(notifyArg('Request to change application status failed.'));
    }
  };

  let childNode = children;
  if (editable) {
    if (isEditing) {
      childNode = (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: `${title} is required.` }]}
        >
          <Select onChange={save}>
            {options?.map(({ key, value }) => (
              <Option key={key} value={value}>
                {value}
              </Option>
            ))}
          </Select>
        </Form.Item>
      );
    } else {
      childNode = (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={toggleIsEditing}
        >
          {children}
        </div>
      );
    }
  }

  return <td {...restProps}>{childNode}</td>;
};
