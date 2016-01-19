var itemStorage = require('./../itemStorage.js');
var Item = require('./../itemModel.js');
var db = require('./../../data.js');


module.exports = {
	cronJob: function(req, res, next) {
        Item.find({}, function(err, items) {
            items.forEach(function(item) {
            	if(itemStorage[item._id]){
                  item.price = itemStorage[item._id].storage.price;
                  item.save()
                }
            });
        res.status(200).send(db.items);
            
        });

    }
};