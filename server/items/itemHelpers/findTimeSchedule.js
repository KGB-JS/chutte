var moment = require('moment');

module.exports = {
    
    findTimeReduce: function(currentPrice, minPrice, endDate) {
        var results = [];
        //require at runtime to aviod dependency
        var startPrice = currentPrice;
        //amount of price decrements
        var count = 0;
        var amountToDecreasePrice = startPrice / minPrice;
        if (minPrice === 1 || 0) {
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
        var now = moment().valueOf();
        //total time of auction
        var millisecondsUntil = endDate - now;
        var averageTimeBetween = millisecondsUntil / count;
        var decrementTime = now;
        for (var i = 0; i < count - 1; i++) {
            priceSchedule[i].decrementTime = decrementTime;
            decrementTime = Math.floor(decrementTime + averageTimeBetween);
        }
        //number of seconds between decrements
        var numberOfSecUntilDecrment = Math.floor(millisecondsUntil / count);
        results.push(priceSchedule);
        results.push(numberOfSecUntilDecrment);

        // return priceSchedule and number of sec until decrment
        return results;
    }

        
}
