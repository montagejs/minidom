/*jshint node:true */
/*global describe, beforeEach, it, expect */

var dom = require("../dom");
var Handler = require("../handler");
describe("Handler", function () {

    var handler;
    beforeEach(function () {
        handler = new Handler();
        handler.createDocument();
    });

    describe("createDocument", function () {
        it("returns a document", function () {
            expect(handler.createDocument().nodeType).toEqual(dom.Document.prototype.DOCUMENT_NODE);
        });

        it("sets the document property", function () {
            var doc = handler.createDocument();
            expect(handler.document).toEqual(doc);
        });
    });

    describe("createDocumentFragment", function () {
        it("returns a document fragment", function () {
            expect(handler.createDocumentFragment().nodeType).toEqual(dom.Document.prototype.DOCUMENT_FRAGMENT_NODE);
        });
    });

    describe("createElement", function () {
        it("creates an element of the correct tagName", function () {
            expect(handler.createElement("div").tagName).toEqual("DIV");
        });

        it("has the correct namespaceURI", function () {
            expect(handler.createElement("div", "pass").namespaceURI).toEqual("pass");
        });

        it("has a non-writable namespaceURI property", function () {
            var el = handler.createElement("div", "pass");
            el.namespaceURI = "fail";
            expect(el.namespaceURI).toEqual("pass");
        });

        it("has attributes", function () {
            var el = handler.createElement("div", void 0, [
                {name: "pass1", value: "pass2"}
            ]);
            expect(el.getAttribute("pass1")).toEqual("pass2");
        });
    });

    describe("createCommentNode", function () {

    });

    describe("createTextNode", function () {

    });

    describe("setDocumentType", function () {
        it("sets the documents doctype property", function () {
            expect(handler.document.doctype).toBeFalsy();
            handler.setDocumentType(handler.document, "html");
            expect(handler.document.doctype).toBeTruthy();
            expect(handler.document.doctype.nodeType).toEqual(dom.Document.prototype.DOCUMENT_TYPE_NODE);
        });

        it("has a non-writable publicId property", function () {
            handler.setDocumentType(handler.document, "html", "pass");
            handler.document.doctype.publicId = "fail";
            expect(handler.document.doctype.publicId).toEqual("pass");
        });

        it("has a non-writable systemId property", function () {
            handler.setDocumentType(handler.document, "html", void 0, "pass");
            handler.document.doctype.systemId = "fail";
            expect(handler.document.doctype.systemId).toEqual("pass");
        });

        it("reuses an existing doctype", function () {
            handler.setDocumentType(handler.document, "fail", "fail", "fail");
            var doctype = handler.document.doctype;
            handler.setDocumentType(handler.document, "html", "pass", "pass");
            expect(handler.document.doctype).toBe(doctype);
            expect(handler.document.doctype.name).toEqual("html");
            expect(handler.document.doctype.systemId).toEqual("pass");
            expect(handler.document.doctype.publicId).toEqual("pass");
        });
    });

    describe("setQuirksMode", function () {
        it("changes isQuirksMode", function () {
            handler.setQuirksMode(handler.document);
            expect(handler.isQuirksMode(handler.document)).toEqual(true);
        });

        it("throws an error on a document not owned by the handler", function () {
            expect(function () {
                handler.setQuirksMode({});
            }).toThrow();

            expect(function () {
                handler.isQuirksMode({});
            }).toThrow();
        });
    });

    describe("appendChild", function () {
        it("adds a child to the parent", function () {
            var parent = handler.createElement("div");
            var child = handler.createElement("div");

            handler.appendChild(parent, child);

            expect(parent.childNodes.length).toEqual(1);
            expect(parent.childNodes[0]).toBe(child);
            expect(child.parentNode).toBe(parent);
        });
    });

    describe("detachNode", function () {
        it("removes the child node", function () {
            var parent = handler.createElement("div");
            var child = handler.createElement("div");
            handler.appendChild(parent, child);

            handler.detachNode(child);
            expect(parent.childNodes.length).toEqual(0);
            expect(child.parentNode).toBeFalsy();

        });

        it("does not throw when an element has no parent node", function () {
            var el = handler.createElement("div");
            handler.detachNode(el);
        });
    });

    describe("insertText", function () {
        it("appends to a preceding text node", function () {
            var parent = handler.createElement("div");
            var reference = handler.createTextNode("pa");
            handler.appendChild(parent, reference);

            handler.insertText(parent, "ss");

            expect(parent.childNodes[0].nodeValue).toEqual("pass");
        });

        it("appends a new text node to an empty element", function () {
            var parent = handler.createElement("div");

            handler.insertText(parent, "pass");

            expect(parent.childNodes[0].nodeValue).toEqual("pass");
        });

        it("appends a new text node after a non-text node", function () {
            var parent = handler.createElement("div");
            var reference = handler.createElement("div");
            handler.appendChild(parent, reference);

            handler.insertText(parent, "pass");

            expect(parent.childNodes[1].nodeType).toEqual(handler.document.TEXT_NODE);
            expect(parent.childNodes[1].nodeValue).toEqual("pass");
        });
    });

    describe("insertTextBefore", function () {
        it("prepends to a following text node", function () {
            var parent = handler.createElement("div");
            var reference = handler.createTextNode("ss");
            handler.appendChild(parent, reference);

            handler.insertTextBefore(parent, "pa", reference);

            expect(parent.childNodes[0].nodeValue).toEqual("pass");
        });

        it("prepends a new text node after a non-text node", function () {
            var parent = handler.createElement("div");
            var reference = handler.createElement("div");
            handler.appendChild(parent, reference);

            handler.insertTextBefore(parent, "pass", reference);

            expect(parent.childNodes[0].nodeType).toEqual(handler.document.TEXT_NODE);
            expect(parent.childNodes[0].nodeValue).toEqual("pass");
        });
    });

    describe("adoptAttributes", function () {
        it("doesn't replace existing attributes", function () {
            var el = handler.createElement("div", void 0, [
                {name: "existing", value: "pass1"}
            ]);
            handler.adoptAttributes(el, [
                {name: "existing", value: "fail"},
                {name: "new", value: "pass2"}
            ]);
            expect(el.getAttribute("existing")).toEqual("pass1");
            expect(el.getAttribute("new")).toEqual("pass2");
        });
    });

    describe("getFirstChild", function () {
        it("returns the first child", function () {
            var parent = handler.createElement("div");
            var a = handler.createElement("div");
            var b = handler.createElement("div");
            handler.appendChild(parent, a);
            handler.appendChild(parent, b);

            expect(handler.getFirstChild(parent)).toBe(a);
        });
    });

    describe("getParentNode", function () {
        it("returns the parent", function () {
            var parent = handler.createElement("div");
            var child = handler.createElement("div");
            handler.appendChild(parent, child);

            expect(handler.getParentNode(child)).toBe(parent);
        });
    });

    describe("getAttrList", function () {
        it("returns a list of {name, value} attributes", function () {
            var el = handler.createElement("div", void 0, [{name: "pass1", value: "pass2"}]);
            expect(handler.getAttrList(el)).toEqual([{name: "pass1", value: "pass2"}]);
        });
    });

    describe("getTagName", function () {
        it("returns lower case", function () {
            var el = handler.createElement("DIV");
            expect(handler.getTagName(el)).toEqual("div");
        });
    });

    describe("getNamespaceURI", function () {
        it("returns the parent", function () {
            var el = handler.createElement("div", "pass");

            expect(handler.getNamespaceURI(el)).toBe("pass");
        });
    });

});
