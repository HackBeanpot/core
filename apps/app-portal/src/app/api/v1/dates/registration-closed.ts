import { NextApiHandler } from 'next';
import { protect } from '../../../../server/protect';
import { getDate, postDate } from '../../../../server/dates';
import { SingletonType } from '../../../../common/types';

const regClosedHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getDate(req, res, SingletonType.RegistrationClosed);
      break;
    case 'POST':
      await postDate(req, res, SingletonType.RegistrationClosed);
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
};

export default protect(regClosedHandler);
