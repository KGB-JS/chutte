var mongoose = require('mongoose');

var port = process.env.MONGOLAB_URI || 'mongodb://localhost/chutte';

var db = mongoose.connect(port);

module.exports = db;
