var moment = require('moment');
var itemStorage = require('./../itemStorage.js');
var Item = require('./../itemModel.js');
var Q = require('q');

module.exports = {

    // this is used to make the price reduction schedule
    findTimeReduce: function(itemId, currentPrice, minPrice, endDate) {
        //kill old auction process
        if (itemStorage.storage[itemId]) {
            clearInterval(itemStorage.storage[item._id].timeId);
        }
        //require at runtime to aviod dependency
        var app = require('./../../server.js');
        var startPrice = currentPrice;
        var now = moment().valueOf();
        //total time of auction
        var millisecondsUntil = Math.abs(now - endDate);
        //amount of price decrements
        var count = 0; 
        var amountToDecreasePrice = startPrice / minPrice;
        if(minPrice === 1 || 0){
            amountToDecreasePrice = 1;
        }
        //holds decrement times and corresponding prices
        var priceSchedule = [];
        while (currentPrice >= minPrice) {
            // calculates the decrementTime
            var decrementTime = Math.floor(now - (millisecondsUntil / count));
            //update count to for correct decrement time on next loop
            count++;
            //catch intial time
            if (decrementTime === -Infinity) {
                decrementTime = now;
            }
            priceSchedule.push({
                price: currentPrice,
                decrementTime: decrementTime
            });
            //adjust price for next push
            currentPrice = Math.floor(currentPrice - amountToDecreasePrice);
        }
        // this adds the final min price and end time of the auction
        priceSchedule.push({
            price: minPrice,
            decrementTime: endDate
        });
        //add priceSchedule to item in database
        var findItem = Q.nbind(Item.findOne, Item);
        findItem({
                _id: itemId
            })
            .then(function(item) {
                if (!item) {
                    new Error('Item not found');
                } else { 
                    item.priceSchedule = priceSchedule;
                    item.save();
                }
            });
        //number of seconds between decrements
        var numberOfSecUntilDecrment = Math.floor(millisecondsUntil / count);
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
            //object to emit 

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
            timeId: setInterval(recurse, 3000),
            price: startPrice,
            priceSchedule: priceSchedule
        };

    }
};
