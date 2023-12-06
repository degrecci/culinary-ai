import { Button } from ".";

describe("<Button />", () => {
  it("should render and display expected content", () => {
    cy.mount(<Button>Test</Button>);

    cy.get("button").contains("Test");
  });
});
