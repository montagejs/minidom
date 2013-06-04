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
            expect(doc.children[0].tagName).toEqual("HTML");
            expect(doc.children[0].children[0].tagName).toEqual("HEAD");
            expect(doc.children[0].children[0].children[0].textContent).toEqual("pass");
        });

        it("rejects non-HTML doctypes", function () {
            expect(function(){
                minidom("<!doctype wrong><html><body>pass</body></html");
            }).toThrow(new Error("minidom only supports HTML documents, not '!doctype wrong'"));
        });

        it("handles doctype", function () {
            var doctype = "<!DOCTYPE html>";

            var doc = minidom(
                doctype + "<html><body>pass</body></html"
            );
            expect(doc.doctype.name).toEqual("html");
            expect(doc.doctype.toString()).toEqual(doctype);

            expect(doc.children[0].tagName).toEqual("HTML");
            expect(doc.children[0].children[0].tagName).toEqual("BODY");
            expect(doc.children[0].children[0].textContent).toEqual("pass");
        });

    });

});
