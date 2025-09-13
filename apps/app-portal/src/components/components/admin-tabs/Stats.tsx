import React from 'react';
import { ADMIN_TABS } from '../../common/constants';
import { Table } from 'antd';
import useSWR from 'swr';
import { getStats } from '../../common/apiClient';

const columns = [
  {
    key: '1',
    title: 'Stat',
    dataIndex: 'name',
  },
  {
    key: '2',
    title: 'Value',
    dataIndex: 'value',
  },
];

interface StatsType {
  key: string;
  name: string;
  value: string;
}

const manipulateData = (stats: any) => {
  let data: StatsType[];
  if (stats != null) {
    data = Object.keys(stats).map((k: string, index) => {
      return { key: index.toString(), name: k, value: stats[k] };
    });
  } else {
    data = [];
  }

  return data;
};

const Stats: React.FC = () => {
  const { data: stats } = useSWR('/api/v1/stats', getStats);
  return (
    <div>
      <h3>{ADMIN_TABS.VIEW_STATS}</h3>
      <Table dataSource={manipulateData(stats?.data)} columns={columns} />
    </div>
  );
};
export default Stats;
