import { NextApiRequest, NextApiResponse } from 'next';
import { EXAMPLE_USER } from '../../../../common/constants';
import { protect } from '../../../../server/protect';

export default protect(function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    // return a single user
    case 'GET':
      return res.status(200).json(EXAMPLE_USER);
    // update a single user
    case 'POST':
      return res.status(201).send(undefined);
    default:
      return res.status(405).setHeader('Allow', 'GET, POST').send(undefined);
  }
});
