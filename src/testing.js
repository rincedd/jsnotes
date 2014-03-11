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

// Jasmine also provides _spies_ to test whether methods have been called and with the correct arguments.
describe('A simple logger', function() {
    var logger = {
        logLevel: 'debug',
        debug: function(message) {
            if (this.logLevel === 'debug') {
                console.log(message);
            }
        }
    };

    it('should log debug messages when log level is set to debug', function() {
        spyOn(console, 'log');                         // wrap `console.log` in a spy function to spy on it
        logger.debug('test message');

        // Jasmine spies come with matching matchers.
        expect(console.log).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith('test message');
    })
});

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

// To run your test suite manually, open the spec runner HTML in a browser. In order to integrate JavaScript
// tests in an automated build setup (e.g. Jenkins), a _test runner_ should be used (see below).

// ## Headless testing

// To integrate JavaScript tests in automated builds, they have to be run in a "headless" browser.
// There are headless versions of the major browsers/rendering engines, i.e., WebKit, Firefox, and Internet Explorer.
// The easiest to install and use is the headless WebKit browser [PhantomJS](http://phantomjs.org).

// ## Other test frameworks and runners

// Apart from Jasmine, there are mainly two other notable test frameworks:
//
// * [Mocha](http://visionmedia.github.io/mocha), optionally with [Chai](http://chaijs.com) and [SinonJS](http://sinonjs.org),
//   is quite similar to Jasmine but more fun :-)
// * [QUnit](https://qunitjs.com) is a powerful unit testing framework used by jQuery
//
// To automate both browser and headless testing, a number of test runners have been developed:
//
// * [Karma](http://karma-runner.github.io) is a test runner that can simultaneously run tests in many different browsers
//   (including headless ones). It has been developed together with AngularJS but can be used for any JavaScript
//   project. It is easily integrated in automated build pipelines.
// * [BusterJS](http://busterjs.org) is another test runner with additional testing features, which is
//   currently under development.
