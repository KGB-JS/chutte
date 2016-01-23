var db = require('./../db.js');
var ItemStorage = require('./../items/itemStorage.js');
var priceSchedule = require('./priceScheduleSchema.js');



module.exports = {

    resetPriceSchedule: function(req, res, next) {
        var storage = ItemStorage;
        priceSchedule.priceSchedule[0] = storage;
        res.status(200).send();
    }

    //on new item post

    //on item expire

    //on cronJob

};
