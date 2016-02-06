var sendgridAPIKEY = require('./emailAPIKeys.js');
var sendgrid = require('sendgrid')(sendgridAPIKEY.apiKEY);
//for deployment
// var sendgrid  = require('sendgrid')(process.env.SENDGRIDKEY);
var emailTemp = require('./sendGridHTML.js');

module.exports = {
  buyItemConfirmation: function(buyer, item, quantity,seller,soldPrice) {
    var buyHtml = emailTemp.buyerTemp(buyer, item.productName, quantity, seller, soldPrice)
    sendgrid.send({
      to: buyer,
      from: 'noreply@chutte.com',
      subject: 'Your purchase on Chutte has been confirmed!',
      html: buyHtml
    }, function(err, json) {
        if (err) {
          return console.error(err);
        }
        console.log(json);
    });
  },
  soldItemConfirmation: function(seller, item, quantity, buyer, soldPrice) {
    console.log(seller, item.productName, quantity, buyer, soldPrice);
    var soldHtml = emailTemp.sellerTemp(buyer, item.productName, quantity, seller, soldPrice)
    sendgrid.send({
      to: seller,
      from: 'noreply@chutte.com',
      subject: 'Your Item ' + item.productName + ' has sold to '+ buyer + '.',
      html: soldHtml
    }, function(err, json) {
        if (err) {
          return console.error(err);
        }
        console.log(json);
    });
  },
  listItemConfirmation: function(seller, item) {
    var itemHtml = emailTemp.postItemTemp(seller,item.productName,item.quantity);
    sendgrid.send({
      to: seller,
      from: 'noreply@chutte.com',
      subject: 'Your listing has been posted on Chutte!',
      html: itemHtml
    }, function(err, json) {
        if (err) {
          return console.error(err);
        }
        console.log(json);
    });
  },
  signUpConfirmation: function(user) {
    var welcomeHtml = emailTemp.signUpTemp(user)
    sendgrid.send({
      to: user,
      from: 'noreply@chutte.com',
      subject: 'Welcome to Chutte!',
      html: welcomeHtml
    }, function(err, json) {
        if (err) {
          return console.error(err);
        }
        console.log(json);
    });
  }
};
