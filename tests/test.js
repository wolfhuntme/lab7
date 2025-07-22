// run npm install --save-dev mocha chai selenium-webdriver

// Import the 'expect' function from the Chai assertion library
import { expect } from 'chai';
// Import the function under test and the server instance from our application code
import { getCurrentTimestamp, server } from '../src/server.js';

// Define a Mocha test suite named "Timestamp Function"
describe('Timestamp Function', () => {
  // First test case: verify that the function returns a string in ISO format
  it('should return a valid ISO timestamp', () => {
    // Call the timestamp function and store its result
    const timestamp = getCurrentTimestamp();
    // Regex matching "YYYY-MM-DDTHH:mm:ss.sssZ"
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    // Assert that the returned string matches our ISO regex
    expect(timestamp).to.match(isoRegex);
  });

  // Second test: ensure the returned timestamp is “now” (within 1 second)
  it('should return the current timestamp', () => {
    // Call the function again
    const timestamp = getCurrentTimestamp();
    // Get the real current time in ISO format
    const now = new Date().toISOString();
    // Convert both to ms since epoch and assert they differ by at most 1000 ms
    expect(new Date(timestamp).getTime()).to.be.closeTo(new Date(now).getTime(), 1000);
  });

  // After all tests in this suite run...
  after(() => {
    // ...shut down the HTTP server to free up the port
    server.close();
  });
});