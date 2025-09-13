import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

// Make routes safe by catching and giving sane response + report to rollbar
export function safe(route: NextApiHandler): NextApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await route(req, res);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.error(err);
      const msg = `Something broke on our end. Please reach out to us immediately.`;
      res.status(500).send(msg);
    }
  };
}