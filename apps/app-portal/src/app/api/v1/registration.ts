import { NextApiHandler } from 'next';
import {
  applicationResponsesSchema,
  ApplicationStatus,
  QuestionResponse,
  RegistrationApiRequest,
  SingletonType,
} from '../../../common/types';
import { connectToDatabase } from '../../../server/mongoDB';
import { assumeLoggedInGetEmail, protect } from '../../../server/protect';
import { attemptToValidateRegistrationApiRequest } from '../../../server/validators/validators';
import Joi from 'joi';
import { queryDate } from '../../../server/dates';
import { isBefore } from 'date-fns';
import { uploadApplicantResume } from '../../../server/upload/upload';

const registrationHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getHandler(req, res);
      break;
    case 'POST':
      await postHandler(req, res);
      break;
    case 'PUT':
      await putHandler(req, res);
      break;
    case 'PATCH':
      await patchHandler(req, res);
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET, POST, PUT, PATCH').send(undefined);
  }
};

const getHandler: NextApiHandler = async (req, res) => {
  const email = await assumeLoggedInGetEmail(req, res);
  const { userDataCollection } = await connectToDatabase();
  const data = await userDataCollection.findOne({ email });
  return res.status(200).json({
    fields: data?.applicationResponses ? Object.keys(data.applicationResponses) : [],
    responses: data?.applicationResponses ? Object.values(data.applicationResponses) : [],
  });
};

const postHandler: NextApiHandler = async (req, res) => {
  const [open, closed] = await Promise.all([
    queryDate(SingletonType.RegistrationOpen),
    queryDate(SingletonType.RegistrationClosed),
  ]);
  const NOW = new Date();
  if (isBefore(NOW, new Date(open!))) {
    return res.status(400).json('Registration is not yet open');
  }
  if (isBefore(new Date(closed!), NOW)) {
    return res.status(400).json('Registration is already closed');
  }

  let result: RegistrationApiRequest;
  try {
    result = attemptToValidateRegistrationApiRequest(req.body);
  } catch (e: unknown) {
    if (Joi.isError(e)) {
      return res.status(400).json(e.message);
    }
    return res.status(500).json('something broke. please email us immediately.');
  }

  const userResponses: Record<string, QuestionResponse> = {};

  result.fields.forEach((field, index) => {
    const response = result.responses[index];
    userResponses[field] = response;
  });

  const email = await assumeLoggedInGetEmail(req, res);

  // resume upload
  if (userResponses.resumeLink) {
    const fileAsBase64 = userResponses.resumeLink as string;
    const fileBuffer = Buffer.from(fileAsBase64, 'base64');
    const resumeLink = uploadApplicantResume(fileBuffer, `resume-${email}`);
    userResponses.resumeLink = resumeLink ?? '';
  }

  const { userDataCollection } = await connectToDatabase();
  // upsert = update, or if object doesn't exist, insert
  await userDataCollection.updateOne(
    { email },
    {
      $set: {
        applicationResponses: userResponses,
        email,
        applicationStatus: ApplicationStatus.Submitted,
        appSubmissionTime: new Date(),
      },
    },
    { upsert: true }
  );
  return res.status(200).send(undefined);
};


const patchHandler: NextApiHandler = async (req, res) => {
  const email = await assumeLoggedInGetEmail(req, res);
  const { userDataCollection } = await connectToDatabase();
  const userWithId = await userDataCollection.findOne({ email });
  if (userWithId === null) {
    return res.status(400).json({ "message": `User with email ${email} does not exist.` });
  }

  const { fields, responses } = req.body;
  const fieldResponsePair: Record<string, any> = {};

  for (let i = 0; i < fields.length; i++) {
    if(responses[i] !== null) {
      fieldResponsePair[fields[i]] = responses[i]
    }
  }

  let validBody;
  try {
    validBody = applicationResponsesSchema.parse(fieldResponsePair);
  } catch (error) {
    res.status(400).json({ "error": error })
  }

  if (validBody) {
    try {
      await userDataCollection.updateOne(
        { email },
        {
          $set: {
            applicationResponses: validBody,
            email,
            applicationStatus: ApplicationStatus.Incomplete,
          },
        },
        { upsert: true });
      return res.status(500).json({ "message": "Successfully updated user responses" })
    } catch (error) {
      return res.status(500).json({ "error": error })
    }
  }

  return res.status(200)
}

const putHandler: NextApiHandler = async (req, res) => {
  const [open, closed] = await Promise.all([
    queryDate(SingletonType.RegistrationOpen),
    queryDate(SingletonType.RegistrationClosed),
  ]);
  const NOW = new Date();
  if (isBefore(NOW, new Date(open!))) {
    return res.status(400).json('Registration is not yet open');
  }
  if (isBefore(new Date(closed!), NOW)) {
    return res.status(400).json('Registration is already closed');
  }

  let result: RegistrationApiRequest;
  try {
    result = attemptToValidateRegistrationApiRequest(req.body);
  } catch (e: unknown) {
    if (Joi.isError(e)) {
      return res.status(400).json(e.message);
    }
    return res.status(500).json('something broke. please email us immediately.');
  }

  const userResponses: Record<string, QuestionResponse> = {};

  result.fields.forEach((field, index) => {
    const response = result.responses[index];
    userResponses[field] = response;
  });

  const email = await assumeLoggedInGetEmail(req, res);

  // resume upload
  if (userResponses.resumeLink) {
    const fileAsBase64 = userResponses.resumeLink as string;
    const fileBuffer = Buffer.from(fileAsBase64, 'base64');
    const resumeLink = uploadApplicantResume(fileBuffer, `resume-${email}`);
    userResponses.resumeLink = resumeLink ?? '';
  }

  const { userDataCollection } = await connectToDatabase();

  await userDataCollection.updateOne(
    { email },
    {
      $set: {
        applicationResponses: userResponses,
        email,
        applicationStatus: ApplicationStatus.Submitted,
      },
    }
  );
  return res.status(200).send(undefined);
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '3mb'
    }
  }
}

export default protect(registrationHandler);
