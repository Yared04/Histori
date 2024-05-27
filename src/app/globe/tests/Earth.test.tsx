/// <reference types="cypress" />

// Import React types (use these as needed for TypeScript support)
import { Context, createContext } from "react";

describe("Earth Component", () => {
  beforeEach(() => {
    // Assuming the Earth component is at the root URL of your application
    cy.visit("/");
  });

  it("should render the Globe component", () => {
    // Check if the Globe component is rendered
    cy.get("canvas").should("exist");
  });

  it("should fetch and display map data based on the selected year", () => {
    // Mock the fetch request to return a dummy response
    cy.intercept("GET", "**/map/temp?period=*", {
      statusCode: 200,
      body: {
        map: {
          features: [
            {
              properties: { NAME: "Test Country" },
            },
          ],
        },
      },
    }).as("getMapData");

    // Trigger the useEffect hook by changing the selectedYear context value
    // Assuming there's a way to trigger the context value change, otherwise mock the context

    // Wait for the fetch request to complete
    cy.wait("@getMapData");

    // Verify that the data is rendered on the Globe
    // You might need to add additional checks based on your implementation
    cy.get("canvas").should("exist"); // Check if the canvas element exists
  });

  it("should change the country on polygon click", () => {
    // Assuming you have a method to simulate a polygon click, you may need to mock or trigger this event
    cy.window().then((win) => {
      const globeEl = win.document.querySelector("canvas");
      if (globeEl) {
        // Simulate a click event on the globe
        const clickEvent = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: win,
        });
        globeEl.dispatchEvent(clickEvent);

        // Check if the selected country is set
        // Assuming there's a way to verify the selected country in the DOM or via a context/state
        // Example check - you might need to adapt this based on your actual DOM structure
        cy.get("[data-selected-country]").should(
          "contain.text",
          "Test Country"
        );
      }
    });
  });

  it("should highlight the country on polygon hover", () => {
    // Assuming you have a method to simulate a polygon hover, you may need to mock or trigger this event
    cy.window().then((win) => {
      const globeEl = win.document.querySelector("canvas");
      if (globeEl) {
        // Simulate a hover event on the globe
        const mouseEvent = new MouseEvent("mousemove", {
          bubbles: true,
          cancelable: true,
          view: win,
        });
        globeEl.dispatchEvent(mouseEvent);

        // Check if the country is highlighted
        // Example check - you might need to adapt this based on your actual DOM structure
        cy.get("[data-highlighted-country]").should(
          "contain.text",
          "Test Country"
        );
      }
    });
  });
});
