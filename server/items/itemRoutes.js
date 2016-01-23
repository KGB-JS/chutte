var itemController = require('./itemController.js');
var cronJobController = require('./itemHelpers/cronJobController.js');
var sendGridController = require('./itemHelpers/sendGridController.js');

module.exports = function(app) {
    // this is used for adding an auction
    app.post('/', itemController.postItem);
    // this will return all the items with a currently active auction
    app.get('/', itemController.getItems);
    // this is used to buy an item
    app.post('/buyItem', itemController.buyItem);
    // cronJob is a route for saving items in the event we used a heroku/server that had to power down X numbers of day
    app.get('/cronJob', cronJobController.cronJob);
    // this will generate the email for after something is purchased and connect the buyer and seller 
    app.post('/buyItemConfirmation', sendGridController.buyItemConfirmation);
};
