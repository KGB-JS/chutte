var sendgridAPIKEY = require('./emailAPIKeys.js');
var sendgrid = require('sendgrid')(sendgridAPIKEY.apiKEY);
//for deployment
//var sendgrid  = require('sendgrid')(process.env.SENDGRIDKEY);


module.exports = {
    buyItemConfirmation: function(buyer) {
            sendgrid.send({
                to: buyer,
                from: 'noreply@chutte.com',
                subject: 'test email',
                text: 'test email'
            }, function(err, json) {
                if (err) {
                    return console.error(err);
                }
                console.log(json);
            });
    },
    soldItemConfirmation: function(seller, item, quantity) {
        var soldHtml = '<div><h1>' + item.productName + '</h1><div>'+ quantity + ' units sold.</div></div>'
            sendgrid.send({
                to: seller,
                from: 'noreply@chutte.com',
                subject: 'Your Item ' + item.productName + ' has sold',
                html: soldHtml
            }, function(err, json) {
                if (err) {
                    return console.error(err);
                }
                console.log(json);
            });
    },
    listItemConfirmation: function(seller, item) {
        var itemHtml = '';
        for(var key in item){
            itemHtml += '<div><h1>' + key + ':</h1>' + '<h3>'+ item[key] +'</h3>'+'</div>' 
        }

            sendgrid.send({
                to: seller,
                from: 'noreply@chutte.com',
                subject: 'Your item has been posted on Chutte!',
                html: itemHtml
            }, function(err, json) {
                if (err) {
                    return console.error(err);
                }
                console.log(json);
            });
    },
    signUpConfirmation: function(user) {
        var welcomeHtml = '<h1>WELCOME!</h1><div><h2>You have joined the online marketplace, Chutte</h2></div>'
            sendgrid.send({
                to: user,
                from: 'noreply@chutte.com',
                subject: 'Welcome to Chutte!',
                text: welcomeHtml
            }, function(err, json) {
                if (err) {
                    return console.error(err);
                }
                console.log(json);
            });
    }
};
