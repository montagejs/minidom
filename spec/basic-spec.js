/*jshint node:true */
/*global describe, it, expect */

var minidom = require("../minidom");
describe("minidom", function () {

    describe("constructor", function () {

        it("returns an empty document when given no arguments", function () {
            var doc = minidom();
            expect(doc.nodeType).toEqual(doc.DOCUMENT_NODE);
            expect(doc.documentElement.outerHTML).toEqual("<html><head></head><body></body></html>");
        });
    });

    describe("textContent", function () {

        it("returns the text", function () {
            var doc = minidom("<html><head><title>pass</title></head><body>pass</body></html>");
            expect(doc.children[0].textContent).toEqual("passpass");
        });

        it("sets the text", function () {
            var doc = minidom("<html><head><title>pass</title></head><body>fail</body></html>");

            doc.children[0].children[1].textContent = "pass";
            expect(doc.children[0].textContent).toEqual("passpass");
        });

    });

    describe("parsing", function () {

        describe("doctype", function () {
            it("works", function () {
                var doctype = "<!DOCTYPE html>";

                var doc = minidom(
                    doctype + "<html><body>pass</body></html>"
                );
                expect(doc.doctype.name).toEqual("html");
                expect(doc.doctype.toString()).toEqual(doctype);

                expect(doc.children[0].tagName).toEqual("HTML");
                expect(doc.children[0].children[1].tagName).toEqual("BODY");
                expect(doc.children[0].children[1].textContent).toEqual("pass");
            });
        });

        describe("elements", function () {
            it("works", function () {
                var doc = minidom(
                    "<!doctype html><html><head><title>pass</title></head><body><h1>pass</h1></body></html>"
                );
                expect(doc.children[0].tagName).toEqual("HTML");
                expect(doc.children[0].children[0].tagName).toEqual("HEAD");
                expect(doc.children[0].children[0].children[0].textContent).toEqual("pass");
            });

            it("parses attributes", function () {
                var doc = minidom(
                    '<!doctype html><html><head></head><body><h1 class="good" data-test="ok">pass</h1></body></html>'
                );
                var el = doc.children[0].children[1].children[0];
                expect(el.tagName).toEqual("H1");
                expect(el.getAttribute("class")).toEqual("good");
                expect(el.getAttribute("data-test")).toEqual("ok");
            });
        });

        describe("comments", function () {
            it("works", function () {
                var doc = minidom(
                    '<!doctype html><html><head></head><body><!-- pass -->'
                );

                var comment = doc.children[0].children[1].childNodes[0];
                expect(comment.nodeType).toEqual(comment.COMMENT_NODE);
                expect(comment.nodeValue).toEqual(" pass ");
            });
        });
    });

});
