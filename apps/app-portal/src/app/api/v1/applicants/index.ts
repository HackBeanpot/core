import { NextApiHandler } from 'next';
import { isAdmin, protect } from '../../../../server/protect';
import { connectToDatabase } from '../../../../server/mongoDB';

const handler: NextApiHandler = async (req, res) => {
  const admin = await isAdmin(req, res);
  if (!admin) {
    return res.status(401).send({ message: 'User is not an admin' });
  }

  switch (req.method) {
    case 'GET':
      await getHandler(req, res);
      break;
    default:
      // only allow post on the /api/v1/applicants/:id route (for updating)
      return res.status(405).setHeader('Allow', 'GET').send(undefined);
  }
};

const getHandler: NextApiHandler = async (req, res) => {
  const params = req.query;

  // assume page is 1 indexed
  const page = Number(params.page ?? 1);
  const pageSize = Number(params.pageSize ?? 10);
  const filters = parseFilters(params.filters ?? '');
  const sort = parseSort(params.sorter ?? '');

  const { userDataCollection } = await connectToDatabase();
  const data = userDataCollection
    .find()
    .skip((page - 1) * pageSize)
    .filter(filters)
    .sort(sort)
    .limit(pageSize);
  const totalCount = await userDataCollection.countDocuments(filters);

  return res.status(200).json({ data: await data.toArray(), totalCount, page, pageSize });
};

function parseFilters(queryString: string | string[]): Record<string, any> {
  const filterString = Array.isArray(queryString) ? queryString[0] : queryString;
  const filters: Record<string, any> = JSON.parse(filterString);
  for (const key in filters) {
    const value = filters[key];
    if (!value) {
      delete filters[key];
      continue;
    }
    filters[key] = { $in: value };
  }
  return filters;
}

function parseSort(queryString: string | string[]): any {
  const sortString = Array.isArray(queryString) ? queryString[0] : queryString;
  const sort = JSON.parse(sortString);
  const field = Array.isArray(sort.field) ? sort.field.join('.') : sort.field;
  if (field === 'email') {
    return { [field]: sort.order === 'ascend' ? 1 : -1 };
  }
  // sort may not be stable, so sort by email as well
  return { [field]: sort.order === 'ascend' ? 1 : -1, email: -1 };
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '3mb',
    },
  },
};

export default protect(handler);
