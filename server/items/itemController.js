var Item = require('./itemModel.js');
var jwt = require('jwt-simple');
var Q = require('q');
var userController = require('./../user/userController.js');
var User = require('./../user/userModel.js');
var moment = require('moment');
var sendGrid = require('./itemHelpers/sendGridController.js');
var emit = require('./itemHelpers/emitAuction.js');
var timeSchedule = require('./itemHelpers/findTimeSchedule.js');


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
                            var timeUntilDecrement = item.priceSchedule[i].decrementTime - now;
                            emit.emitAuction(item._id, timeUntilDecrement);
                        }
                    }
                }
            });
        })
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
            timeRemaining: priceSchedule[1]
        };

        var makeNewItem = new Item(newItem);
        Q.ninvoke(makeNewItem, 'save')
            .then(function() {
                emit.emitAuction(makeNewItem._id, makeNewItem.timeRemaining);
                setInterval(emit.emitAuction(makeNewItem._id), priceSchedule[1]);
                res.status(200).send(makeNewItem);
                //email confirmation
                sendGrid.listItemConfirmation(createdBy, newItem);

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
        var app = require('./../server.js');
        // var token = req.headers['x-access-token'];
        // var user = jwt.decode(token, 'secret');
        // if (!token) {
        //   next(new Error('no token'));
        // } else {
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
                    item.save()
                        .then(function() {
                            app.io.sockets.emit('quantityUpdate', item);
                            //notify seller
                            sendGrid.soldItemConfirmation(item.createdBy, item, quantityRequested);
                            //notify buyer
                            sendGrid.buyItemConfirmation(user, item, quantityRequested);
                            res.status(200).send(item);
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
