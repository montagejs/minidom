var parse5 = require("parse5");
var Handler = require("./handler");

module.exports = function minidom(html) {
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
