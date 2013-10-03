describe("Readme", function () {

    it("basic", function () {
        var minidom = require("../minidom");

        var document = minidom('<!doctype><html><head><title>Hello</title><body><h1>Hi!</h1></body></html>');

        expect(document.getElementsByTagName("h1")[0].textContent).toEqual("Hi!");
    });

    it("dom implementation", function () {
        var dom = require("../dom");
        var minidom = require("../minidom");

        var document = minidom();
        expect(document instanceof dom.Node).toBeTruthy();
    });

});
