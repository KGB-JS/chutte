var app = require('../../server/server.js');
// var socketServer = require('http').createServer(app);
// var io = require('socket.io')(socketServer);
var moment = require('moment');


module.exports = {
	    //setInterval fo make call to db to update price
        findTimeReduce : function (currentPrice, minPrice, endDate) {
            var now = moment().valueOf();
            endDate = moment('2016-01-18 17').valueOf();
            var millisecondsUntil = Math.abs(now - endDate);
            console.log(millisecondsUntil)
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
            console.log(results);
            var recurse = function() {
                if(priceIndex < results.length){
                    currentPrice = results[priceIndex];
                    priceIndex++;
                    //current price in database update
                    //make 'POST' to update price
                    console.log('priceIndex ', priceIndex);
                    console.log('currentPrice ', currentPrice);
                    // timeoutId = setTimeout(recurse, numberOfSecUntilDecrment);
                    intervalId = setInterval(recurse, 30000);
                    console.log(timeoutId, ' timeoutId')
                }
            };
            // setTimeout(recurse, numberOfSecUntilDecrment);
            setTimeout(recurse, 30000);

            return timeoutId;
        }
};