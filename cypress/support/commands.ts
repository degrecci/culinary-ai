/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add("signin", () => {
  cy.visit("http://localhost:3000/");

  // Find a link with an href attribute containing "signin" and click it
  cy.get('a[href*="signin"]').click();

  // The new url should include "/signin"
  cy.url().should("include", "/signin");

  // The new page should contain an h1 with "Sign In page"
  cy.get("h2").contains("Sign In");

  cy.get('input[name="email"]').type(Cypress.env("user_email"));
  cy.get('input[name="password"]').type(Cypress.env("user_password"));
  cy.get("#submit").click();
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }