var mongoose = require('mongoose');

var priceScheduleSchema = new mongoose.Schema({
  priceSchedule: []
});

module.exports = mongoose.model('priceSchedule', priceScheduleSchema);
