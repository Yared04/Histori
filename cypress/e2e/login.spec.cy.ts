// cypress/integration/login.spec.cy.ts

describe('Login Page', () => {
    it('should login with valid credentials', () => {
      cy.visit('src/app/login'); // Assuming your login page is at /login
  
      cy.get('input[name="email"]').type('gmail@gmail.com');
      cy.get('input[name="password"]').type('password');
      cy.get('button[type="submit"]').click();
  
      // Assert that user is redirected to the dashboard
      cy.url().should('include', '/globe');
  
    });
  
    it('should display error message with invalid credentials', () => {
      cy.visit('src/app/login');
  
      cy.get('input[name="email"]').type('invalid@example.com');
      cy.get('input[name="password"]').type('invalidpassword');
      cy.get('button[type="submit"]').click();
  
      // Assert that error message is displayed
      cy.contains('Invalid credentials');
    });
  });
  