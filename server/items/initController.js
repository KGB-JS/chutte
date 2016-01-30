var moment = require('moment');
var Item = require('./itemModel.js');
var emit = require('./itemHelpers/emitAuction.js');


module.exports = {
    itemsInit: function() {
        Item.find({}, function(err, items) {
            var now = moment().valueOf();
            items.forEach(function(item) {
                if (item.active) {
                	var lastDecrementTime = item.priceSchedule[item.priceSchedule.length - 1];
                	if(now > lastDecrementTime){
                		item.active = false;
                		item.save();
                	} else {
                    var priceFlag = true;
	                  for(var i = 0; i < item.priceSchedule.length; i++){
	                      if(priceFlag && item.priceSchedule[i].decrementTime > now){
	                          priceFlag = false;
	                          item.price = item.priceSchedule[i].price;
	                          item.save();
	                          var timeUntilDecrement = item.priceSchedule[i].decrementTime - now;
	                          emit.emitAuction(item._id, timeUntilDecrement);
	                          setTimeout(function(){
	                          	setInterval(emit.emitAuction(item._id, item.timeRemaining), item.timeRemaining);
	                          }, timeUntilDecrement);
	                      }
	                  }
	                }
                }
            });
        })
    }
}