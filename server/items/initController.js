var itemStorage = require('./itemStorage.js');
var interval = require('./itemHelpers/intervalController.js');
var moment = require('moment');
var Item = require('./itemModel.js');

module.exports = {
    itemStorageInit: function() {
        Item.find({}, function(err, items) {
            var now = moment().valueOf();
            items.forEach(function(item) {
                var priceFlag = true;
                if (item.active) {
                    for(var i = 0;i <= item.priceSchedule.length - 1; i++){
                        if(priceFlag && item.priceSchedule[i].decrementTime > now){
                            priceFlag = false;
                            item.price = item.priceSchedule[i].price;
                            item.save();
                        }
                    }
                    var itemObject = interval.findTimeReduce(item._id, item.price, item.minPrice, item.auctionEnds);
                    itemStorage.storage[item._id] = itemObject;
                    itemStorage.storage[item._id].category = item.category
                    itemStorage.storage[item._id].description = item.description
                    itemStorage.storage[item._id].createdBy = item.createdBy
                    itemStorage.storage[item._id].quantity = item.quantity
                    itemStorage.storage[item._id].productName = item.productName
                    itemStorage.storage[item._id].image = item.image
                }
            });
        })
    }
}