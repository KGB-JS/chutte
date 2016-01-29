var moment = require('moment');
var itemStorage = require('./../itemStorage.js');
var Item = require('./../itemModel.js');
var Q = require('q');

module.exports = {

    // this is used to make the price reduction schedule
    findTimeReduce: function(itemId, currentPrice, minPrice, endDate) {
        //require at runtime to aviod dependency
        var app = require('./../../server.js');
        var startPrice = currentPrice;
        var now = moment().valueOf();
        //total time of auction
        var millisecondsUntil = endDate - now;
        //amount of price decrements
        var count = 1; 
        var amountToDecreasePrice = startPrice / minPrice;
        if(minPrice === 1 || 0){
            amountToDecreasePrice = 1;
        }
        //holds decrement times and corresponding prices
        var priceSchedule = [];
        while (currentPrice >= minPrice) {
            count++;
            priceSchedule.push({
                price: currentPrice
            });
            // //adjust price for next push
            currentPrice = Math.floor(currentPrice - amountToDecreasePrice);
        }
        var averageTimeBetween = millisecondsUntil / count
        var decrementTime = now
        for(var i = 0;i < count - 1; i++){
            priceSchedule[i].decrementTime = decrementTime;
            decrementTime = Math.floor(decrementTime + averageTimeBetween);
        }
        //number of seconds between decrements
        var numberOfSecUntilDecrment = Math.floor(millisecondsUntil / count);
        if(numberOfSecUntilDecrment < 60000){
            numberOfSecUntilDecrment = 60000;
        }

        var findItem = Q.nbind(Item.findOne, Item);
        findItem({
                _id: itemId
            })
            .then(function(item) {
                if (!item) {
                    new Error('Item not found');
                } else { 
                    item.priceSchedule = priceSchedule;
                    item.timeRemaining = numberOfSecUntilDecrment;
                    item.save();
                }
            });
        var priceIndex = 0;
        var socketIndex = 0;
        var recurse = function() {
            var now = moment().valueOf();
            if(now > endDate){
                var findItem = Q.nbind(Item.findOne, Item);
                findItem({
                    _id: itemId
                  })
                  .then(function(item) {
                    if (!item) {
                        new Error('Item not found');
                    } else {
                        //update the auction to inactive
                        item.active = false;
                        itemStorage.storage[itemId].active = false;
                        item.save();
                    }
                });
            }
            priceIndex++;
            //reset price
            if(priceSchedule[priceIndex] !== undefined){
              startPrice = priceSchedule[priceIndex].price;
            }

            var transmitObject = {
                _id: itemId, 
                price: itemStorage.storage[itemId].priceSchedule[socketIndex].price, 
                timeRemaining: numberOfSecUntilDecrment,
                description: itemStorage.storage[itemId].description,
                productName: itemStorage.storage[itemId].productName,
                createdBy: itemStorage.storage[itemId].createdBy,
                quantity: itemStorage.storage[itemId].quantity,
                image: itemStorage.storage[itemId].image
                //itemObject: holder
            }
            app.io.sockets.emit('productUpdate', transmitObject);
            socketIndex++;
            //clear Interval at auction end
            if (priceIndex === priceSchedule.length - 1) {
                clearInterval(itemStorage.storage[itemId].timeId);
            }
            //double check price
            if (itemStorage.storage[itemId].price) {
                itemStorage.storage[itemId].price = startPrice;
            }
        };
        
        

        //return timeId for clearing Interval on buy
        return {
            timeId: setInterval(recurse, numberOfSecUntilDecrment),
            price: startPrice,
            priceSchedule: priceSchedule
        };

    }
};
