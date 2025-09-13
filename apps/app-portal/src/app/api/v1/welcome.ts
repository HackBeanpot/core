import { NextApiRequest, NextApiResponse } from 'next';
import { protect } from '../../../server/protect';

export default protect(function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return res
        .status(200)
        .json(
          'Thanks for applying to HackBeanpot 2048! <sample welcome message>'
        );
    case 'POST':
      return res.status(201).send(undefined);
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
});
