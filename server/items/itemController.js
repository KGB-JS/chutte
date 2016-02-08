var Item = require('./itemModel.js');
var jwt = require('jwt-simple');
var Q = require('q');
var userController = require('./../user/userController.js');
var User = require('./../user/userModel.js');
var moment = require('moment');
var sendGrid = require('./itemHelpers/sendGridController.js');
var emit = require('./itemHelpers/emitAuction.js');
var timeSchedule = require('./auctionSchedule.js');
var timeStorage = {};

module.exports = {
  getItems: function(req, res, next) {
    Item.find({}, function(err, items) {
      var itemMap = [];
      var now = moment().valueOf();
      items.forEach(function(item) {
        if (item.active) {
          itemMap.push(item);
        }
      });
      res.status(200).send(itemMap);
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
    var auctionEnds = (req.body.product.auctionEnds + 86340000);
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
      timeRemaining: auctionEnds,
      priceIndex: -1
    };

    var makeNewItem = new Item(newItem);
    Q.ninvoke(makeNewItem, 'save')
      .then(function() {
        emit.emitAuction(makeNewItem._id);
        var timeId = setInterval(function(){emit.emitAuction(makeNewItem._id)}, 900000);
        timeStorage[makeNewItem._id] = timeId;
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
             //notify seller
                sendGrid.soldItemConfirmation(item.createdBy, item, quantityRequested,user.username,item.priceSchedule[item.priceIndex].price);
                //notify buyer
                sendGrid.buyItemConfirmation(user.username, item, quantityRequested, item.createdBy,item.priceSchedule[item.priceIndex].price);          
            clearInterval(timeStorage[item._id]);
            var priceSchedule = timeSchedule.findTimeReduce(item.priceSchedule[item.priceIndex].price, item.minPrice, item.auctionEnds);
            item.priceSchedule = priceSchedule[0];
            item.priceIndex = -1;
            emit.emitAuction(item._id);
            setTimeout(function(){
              timeStorage[item._id] = setInterval(function(){emit.emitAuction(item._id)}, 900000);
            }, 900000);
            res.status(200).send(item);
            console.log(item.priceIndex)
            console.log(item.priceSchedule[item.priceIndex])

               
            item.save()
              .then(function() {
                var transmitObject = {
                  _id: item._id,
                  price: item.priceSchedule[item.priceIndex].price,
                  timeRemaining: item.auctionEnds,
                  description: item.description,
                  productName: item.productName,
                  createdBy: item.createdBy,
                  quantity: item.quantity,
                  category: item.category,
                  image: item.image
                };
                app.io.sockets.emit('quantityUpdate', transmitObject);
              });
          } else {
            res.status(409).send('quantityRequested exceeds quantity available');
            return;
          }
        })
        .fail(function(error) {
            next(error);
        });
    }
  }

};
