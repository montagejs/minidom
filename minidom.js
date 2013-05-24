var htmlparser = require("htmlparser2");
var dom = require("./lib/dom-level1").dom.level1.core;
// add textContent
require("./lib/dom-level3");
// add outerHTML, innerHTML
require("./lib/extras");

var DOCUMENT_OPTIONS = {
    contentType: "text/html"
};

module.exports = function minidom(html) {
    if (!html) {
        html = "<html><head></head><body></body></html>";
    }

    var document = new dom.Document(DOCUMENT_OPTIONS);
    var handler = new Handler(document);
    var parser = new htmlparser.Parser(handler);

    parser.parseComplete(html);

    return document;
};

function Handler(document) {
    this.document = document;
    this._stack = [document];
    this._reset = false;
}

Handler.prototype = {
    _peek: function () {
        return this._stack[this._stack.length - 1];
    },

    onopentag: function (tagName, attributes) {
        var el = this.document.createElement(tagName);

        for (var name in attributes) {
            if (attributes.hasOwnProperty(name)) {
                el.setAttribute(name, attributes[name]);
            }
        }

        this._peek().appendChild(el);
        this._stack.push(el);
    },

    onclosetag: function (tagName) {
        if (this._peek().tagName !== tagName) {
            throw new Error("Cannot close tag " + this._peek().tagName + " with " + tagName);
        }
        this._stack.pop();
    },

    ontext: function (text) {
        var node = this.document.createTextNode(text);
        this._peek().appendChild(node);
    },

    onprocessinginstruction: function (target, data) {
        var node = this.document.createProcessingInstruction(target, data);
        this._peek().appendChild(node);
    },

    oncomment: function (data) {
        var comment = this.document.createComment(data);
        this._peek().appendChild(comment);
    },

    oncdatastart: function (data) {
        var cdata = this.document.createCDATASection(data);
        this._peek().appendChild(cdata);
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
