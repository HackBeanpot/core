import { checkLoggedIn, createAdminAndLogin, createApplicantAndLogin } from '../utils';

describe('login', () => {
  it('can login as admin', () => {
    createAdminAndLogin('admin@domain.com');
    checkLoggedIn();
  });
  it('can login as applicant', () => {
    createApplicantAndLogin('applicant@domain.com');
    checkLoggedIn();
  });
});
