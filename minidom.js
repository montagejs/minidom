var parse5 = require("parse5");
var dom = require("./lib/dom-level1").dom.level1.core;
// add textContent
require("./lib/dom-level3");
// add outerHTML, innerHTML
require("./lib/extras");

var DOCUMENT_OPTIONS = {
    contentType: "text/html"
};

var exports = module.exports = function minidom(html) {
    if (!html) {
        html = "<html><head></head><body></body></html>";
    }

    var document = new dom.Document(DOCUMENT_OPTIONS);
    // We only work with the HTML doctype
    document.doctype = new dom.DocumentType(document, "html");

    var handler = new Handler(document);
    var Parser = parse5.Parser;

    //Instantiate parser
    var parser = new Parser(handler);

    parser.parse(html);

    return document;
};

exports.dom = dom;

function Handler(document) {
    this.document = null;
    this._reset = false;
}

Handler.prototype = {

    createDocument: function () {
        var document = this.document = new dom.Document(DOCUMENT_OPTIONS);
        return document;
    },

    createDocumentFragment: function () {
        throw new Error("Not implemented");
    },

    createElement: function (tagName, namespaceURI, attributes) {
        // TODO namespaceURI document.createElementNS (level 2)
        var el = this.document.createElement(tagName);

        for (var name in attributes) {
            if (attributes.hasOwnProperty(name)) {
                el.setAttribute(name, attributes[name]);
            }
        }

        return el;
    },

    createTextNode: function (text) {
        return this.document.createTextNode(text);
    },

    setDocumentType: function () {
        throw new Error("Not implemented");
    },

    setQuirksMode: function (document) {
        throw new Error("Not implemented");
        document.quirksMode = true;
    },

    isQuirksMode: function (document) {
        throw new Error("Not implemented");
        return document.quirksMode;
    },

    appendChild: function (parent, node) {
        parent.appendChild(node);
    },

    insertBefore: function (parent, node, reference) {
        parent.insertBefore(node, reference);
    },

    detachNode: function (node) {
        // TODO if
        node.parentElement.removeChild(node);
    },

    onprocessinginstruction: function (target, data) {
        if (target.toLowerCase() === "!doctype") {
            if (!/!doctype html/i.test(data)) {
                throw new Error("minidom only supports HTML documents, not '" + data + "'");
            }
            // We only work in HTML mode, and so no need to actually parse
            // the doctype. Instead just give the user a way to get the
            // original doctype back.
            this.document.doctype.toString = function () { return "<" + data + ">"; };
        } else {
            var node = this.document.createProcessingInstruction(target, data);
            this._currentElement.appendChild(node);
        }
    },

    createCommentNode: function (data) {
        return this.document.createComment(data);
    },

    oncdatastart: function (data) {
        var cdata = this.document.createCDATASection(data);
        this._currentElement.appendChild(cdata);
    },

    onerror: function (error) {
        throw error;
    },

    onreset: function () {
        if (this._reset) {
            throw new Error("Cannot reset handler a second time");
        }
        this._reset = true;
    }
};
