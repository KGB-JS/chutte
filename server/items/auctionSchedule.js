var moment = require('moment');

module.exports = {
    
    findTimeReduce: function(currentPrice, minPrice, endDate) {
        var now = moment().valueOf();
        var totalAuctionTime = endDate - now;
        var numberOfDecrements = totalAuctionTime/900000;
        var amountToDecrementPrice = (currentPrice - minPrice)/numberOfDecrements;
        var results = [];
        var priceSchedule = [];
        var decrementTime = now;
        while(decrementTime < endDate && currentPrice >= minPrice){
            decrementTime = decrementTime + 900000;
            if(currentPrice >= minPrice && decrementTime < endDate){
                var priceIndex = {
                    price: currentPrice,
                    decrementTime: decrementTime
                };
                priceSchedule.push(priceIndex);
            }
            currentPrice = Math.floor(currentPrice - amountToDecrementPrice);
        }
        results.push(priceSchedule);
        results.push(900000);
        return results
    }

        
}
