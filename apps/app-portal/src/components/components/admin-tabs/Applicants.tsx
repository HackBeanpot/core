import React, { useState } from 'react';
import { ADMIN_TABS } from '../../common/constants';
import { getAllApplicants } from '../../common/apiClient';
import useSWR from 'swr';
import { Button, Table, TablePaginationConfig, TableProps, Tooltip } from 'antd';
import {
  ApplicantsApiResponse,
  ApplicationResponses,
  ApplicationStatus,
  DecisionStatus,
  Dropdown as DropdownQuestionType,
  QuestionDefinition,
  QuestionResponse,
  QuestionResponseField,
  RSVPStatus,
  User,
} from '../../common/types';
import { PostAcceptanceFormQuestions, Questions } from '../../common/questions';
import { saveAs } from 'file-saver';
import { EditableRow } from './table/EditableRow';
import { EditableCell, EditableCellProps } from './table/EditableCell';

// add other Question fields not defined in User type in intersection here
export type SingleRecordType = ApplicantsApiResponse['data'][number];

// table columns: name, email, school, application status, rsvp status
const columns = [
  {
    title: 'First Name',
    dataIndex: 'applicationResponses.firstName',
    sorter: true,
    editable: false,
    render: (_: string, record: SingleRecordType) => record.applicationResponses?.firstName ?? '',
  },
  {
    title: 'Last Name',
    dataIndex: 'applicationResponses.lastName',
    sorter: true,
    editable: false,
    render: (_: string, record: SingleRecordType) => record.applicationResponses?.lastName ?? '',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: true,
    editable: false,
  },
  {
    title: 'School',
    dataIndex: 'applicationResponses.school',
    filters: (
      Questions.find((question) => question.field === 'school') as DropdownQuestionType
    ).options.map(({ name }) => ({
      text: name,
      value: name,
    })),
    render: (_: string, record: SingleRecordType) =>
      record.applicationResponses?.school === 'Other'
        ? record.applicationResponses.unlistedSchool
        : record.applicationResponses?.school,
    sorter: true,
    editable: false,
  },
  {
    title: 'Year',
    dataIndex: 'applicationResponses.yearOfEducation',
    filters: (
      Questions.find((question) => question.field === 'yearOfEducation') as DropdownQuestionType
    ).options.map(({ name }) => ({
      text: name,
      value: name,
    })),
    render: (_: string, record: SingleRecordType) =>
      record.applicationResponses?.yearOfEducation ?? '',
    sorter: true,
    editable: false,
  },
  {
    title: 'Application Status',
    dataIndex: 'applicationStatus',
    filters: Object.values(ApplicationStatus).map((value) => ({
      text: value,
      value,
    })),
    sorter: true,
  },
  {
    title: 'Decision Status',
    dataIndex: 'decisionStatus',
    filters: Object.values(DecisionStatus).map((value) => ({
      text: value,
      value,
    })),
    render: (_: string, record: SingleRecordType) =>
      record.decisionStatus ?? DecisionStatus.Undecided,
    sorter: true,
    editable: true,
    options: Object.values(DecisionStatus).map((value: string) => ({ key: value, value })),
  },
  {
    title: 'Rsvp Status',
    dataIndex: 'rsvpStatus',
    filters: Object.values(RSVPStatus).map((value) => ({
      text: value,
      value,
    })),
    sorter: true,
    editable: true,
    options: Object.values(RSVPStatus).map((value: string) => ({ key: value, value })),
  },
];

type TableOnChange = NonNullable<TableProps<SingleRecordType>['onChange']>;
export type TableFilters = Parameters<TableOnChange>['1'];
export type TableSorter = Parameters<TableOnChange>['2'];

const getAllApplicantsForSwr = (
  _: string,
  pagination: TablePaginationConfig,
  filters: TableFilters,
  sorter: TableSorter
) => getAllApplicants(pagination, filters, sorter).then((axiosReq) => axiosReq.data);

