function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}



define("BASEPATH", require('path').join(__dirname, "PdfGenerator"));
define("ISWIN", /^win/.test(process.platform));