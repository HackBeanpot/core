import { NextApiHandler } from 'next';
import { isAdmin, protect } from '../../../server/protect';
import { SingletonType, ShowDecisionSingleton } from '../../../common/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../server/mongoDB';

const showDecisionHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getShowDecision(req, res, SingletonType.ShowDecision);
      break;
    case 'POST':
      await postShowDecision(req, res, SingletonType.ShowDecision);
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
};

export const queryShowDecision = async (
  showDecision: SingletonType.ShowDecision
): Promise<boolean | undefined> => {
  const { singletonDataCollection } = await connectToDatabase();
  const data = (await singletonDataCollection.findOne({
    type: showDecision,
  })) as ShowDecisionSingleton;
  return data?.value;
};

export const getShowDecision = async (
  req: NextApiRequest,
  res: NextApiResponse,
  showDecision: SingletonType.ShowDecision
) => {
  const decision = await queryShowDecision(showDecision);
  return res.status(200).json(decision);
};

export const postShowDecision = async (
  req: NextApiRequest,
  res: NextApiResponse,
  showDecision: SingletonType.ShowDecision
) => {
  const adminCheck = await isAdmin(req, res);
  if (!adminCheck) {
    return res.status(401).send({ message: 'User is not an admin' });
  }
  const newDecision: string = req.body.showDecision;
  const { singletonDataCollection } = await connectToDatabase();
  await singletonDataCollection.updateOne(
    { type: showDecision },
    {
      $set: { value: newDecision },
    },
    { upsert: true }
  );
  return res.status(200).send(undefined);
};

export default protect(showDecisionHandler);
