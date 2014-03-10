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

// The simplest way to run Jasmine tests is to set them up in a spec runner HTML file. This is basically a
// HTML file that includes Jasmine's CSS and JS (`jasmine.js`, `jasmine-html.js`), all your JavaScript sources
// and spec files.
// Then, the Jasmine test runner and HTML reporter is created and executed in the `window.onload` event callback.
(function () {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var currentWindowOnload = window.onload;

    window.onload = function () {
        if (currentWindowOnload) {
            currentWindowOnload();
        }
        jasmineEnv.execute();
    };
})();

// If you want to test code that uses jQuery, include `jasmine-jquery.js` as well.

// To run your test suite, open the spec runner HTML in a browser.

// ## Headless testing

// ## Other test frameworks
