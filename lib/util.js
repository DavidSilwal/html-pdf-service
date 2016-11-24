var fs = require('fs');
var path = require('path');
var tmp = require('tmp');
var tmpDir = require('os-tmpdir');
    

var _getTempFileName = function (ext) {
        ext = ext || 'pdf';
        return path.join(tmpDir(), "tmp-" + Math.floor(Math.random() * 100000000000) + "." + ext);
};
 
var _saveHtml = function(htmlContent) 
{
     return new Promise(function(resolve, reject) 
     {
         tmp.file(function (err, filePath, fd) {

            if (err) reject(err);

            fs.appendFile(filePath, htmlContent, function (err) { 
            
                if (err) throw reject(err);

                resolve(filePath);
            });
         });
     });
 }

module.exports = {
    getTempFileName: _getTempFileName,
    saveFile: _saveHtml
}