// test-security-node.js - Tests for eslint-plugin-security-node

// Test 1: Insecure HTTP headers
const express = require('express');
const app = express();

// Should trigger security warnings about missing security headers
app.get('/', (req, res) => {
    res.send('Hello World'); // Missing security headers
});

// Test 2: Improper handling of user input
const fs = require('fs');
const userInput = req.query.file; // User-controlled input
fs.readFile(userInput, 'utf8', callback); // Should trigger warning

// Test 3: Insecure crypto usage
const crypto = require('crypto');
const hash = crypto.createHash('md5'); // Should trigger MD5 warning
const weakHash = crypto.createHash('sha1'); // Should trigger SHA1 warning

// Test 4: Child process with user input
const { exec } = require('child_process');
const command = req.body.command; // User input
exec(command); // Should trigger child process warning

// Test 5: Insecure randomness
Math.random(); // Should trigger insecure randomness warning