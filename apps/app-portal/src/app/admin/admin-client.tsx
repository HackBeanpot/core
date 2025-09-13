"use client";

import React, { ReactElement } from "react";
import Applicants from "../../components/admin-tabs/Applicants";
import PortalSettings from "../../components/admin-tabs/PortalSettings";
import Stats from "../../components/admin-tabs/Stats";
import { PageLayout } from "../../components/Layout";
import { Tabs } from "antd";
import { ADMIN_TABS } from "../../common/constants";

const AdminClient = (): ReactElement => {
  return (
    <PageLayout currentPage="admin">
      <div className="admin">
        <Tabs defaultActiveKey="1" className="tabs">
          <Tabs.TabPane tab={ADMIN_TABS.VIEW_STATS} key="1">
            <Stats />
          </Tabs.TabPane>
          <Tabs.TabPane tab={ADMIN_TABS.CONFIGURE_PORTAL_SETTINGS} key="2">
            <PortalSettings />
          </Tabs.TabPane>
          <Tabs.TabPane tab={ADMIN_TABS.VIEW_AND_MODIFY_APPLICANTS} key="3">
            <Applicants />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AdminClient;
