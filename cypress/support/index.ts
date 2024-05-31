Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  if (err.message.includes("Hydration failed")) {
    return false;
  }
  return true;
});