const Applicants: React.FC = () => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });
  const [filters, setFilters] = useState<TableFilters>({});
  const [sorter, setSorter] = useState<TableSorter>({});
  const { data, mutate } = useSWR(
    [`/api/v1/applicants`, pagination, filters, sorter],
    getAllApplicantsForSwr
  );
  const [exporting, setExporting] = useState(false);
  const onExportClick = (cb: typeof downloadApplicationCsv) => () => {
    if (!data) return;
    setExporting(true);
    cb({ totalCount: data.totalCount, filters, sorter }).then(() => setExporting(false));
  };

  const onChange: TableProps<SingleRecordType>['onChange'] = (pagination, filters, sorter) => {
    setSorter(sorter);
    setPagination(pagination);
    setFilters(filters);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns2 = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record: SingleRecordType, index?: number): EditableCellProps => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex as keyof SingleRecordType,
        title: col.title,
        mutate,
        options: col.options,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        index: index!,
      }),
    };
  });

  const ExportButton: React.FC<{ cb: typeof downloadApplicationCsv; text: string }> = ({
    cb,
    text,
  }) => {
    return (
      <Tooltip overlay={'Data exports respect currently applied filter and sort.'}>
        <Button
          className="export-button"
          type="primary"
          loading={!data || exporting}
          onClick={onExportClick(cb)}
        >
          {text}
        </Button>
      </Tooltip>
    );
  };

  return (
    <div className={'applicants'}>
      <div className="title-container">
        <h3 className="title">{ADMIN_TABS.VIEW_AND_MODIFY_APPLICANTS}</h3>
        <ExportButton cb={downloadApplicationCsv} text="Export Application Responses" />
        <ExportButton cb={downloadPostAcceptanceCsv} text="Export Post-Acceptance Responses" />
      </div>
      <Table
        size={'small'}
        className={'applicants'}
        columns={columns2}
        components={components}
        rowKey={(record) => record.email}
        dataSource={data?.data ?? []}
        pagination={{
          ...pagination,
          total: data?.totalCount,
          position: ['topLeft', 'bottomRight'],
          showTotal: (t) => `${t} results`,
        }}
        loading={!data}
        onChange={onChange}
      />
      <div className={'filler'} />
    </div>
  );
};

const escaper = (s: string) => `"${s.replaceAll('"', '""')}"`;
const separator = ',';
const fields: Array<keyof User> = [
  'email',
  'isAdmin',
  'applicationStatus',
  'rsvpStatus',
  'decisionStatus',
];
type DownloadProps = {
  totalCount: number;
  filters: TableFilters;
  sorter: TableSorter;
};
const downloadApplicationCsv = async (props: DownloadProps) =>
  downloadFileAbstract(
    props,
    [...fields, 'appSubmissionTime'],
    Questions,
    (u) => u.applicationResponses,
    'applications.csv'
  );
const downloadPostAcceptanceCsv = async (props: DownloadProps) =>
  downloadFileAbstract(
    props,
    [...fields, 'rsvpSubmissionTime'],
    PostAcceptanceFormQuestions,
    (u) => u.postAcceptanceResponses,
    'post-acceptance.csv'
  );

const serializeResponse = (response: QuestionResponse) => {
  if (Array.isArray(response)) {
    return response.join('\n');
  }
  return response ?? '';
};

const getUserFieldAndResponseCols = (
  rowHeadersText: (keyof User | QuestionResponseField)[],
  fields: (keyof User | QuestionResponseField)[],
  // TO FIX IN FUTURE: figure out how to type these not as any
  responses: any,
  user: any
) => {
  const cols = [];
  for (let i = 0; i < rowHeadersText.length; i++) {
    const currHeader = rowHeadersText[i];
    if (fields.includes(currHeader) && user[currHeader]) {
      cols.push(user[currHeader]?.toString());
    } else if (responses && responses !== null && Object.keys(responses).includes(currHeader)) {
      const questionResponse = responses[currHeader];
      const serializedResponse = serializeResponse(questionResponse);
      cols.push(serializedResponse);
    } else {
      cols.push('');
    }
  }
  return cols;
};

const downloadFileAbstract = async (
  { totalCount, filters, sorter }: DownloadProps,
  fields: Array<keyof User>,
  questions: QuestionDefinition[],
  responseGetter: (u: User) => ApplicationResponses | QuestionResponse[] | undefined,
  fileName: string
): Promise<null> => {
  const pagination: TablePaginationConfig = {
    current: 1,
    pageSize: totalCount,
  };
  const data = await getAllApplicants(pagination, filters, sorter);
  const rowHeadersText = [...fields, ...questions.map((q) => q.field)];
  const rowCellsText = data.data.data
    .map((user) => {
      const responses = responseGetter(user);
      const cols = getUserFieldAndResponseCols(rowHeadersText, fields, responses, user);
      return cols.map(escaper).join(separator);
    })
    .join('\n');
  const fileText = `${rowHeadersText}\n${rowCellsText}`;
  const blob = new Blob([fileText], { type: 'data:text/csv;charset=utf-8' });
  saveAs(blob, fileName);
  return null;
};

export default Applicants;
