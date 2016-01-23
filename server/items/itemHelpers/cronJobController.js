var itemStorage = require('./../itemStorage.js');
var Item = require('./../itemModel.js');
var db = require('./../../data.js');


// this is the backup in case of using a server that goes down every 30 mins
// this will update the database from the item storage 
module.exports = {
    cronJob: function(req, res, next) {
        Item.find({}, function(err, items) {
            items.forEach(function(item) {
                if (itemStorage[item._id]) {
                    item.price = itemStorage[item._id].storage.price;
                    item.save();
                }
            });
            res.status(200).send(db.items);

        });

    }
};
