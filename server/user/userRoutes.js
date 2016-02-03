var userController = require('./userController.js');

module.exports = function(app) {
    app.post('/signup', userController.signup);
    app.post('/signin', userController.signin);
    // this isn't using used but can be implemented at any time 
    // this is used to update a user's information
    app.post('/userUpdate', userController.userUpdate);
    app.post('/signedin', userController.checkAuth);
};
