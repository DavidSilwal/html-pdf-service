var fs = require("fs");
var util = require('../lib/util');
var renderFile = require('../lib/renderFile');
var renderPage = require('../lib/renderPage');

var _render = function (res, type, sourceFileOrUrl, args) {

        var render =  (type === 'url') ? renderPage : renderFile;
        var targetFile = util.getTempFileName();

        return render(sourceFileOrUrl, targetFile, args)        
                .then(function (stream) {
                    
                    var stream = fs.ReadStream(targetFile)

                    res.setHeader('Content-disposition', 'inline; filename="generate.pdf"');
                    res.setHeader('Content-type', 'application/pdf');
                    
                    stream.pipe(res);

                }, function (err) {
                    
                    res.status(500)
                        .send(err.message);
                });
};

var _renderPage = function (req, res) {
        
        var url = req.param('url');
        var settings = req.param('settings', '21cm*29.7cm');

        if (url === undefined) {
            return res.send(404);
        }
        
        _render(res, 'url', url, settings);
};

var _renderFile = function (req, res) {
        
        var html = req.param('html');
        var settings = req.param('settings', '21cm*29.7cm');

        html = html && html.replace(/\n/g, '');

        if (html === undefined) 
        {
            return res.send(404);
        }

        util.saveFile(html)
            .then(function(filePath) {
                return _render(res, 'html', filePath, settings);
            });
}

module.exports = {
    postRenderFile: _renderFile,
    getRenderPage: _renderPage
}