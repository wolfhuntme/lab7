// test-no-unsanitized.js - Tests for eslint-plugin-no-unsanitized (XSS prevention)

// Test 1: Unsafe innerHTML usage
const userContent = '<script>alert("XSS")</script>';
document.getElementById('content').innerHTML = userContent; // Should trigger XSS warning

// Test 2: Unsafe outerHTML usage  
const maliciousHTML = '<img src=x onerror=alert(1)>';
document.body.outerHTML = maliciousHTML; // Should trigger XSS warning

// Test 3: Unsafe insertAdjacentHTML
const untrustedData = req.body.html; // User input
element.insertAdjacentHTML('beforeend', untrustedData); // Should trigger warning

// Test 4: Unsafe document.write
const userScript = '<script src="evil.js"></script>';
document.write(userScript); // Should trigger warning

// Test 5: Unsafe jQuery html() method
const $element = $('#target');
const dangerousContent = '<script>steal_cookies()</script>';
$element.html(dangerousContent); // Should trigger warning if jQuery rules enabled

// Test 6: Range createContextualFragment
const range = document.createRange();
const userHTML = '<script>malicious()</script>';
const fragment = range.createContextualFragment(userHTML); // Should trigger warning