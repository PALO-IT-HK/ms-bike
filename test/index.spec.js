var app = require('../server/routes');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('Index / ', function() {
  it('should return OK', function(done) {
    request(app)
      .get('/')
      .end(function(err, res) {
        if (err) {
          console.log(err);
        }
        console.log('Success');
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.equal({ status: 'OK' });
        done();
      });
  });
});
