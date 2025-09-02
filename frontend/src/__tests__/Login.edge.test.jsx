// MOCKLAR EN ÜSTE!
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../utils/auth", () => ({
  login: jest.fn(),
  isAuthenticated: jest.fn(() => false),
}));

import { describe, test, expect, jest, beforeEach } from "@jest/globals";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import * as auth from "../utils/auth";

describe("Login Page", () => {
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

  test("shows error if email and password are empty", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(
      await screen.findByText(/email and password are required/i, {
        selector: ".MuiAlert-message",
      })
    ).toBeInTheDocument();
  });

  test("shows error if only email is filled", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@mail.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(
      await screen.findByText(/email and password are required/i, {
        selector: ".MuiAlert-message",
      })
    ).toBeInTheDocument();
  });

  test("shows error if only password is filled", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(
      await screen.findByText(/email and password are required/i, {
        selector: ".MuiAlert-message",
      })
    ).toBeInTheDocument();
  });
  test("shows error if login fails", async () => {
    auth.login.mockReturnValue(false);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText(/invalid email or password/i, {
        selector: ".MuiAlert-message",
      })
    ).toBeInTheDocument();
  });

  test("calls login and navigates on success", () => {
    auth.login.mockReturnValue(true);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "correctpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(auth.login).toHaveBeenCalledWith("test@mail.com", "correctpass");
    expect(mockNavigate).toHaveBeenCalled();
  });
});

/*
--------------------

$ npm test

> poxdam-buchung@0.0.0 test
> jest

 PASS  src/tests/ProtectedRoute.test.jsx (5.354 s)
 PASS  src/tests/Login.edge.test.jsx (6.382 s)
 PASS  src/tests/Register.edge.test.jsx (6.836 s)
 PASS  src/tests/Login.test.jsx
 PASS  src/tests/Protected.edge.test.jsx
 PASS  src/tests/Register.test.jsx 

Test Suites: 6 passed, 6 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        11.423 s
Ran all test suites.
-------------------------------
$ npm test -- src/tests/Login.edge.test.jsx

> poxdam-buchung@0.0.0 test
> jest src/tests/Login.edge.test.jsx

 PASS  src/tests/Login.edge.test.jsx
  Login Page
    √ renders login form (238 ms)
    √ shows error if email and password are empty (152 ms)
    √ shows error if only email is filled (120 ms)
    √ shows error if only password is filled (113 ms)
    √ shows error if login fails (122 ms)
    √ calls login and navigates on success (73 ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        6.527 s
Ran all test suites matching src/tests/Login.edge.test.jsx.




*/
