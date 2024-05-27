// cypress/integration/signup.spec.cy.ts
/// <reference types="cypress" />

describe('Signup Page', () => {
    it('should signup with valid credentials', () => {
      cy.visit('/signup');
  
      // Fill out the signup form with valid data
      cy.get('input[name="fullName"]').type('New User FIve');
      cy.get('input[name="username"]').type('newuser5');
      cy.get('input[name="email"]').type('newuser5@example.com');
      cy.get('input[name="password"]').type('password');
      cy.get('input[name="confirmPassword"]').type('password');
      cy.get('button[type="submit"]').click();
  
      // Assert that user is redirected to the dashboard or some success page
      cy.url({ timeout: 5000 }).should('include', '/globe'); // Increase the timeout to 5 seconds
    });
  
    it('should display validation errors for empty fields', () => {
      cy.visit('/signup');
  
      cy.get('button[type="submit"]').click();
  
      // Assert that validation errors are displayed
      cy.contains('Full Name is required').should('be.visible');
      cy.contains('Username is required').should('be.visible');
      cy.contains('Email is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
      cy.contains('Confirm Password is required').should('be.visible');
    });
  
    it('should display validation error for invalid email format', () => {
      cy.visit('/signup');
  
      cy.get('input[name="email"]').type('invalidemail');
      cy.get('button[type="submit"]').click();
  
      // Assert that validation error for email is displayed
      cy.contains('Invalid email').should('be.visible');
    });
  
    it('should display validation error when passwords do not match', () => {
      cy.visit('/signup');
  
      cy.get('input[name="password"]').type('password');
      cy.get('input[name="confirmPassword"]').type('differentpassword');
      cy.get('button[type="submit"]').click();
  
      // Assert that validation error for password mismatch is displayed
      cy.contains('Passwords must match').should('be.visible');
    });
  });
  