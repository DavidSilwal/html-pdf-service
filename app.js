var express = require('express');
var routes = require('./routes/main');
var http = require('http');
var app = express();
var cors = require('cors');

// all environments
app.set('port', 8080);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(cors());

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.options('/', cors());
app.get('/', routes.getRenderPage);
app.post('/', routes.postRenderFile);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
