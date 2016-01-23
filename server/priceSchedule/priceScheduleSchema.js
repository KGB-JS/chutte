var mongoose = require('mongoose');
// this need to become the backup for item storage
var priceScheduleSchema = new mongoose.Schema({
    priceSchedule: []
});

module.exports = mongoose.model('priceSchedule', priceScheduleSchema);
