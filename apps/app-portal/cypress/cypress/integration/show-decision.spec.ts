import { createAdminAndLogin, createApplicantAndLogin } from '../utils';

describe('show decision tests', () => {
  it('hide decision for admitted applicant', () => {
    createApplicantAndLogin('alex@jess.com');
  });

  it('set decision to true', () => {
    createAdminAndLogin();
    cy.visit('/admin');
    cy.contains('Configure Portal Settings').click({ force: true });
    cy.contains('Configure Portal Settings').click({ force: true });
    cy.get('.show-decisions').find('button').click({ force: true });
  });
});
