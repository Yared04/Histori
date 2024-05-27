// cypress/e2e/home.spec.cy.ts
/// <reference types="cypress" />

describe('Home Page', () => {
    const mockEvents = [
      { id: '1', title: 'Event 1', description: 'Description 1', year: 2020, country: 'USA' },
      { id: '2', title: 'Event 2', description: 'Description 2', year: 2020, country: 'USA' }
    ];
  
    beforeEach(() => {
      // Mock the API response
      cy.intercept('GET', `${Cypress.env('NEXT_PUBLIC_BASE_URL')}/histories?year=2020&country=USA`, {
        statusCode: 200,
        body: mockEvents,
      }).as('getEvents');
  
      // Visit the home page
      cy.visit('/home');
    });
  
    it('should fetch and display events correctly', () => {
      // Wait for the API call to complete
      cy.wait('@getEvents');
  
      // Assert that the events are displayed in the SideBar
      cy.get('.sidebar-event').should('have.length', mockEvents.length);
      cy.get('.sidebar-event').first().should('contain.text', mockEvents[0].title);
      cy.get('.sidebar-event').last().should('contain.text', mockEvents[1].title);
    });
  
    it('should display login button when user is not authenticated', () => {
      cy.get('button').contains('Login').should('be.visible');
    });
  
    it('should display user avatar and logout button when user is authenticated', () => {
      // Simulate user authentication by setting local storage and reloading
      const mockUser = { email: 'user@example.com', id: '123' };
      window.localStorage.setItem('token', 'mockToken');
      cy.window().then((win) => {
        win.localStorage.setItem('token', 'mockToken');
        win.location.reload();
      });
  
      cy.get('.avatar-placeholder').should('contain.text', 'U');
      cy.get('.dropdown-item').contains('Logout').should('be.visible');
    });
  });
  