"use client";

import React, { ReactElement } from "react";
import {
  getConfirmBy,
  getRegistrationClosed,
  getRegistrationOpen,
  getUser,
  getShowDecision,
} from "../common/apiClient";
import useSWR from "swr";
import { PageLayout } from "../components/Layout";
import { Alert, Card, Spin } from "antd";
import { User } from "../common/types";
import { StatusDialogue } from "../components/dashboard/status-dialogue/StatusDialogue";

const HomeClient = (): ReactElement => {
  const { data: user } = useSWR("/api/v1/user", getUser);
  const { data: confirmBy } = useSWR("/api/v1/dates/confirm-by", getConfirmBy);
  const { data: registrationClosed } = useSWR(
    "/api/v1/dates/registration-closed",
    getRegistrationClosed
  );
  const { data: registrationOpen } = useSWR(
    "/api/v1/dates/registration-open",
    getRegistrationOpen
  );
  const { data: showDecision } = useSWR(
    "/api/v1/show-decision",
    getShowDecision
  );
  const statusPropsOrNull = getStatusDialogueProps(
    user?.data,
    confirmBy?.data,
    registrationClosed?.data,
    registrationOpen?.data,
    showDecision?.data
  );

  return (
    <PageLayout currentPage={"home"}>
      <div className="home">
        <h1>HackBeanpot Application Portal</h1>
        <Card title="Your Status" className="card">
          <div className="card-content">
            {statusPropsOrNull ? (
              <StatusDialogue {...statusPropsOrNull} />
            ) : (
              <Spin size="large">
                <Alert
                  showIcon
                  type="info"
                  message="Loading, please wait..."
                  description="Loading deadlines and application status, please wait..."
                />
              </Spin>
            )}
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

function getStatusDialogueProps(
  user?: User,
  confirmBy?: string,
  registrationClosed?: string,
  registrationOpen?: string,
  showDecision?: boolean
) {
  if (
    user &&
    confirmBy &&
    registrationClosed &&
    registrationOpen &&
    showDecision !== undefined
  ) {
    return {
      applicationStatus: user.applicationStatus,
      decisionStatus: user.decisionStatus,
      rsvpStatus: user.rsvpStatus,
      confirmBy: new Date(confirmBy),
      registrationClosed: new Date(registrationClosed),
      registrationOpen: new Date(registrationOpen),
      showDecision,
    };
  }
  return null;
}

export default HomeClient;
