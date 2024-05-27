// cypress/e2e/home.spec.cy.ts
/// <reference types="cypress" />

describe("Landing Page", () => {
  it("should display the landing header titles", () => {
    cy.visit("/");

    cy.contains("HISTOR").should("be.visible");
    cy.contains("Discover the world as it was").should("be.visible");
    cy.contains("Explore the Past").should("be.visible");
  });

  it("should display login button when user is not authenticated", () => {
    cy.visit("/");

    cy.get("button").contains("Login").should("be.visible");
  });
});
