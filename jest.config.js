/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */


const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
 // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  
  setupFiles: ['./jest.polyfills.js'],

  testEnvironmentOptions: {
    customExportConditions: [''],
  },

  testPathIgnorePatterns: [
    '<rootDir>/lib/', // Ignore lib directory
    '<rootDir>/actions/', // Add any other paths you want to exclude
    '<rootDir>/api/', // Add any other paths you want to exclude

  ],
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",


  // The test environment that will be used for testing

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  testEnvironment: "jsdom",



};

module.exports = createJestConfig(config);