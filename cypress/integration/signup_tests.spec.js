describe("App Testing", () => {
  beforeEach(() => {
    cy.viewport(412, 786);
  });

  it("shows login page", () => {
    cy.visit("/signup");
  });

  it("has a title", () => {
    cy.contains("Crear cuenta");
  });

  it("has a user input", () => {
    cy.get("dato").type(text);
    cy.wait(400);
  });

  it("has a password input", () => {
    cy.get("ion-input").type();
    cy.wait(400);
  });

  it("has a remember checkbox", () => {
    cy.get("#cbox1").click();
  });

  it("has a sign in button", () => {
    cy.get("#login").click();
  });

  it("has a recovery button", () => {
    cy.get("#recovery").click();
  });
});
