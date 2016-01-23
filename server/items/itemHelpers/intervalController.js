var moment = require('moment');
var itemStorage = require('./../itemStorage.js');
var Item = require('./../itemModel.js');
var Q = require('q');
// this is confusing so buckle in
module.exports = {

    // this is used to make the price reduction schedule
    findTimeReduce: function(itemId, currentPrice, minPrice, endDate) {
        // this is a double check to prevent multiple interval for each auction
        if (itemStorage.storage[itemId]) {
            clearInterval(itemStorage.storage[item._id].timeId);
        }
        // this is required for sockets
        var app = require('./../../server.js');

        var startPrice = currentPrice;
        // this sets up the current moment in time in epoch time aka milliseconds until now
        var now = moment().valueOf();
        // this converts the string into epoch time
        endDate = moment(endDate, "YYYY-MM-DD H").valueOf();
        // this will find out how many milliseconds between the two times
        var millisecondsUntil = Math.abs(now - endDate);
        // count keep tracks of how many times the price will need to change
        var count = 0;
        // this is the amount that will be decreased each time 
        var amountToDecrease = currentPrice / minPrice;
        // this is used the hold the price and time at which to decreased/decrement
        var priceSchedule = [];
        // each time the current price is larger or = the min price do the following
        while (currentPrice >= minPrice) {
            // calculates the decrementTime
            var decrementTime = now - (millisecondsUntil / count);
            // increase the count by one keep track of how many times the while function has run
            count++;
            // this is a catch for the decrementTime on the first creation
            if (decrementTime === -Infinity) {
                decrementTime = now;
            }
            // adds the price and decreased/decrement time
            priceSchedule.push({
                price: currentPrice,
                decrementTime: decrementTime
            });
            // changes the current price with the correct amount to decrease
            currentPrice = currentPrice - amountToDecrease;
        }
        // this adds the final min price and end time of the auction
        priceSchedule.push({
            price: minPrice,
            decrementTime: endDate
        });
        //this updates info on the item
        var findItem = Q.nbind(Item.findOne, Item);
        // find the item based on the id
        findItem({
                _id: itemId
            })
            .then(function(item) {
                // if the item is not found throw and error
                if (!item) {
                    new Error('Item not found');
                } else {
                    // this will update the item if the auciton is over
                    if (now > moment(item.auctionEnds).valueOf()) {
                        item.active = false;
                    }
                    // add the price Schedule 
                    item.priceSchedule = priceSchedule;
                    item.save();
                    // update the live storage with the current info
                    itemStorage.storage[itemId] = item;
                }
            });
        // this is the avgerage number of milliseconds between decreased/decrement
        var numberOfSecUntilDecrment = millisecondsUntil / count;
        // this keeps track of the price schedule index
        var priceIndex = 0;
        // here is the big old recurse interval func 
        var recurse = function() {
            // this gets the current moment as of right now
            var rightNow = moment().valueOf();
            // this is a double check see if the auciton should be over
            if (rightNow > endDate.valueOf()) {
                // if the auciton is over set it to false
                itemStorage.storage[itemId].active = false;
            } else {
                // if the auction isn't over set active to true
                itemStorage.storage[itemId].active = true;
            }
            // this runs thru the price Schedule from start to finish i.e 0 to the end
            if (priceIndex < priceSchedule.length) {

                priceIndex++;
                // this is to double chekc the price is a value
                if(priceSchedule[priceIndex] !== undefined){
                  startPrice = priceSchedule[priceIndex].price;
                }
                console.log(itemStorage.storage[itemId]);
                // once the price is increaed emit from server to all clients the entire object
                app.io.sockets.emit('productUpdate', itemStorage.storage[itemId]);
            }
            // when the price index gets to the end clear the interval the auction is over
            if (priceIndex === priceSchedule.length - 1) {
                clearInterval(itemStorage.storage[itemId].timeId);
            }
            // this is another doulbe check to make sure the price is there
            if (itemStorage.storage[itemId].price) {
                itemStorage.storage[itemId].price = startPrice;
            }

        };
        // this is the return from findTimeReduce
        return {
            timeId: setInterval(recurse, 1000),
            price: startPrice,
            priceSchedule: priceSchedule
        };

    }
};
