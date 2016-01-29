var db = require('../data.js');
var Item = require('./itemModel.js');
var jwt = require('jwt-simple');
var Q = require('q');
var interval = require('./itemHelpers/intervalController.js');
var userController = require('./../user/userController.js');
var itemStorage = require('./itemStorage.js');
var User = require('./../user/userModel.js');
var imageController = require('./imageController.js');
var moment = require('moment');
var sendGrid = require('./itemHelpers/sendGridController.js');


module.exports = {
    getItems: function(req, res, next) {
        // var keys = 0;
        // (function(){
        //     for(var key in itemStorage.storage){
        //         keys++;
        //     }
        //     if(keys > 0){
        //         res.send(itemStorage.storage);
        //         return;
        //     }
        // })();
        Item.find({}, function(err, items) {
            var now = moment().valueOf();
            var itemMap = [];
            items.forEach(function(item) {
                var priceFlag = true;
                // check for categories
                if (item.active) {
                    for(var i = 0;i <= item.priceSchedule.length - 1; i++){
                        if(priceFlag && item.priceSchedule[i].decrementTime > now){
                            priceFlag = false;
                            item.price = item.priceSchedule[i].price;
                            item.save();
                        }
                    }
                    itemMap.push(item);
                }
            });
            //commented out for production
            //res.status(200).send(db.products);
            //comment out for testing
            res.send(itemMap);
        });
    },
    postItem: function(req, res, next) {
        // var token = req.headers['x-access-token'];
        // var user = jwt.decode(token, 'secret');
        // if (!token) {
        //   next(new Error('no token'));
        // } else {
        
        var productName = req.body.product.productName;
        var createdBy = req.body.product.createdBy;
        var category = req.body.product.category;
        var quantity = req.body.product.quantity;
        var price = req.body.product.price;
        var minPrice = req.body.product.minPrice;
        var auctionEnds = req.body.product.auctionEnds;
        var description = req.body.product.description;
        var productImage = req.body.product.imgFile;
        //check for valid endDate
        var now = moment().valueOf();
        //edge cases
        if(now > auctionEnds){
            res.status(409).send('Auction End time is not acceptable');
            return;
        }
        if(price < minPrice){
            res.status(409).send('Auction start price is less than auction minimum price');
            return;
        }
        if(price < 1){
            res.status(409).send('Auction start price is less than allowed start price');
            return;
        }

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

        var makeNewItem = new Item(newItem);
        Q.ninvoke(makeNewItem, 'save')
            .then(function() {
                //start auction, return clearInterval ID
                var itemObject = interval.findTimeReduce(makeNewItem._id, price, minPrice, auctionEnds);
                res.status(200).send(makeNewItem);
                //email confirmation
                sendGrid.listItemConfirmation(createdBy, newItem);
                // this will update the item storage with the result of item object
                itemStorage.storage[makeNewItem._id] = itemObject;
                itemStorage.storage[makeNewItem._id].category = newItem.category
                itemStorage.storage[makeNewItem._id].description = newItem.description
                itemStorage.storage[makeNewItem._id].createdBy = newItem.createdBy
                itemStorage.storage[makeNewItem._id].quantity = newItem.quantity
                itemStorage.storage[makeNewItem._id].productName = newItem.productName
                itemStorage.storage[makeNewItem._id].image = newItem.image
                //console.log(itemStorage.storage[makeNewItem._id])
                var findUser = Q.nbind(User.findOne, User);
                findUser({ username: createdBy })
                  .then(function(user){
                    if(user){
                        user.postedItems.push(makeNewItem);
                        user.save();
                    }
                  })

            })
            .fail(function(err) {
                console.log(err.errors);
                res.status(400).send();
                next(err);
            });
            //------- uncomment when tokens work}
    },
    buyItem: function(req, res, next) {
        // var token = req.headers['x-access-token'];
        // var user = jwt.decode(token, 'secret');
        // if (!token) {
        //   next(new Error('no token'));
        // } else {
        //Note need to add in access token logic
        // sets up the id and number quantity of the buy
        console.log(req.body)
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
                    itemStorage.storage[item._id].quantity = item.quantity;
                    // update the DB with the current active price which the item was purchased
                    if(item.quantity === 0){
                        item.active = false;
                        itemStorage.storage[item._id].active = false;
                    }
                    //item.price = itemStorage.storage[item._id].price;
                    // save the Info to the DB
                    item.save()
                        .then(function() {
                            sendGrid.soldItemConfirmation(item.createdBy, item, quantityRequested);
                            sendGrid.buyItemConfirmation(user, item, quantityRequested);
                            res.status(200).send(item);
                            // timeId creates a new auction at the price that it was purchased at.
                            clearInterval(itemStorage.storage[item._id].timeId)
                            var timeId = interval.findTimeReduce(item._id, itemStorage.storage[item._id].price, item.minPrice, item.auctionEnds);
                            // only overwrite price schedule and timeoutID
                            itemStorage.storage[item._id].timeId = timeId.timeId;
                            // this will update the item Storage with the newly made priceSchedule 
                            itemStorage.storage[item._id].priceSchedule = timeId.priceSchedule;
                        });
                } else {
                    res.status(409).send('quantityRequested exceeds quantity available');
                    return
                }
            })
            .fail(function(error) {
                next(error);
            });
        //-------> uncomment when tokens work}
    }

};
