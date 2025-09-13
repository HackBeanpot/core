import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from './mongoDB';
import { DateSingleton } from '../common/types';
import { isAdmin } from './protect';

export const queryDate = async (dateName: DateSingleton['type']): Promise<string | undefined> => {
  const { singletonDataCollection } = await connectToDatabase();
  const data = (await singletonDataCollection.findOne({
    type: dateName,
  })) as DateSingleton;
  return data?.value;
};

export const getDate = async (
  req: NextApiRequest,
  res: NextApiResponse,
  dateName: DateSingleton['type']
): Promise<void> => {
  const date = await queryDate(dateName);
  return res.status(200).json(date);
};

export const postDate = async (
  req: NextApiRequest,
  res: NextApiResponse,
  dateName: DateSingleton['type']
): Promise<void> => {
  const adminCheck = await isAdmin(req, res);
  if (!adminCheck) {
    return res.status(401).send({ message: 'User is not an admin' });
  }

  const newDate: string = new Date(req.body.date).toLocaleString('en-US', { timeZone: 'America/New_York' });
  const { singletonDataCollection } = await connectToDatabase();
  await singletonDataCollection.updateOne(
    { type: dateName },
    {
      $set: { value: newDate },
    },
    { upsert: true }
  );
  return res.status(200).send(undefined);
};
