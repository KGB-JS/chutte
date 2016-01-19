var itemController = require('./itemController.js');
var cronJobController = require('./cronJobController.js');

module.exports = function(app){
    app.post('/', itemController.postItem);
    app.get('/', itemController.getItems);
    app.post('/buyItem', itemController.buyItem);
    app.get('/cronJob', cronJobController.cronJob);
};
