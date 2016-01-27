var request = require('supertest');
var express = require('express');
var app = require('../server/server.js').server;



//   describe('GET /user', function(){
//   it('respond with json', function(done){
//     request(app)
//       .get('/api/items/')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200, done);
//   })
// })
describe('express server', function() {
    it('should return 200 for /', function(done) {
        request(app)
            .get('/')
            .expect(200, done());
    });
});

describe('express server', function() {
    it("should return 404 for route that doesn't exist", function(done) {
        request(app)
            .get('/abc')
            .expect(404, done());
    });
});

describe('post request to /api/items/', function() {
    it('should create item and return item object', function(done) {
        request(app)
            .post('/api/items/')
            .expect(200)
            .expect('Content-Type', /json/, done());
    });

    var item = {
        "productName": "Big Car",
        "createdBy": "John Smith",
        "category": "Automobiles",
        "quantity": 200,
        "price": 1500,
        "minPrice": 100,
        "auctionEnds": "later",
        "description": "Its the best product ever"
    };

    it('object should contain properties', function(done) {
        request(app)
            .post('/api/items/')
            .send(item)
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('productName');
                res.body.should.have.property('createdBy');
                res.body.should.have.property('category');
                res.body.should.have.property('quantity');
                res.body.should.have.property('price');
                res.body.should.have.property('minPrice');
                res.body.should.have.property('auctionEnds');
                res.body.should.have.property('description');
                res.body.should.have.property('_id');
                res.body.should.have.property('active');
                item_id = res.body._id;
            });
        done();
    });
});
describe('post request to /signin', function() {
    it('should sign in a user and return user object', function(done) {
        request(app)
            .post('/api/users/signin')
            .expect(200)
            .expect('Content-Type', /json/, done());
    });

    var user = {
        "username": "test@test.com",
        "password": "test"

    };


    it('object should contain properties', function(done) {
        request(app)
            .post('/api/users/signin')
            .send(user)
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('username');
                res.body.should.have.property('token');

            });
        done();
    });
});

describe('post request to /signup', function() {
    it('checks if username is already in database ', function(done) {
        request(app)
            .post('/api/users/signin')
            .expect(403)
            .expect('Content-Type', /json/, done());
    });

    var user = {
        "username": "test@test.com",
        "password": "test"

    };


    it('object should contain properties', function(done) {
        request(app)
            .post('/api/users/signin')
            .send(user)
            .expect(403)
            .end(function(err, res) {
                res.body.should.have.property('error');
                res.body.should.have.property('token');

            });
        done();
    });
});

//   describe('GET /api/items/', function(){
//   it('should be an array of items with correct proprties', function(done){
//     request(app)
//       .get('/api/items/')
//       .set('Accept', 'application/json')
//       .expect(function(res) {
//         // res.body._id = 'some fixed id';
//         // res.body[0]._id = 1051645;
//       })
//       .expect(200, [{
//         _id: '1051645'
//         // name: 'TOBI'
//       }], done);
//   });
// });
