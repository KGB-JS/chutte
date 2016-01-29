var User = require('./userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');
var sendGrid = require('./../items/itemHelpers/sendGridController.js');


module.exports = {
    signin: function(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        var findUser = Q.nbind(User.findOne, User);
        findUser({
                username: username
            })
            .then(function(user) {
                if (!user) {
                    res.status(401).send({
                        error: 'User does not exist'
                    });
                    next(new Error('User does not exist'));
                } else {
                    return user.checkPassword(password)
                        .then(function(foundUser) {
                            if (foundUser) {
                                var token = jwt.encode(user, 'secret');
                                res.json({
                                    username: user.username,
                                    token: token,
                                });
                            } else {
                                res.status(401).send('User or password is incorrect');
                                next(new Error('User or password is incorrect'));
                            }
                        });
                }
            })
            .fail(function(error) {
                next(error);
            });
    },
    signup: function(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        var findOne = Q.nbind(User.findOne, User);
        // check to see if user already exists
        findOne({
                username: username
            })
            .then(function(user) {
                if (user) {
                    res.status(403).send({
                        error: 'User already exist!'
                    });
                    next(new Error('User already exist!'));
                } else {
                    var newUser = {
                        username: username,
                        password: password
                    };
                    var newSignupUser = new User(newUser);
                    return newSignupUser.save();
                }
            })
            .then(function(user) {
                sendGrid.signUpConfirmation(user.username);
                // create token to send back for auth
                var token = jwt.encode(user, 'secret');
                res.json({
                    token: token
                });
            })
            .fail(function(error) {
                next(error);
            });
    },
    checkAuth: function(req, res, next) {
        var token = req.headers['x-access-token'];
        if (!token) {
            next(new Error('no token'));
        } else {
            var user = jwt.decode(token, 'secret');
            var findUser = Q.nbind(User.findOne, User);
            findUser({
                    username: user.username
                })
                .then(function(foundUser) {
                    if (foundUser) {
                        res.status(200).send();
                    } else {
                        res.status(401).send();
                    }
                })
                .fail(function(error) {
                    next(error);
                });
        }
    },
};
