import { ObjectId } from 'mongodb';
import { NextApiHandler } from 'next';
import { SingleApplicantApiResponse } from '../../../../common/types';
import { connectToDatabase } from '../../../../server/mongoDB';
import { isAdmin, protect } from '../../../../server/protect';

const applicantHandler: NextApiHandler = async (req, res) => {
  const admin = await isAdmin(req, res);
  if (!admin) {
    return res.status(401).send({ message: 'User is not an admin' });
  }

  switch (req.method) {
    // get a single applicant
    case 'GET':
      await getApplicant(req, res);
      break;
    // update a single applicant
    case 'POST':
      await postApplicant(req, res);
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
};

const getApplicant: NextApiHandler = async (req, res) => {
  const { userDataCollection } = await connectToDatabase();
  const id = req.query.id;
  const userWithId = await userDataCollection.findOne({ filter: { _id: id } });
  if (!userWithId) {
    return res.status(200).send(null);
  }
  const { _id, ...user } = userWithId;
  const body: SingleApplicantApiResponse = {
    user: { _id: _id.toString(), ...user },
  };
  res.status(200).send(body);
};

const postApplicant: NextApiHandler = async (req, res) => {
  const { _id, ...updatedUser } = req.body;
  const { userDataCollection } = await connectToDatabase();
  await userDataCollection.replaceOne({ _id: new ObjectId(_id) }, updatedUser);
  return res.status(201).send('Successfully updated application or rsvp status.');
};

export default protect(applicantHandler);
