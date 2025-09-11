import { Register } from "../pages/Register";

describe("Register E2E Tests", () => {
  const register = new Register();

  beforeEach(() => {
    register.visit();
  });

  it("  1️⃣  Show error if fields are empty", () => {
    register.clickRegister();
    register.expectAlert("All fields are required!");
  });

  it("  2️⃣  Show error for invalid email", () => {
    register.fillEmail("invalid-email");
    register.fillPassword("password123");
    register.fillConfirmPassword("password123");
    register.clickRegister();

    register.expectEmailValidationError();
  });

  it("  3️⃣  Show error when passwords do not match", () => {
    register.fillEmail("test@example.com");
    register.fillPassword("password123");
    register.fillConfirmPassword("different");
    register.clickRegister();
    register.expectAlert("Passwords do not match!");
  });

  it("4️⃣ Show error if user already exists", () => {
    const existingUser = {
      email: "existing@example.com",
      password: "password123",
    };

    register.addUserToLocalStorage(existingUser);

    register.fillEmail(existingUser.email);
    register.fillPassword(existingUser.password);
    register.fillConfirmPassword(existingUser.password);

    register.clickRegister();
    register.expectAlert("User already exists");
  });

  // TODO implement Register.jsx
  //   it("  5️⃣  should enable button only when fields are valid", () => {
  //     register.expectRegisterDisabled(true);
  //     register.fillEmail("test@example.com");
  //     register.fillPassword("password123");
  //     register.fillConfirmPassword("password123");
  //     register.expectRegisterDisabled(false);
  //   });

  // TODO implement Register.jsx ; if the password is shorter than the required minimum length
  // TODO implement Register.jsx ; the register button disabled until all fields are valid
});
