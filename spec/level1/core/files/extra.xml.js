var dom = require("../../../../minidom").dom;
exports.extra = function() {

  var doc = new dom.Document("staff");

  var splitTextTest     = doc.createElement("splitTextTest");
  splitTextTest.appendChild(doc.createTextNode("Split me"));
  splitTextTest.appendChild(doc.createElement("last"));
  doc.appendChild(splitTextTest);

  doc.normalize();
  return doc;
};
