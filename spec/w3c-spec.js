/*global describe, it, expect */

// var adaptor = require("./DOMTestCase");
// Wrap assert so that we can add our own properties to it
var assert = Object.create(require("assert"));

describe("w3c tests", function () {
    describe("level1", function () {
        describe("core", function () {
            var tests = require("./level1/core").tests;

            for (var name in tests) {
                makeIt(name, tests[name]);
            }
        });
    });
});

function makeIt(name, test) {
    it(name, function () {
        var done = false;
        assert.done = function () {
            done = true;
        };

        test(assert);

        if (!done) {
            this.fail("Done not called");
        }
    });
}
