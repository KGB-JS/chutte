var db = require('../data.js');
var Item = require('./itemModel.js');
var jwt = require('jwt-simple');
var Q = require('q');
var interval = require('./itemHelpers/intervalController.js');
var userController = require('./../user/userController.js');
var itemStorage = require('./itemStorage.js');
var User = require('./../user/userModel.js');
var imageController = require('./imageController.js');

module.exports = {
    getItems: function(req, res, next) {
        Item.find({}, function(err, items) {
            var itemMap = [];
            items.forEach(function(item) {
                // still need to check for categories
                // returns only items that are active
                if (item.active) {
                    itemMap.push(item);
                }
            });
            // the db products shoudl be used for tests
            //res.status(200).send(db.products);
            // Uncommit when we are ready to server from DB
            res.send(itemMap);
        });
    },
    postItem: function(req, res, next) {
        // setting var needed to make an item
        var productName = req.body.product.productName;
        var createdBy = req.body.product.createdBy;
        var category = req.body.product.category;
        var quantity = req.body.product.quantity;
        var price = req.body.product.price;
        var minPrice = req.body.product.minPrice;
        var auctionEnds = req.body.product.auctionEnds;
        var description = req.body.product.description;
        var productImage = imageController.getImageUrl(req.body.product.imgFile);
        // repackageing for new item
        var newItem = {
            productName: productName,
            createdBy: createdBy,
            category: category,
            quantity: quantity,
            price: price,
            minPrice: minPrice,
            auctionEnds: auctionEnds,
            description: description,
            image: productImage
        };
        // make the new item
        var makeNewItem = new Item(newItem);
        Q.ninvoke(makeNewItem, 'save')
            .then(function() {
                // once the item has been saved send back a 200 along with the newly made item
                res.status(200).send(makeNewItem);
                // this starts an active auction passing in the needed vars
                var itemObject = interval.findTimeReduce(makeNewItem._id, price, minPrice, auctionEnds);
                // this will update the item storage with the result of item object 
                // should be something like this { timeId:setInterval(recurse, 10000), price: startPrice, priceSchedule: priceSchedule }
                // Note might need to add quantity here double check
                itemStorage.storage[makeNewItem._id] = itemObject;
            })
            // if it fakes to save the item this will show it
            .fail(function(err) {
                console.log(err.errors);
                res.status(400).send();
                next(err);
            });
    },
    buyItem: function(req, res, next) {
        console.log(req.body)
        //Note need to add in access token logic
        // sets up the id and number quantity of the buy
        var productId = req.body._id;
        var quantityRequested = req.body.quantity || 1;
        // make a var to search for an item
        var findItem = Q.nbind(Item.findOne, Item);
        // search for Item with the ID
        findItem({
                _id: productId
            })
            // if that item is found do the following
            .then(function(item) {
                // checks to make sure the quantity is not more then there is available 
                if (item.quantity > 0 && quantityRequested <= item.quantity) {
                    // update the new quantity remaining
                    item.quantity = item.quantity - quantityRequested;
                    // update the DB with the current active price which the item was purchased
                    //item.price = itemStorage.storage[item._id].price;
                    // save the Info to the DB
                    item.save()
                        // once the save is complete
                        .then(function() {
                            // send back a 200
                            console.log(itemStorage, ' itemStorage');
                            res.status(200).send();
                            // timeId creates a new auction at the price that it was purchased at.
                            var timeId = interval.findTimeReduce(item._id, itemStorage.storage[item._id].price, item.minPrice, item.auctionEnds);
                            // this will update the new timeId used to clear the interval
                            itemStorage.storage[item._id].timeId = timeId.timeId;
                            // this will update the item Storage with the newly made priceSchedule 
                            itemStorage.storage[item._id].priceSchedule = timeId.priceSchedule;
                            console.log(timeId.price, 'TIMEIDPRICE');
                        });
                } else {
                    res.status(401).send('quantityRequested exceeds quantity available');
                }
            })
            .fail(function(error) {
                next(error);
            });
        // Uncomment when we start using login to save items to user profile.
        //this need to be tested
        // var token = req.headers['x-access-token'];
        // if (!token) {
        //     next(new Error('no token'));
        // } else {
        //     var user = jwt.decode(token, 'secret');
        //     var findUser = Q.nbind(User.findOne, User);
        //     findUser({
        //             username: user.username
        //         })
        //         .then(function(foundUser) {
        //             if (foundUser) {
        //                 var productId = req.body.productId;
        //                 var quantityRequested = req.body.quantity;
        //                 var findItem = Q.nbind(Item.findOne, Item);
        //                 findItem({
        //                         _id: productId
        //                     })
        //                     .then(function(item) {
        //                         if (item.quantity > 0 && quantityRequested < item.quantity) {
        //                             item.quantity = item.quantity - quantityRequested;
        //                             item.price = itemStorage.storage[item._id].price;
        //                             item.save()
        //                                 .then(function() {
        //                                     console.log(itemStorage, ' itemStorage');
        //                                     clearInterval(itemStorage.storage[item._id].timeId);
        //                                     var timeId = interval.findTimeReduce(item._id, itemStorage.storage[item._id].price, item.minPrice, item.auctionEnds);
        //                                     itemStorage.storage[item._id] = timeId;
        //                                     console.log(timeId.price, 'TIMEIDPRICE');
        //                                     foundUser.purchasedItems.push(item);
        //                                     Q.ninvoke(foundUser, 'save')
        //                                       .then(function() {
        //                                         console.log("Item saved to userProfile");
        //                                       })
        //                                       .fail(function(error) {
        //                                         console.log("Item did not saved to userProfile");
        //                                         res.status(400).send();
        //                                         next(error);
        //                                       });
        //                                 });
        //                         } else {
        //                             res.status(401).send('quantityRequested exceeds quantity available');
        //                         }
        //                     })
        //                     .fail(function(error) {
        //                         next(error);
        //                     });
        //                     res.status(200).send();
        //             } else {
        //                 res.status(401).send();
        //             }
        //         })
        //         .fail(function(error) {
        //             next(error);
        //         });
        // }
    }

};
