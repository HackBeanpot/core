import { NextApiHandler } from 'next';
import { RESPONSE_BY_DATE } from '../../../common/constants';
import { assumeLoggedInGetEmail, protect } from '../../../server/protect';
import {
  ApplicationStatus,
  DecisionStatus,
  RSVPStatus,
  StatusApiResponse,
} from '../../../common/types';
import { connectToDatabase } from '../../../server/mongoDB';

const statusHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getHandler(req, res);
      break;
    case 'POST':
      await postHandler(req, res);
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
};

const getHandler: NextApiHandler = async (req, res) => {
  const { userDataCollection } = await connectToDatabase();
  const email = await assumeLoggedInGetEmail(req, res);
  const user = (await userDataCollection.findOne({ email }))!;
  const body: StatusApiResponse = {
    rsvpStatus: user.rsvpStatus,
    applicationStatus: user.applicationStatus,
    postAcceptanceStatus: user.postAcceptanceStatus ?? ApplicationStatus.Incomplete,
  };
  res.status(200).send(body);
};

const postHandler: NextApiHandler = async (req, res) => {
  const userStatus = req.body;

  // Check that req status is one of enum type
  if (!Object.values(RSVPStatus).includes(userStatus['rsvpStatus'])) {
    return res.status(400).send({ error: 'Current RSVP Status is invalid' });
  }

  // Check response time has not yet passed
  if (RESPONSE_BY_DATE < new Date()) {
    return res.status(403).send({ error: 'Deadline has passed' });
  }

  const email = await assumeLoggedInGetEmail(req, res);
  const { userDataCollection } = await connectToDatabase();
  const user = await userDataCollection.findOne({ email });
  if (user?.decisionStatus !== DecisionStatus.Admitted) {
    // if they were not accepted, they cannot rsvp
    return res.status(400).json('user not marked as accepted, not expecting an RSVP');
  }

  // Update in DB here
  await userDataCollection.updateOne(
    { email },
    {
      $set: {
        rsvpStatus: userStatus['rsvpStatus'],
      },
    },
    { upsert: true }
  );

  return res.status(201).send('Successfully updated RSVP');
};

export default protect(statusHandler);
