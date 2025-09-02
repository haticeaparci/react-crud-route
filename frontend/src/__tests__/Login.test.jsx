import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import * as auth from "../utils/auth";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";

jest.mock("../utils/auth");

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("shows error message on failed login", () => {
    auth.login.mockReturnValue(false); // fake auth fail

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      screen.getAllByText(/invalid email or password/i).length
    ).toBeGreaterThan(0);
  });
});

/*


FAIL src/tests/Login.test.jsx
× renders login form (119 ms)
× shows error on invalid login (245 ms)

● renders login form

● shows error on invalid login

Test Suites: 1 failed, 1 total
Tests: 2 failed, 2 total
Snapshots: 0 total
Time: 4.797 s
Ran all test suites.

*/
