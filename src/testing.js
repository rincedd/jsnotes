// # Unit testing JavaScript
// There are various (unit) testing frameworks for JavaScript. Probably the most popular one is
// the [Jasmine](http://jasmine.github.io) unit testing framework.

// ## Writing Jasmine tests

// Jasmine is a behaviour-driven-development (BDD) test framework, which allows to write
// easily readable test suites.
describe('The developer console', function() {           // a test suite

    it('should exist', function() {                      // a test spec
        expect(console).toBeDefined();                   // a test expectation
        expect(typeof console).toBe('object');           // another test expectation
    });

    it('should provide a log function', function() {
        expect(typeof console.log).toBe('function');
        expect(typeof console.log).not.toBe('object');   // expectations can be inverted
    });

});

// Jasmine provides many different "matchers", e.g. `toBe()`, `toEqual()`, `toContain()`, etc. They
// are described in the [Jasmine documentation](http://jasmine.github.io/2.0/introduction.html).

// ## Spec runner setup

// ## Headless testing

// ## Other test frameworks
