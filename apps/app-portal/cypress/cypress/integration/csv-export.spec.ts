import { createAdminAndLogin } from '../utils';
import { join } from 'path';

export {};

const downloadsFolder = Cypress.config('downloadsFolder');

describe('downloads csv', () => {
  beforeEach(() => {
    createAdminAndLogin();
    cy.visit('/admin');
    // force needed on chrome, see https://github.com/HackBeanpot/application-portal/issues/114
    // not sure why adding a second click made this work (on chrome) but it did
    cy.contains('View / Modify Applicants').click({ force: true });
    cy.contains('View / Modify Applicants').click({ force: true });
  });

  it('export applications', () => {
    const buttonText = 'Export Application Responses';
    cy.contains(buttonText).click({ force: true });
    cy.contains(buttonText).click({ force: true });
    const filename = join(downloadsFolder, 'applications.csv');
    cy.readFile(filename, { timeout: 15000 }).should('have.length.gt', 50);
  });

  it('export post acceptance', () => {
    const buttonText = 'Export Post-Acceptance Responses';
    cy.contains(buttonText).click({ force: true });
    cy.contains(buttonText).click({ force: true });
    const filename = join(downloadsFolder, 'post-acceptance.csv');
    cy.readFile(filename, { timeout: 15000 }).should('have.length.gt', 50);
  });
});
