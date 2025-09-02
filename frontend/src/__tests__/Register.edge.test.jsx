import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../pages/auth/Register";
import { describe, test, expect, jest, beforeEach } from "@jest/globals";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  MemoryRouter: ({ children }) => <div>{children}</div>,
}));

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe("Register Page", () => {
  test("renders register form", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  test("shows alert if fields are empty", () => {
    window.alert = jest.fn();
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    expect(window.alert).toHaveBeenCalledWith("All fields are required!");
  });

  test("shows alert if passwords do not match", () => {
    window.alert = jest.fn();
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "654321" },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    expect(window.alert).toHaveBeenCalledWith("Passwords do not match!");
  });

  test("shows alert if user already exists", () => {
    window.alert = jest.fn();
    localStorage.setItem(
      "users",
      JSON.stringify([{ email: "test@mail.com", password: "123456" }])
    );
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    expect(window.alert).toHaveBeenCalledWith("User already exists");
  });

  test("registers successfully and navigates to login", () => {
    window.alert = jest.fn();
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "new@mail.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "abcdef" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "abcdef" },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    expect(window.alert).toHaveBeenCalledWith(
      "Registration successful! Please login."
    );
    expect(mockNavigate).toHaveBeenCalledWith("/auth/login");
    // Kullanıcı localStorage'a kaydedildi mi?
    const users = JSON.parse(localStorage.getItem("users"));
    expect(users.some((u) => u.email === "new@mail.com")).toBe(true);
  });
});
/*
-------------------------
$ npm test -- src/tests/Register.edge.test.jsx

> poxdam-buchung@0.0.0 test
> jest src/tests/Register.edge.test.jsx

 PASS  src/tests/Register.edge.test.jsx
  Register Page
    √ renders register form (201 ms)
    √ shows alert if fields are empty (71 ms)
    √ shows alert if passwords do not match (129 ms)
    √ shows alert if user already exists (106 ms)
    √ registers successfully and navigates to login (116 ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        4.663 s
Ran all test suites matching src/tests/Register.edge.test.jsx.


*/
