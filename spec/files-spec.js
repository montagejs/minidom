/*global describe, it, expect */

var FS = require("fs");
var PATH = require("path");

var minidom = require("../minidom");

// This spec uses files contributed to the HTML test suites. They are just
// being used to stress test the parser, and not actually being run as
// intended  :)

describe("html files", function () {

    var list = walk(PATH.join(__dirname, "files"));

    for (var i = 0; i < list.length; i++) {
        var file = list[i];
        var name = file.replace(__dirname, "");
        makeIt(name, file);
    }
});

function makeIt(name, file) {
    it(name, function () {
        minidom(FS.readFileSync(file));
    });
}

// Inspired by http://stackoverflow.com/a/5827895/100172
// sure, there are plenty of packages which include this kind of functionality,
// but I want to keep minidom light on dependencies.
function walk(dir, result) {
    result = result || [];

    var list = FS.readdirSync(dir);

    list.forEach(function(file) {
        file = PATH.join(dir, file);

        var stat = FS.statSync(file);
        if (stat && stat.isDirectory()) {
            result.push.apply(result, walk(file));
        } else {
            result.push(file);
        }
    });

    return result;
}
