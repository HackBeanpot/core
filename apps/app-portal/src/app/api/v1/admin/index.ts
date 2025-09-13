import { NextApiRequest, NextApiResponse } from 'next';
import { EXAMPLE_USER } from '../../../../common/constants';
import { protect } from '../../../../server/protect';

export default protect(function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    // get all the admins
    case 'GET':
      return res.status(200).json([EXAMPLE_USER, EXAMPLE_USER]);
    default:
      return res.status(405).setHeader('Allow', 'GET').send(undefined);
  }
});
