var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    minPrice: {
        type: Number,
        required: true
    },
    auctionEnds: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    priceSchedule: [],
    image: {
        type: String
    },
    timeRemaining: {
        type: Number
    },
    priceIndex: {
        type: Number
    },
    timeId: []
});

module.exports = mongoose.model('item', itemSchema);
