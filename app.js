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
//app.use(cors());

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.options('/', cors(corsOptions));
app.get('/', cors(corsOptions), routes.getRenderPage);
app.post('/', cors(corsOptions), routes.postRenderFile);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
