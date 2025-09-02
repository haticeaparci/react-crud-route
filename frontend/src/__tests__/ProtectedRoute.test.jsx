import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import Login from "../pages/auth/Login";
import * as auth from "../utils/auth";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";
// npm test -- src/tests/ProtectedRoute.test.jsx

jest.mock("../utils/auth");

function ProductDetail() {
  return <div>Product Detail Page</div>;
}

describe("ProtectedRoute Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("redirects to login if not authenticated", () => {
    auth.isAuthenticated.mockReturnValue(false);

    render(
      <MemoryRouter initialEntries={["/products/123"]}>
        <Routes>
          <Route
            path="/products/:productId"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();

    expect(screen.getByText(/please login to continue/i)).toBeInTheDocument();
  });

  test("renders protected page if authenticated", () => {
    auth.isAuthenticated.mockReturnValue(true);

    render(
      <MemoryRouter initialEntries={["/products/123"]}>
        <Routes>
          <Route
            path="/products/:productId"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/product detail page/i)).toBeInTheDocument();
  });
});

/*
> jest src/tests/ProtectedRoute.test.jsx

 PASS  src/tests/ProtectedRoute.test.jsx
  ProtectedRoute Component
    √ redirects to login if not authenticated (267 ms)
    √ renders protected page if authenticated (6 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        5.857 s
Ran all test suites matching src/tests/ProtectedRoute.test.jsx.

*/
