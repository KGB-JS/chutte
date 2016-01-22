var moment = require('moment');
var itemStorage = require('./../itemStorage.js');
var Item = require('./../itemModel.js');
var Q = require('q');





module.exports = {
        findTimeReduce : function (itemId, currentPrice, minPrice, endDate) {
            var app = require('./../../server.js');
            var startPrice = currentPrice;
            var now = moment().valueOf();
            endDate = moment(endDate).valueOf();
            var millisecondsUntil = Math.abs(now - endDate);
            var count = 0;
            var amountToDecrease = currentPrice/minPrice;
            var priceSchedule = [];
            while (currentPrice >= minPrice){
                var decrementTime = now - (millisecondsUntil / count);
                count++;
                priceSchedule.push({ price: currentPrice, decrementTime: decrementTime});
                currentPrice = currentPrice - amountToDecrease;
            }
            priceSchedule.push({price:minPrice, decrementTime: endDate});
            //add priceSchedule to Item
            var findItem = Q.nbind(Item.findOne, Item);
            findItem({_id: itemId})
              .then(function(item){
                if(!item){
                    new Error('Item not found');
                } else {
                    if(now > moment(item.auctionEnds).valueOf()){
                        console.log('bitch')
                        item.active = false;
                    }
                    item.priceSchedule = priceSchedule;
                    item.save();
                }
              });
            var numberOfSecUntilDecrment = millisecondsUntil/count;
            var priceIndex = 0;
            var recurse = function() {
                var rightNow = moment().valueOf();
                if(rightNow > endDate.valueOf()){
                    itemStorage.storage[itemId].active = false;
                } else {
                  itemStorage.storage[itemId].active = true;
                }
            
                if(priceIndex < priceSchedule.length){
                    priceIndex++;
                    startPrice = priceSchedule[priceIndex].price;
                    var priceObject = {
                        itemId: itemId,
                        price: startPrice,
                        wholeObject: itemStorage.storage[itemId]
                    };
                    app.io.sockets.emit('productUpdate', priceObject);
                }
                if(priceIndex === priceSchedule.length - 1) {
                    clearInterval(itemStorage.storage[itemId].timeId);
                }
                console.log('recurse', startPrice);
                if(itemStorage.storage[itemId].price){ 
                   itemStorage.storage[itemId].price = startPrice;
                }
                console.log('item storage', itemStorage);

            };
            return { timeId:setInterval(recurse, 1000), price: startPrice, priceSchedule: priceSchedule };

        }
};