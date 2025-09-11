import login from "../pages/Login";

describe("Login Page E2E Tests", () => {
  beforeEach(() => {
    login.visit();

    const user = { email: "testuser@example.com", password: "password123" };
    cy.window().then((win) => {
      win.localStorage.setItem("users", JSON.stringify([user]));
    });
  });

  it("  1️⃣ Display an error for invalid email format", () => {
    login.fillEmail("invalid-email");
    login.fillPassword("password123");
    login.clickLogin();
    login.getEmailInput().then(($input) => {
      expect($input[0].validationMessage).to.not.be.empty;
    });
  });

  it("  2️⃣ Display an error for incorrect password", () => {
    login.fillEmail("user@example.com");
    login.fillPassword("wrongpassword");
    login.clickLogin();
    login.expectError("Invalid email or password");
  });

  it("  3️⃣ Login successfully with correct credentials", () => {
    login.fillEmail("testuser@example.com");
    login.fillPassword("password123");
    login.clickLogin();

    cy.url().should("not.include", "/login");
    cy.contains("h2", "🌟 Welcome! Let’s dive into React magic!").should(
      "exist"
    );
  });
});

// TODO implement Login.jsx
//  4️⃣ should have login button disabled if email or password is empty"

// TODO implement Login.jsx
//   5️⃣ should display an error for non-existent email"
