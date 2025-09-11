class Login {
  visit() {
    cy.visit(`${Cypress.env("url")}/auth/login`);
    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub");
    });
  }

  getEmailInput() {
    return cy.get("#login-email");
  }

  getPasswordInput() {
    return cy.get("#login-password");
  }

  getSubmitButton() {
    return cy.get("#login-btn");
  }

  fillEmail(email) {
    this.getEmailInput().clear().type(email).blur();
  }

  fillPassword(password) {
    this.getPasswordInput().clear().type(password).blur();
  }

  clickLogin() {
    this.getSubmitButton().click({ force: true });
  }

  getLoginButton() {
    return this.getSubmitButton();
  }

  expectError(message) {
    cy.get('div[role="alert"]')
      .should("be.visible")
      .and(($el) => {
        expect($el.text()).to.include(message);
      });
  }

  login(email, password) {
    this.visit();
    this.getEmailInput().type(email);
    this.getPasswordInput().type(password);
    this.getSubmitButton().click({ force: true });
    cy.contains("Welcome", { timeout: 10000 }).should("be.visible");
  }
}

export default new Login();
