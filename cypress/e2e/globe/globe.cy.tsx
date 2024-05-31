/// <reference types="cypress" />

// Import React types (use these as needed for TypeScript support)
/**
 * @import { Context, createContext } from "react";
 */
import { Context, createContext } from "react";

describe("Earth Component", () => {
  beforeEach(() => {
    cy.visit("/globe");
  });

  it("should render the Globe component", () => {
    // Check if the Globe component is rendered
    cy.get("canvas").should("exist");
  });

  it("should fetch and display map data based on the selected year", () => {
    cy.intercept("GET", "**/map/temp?period=*", {
      statusCode: 200,
      body: {
        map: {
          type: "FeatureCollection",
          name: "world_2010",
          crs: {
            type: "name",
            properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
          },
          features: [
            {
              type: "Feature",
              properties: {
                NAME: "Luxembourg",
                ABBREVN: "Luxembourg",
                SUBJECTO: "Luxembourg",
                BORDERPRECISION: 3,
                PARTOF: "Luxembourg",
              },
              geometry: {
                type: "MultiPolygon",
                coordinates: [
                  [
                    [
                      [5.823500189391357, 49.50710638614063],
                      [5.884400400725585, 49.66353567691211],
                      [5.745062384215576, 49.755260072664065],
                      [5.737923655120117, 49.90245779605274],
                      [5.833756479827148, 50.047408662751955],
                      [5.94377568682788, 50.11381109805469],
                      [6.007444891539794, 50.149974428132815],
                      [6.108513388243896, 50.11745413394336],
                      [6.136599573699218, 49.981978975251955],
                      [6.321478399840576, 49.84161337466602],
                      [6.530922445861084, 49.79842718692188],
                      [6.511355433074218, 49.668929658845705],
                      [6.3994536729729, 49.60418661685352],
                      [6.433043036071044, 49.445331178621096],
                      [6.367956194487792, 49.47348364444141],
                      [6.112331900206787, 49.47865255923633],
                      [5.823500189391357, 49.50710638614063],
                    ],
                  ],
                ],
              },
            },
          ],
        },
      },
    }).as("getMapData");

    // Trigger the useEffect hook by changing the selectedYear context value

    // Wait for the fetch request to complete
    cy.wait("@getMapData");

    // Verify that the data is rendered on the Globe

    cy.get("canvas").should("exist"); // Check if the canvas element exists
  });

  it("should change the country on polygon click", () => {
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
        cy.get("[data-selected-country]").should("contain.text", "Luxembourg");
      }
    });
  });

  it("should highlight the country on polygon hover", () => {
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
        cy.get("[data-highlighted-country]").should(
          "contain.text",
          "Luxembourg"
        );
      }
    });
  });
});
