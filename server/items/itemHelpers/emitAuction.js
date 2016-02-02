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
                    if(item.priceIndex < item.priceSchedule.length){
                        var transmitObject = {
                            _id: item._id,
                            price: item.price,
                            timeRemaining: item.priceSchedule[item.priceIndex].decrementTime,
                            description: item.description,
                            productName: item.productName,
                            createdBy: item.createdBy,
                            quantity: item.quantity,
                            category: item.category,
                            image: item.image
                        };
                        console.log('emit', item._id);
                        console.log('time', item.priceSchedule[item.priceIndex].decrementTime);
                        app.io.sockets.emit('productUpdate', transmitObject);
                        item.priceIndex++;
                        item.save(); 
                    } else {
                        clearTimeout(item.timeId[0]);
                    }
                }
            });
    }
};
