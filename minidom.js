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
        html = "<!doctype html><html><head></head><body></body></html>";
    }

    var handler = new Handler();
    var Parser = parse5.Parser;

    //Instantiate parser
    var parser = new Parser(handler);

    parser.parse(html);

    return handler.document;
};

exports.dom = dom;

function Handler() {
    this.document = null;
    this._quirksMode = false;
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
        var el = this.document.createElement(tagName);

        Object.defineProperty(el, "namespaceURI", {
            configurable: true,
            enumerable: true,
            writable: false,
            value: namespaceURI
        });

        for (var name in attributes) {
            if (attributes.hasOwnProperty(name)) {
                el.setAttribute(name, attributes[name]);
            }
        }

        return el;
    },

    createCommentNode: function (data) {
        return this.document.createComment(data);
    },

    createTextNode: function (text) {
        return this.document.createTextNode(text);
    },

    setDocumentType: function (document, name, publicId, systemId) {
        var doctype = this.document.doctype;
        if (!doctype) {
            doctype = new dom.DocumentType(document);
            document.doctype = doctype;
            this.document.appendChild(doctype);
        }

        doctype._name = name;
        Object.defineProperties(doctype, {
            publicId: {
                configurable: true,
                enumerable: true,
                writable: false,
                value: publicId
            },
            systemId: {
                configurable: true,
                enumerable: true,
                writable: false,
                value: systemId
            }
        });

    },

    setQuirksMode: function (document) {
        this._quirksMode = true;
    },

    isQuirksMode: function (document) {
        return this._quirksMode;
    },

    appendChild: function (parent, node) {
        parent.appendChild(node);
    },

    insertBefore: function (parent, node, reference) {
        parent.insertBefore(node, reference);
    },

    detachNode: function (node) {
        // TODO if !parentElement
        node.parentElement.removeChild(node);
    },

    insertText: function (parent, text) {
        // todo append to prevous text node
        parent.appendChild(this.document.createTextNode(text));
    },

    insertTextBefore: function (parent, text, reference) {
        // todo append to prevous text node
        parent.insertBefore(this.document.createTextNode(text), reference);
    },

    adoptAttributes: function (node, attributes) {
        for (var i = 0, len = attributes.length; i < len; i++) {
            var attr = attributes[i];
            if (node.getAttribute(attr.name) !== null) {
                node.setAttribute(attr.name, attr.value);
            }
        }
    },

    getFirstChild: function (node) {
        return node.firstChild;
    },

    getParentNode: function (node) {
        return node.parentNode;
    },

    getAttrList: function (node) {
        // todo array-ize?
        return node.attributes;
    },

    getTagName: function (element) {
        return element.tagName.toLowerCase();
    },

    getNamespaceURI: function (element) {
        return element.namespaceURI;
    }
};
