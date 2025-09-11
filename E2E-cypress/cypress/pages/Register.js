export class Register {
  visit() {
    cy.visit(`${Cypress.env("url")}/auth/register`);

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub");
      win.localStorage.clear();
    });
  }
  fillEmail(email) {
    cy.get('[data-cy="register-email"] input').clear().type(email);
  }

  fillPassword(password) {
    cy.get('[data-cy="register-password"] input').clear().type(password);
  }

  fillConfirmPassword(confirmPassword) {
    cy.get('[data-cy="register-confirm-password"] input')
      .clear()
      .type(confirmPassword);
  }

  clickRegister() {
    cy.get('[data-cy="register-submit"]').click();
  }

  expectAlert(message) {
    cy.get("@alertStub").should("have.been.calledWith", message);
  }

  expectRegisterDisabled(state = true) {
    cy.get('[data-cy="register-submit"]').should(
      state ? "be.disabled" : "not.be.disabled"
    );
  }

  expectEmailValidationError() {
    cy.get('[data-cy="register-email"] input').then(($input) => {
      expect($input[0].validity.valid).to.be.false;
      expect($input[0].validity.typeMismatch).to.be.true;
      expect($input[0].validationMessage).to.not.be.empty;
      expect($input[0].checkValidity()).to.be.false;
    });
  }

  addUserToLocalStorage(user) {
    cy.window().then((win) => {
      const users = JSON.parse(win.localStorage.getItem("users") || "[]");
      users.push(user);
      win.localStorage.setItem("users", JSON.stringify(users));
    });
  }
}
