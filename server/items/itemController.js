//var _ = require('underscore');
var db = require('../data.js');
var Item = require('./itemModel.js');
var jwt = require('jwt-simple');
//var request = require('request');
//var url = require('url');
var Q = require('q');
// commented out for deployment
// uncomment for development
//var apiInfo = require('./apiKeys.js');

module.exports = {
    getItems: function(req, res, next) {
        Item.find({}, function(err, items) {
            var itemMap = [];
            items.forEach(function(item) {
                itemMap.push(item);
            });
            // res.send(itemMap);
        res.send(db.items);
            
        });

    },
    postItem: function(req, res, next) {

        var productName = req.body.productName;
        var createdBy = req.body.createdBy;
        var category = req.body.category;
        var quantity = req.body.quantity;
        var price = req.body.price;
        var auctionEnds = req.body.auctionEnds;
        var description = req.body.description;

        var newItem = {
            productName: productName,
            createdBy: createdBy,
            category: category,
            quantity: quantity,
            price: price,
            auctionEnds: auctionEnds,
            description: description
        };
        var makeNewItem = new Item(newItem);
        Q.ninvoke(makeNewItem, 'save')
            .then(function() {
                res.status(200).send();
            })
            .fail(function(err) {
                console.log(err.errors);
                res.status(400).send();
                next(err);
            });



    }
};
