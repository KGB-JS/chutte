var itemController = require('./itemController.js');

module.exports = function(app){
    app.post('/', itemController.postItem);
    app.get('/', itemController.getItems);
};
