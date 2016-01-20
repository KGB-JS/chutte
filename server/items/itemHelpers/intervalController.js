var app = require('../../server.js');
//var socketServer = require('http').createServer(app);
//var io = require('socket.io')(socketServer);
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
            var results = [];
            while (currentPrice >= minPrice){
                results.push(currentPrice);
                currentPrice = currentPrice - amountToDecrease;
                count++;
            }

            var numberOfSecUntilDecrment = millisecondsUntil/count;
            var priceIndex = 0;
            var timeoutId;
            results.push(minPrice);
            var recurse = function() {
                var rightNow = moment().valueOf();
                if(rightNow > endDate.valueOf()){
                    itemStorage.storage[itemId].active = false;
                }
            
                if(priceIndex < results.length){
                    priceIndex++;
                    startPrice = results[priceIndex];
                    //current price in database update
                    //make 'POST' to update price

                }
                console.log('recurse', startPrice);
                if(itemStorage.storage[itemId].price){ 
                   itemStorage.storage[itemId].price = startPrice;
                }
                console.log('item storage', itemStorage);

            };
            return { timeId:setInterval(recurse, 10000), price: startPrice };

        }
};