import { jest } from "@jest/globals";
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "../pages/auth/ProtectedRoute";

import { isAuthenticated } from "../utils/auth";
import { describe, test, expect, afterEach } from "@jest/globals";

jest.mock("../utils/auth", () => ({
  isAuthenticated: jest.fn(),
}));

const TestComponent = () => <div>Protected Content</div>;
const LoginComponent = () => <div>Login Page</div>;

describe("ProtectedRoute", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders children if authenticated", () => {
    isAuthenticated.mockReturnValue(true);

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <TestComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  test("redirects to /auth/login if not authenticated", () => {
    isAuthenticated.mockReturnValue(false);

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <TestComponent />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/login" element={<LoginComponent />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("passes location state when redirecting", () => {
    isAuthenticated.mockReturnValue(false);

    let receivedState;
    const LoginWithState = () => {
      const location = useLocation();
      receivedState = location.state;
      return <div>Login Page</div>;
    };

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <TestComponent />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/login" element={<LoginWithState />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(receivedState).toMatchObject({
      message: "Please login to continue",
    });
    expect(receivedState.from).toBeDefined();
  });
});

/*

------------------
$ npm test -- src/tests/Protected.edge.test.jsx

> poxdam-buchung@0.0.0 test
> jest src/tests/Protected.edge.test.jsx

 PASS  src/tests/Protected.edge.test.jsx
  ProtectedRoute
    √ renders children if authenticated (48 ms)
    √ redirects to /auth/login if not authenticated (11 ms)
    √ passes location state when redirecting (10 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        3.062 s
Ran all test suites matching src/tests/Protected.edge.test.jsx.



*/
