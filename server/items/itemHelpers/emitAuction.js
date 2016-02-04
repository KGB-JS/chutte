var moment = require('moment');
var Item = require('./../itemModel.js');
var Q = require('q');

module.exports = {
    emitAuction: function(dbItemID) {
        var app = require('./../../server.js');
        var findItem = Q.nbind(Item.findOne, Item);
        var now = moment().valueOf();
        console.log('we are in emit')
        findItem({
                _id: dbItemID
            })
            .then(function(item) {
                if (!item) {
                    new Error('Item not found');
                } else {
                    console.log("item is here ")
                    if (item.auctionEnds < now || item.quantity < 1) {
                        console.log("item is over")
                        item.active = false;
                        item.save()
                        clearTimeout(item.timeId[0]);
                    } else {
                        console.log("item was found and auciton not over also quantity available")
                        var priceFlag = true;
                        for (var i = 0; i < item.priceSchedule.length; i++) {
                            if (priceFlag && item.priceSchedule[i].decrementTime > now) {
                                console.log("we are insdie if for price")
                                priceFlag = false;
                                item.price = item.priceSchedule[i].price;
                                item.timeRemaining = item.auctionEnds;
                                item.save();
                                var transmitObject = {
                                    _id: item._id,
                                    price: item.price,
                                    timeRemaining: item.auctionEnds,
                                    description: item.description,
                                    productName: item.productName,
                                    createdBy: item.createdBy,
                                    quantity: item.quantity,
                                    category: item.category,
                                    image: item.image
                                };
                                
                            }
                        }
                        console.log("transmitObject intervial ", transmitObject)
                        app.io.sockets.emit('productUpdate', transmitObject);
                    }
                }
            });
    },
    emitAuctionGet: function(dbItemID) {
        var app = require('./../../server.js');
        var findItem = Q.nbind(Item.findOne, Item);
        findItem({
                _id: dbItemID
            })
            .then(function(item) {
                if (!item) {
                    new Error('Item not found');
                } else {
                    var transmitObject = {
                        _id: item._id,
                        price: item.price,
                        timeRemaining: item.auctionEnds,
                        description: item.description,
                        productName: item.productName,
                        createdBy: item.createdBy,
                        quantity: item.quantity,
                        category: item.category,
                        image: item.image
                    };
                    console.log("transmitObject ", transmitObject)
                    app.io.sockets.emit('productUpdate', transmitObject);
                }
            });
    }
};
