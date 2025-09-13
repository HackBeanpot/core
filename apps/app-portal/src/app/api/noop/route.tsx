import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Used to get around Vercel's rules for API endpoints.
 *
 * Current use case: the Ant Design upload component makes a POST request, which we redirect here as Vercel does not allow
 * POST requests to locations other than /api.
 *
 * See Stack Overflow post: https://stackoverflow.com/questions/60414352/next-js-ant-design-dragger-file-upload-fails-on-deployed-instance
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  res.status(200).send(undefined);
}
