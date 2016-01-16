var express = require('express');
var app = express();
var db = require('./db.js');

require('./config/middleware.js')(app,express);

var port = process.env.PORT || 8080;

app.set('port', port);

app.listen(port,function(){
    console.log("Listening to port "+ port);
});

module.exports = app;
