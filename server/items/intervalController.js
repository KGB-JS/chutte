var app = require('../../server/server.js');
<<<<<<< 39384697c5c16852ce779b89df947a7b99cbd579
var socketServer = require('http').createServer(app);
var io = require('socket.io')(socketServer);
var moment = require('moment');
=======
// var socketServer = require('http').createServer(app);
// var io = require('socket.io')(socketServer);
>>>>>>> [feat]: add buyItem and buyItem route

module.exports = {
	    //setInterval fo make call to db to update price
        findTimeReduce : function (currentPrice, minPrice, endDate) {
            var now = new Date();
            var millisecondsUntil = Math.abs(now.getTime() - endDate.getTime());

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
            console.log(results);
            var recurse = function() {
                if(priceIndex < results.length - 1){
                    currentPrice = results[priceIndex];
                    priceIndex++;
                    //current price in database update
                    //make 'POST' to update price
                    console.log('priceIndex ', priceIndex);
                    console.log('currentPrice ', currentPrice);
                    // timeoutId = setTimeout(recurse, numberOfSecUntilDecrment);
                    timeoutId = setTimeout(recurse, 3000);
                }
            };
            // setTimeout(recurse, numberOfSecUntilDecrment);
            setTimeout(recurse, 3000);

            return timeoutId;
        }
};