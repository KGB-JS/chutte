var expect = require('chai').expect;
var request = require('request');
var app = require('../server/server.js').server;
//var db = require('../server/data.js');
//uncomment for POST
var db = require('../server/db.js');
var User = require('../server/user/userModel.js');

describe('', function() {
  var req = request.defaults();
  var server;
  before(function() {
    // server = app.listen(3000);
  });

  describe('Server route: /api/items', function() {
    it('Responds with all items', function() {
      var options = {
        'method': 'GET',
        'uri': 'http://127.0.0.1:3000/api/items'
      };

      request(options, function(error, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(res.body.length).to.equal(db.items.length);
        done();
      });
    });

    it('Can post new items', function() {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:3000/api/items',
        'json': {
            "productName": "The best product",
            "createdBy": "Superman",
            "category": "toy",
            "quantity": 700,
            "price": 70,
            "auctionEnds": "today",
            "description": "this product is amazing"
        }
      };

      request(options, function(error, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('Server route: /api/user/signup', function() {
    var options = {
      'method': 'POST',
      'uri': 'http://127.0.0.1:3000/api/user/signup',
      'json': {
        'username': 'test@test.com',
        'password': 'password'
      }
    };

    it('Should create a new user', function() {
      var foundUser;
      req(options, function(error, res, body) {
        console.log(res.statusCode);
        expect(res.statusCode).to.equal(200);
        expect(body.token).to.not.be.null;
        done();
      });
      var userQuery = User.where({username: 'test@test.com'});
      userQuery.findOne(function(err, dbUser) {
        foundUser = dbUser;
      });
      expect(foundUser).to.not.be.null;
    });

    it('Should not create a new user with same username', function() {
      req(options, function(error, res, body) {
        expect(res.statusCode).to.equal(403);
        done();
      });
    });
  });

  describe('Server route: /api/user/signin', function() {
    it('Should signin an existing user', function() {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:3000/api/user/signin',
        'json': {
          'username': 'test@test.com',
          'password': 'password'
        }
      };

      req(options, function(error, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(body.token).to.not.be.null;
        done();
      });
    });

    it('Should not signin a user with incorrect password', function() {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:3000/api/user/signin',
        'json': {
          'username': 'test@test.com',
          'password': 'pass'
        }
      };

      req(options, function(error, res, body) {
        expect(res.statusCode).to.equal(401);
        done();
      });
    });
  });
    describe('Server route: /api/user/signin', function() {
    it('Should signin an existing user', function() {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:3000/api/user/signin',
        'json': {
          'username': 'test@test.com',
          'password': 'password'
        }
      };

      req(options, function(error, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(body.token).to.not.be.null;
        done();
      });
    });

    it('Should not signin a user with incorrect password', function() {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:3000/api/user/signin',
        'json': {
          'username': 'test@test.com',
          'password': 'pass'
        }
      };

      req(options, function(error, res, body) {
        expect(res.statusCode).to.equal(401);
        done();
      });
    });
  });
  after(function() {
    server.close();
  });
});
