describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
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
});
