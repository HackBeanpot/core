import { Button, Col, DatePicker, Row } from 'antd';
import React, { FC } from 'react';

type PortalSettingsRowProps = {
  title: string;
  portalDate: string | undefined;
  uiStateDate: string | undefined;
  setDate: (d: string) => void;
  postDate: (d: string) => Promise<any>;
  refresh: () => void;
};

const PortalSettingsRow: FC<PortalSettingsRowProps> = ({
  title,
  portalDate,
  uiStateDate,
  setDate,
  postDate,
  refresh,
}) => {
  return (
    <Row>
      <Col span={4}>{title}</Col>
      <Col span={8}>{portalDate && new Date(portalDate).toString()}</Col>
      <Col span={8}>
        {portalDate && <DatePicker onChange={(_, date) => setDate(date)} showTime />}
      </Col>
      <Col span={4}>
        <Button
          type="primary"
          disabled={!uiStateDate}
          onClick={() => {
            uiStateDate && postDate(uiStateDate).then(() => refresh());
          }}
        >
          Update
        </Button>
      </Col>
    </Row>
  );
};

export default PortalSettingsRow;
