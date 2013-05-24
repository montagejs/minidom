/*jshint node:true */
/*global describe, it, expect */

var minidom = require("../minidom");

describe("minidom", function () {

    describe("constructor", function () {

        it("returns a document", function () {
            var doc = minidom();
            expect(doc.nodeType).toEqual(doc.DOCUMENT_NODE);
        });

    });

    describe("textContent", function () {

        it("returns the text", function () {
            var doc = minidom("<html><head>pass</head><body>pass</body></html>");
            expect(doc.children[0].textContent).toEqual("passpass");
        });

        it("sets the text", function () {
            var doc = minidom("<html><head>pass</head><body>fail</body></html>");

            doc.children[0].children[1].textContent = "pass";
            expect(doc.children[0].textContent).toEqual("passpass");
        });

    });

    describe("parsing", function () {

        it("create elements", function () {
            var doc = minidom(
                "<html><head><title>pass</title></head><body><h1>pass</h1></body></html"
            );
            expect(doc.children[0].tagName).toEqual("html");
            expect(doc.children[0].children[0].tagName).toEqual("head");
            expect(doc.children[0].children[0].children[0].textContent).toEqual("pass");
        });

        it("handles unclosed tags", function () {
            var doc = minidom(
                "<html><body>pass<br>pass</body></html"
            );
            expect(doc.children[0].tagName).toEqual("html");
            expect(doc.children[0].children[0].tagName).toEqual("body");
            expect(doc.children[0].children[0].childNodes[1].tagName).toEqual("br");
        });

    });

});
