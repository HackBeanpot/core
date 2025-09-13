import { NextApiHandler } from 'next';
import { getDate, postDate } from '../../../../server/dates';
import { protect } from '../../../../server/protect';
import { SingletonType } from '../../../../common/types';

const regOpenHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getDate(req, res, SingletonType.RegistrationOpen);
      break;
    case 'POST':
      await postDate(req, res, SingletonType.RegistrationOpen);
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
};

export default protect(regOpenHandler);
