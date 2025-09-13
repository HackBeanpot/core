import { NextRequest, NextResponse } from "next/server";
import { assumeLoggedInGetEmail, protect } from "../../../../server/protect";
import { connectToDatabase } from "../../../../server/mongoDB";
import {
  ApplicationStatus,
  DecisionStatus,
  ShowDecisionSingleton,
  SingletonType,
} from "../../../../common/types";

async function GETHandler(req: NextRequest) {
  const { userDataCollection } = await connectToDatabase();
  const email = await assumeLoggedInGetEmail(req);
  const userWithId = await userDataCollection.findOne({ email });
  if (userWithId === null) {
    return NextResponse.json(null);
  }

  const { _id, ...user } = userWithId;
  if (
    !(await getShowDecisionDB()) &&
    (user.decisionStatus === DecisionStatus.Admitted ||
      user.decisionStatus === DecisionStatus.Waitlisted ||
      user.decisionStatus === DecisionStatus.Declined)
  ) {
    user.applicationStatus = ApplicationStatus.Submitted;
  }

  return NextResponse.json(user);
}

const getShowDecisionDB = async (): Promise<boolean> => {
  const { singletonDataCollection } = await connectToDatabase();
  const data = (await singletonDataCollection.findOne({
    type: SingletonType.ShowDecision,
  })) as ShowDecisionSingleton;
  return data?.value;
};

export const GET = protect(GETHandler);
