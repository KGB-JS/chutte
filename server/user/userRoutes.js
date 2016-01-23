var userController = require('./userController.js');

module.exports = function(app) {
    app.post('/signup', userController.signup);
    app.post('/signin', userController.signin);
    // this isn't using used but can be implemented at any time 
    app.post('/signedin', userController.checkAuth);
};
