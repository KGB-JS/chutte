process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../server/server.js');
// var server = require('../server/app');
var Blob = require("../server/models/Blob");
var User = require('../server/user/userModel.js');
var Item = require('../server/item/itemModel.js');
var db = require('../server/db.js');

var should = chai.should();
chai.use(chaiHttp);


describe('userTest', function() {

  User.collection.drop();

  beforeEach(function(done){
    var newUser = new User({
      username: 'tzar@kgb.com',
      password: 'KGB',
      firstname: 'Nikolai',
      lastName: "Romanov",
      phone: 74956970349,
      streetAddress: '1 KGB circle',
      country: 'Russia',
      zip: "66666",
      stateRegion: "Nan",
      city: "Moscow"
    });
    newUser.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    User.collection.drop();
    done();
  });

  it('should list Items Users on api/items/ GET', function(done) {
    chai.request(server)
      .get('api/items/')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('productName');
        res.body[0].should.have.property('category');
        res.body[0].should.have.property('quanity');
        res.body[0].should.have.property('price');
        res.body[0].should.have.property('auctionEnds');
        res.body[0].should.have.property('priceReduces');
        res.body[0].should.have.property('description');
        done();
      });
  });

  it('should list a SINGLE User on /User/<id> GET', function(done) {
      var newUser = new User({
        name: 'Super',
        lastName: 'man'
      });
      newUser.save(function(err, data) {
        chai.request(server)
          .get('/User/'+data.id)
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('name');
            res.body.should.have.property('lastName');
            res.body.name.should.equal('Super');
            res.body.lastName.should.equal('man');
            res.body._id.should.equal(data.id);
            done();
          });
      });
  });

  it('should add a SINGLE User on /Users POST', function(done) {
    chai.request(server)
      .post('/Users')
      .send({'name': 'Java', 'lastName': 'Script'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('SUCCESS');
        res.body.SUCCESS.should.be.a('object');
        res.body.SUCCESS.should.have.property('name');
        res.body.SUCCESS.should.have.property('lastName');
        res.body.SUCCESS.should.have.property('_id');
        res.body.SUCCESS.name.should.equal('Java');
        res.body.SUCCESS.lastName.should.equal('Script');
        done();
      });
  });

  it('should update a SINGLE User on /User/<id> PUT', function(done) {
    chai.request(server)
      .get('/Users')
      .end(function(err, res){
        chai.request(server)
          .put('/User/'+res.body[0]._id)
          .send({'name': 'Spider'})
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('UPDATED');
            response.body.UPDATED.should.be.a('object');
            response.body.UPDATED.should.have.property('name');
            response.body.UPDATED.should.have.property('_id');
            response.body.UPDATED.name.should.equal('Spider');
            done();
        });
      });
  });

  it('should delete a SINGLE User on /User/<id> DELETE', function(done) {
    chai.request(server)
      .get('/Users')
      .end(function(err, res){
        chai.request(server)
          .delete('/User/'+res.body[0]._id)
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('REMOVED');
            response.body.REMOVED.should.be.a('object');
            response.body.REMOVED.should.have.property('name');
            response.body.REMOVED.should.have.property('_id');
            response.body.REMOVED.name.should.equal('Bat');
            done();
        });
      });
  });

});