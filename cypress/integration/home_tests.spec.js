describe("App Testing", () => {
  beforeEach(() => {
    cy.viewport(412, 786);
  });

  it("shows home page", () => {
    cy.visit("/home");
  });
});
