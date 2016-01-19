var sendgridAPIKEY = require('./emailAPIKeys.js');
var sendgrid  = require('sendgrid')(sendgridAPIKEY.apiKEY);
//for deployment
//var sendgrid  = require('sendgrid')(process.env.SENDGRIDKEY);
var Item = require('./../itemModel.js');
var User = require('./../../user/userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');


module.exports = {
	buyItemConfirmation: function(req, res, next) {
		//token to get username
	    var token = false//req.headers['x-access-token'];
	    //var user = jwt.decode(token, 'secret');

	    //check for login with token
	    if (token) {
	      next(new Error('no token'));
	    } else {
	    	//var subject = 'Your Order has been placed' + req.body.seller;
	    	//var item = req.body.item;
			sendgrid.send({
				  to:       'mickberber@gmail.com',
				  from:     'noreply@chutte.com',
				  subject:  'test email',
				  text:     'test email'
				}, function(err, json) {
				  if (err) { return console.error(err); }
				  console.log(json);
				})
	    }
	  }
};