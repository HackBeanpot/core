import { NextApiHandler } from 'next';
import { protect } from '../../../../server/protect';
import { getDate, postDate } from '../../../../server/dates';
import { SingletonType } from '../../../../common/types';

const confirmByHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getDate(req, res, SingletonType.ConfirmBy);
      break;
    case 'POST':
      await postDate(req, res, SingletonType.ConfirmBy);
      break;
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
};

export default protect(confirmByHandler);
