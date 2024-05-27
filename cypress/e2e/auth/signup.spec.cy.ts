describe('Signup Page', () => {
    it('should signup with valid credentials', () => {
      cy.visit('/signup');
  
      // Fill out the signup form with valid data
      cy.get('input[name="fullName"]').type('New User');
      cy.get('input[name="username"]').type('newuser');
      cy.get('input[name="email"]').type('newuser@example.com');
      cy.get('input[name="password"]').type('password');
      cy.get('input[name="confirmPassword"]').type('password');
      cy.get('button[type="submit"]').click();
  
      // Assert that user is redirected to the dashboard or some success page
      cy.url().should('include', '/globe');
  
    });
  });
  