var app = require('../../server/server.js');
var socketServer = require('http').createServer(app);
var io = require('socket.io')(socketServer);

module.exports = {
	    //setInterval fo make call to db to update price
        findTimeReduce : function (currentPrice, minPrice, endDate) {
            endDate = endDate || 7;
            var sec = ((endDate * 24)*60*60);
            var count = 0;
            var amountToDecrease = currentPrice/minPrice;
            var results = [];
            while (currentPrice >= minPrice){
                results.push(currentPrice);
                currentPrice = currentPrice - amountToDecrease;
                count++;
            }

            var numberOfSecUntilDecrment = sec/count;
            var priceIndex = 0;
            var timeoutId;
            
            var recurse = function() {
                if(priceIndex < results.length - 1){
                    priceIndex++;
                    //current price in database update
                    //make 'POST' to update price

                    timeoutId = setTimeout(recurse, numberOfSecUntilDecrment);
                }
            }
            setTimeout(recurse, numberOfSecUntilDecrment);
        }
};