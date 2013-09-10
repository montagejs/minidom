var dom = require("./dom");
// To stringify the doctype
var domToHtml = require("./lib/domtohtml").domToHtml;

var DOCUMENT_OPTIONS = {
    contentType: "text/html"
};

module.exports = Handler;
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

        this.adoptAttributes(el, attributes);

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
            },
            // EXTENSION
            toString: {
                configurable: true,
                enumerable: false,
                writable: true,
                value: function () {
                    return domToHtml(this);
                }
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
            if (node.getAttribute(attr.name) === null) {
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
