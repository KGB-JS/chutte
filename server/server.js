var express = require('express');
var app = express();
var db = require('./db.js');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

require('./config/middleware.js')(app,express);

var port = process.env.PORT || 3000;

io.on('connection', function(){
    console.log("user connected");
});

io.on('connect', function() {
    console.log("user connected");
});

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// app.listen(port,function(){
//     console.log("Listening to port "+ port);
// });

module.exports = server;


