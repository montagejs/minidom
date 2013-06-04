minidom
=======

A small JavaScript DOM. Implements DOM level 1, with `textContent` from level 3
and `innerHTML` and `outerHTML` getters. Only supports HTML documents.

## Usage

```javascript
var minidom = require("minidom");

var document = minidom('<html><head><title>Hello</title><body><h1>Hi!</h1></body></html>');

document.children[0].children[0].children[0].textContent === "Hello";
```

## Thanks

Made possible with large excepts from [JSDom](https://github.com/tmpvar/jsdom).

## License

MIT license. See LICENSE.md for details.
