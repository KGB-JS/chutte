var moment = require('moment');
var Item = require('./../itemModel.js');
var Q = require('q');

module.exports = {
  emitAuction: function(dbItemID) {
    var app = require('./../../server.js');
    var findItem = Q.nbind(Item.findOne, Item);
    var now = moment().valueOf();
    findItem({
        _id: dbItemID
      })
      .then(function(item) {
        if (!item) {
          new Error('Item not found');
        } else {
          if (item.auctionEnds < now || item.quantity < 1) {
            item.active = false;
            item.save();
          } else {
            item.priceIndex++;
            item.save();
            var transmitObject = {
              _id: item._id,
              price: item.priceSchedule[item.priceIndex].price,
              timeRemaining: item.auctionEnds,
              description: item.description,
              productName: item.productName,
              createdBy: item.createdBy,
              quantity: item.quantity,
              category: item.category,
              image: item.image,
              auctionEnds: item.auctionEnds
            };
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
          if(item.priceIndex < item.priceSchedule.length){
            var transmitObject = {
              _id: item._id,
              price: item.priceSchedule[item.priceIndex].price,
              timeRemaining: item.auctionEnds,
              description: item.description,
              productName: item.productName,
              createdBy: item.createdBy,
              quantity: item.quantity,
              category: item.category,
              image: item.image,
              auctionEnds: item.auctionEnds
            };
            app.io.sockets.emit('productUpdate', transmitObject);
          }
        }
      });
  }
};
