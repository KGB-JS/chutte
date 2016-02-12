var express = require('express');
var app = express();
var db = require('./db.js');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var init = require('./items/initController.js');
var emit = require('./items/itemHelpers/emitAuction.js');
var Item = require('./items/itemModel.js');
var moment = require('moment');

require('./config/middleware.js')(app, express);

var port = process.env.PORT || 3000;


server.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;


    console.log('App launched and hosting at http://%s:%s', host, port);
});

module.exports = {
    server: server,
    io: io
};

io.on('connection', function(socket) {
    Item.find({}, function(err, items) {
        var now = moment().valueOf();
        var itemMap = [];
        items.forEach(function(item) {
            if (item.auctionEnds < now) {
                item.active = false;
                item.save();
            }
            if(item.quantity === 0){
                item.active = false;
                item.save();
            }
            if (item.active) {
                var priceFlag = true;
                for (var i = 0; i < item.priceSchedule.length; i++) {
                    if (priceFlag && item.priceSchedule[i].decrementTime > now) {
                        priceFlag = false;
                        item.price = item.priceSchedule[i].price;
                        item.timeRemaining = item.auctionEnds;
                        item.save();
                        emit.emitAuctionGet(item._id);
                    }
                }
            } 
        });
    });
});
