import { defineConfig } from "cypress";

async function setupNodeEvents(on, config) {
  // implement node event listeners here
  return config;
}

export default defineConfig({
  env: {
    url: "http://localhost:5173", // default: local
  },
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    experimentalStudio: true,
    video: true,
    videoUploadOnPasses: false,
    supportFile: "cypress/support/e2e.js",
  },
});
// npx cypress open
