minidom
=======

A small JavaScript DOM. Implements DOM level 1, with `textContent` from level 3
and `innerHTML` and `outerHTML` getters. Only supports HTML documents.

## Usage

```javascript
var minidom = require("minidom");

var document = minidom('<html><head><title>Hello</title><body><h1>Hi!</h1></body></html>');

document.getElementsByTagName("h1")[0].textContent === "Hi!"; // true
```

## Supported API

Properties marked &#x20E0;  are read-only

### Node

 - `ELEMENT_NODE`
 - `ATTRIBUTE_NODE`
 - `TEXT_NODE`
 - `CDATA_SECTION_NODE`
 - `ENTITY_REFERENCE_NODE`
 - `ENTITY_NODE`
 - `PROCESSING_INSTRUCTION_NODE`
 - `COMMENT_NODE`
 - `DOCUMENT_NODE`
 - `DOCUMENT_TYPE_NODE`
 - `DOCUMENT_FRAGMENT_NODE`
 - `NOTATION_NODE`
 - `children` &#x20E0;
 - `nodeValue`
 - `parentNode` &#x20E0;
 - `nodeName` &#x20E0;
 - `attributes` &#x20E0;
 - `firstChild` &#x20E0;
 - `ownerDocument` &#x20E0;
 - `readonly` &#x20E0;
 - `lastChild` &#x20E0;
 - `childNodes` &#x20E0;
 - `nextSibling` &#x20E0;
 - `previousSibling` &#x20E0;
 - `insertBefore(/* Node */ newChild, /* Node*/ refChild)`
 - `replaceChild(/* Node */ newChild, /* Node */ oldChild)`
 - `removeChild(/* Node */ oldChild)`
 - `appendChild(/* Node */ newChild)`
 - `hasChildNodes()`
 - `cloneNode(/* bool */ deep, fn)`
 - `normalize()`
 - `toString()`
 - `raise(type, message, data)`
 - `textContent`

### Document (inherits from Node)

 - `nodeType`
 - `contentType` &#x20E0;
 - `doctype`
 - `documentElement` &#x20E0;
 - `implementation`
 - `nodeName` &#x20E0;
 - `tagName` &#x20E0;
 - `nodeValue`
 - `attributes` &#x20E0;
 - `ownerDocument` &#x20E0;
 - `readonly` &#x20E0;
 - `createElement(/* string */ tagName)`
 - `createDocumentFragment()`
 - `createTextNode(/* string */ data)`
 - `createComment(/* string */ data)`
 - `createCDATASection(/* string */ data)`
 - `createProcessingInstruction(/* string */ target, /* string */ data)`
 - `createAttribute(/* string */ name)`
 - `createEntityReference(/* string */ name)`
 - `createEntityNode(/* string */ name)`
 - `createNotationNode(/* string */ name, /* string */ publicId, /* string */ systemId)`
 - `appendChild(/* Node */ arg)`
 - `removeChild(/* Node */ arg)`
 - `getElementsByTagName(/* string */ name)`
 - `outerHTML` &#x20E0;

### Element (inherits from Node)

 - `nodeValue`
 - `tagName` &#x20E0;
 - `nodeType`
 - `attributes` &#x20E0;
 - `getAttribute(/* string */ name)`
 - `setAttribute(/* string */ name, /* string */ value)`
 - `removeAttribute(/* string */ name)`
 - `getAttributeNode(/* string */ name)`
 - `setAttributeNode(/* Attr */ newAttr)`
 - `removeAttributeNode(/* Attr */ oldAttr)`
 - `getElementsByTagName(/* string */ name)`
 - `outerHTML` &#x20E0;
 - `innerHTML` &#x20E0;

## Thanks

Made possible with large excepts from [JSDom](https://github.com/tmpvar/jsdom).

## License

MIT license. See LICENSE.md for details.
