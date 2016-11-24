function transformSizeParamsToObject(sizeParameters) {

    var paperSize = {};
    var sizes = ['A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'];
    var size = sizeParameters.split('*');

    paperSize.margin = "1cm";

    if (sizes.indexOf(size[0]) !== -1) 
    {
        paperSize.format = size[0];
        size.shift();
    } else {
        paperSize.width = size[0];
        paperSize.height = (size[1] === undefined) ? size[0] : size[1];
        size.splice(0, 2);
    }


    if (size.length > 0) {
        paperSize.margin = {};
        switch (size.length) {
            case 1:
                paperSize.margin = size[0];
                break;
            case 2:
                paperSize.margin = { top: size[0], right: size[1], bottom: size[0], left: size[1] };
                break;
            case 3:
                paperSize.margin = { top: size[0], right: size[1], bottom: size[2] };
                break;
            case 4:
                paperSize.margin = { top: size[0], right: size[1], bottom: size[2], left: size[3] };
                break;
        }
    }

    return paperSize;
}

module.exports = function (phantomPage, sizeParameters, zoomFactor) 
{
    return { 
	paperSize: transformSizeParamsToObject(sizeParameters),
    	viewportSize: { width: 600, height: 600 },
    	zoomFactor: zoomFactor
    };
}
