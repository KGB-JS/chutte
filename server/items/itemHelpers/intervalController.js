var app = require('../../server.js').server;
var moment = require('moment');
var itemStorage = require('./../itemStorage.js');


module.exports = {
        findTimeReduce : function (itemId, currentPrice, minPrice, endDate) {
            var startPrice = currentPrice;
            var now = moment().valueOf();
            endDate = moment('2016-01-20 17').valueOf();
            var millisecondsUntil = Math.abs(now - endDate);
            var count = 0;
            var amountToDecrease = currentPrice/minPrice;
            var priceSchedule = {};
            while (currentPrice >= minPrice){
                var decrementTime = now - (millisecondsUntil / count);
                priceSchedule[count] = { price: currentPrice, decrementTime: decrementTime};
                currentPrice = currentPrice - amountToDecrease;
                count++;
            }
            priceSchedule.push(minPrice);
            var numberOfSecUntilDecrment = millisecondsUntil/count;
            var priceIndex = 0;
            var recurse = function() {
                var rightNow = moment().valueOf();
                if(rightNow > endDate.valueOf()){
                    itemStorage.storage[itemId].active = false;
                }
            
                if(priceIndex < priceSchedule.length){
                    priceIndex++;
                    startPrice = priceSchedule[priceIndex];
                    //current price in database update
                    //make 'POST' to update price

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