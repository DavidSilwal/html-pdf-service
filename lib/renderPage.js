var fs = require('fs');
var phridge = require('phridge');
var pageSetup = require('./pageSetup');

var render = function(sourceUrl, targetFile, settings) 
{
    return new Promise(function(resolve, reject) 
    {
        return phridge.spawn({
            loadImages: false
        })
        .then(function (phantom) {

            var page = phantom.createPage();
            
            var phantomSettings = pageSetup(page, settings, 1);

            return page.run(sourceUrl, targetFile, phantomSettings, function (sourceUrl, targetFile, settings, resolve, reject) 
            {
                var self = this;  
		        self.viewportSize = settings.viewportSize;
                self.zoomFactor = settings.zoomFactor;
                //self.paperSize = settings.paperSize;

                this.open(sourceUrl, function (status) {
                    if (status !== 'success') {
                        console.log('Unable to load the address!');
                        reject();
                    } else {
                        window.setTimeout(function () {
                            self.render(targetFile);
                            resolve();
                        }, 200);
                    }
                });
            })
	    .then(function() {
		return phantom.dispose();
	    })
	    .catch(function() {
		return phantom.dispose();
	    });
        })
        .then(resolve)
        .catch(reject)
    })
}

module.exports = render;
