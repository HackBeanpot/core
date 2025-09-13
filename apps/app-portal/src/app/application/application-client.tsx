"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { PageLayout } from "../../components/Layout";
import useSWR from "swr";
import {
  getConfirmBy,
  getRegistrationClosed,
  getRegistrationOpen,
  getUser,
  getShowDecision,
} from "../../common/apiClient";
import { Alert, Spin } from "antd";
import {
  ConfirmByState,
  DecisionStatus,
  RSVPStatus,
  User,
} from "../../common/types";
import {
  RegistrationState,
  useRegistrationState,
} from "../../components/hooks/use-registration-state/useRegistrationState";
import { ApplicationForm } from "../../components/application/ApplicationForm";
import { PostAcceptanceForm } from "../../components/application/PostAcceptanceForm";
import { useConfirmByState } from "../../components/hooks/use-confirm-by-state/useConfirmByState";

const ApplicationClient = (): ReactElement => {
  const { data: user } = useSWR("/api/v1/user", getUser);
  const { data: rOpen } = useSWR(
    "/api/v1/dates/registration-open",
    getRegistrationOpen
  );
  const { data: rClosed } = useSWR(
    "/api/v1/dates/registration-closed",
    getRegistrationClosed
  );
  const { data: confirmByData } = useSWR(
    "/api/v1/dates/confirm-by",
    getConfirmBy
  );
  const { data: showDecision } = useSWR(
    "/api/v1/show-decision",
    getShowDecision
  );
  const [showDecisionState, setShowDecisionState] = useState<
    boolean | undefined
  >(showDecision?.data);
  useEffect(() => {
    setShowDecisionState(showDecision?.data);
  }, [showDecision]);

  if (!user || !rOpen || !rClosed || !confirmByData) {
    return (
      <PageLayout currentPage={"application"}>
        <div className="application">
          <Spin size={"large"} />
        </div>
      </PageLayout>
    );
  }

  const registrationOpen = new Date(rOpen.data);
  const registrationClosed = new Date(rClosed.data);
  const confirmBy = new Date(confirmByData.data);
  return (
    <PageLayout currentPage={"application"}>
      <div className="application">
        <FormDecider
          {...{
            registrationOpen,
            registrationClosed,
            user: user.data,
            confirmBy,
            showDecisionState,
          }}
        />
      </div>
    </PageLayout>
  );
};

type FormDeciderProps = {
  registrationOpen: Date;
  registrationClosed: Date;
  user: User;
  confirmBy: Date;
  showDecisionState: boolean | undefined;
};
const FormDecider: React.FC<FormDeciderProps> = ({
  registrationOpen,
  registrationClosed,
  user,
  confirmBy,
  showDecisionState,
}) => {
  const registrationState = useRegistrationState({
    registrationOpen,
    registrationClosed,
  });
  const confirmByState = useConfirmByState({ confirmBy });
  const { decisionStatus, rsvpStatus } = user;
  const noDecision =
    !decisionStatus || decisionStatus === DecisionStatus.Undecided;
  if (noDecision && registrationState === RegistrationState.Open) {
    return <ApplicationForm />;
  }

  if (
    confirmByState === ConfirmByState.Before &&
    decisionStatus === DecisionStatus.Admitted &&
    rsvpStatus === RSVPStatus.Unconfirmed &&
    showDecisionState
  ) {
    return <PostAcceptanceForm />;
  }

  return (
    <>
      <h1>Application Page</h1>
      <Alert type="info" message={"No form to fill out at this time"} />
    </>
  );
};

export default ApplicationClient;
