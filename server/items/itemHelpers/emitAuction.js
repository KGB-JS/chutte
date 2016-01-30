var moment = require('moment');
var Item = require('./../itemModel.js');
var Q = require('q');

module.exports = {


    emitAuction: function(dbItemID) {
        var app = require('./../../server.js');

        var findItem = Q.nbind(Item.findOne, Item);
        findItem({
                _id: dbItemID
            })
            .then(function(item) {
                if (!item) {
                    new Error('Item not found');
                } else {
                    var now = moment().valueOf();
                    if (now > item.auctionEnds) {
                        item.active = false;
                        item.save();
                    }
                    if (item.quantity <= 0) {
                        item.active = false;
                        item.save();
                    }
                    var priceFlag = true;
                    if (item.active) {
                        for (var i = 0; i <= item.priceSchedule.length - 1; i++) {
                            if (priceFlag && item.priceSchedule[i].decrementTime > now) {
                                priceFlag = false;
                                item.price = item.priceSchedule[i].price;
                                item.timeRemaining = (item.priceSchedule[i].decrementTime - now);
                                item.save();
                            }
                        }
                        var transmitObject = {
                            _id: item._id,
                            price: item.price,
                            timeRemaining: item.timeRemaining,
                            description: item.description,
                            productName: item.productName,
                            createdBy: item.createdBy,
                            quantity: item.quantity,
                            image: item.image
                        };
                        app.io.sockets.emit('productUpdate', transmitObject);
                        
                    }
                }
            });
    }

};
