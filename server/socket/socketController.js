var app = require('./../server.js');
var socketServer = require('http')(app);
var io = require('socket.io')(socketServer);
var interval = require('./../items/intervalController');
var Q = require('q');
