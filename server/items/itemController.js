var Item = require('./itemModel.js');
var jwt = require('jwt-simple');
var Q = require('q');
var userController = require('./../user/userController.js');
var User = require('./../user/userModel.js');
var moment = require('moment');
var sendGrid = require('./itemHelpers/sendGridController.js');
var emit = require('./itemHelpers/emitAuction.js');
var timeSchedule = require('./auctionSchedule.js');

module.exports = {
    getItems: function(req, res, next) {
        Item.find({}, function(err, items) {
            var now = moment().valueOf();
            items.forEach(function(item) {
                if (item.active) {
                    var priceFlag = true;
                    for(var i = 0; i < item.priceSchedule.length; i++){
                        if(priceFlag && item.priceSchedule[i].decrementTime > now){
                            priceFlag = false;
                            item.price = item.priceSchedule[i].price;
                            item.save();
                            emit.emitAuctionGet(item._id);
                        }
                    }
                }
            });
            res.status(200).send();
        })
    },
    postItem: function(req, res, next) {
        var token = req.headers['x-access-token'];
        var user = jwt.decode(token, 'secret');
        if (!token) {
          next(new Error('no token'));
        } else {
        var productName = req.body.product.productName;
        var createdBy = user.username;
        var category = req.body.product.category;
        var quantity = req.body.product.quantity;
        var price = req.body.product.price;
        var minPrice = req.body.product.minPrice;
        var auctionEnds = req.body.product.auctionEnds;
        var description = req.body.product.description;
        var productImage = req.body.product.imgFile;
        //check for valid endDate
        var now = moment().valueOf();
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
        var priceSchedule = timeSchedule.findTimeReduce(price, minPrice, auctionEnds);
        var newItem = {
            productName: productName,
            createdBy: createdBy,
            category: category,
            quantity: quantity,
            price: price,
            minPrice: minPrice,
            auctionEnds: auctionEnds,
            description: description,
            image: productImage,
            priceSchedule: priceSchedule[0],
            timeRemaining: priceSchedule[0].decrementTime,
            priceIndex: 0
        };

        var makeNewItem = new Item(newItem);
        Q.ninvoke(makeNewItem, 'save')
            .then(function() {
                var timeId = setInterval(emit.emitAuction(makeNewItem._id), 900000);
                res.status(200).send(makeNewItem);
                makeNewItem.timeId.push(timeId);
                makeNewItem.save();
                //email confirmation
                sendGrid.listItemConfirmation(createdBy, newItem);

                var findUser = Q.nbind(User.findOne, User);
                findUser({ username: createdBy })
                  .then(function(user){
                    if(user){
                        user.postedItems.push(makeNewItem);
                        user.save();
                    }
                  });

            })
            .fail(function(err) {
                console.log(err.errors);
                res.status(400).send();
                next(err);
            });
        }
    },
    buyItem: function(req, res, next) {
        var app = require('./../server.js');
        var token = req.headers['x-access-token'];
        var user = jwt.decode(token, 'secret');
        if (!token) {
          next(new Error('no token'));
        } else {
          var productId = req.body._id;
          var quantityRequested = req.body.quantity;
          var findItem = Q.nbind(Item.findOne, Item);
          findItem({
                _id: productId
            })
            .then(function(item) { 
                if (item.quantity > 0 && quantityRequested <= item.quantity) {
                    item.quantity = item.quantity - quantityRequested;
                    if(item.quantity === 0){
                        item.active = false;
                    }
                    // var priceSchedule = timeSchedule.findTimeReduce(item.price, item.minPrice, item.auctionEnds);
                    // console.log('before buy', item.priceSchedule)
                    // console.log('before buy', item.timeId)
                    // clearTimeout(item.timeId);
                    // item.priceSchedule = priceSchedule[0];
                    // item.timeRemaining = priceSchedule[0].decrementTime;
                    // item.priceIndex = 0;
                    // item.timeId = setInterval(emit.emitAuction(item._id), 900000);
                    // console.log('after buy', item.priceSchedule)
                    // console.log('after buy', item.timeId)
                    item.save()
                        .then(function() {
                            var transmitObject = {
                                _id: item._id,
                                price: item.price,
                                timeRemaining: item.priceSchedule[item.priceIndex].decrementTime,
                                description: item.description,
                                productName: item.productName,
                                createdBy: item.createdBy,
                                quantity: item.quantity,
                                category: item.category,
                                image: item.image
                            };
                            app.io.sockets.emit('quantityUpdate', transmitObject);
                            res.status(200).send(item);
                            //notify seller
                            sendGrid.soldItemConfirmation(item.createdBy, item, quantityRequested,user.username);
                            //notify buyer
                            sendGrid.buyItemConfirmation(user.username, item, quantityRequested,item.createdBy);
                            
                        });
                } else {
                    res.status(409).send('quantityRequested exceeds quantity available');
                    return
                }
            })
            .fail(function(error) {
                next(error);
            });
        }
    }

};
