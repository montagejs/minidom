// A simple script to generate a markdown listing of the most important parts
// of the DOM API we support

var dom = require("../dom");

console.log("Properties marked &#x20E0;&nbsp; are read-only\n");

// Node
console.log(generate("Node", dom.Node.prototype));

// Document
console.log(generate("Document (inherits from Node)", dom.Document.prototype));

// Element
console.log(generate("Element (inherits from Node)", dom.Element.prototype));

/**
 * Gets a Markdown string with a title and a list of the properties of the
 * prototype.
 *
 * Functions are listed with their arguments following their name. Getter only
 * properties, including those with setters that just throw an error, are
 * marked as such. All other properties are listed plain.
 * @param  {string} name  Name/title of the list
 * @param  {object} proto A prototype object
 * @return {string}       A level 3 title and list of properties
 */
function generate(name, proto) {
    var out = [];
    out.push("### " + name);
    out.push("");

    for (var prop in proto) {
        if (
            proto.hasOwnProperty(prop) &&
            prop.indexOf("_") !== 0
        ) {
            var doc;
            var desc = Object.getOwnPropertyDescriptor(proto, prop);
            if (desc.value && typeof desc.value === "function") {
                doc = "`" + prop + "(" + getArgs(desc.value.toString()).join(", ") + ")`";
            } else if (desc.get && (
                !desc.set ||
                // some setters are implemented but just throw a DOMException
                desc.set.toString().indexOf("{ throw new core.DOMException();}") !== -1
            )) {
                doc = "`" + prop + "` &#x20E0;";
            } else {
                doc = "`" + prop + "`";
            }
            out.push(" - " + doc);
        }
    }

    out.push("");

    return out.join("\n");
}

/**
 * Returns an array of the function string's arguments
 * @param  {string} fnString A function's source
 * @return {Array<string>}
 */
function getArgs(fnString) {
    var args = /function [^ ]* ?\(([^)]+)/.exec(fnString);
    if (args && args[1]) {
        args = args[1].split(/\s*,\s*/);
        return args;
    }
    return [];
}
