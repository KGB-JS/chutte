var moment = require('moment');
var Item = require('./../itemModel.js');
var Q = require('q');

module.exports = {
    emitAuction: function(dbItemID, timeUntilDecrement) {
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
                            timeRemaining: timeUntilDecrement,
                            description: item.description,
                            productName: item.productName,
                            createdBy: item.createdBy,
                            quantity: item.quantity,
                            category: item.category,
                            image: item.image
                        };
                        console.log('emit', item._id)
                        console.log('time', timeUntilDecrement)
                        app.io.sockets.emit('productUpdate', transmitObject);
                        
                    //}
                }
            });
    }
};
