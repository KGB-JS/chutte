var db = require('../data.js');
var Item = require('./itemModel.js');
var jwt = require('jwt-simple');
var Q = require('q');
var interval = require('./intervalController.js');
var userController = require('./../user/userController.js');
var itemStorage = require('./itemStorage.js');

module.exports = {
    getItems: function(req, res, next) {
        Item.find({}, function(err, items) {
            var itemMap = [];
            items.forEach(function(item) {
                itemMap.push(item);
            });
        res.send(db.items);
            
        });

    },
    postItem: function(req, res, next) {

        var productName = req.body.productName;
        var createdBy = req.body.createdBy;
        var category = req.body.category;
        var quantity = req.body.quantity;
        var price = req.body.price;
        var minPrice = req.body.minPrice;
        var auctionEnds = req.body.auctionEnds;
        var description = req.body.description;

        var newItem = {
            productName: productName,
            createdBy: createdBy,
            category: category,
            quantity: quantity,
            price: price,
            minPrice: minPrice,
            auctionEnds: auctionEnds,
            description: description
        };
        var makeNewItem = new Item(newItem);
        Q.ninvoke(makeNewItem, 'save')
            .then(function() {
                res.status(200).send(makeNewItem);
                var timeId = interval.findTimeReduce(makeNewItem._id, price, minPrice, auctionEnds);
                itemStorage.storage[makeNewItem._id] = timeId;
                console.log(itemStorage)
            })
            .fail(function(err) {
                console.log(err.errors);
                res.status(400).send();
                next(err);
            });
    },
    buyItem: function(req, res, next) {
        var token = req.headers['x-access-token'];
        var productId = req.body.productId;
        var quantityRequested = req.body.quantity;
        var findItem = Q.nbind(Item.findOne, Item);
        findItem({_id: productId})
            .then(function(item) {
                if (item.quantity > 0 && quantityRequested < item.quantity) {
                    item.quantity = item.quantity - quantityRequested
                    item.save()
                        .then(function() {
                          console.log(itemStorage, ' itemStorage');
                          res.status(200).send();
                          clearInterval(itemStorage.storage[item._id].timeId);
                          var timeId = interval.findTimeReduce(item._id, itemStorage.storage[item._id].price, item.minPrice, item.auctionEnds);
                          itemStorage.storage[item._id] = timeId;
                          console.log(timeId.price, 'TIMEIDPRICE');
                        })
                } else {
                    res.status(401).send('quantityRequested exceeds quantity available');
                }
              })
              .fail(function(error) {
                next(error);
              });
    }
};
