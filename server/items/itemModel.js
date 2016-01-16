var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required:true
  },
  category: {
    type: String,
    required:true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  auctionEnds: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('item', itemSchema);
