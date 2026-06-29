const { defineConfig } = require("cypress");
const { plugin: cypressGrepPlugin } = require("@cypress/grep/plugin");


module.exports = defineConfig({
  reporter: 'mochawesome',
  allowCypressEnv: false,
  projectId: "isrrue",
  e2e: {
    baseUrl : 'https://www.automationpratice.com.br',
    setupNodeEvents(on, config) {
      cypressGrepPlugin(config);

      return config;
    },
  },
});
