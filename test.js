var FS = require("fs");

var minidom = require("./minidom");

minidom(FS.readFileSync("spec/files/lachy.id.au/tests/html5/video/008.html"));
