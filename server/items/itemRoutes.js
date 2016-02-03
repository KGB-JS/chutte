var itemController = require('./itemController.js');
var sendGridController = require('./itemHelpers/sendGridController.js');

module.exports = function(app) {
    // this is used for adding an auction
    app.post('/', itemController.postItem);
    // this will return all the items with a currently active auction
    app.get('/', itemController.getItems);
    // this is used to buy an item
    app.post('/buyItem', itemController.buyItem);
};




