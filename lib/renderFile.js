var phridge = require('phridge');
var pageSetup = require('./pageSetup');
var fileUrl = require('file-url');

var render = function(sourceFile, targetFile, settings) 
{
    return new Promise(function(resolve, reject) 
    {
        return phridge
                .spawn({
                    loadImages: false
                })
                .then(function (phantom) {

                    var page = phantom.createPage();
                    
                    var phantomSettings = pageSetup(page, settings, 1);

                    return page.run(sourceFile, targetFile, phantomSettings, function (sourceUrl, targetFile, settings, resolve, reject) 
                    {
                        var self = this;
			self.viewportSize = settings.viewportSize;
			self.zoomFactor = settings.zoomFactor;
			self.paperSize = settings.paperSize;
                        self.content = fs.read(sourceUrl);
                        self.onLoadFinished = function () {
                            self.render(targetFile);
                            resolve();
                        };
                    })
		    .then(function() { return phantom.dispose(); })
                    .catch(function() { return phantom.dispose(); })
                })
		.then(resolve)
		.catch(reject);
    });
}

module.exports = render;
