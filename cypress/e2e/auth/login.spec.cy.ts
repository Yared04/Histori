// cypress/integration/login.spec.cy.ts
/// <reference types="cypress" />

describe("Login Page", () => {
  it("should login with valid credentials", () => {
    cy.visit("/login"); // Assuming your login page is at /login

    cy.get('input[name="email"]').type("gmail@gmail.com");
    cy.get('input[name="password"]').type("password");
    cy.get('input[name="email"]').should("have.value", "gmail@gmail.com");
    cy.get('button[type="submit"]').click();

    // Assert that user is redirected to the dashboard
    cy.url().should("include", "/globe");

    // Assert that token is saved to localStorage
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.exist;
    });
  });

  it("should display error message with invalid credentials", () => {
    cy.visit("/login");

    cy.get('input[name="email"]').type("invalid@example.com");
    cy.get('input[name="password"]').type("invalidpassword");
    cy.get('button[type="submit"]').click();

    // Assert that error message is displayed
    cy.contains("Invalid login credentials").should("be.visible");
  });

  it("should display validation errors for empty fields", () => {
    cy.visit("/login");

    cy.get('button[type="submit"]').click();

    // Assert that validation errors are displayed
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
  });

  it("should display validation error for invalid email format", () => {
    cy.visit("/login");

    cy.get('input[name="email"]').type("invalidemail");
    cy.get('button[type="submit"]').click();

    // Assert that validation error for email is displayed
    cy.contains("Invalid email").should("be.visible");
  });
});
