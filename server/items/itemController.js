//var _ = require('underscore');
var db = require('../data.js');
var Item = require('./itemModel.js');
//var request = require('request');
//var url = require('url');
//var Q = require('q');
// commented out for deployment
// uncomment for development
//var apiInfo = require('./apiKeys.js');

module.exports = {
  getItems: function(req, res, next) {
    res.send(db.items);
  },
  postItem: function(req, res, next) {
    /*add postItem functionality*/
  }
};
