// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// src/setupTests.ts
const originalWarn = console.warn;
const originalError = console.error;

// Mock console warnings and errors
beforeAll(() => {
  console.warn = (...args) => {
    // Add conditions to suppress specific warnings if necessary
    return;
  };
  console.error = (...args) => {
    // Add conditions to suppress specific errors if necessary
    return;
  };
});

// Restore original methods after tests
afterAll(() => {
  console.warn = originalWarn;
  console.error = originalError;
});
