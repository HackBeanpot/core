import { GetServerSideProps } from 'next';
import { SIGN_IN_PAGE } from '../pages/_app';
import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';

export const getServerSideSessionOrRedirect: GetServerSideProps = async (
  ctx
) => {
  const {req, res} = ctx
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: SIGN_IN_PAGE,
        permanent: false,
      },
    };
  }

  // expect only email to be defined
  session.user = {email: session.user?.email}
  return { props: { session } };
};
