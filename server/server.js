var express = require('express');
var app = express();
var db = require('./db.js');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var init = require('./items/initController.js');

require('./config/middleware.js')(app, express);

var port = process.env.PORT || 3000;

server.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;


    console.log('App launched and hosting at http://%s:%s', host, port);
});

//initialize item storage for sockets to update prices
//init.itemsInit();

module.exports = {
    server: server,
    io: io
};
