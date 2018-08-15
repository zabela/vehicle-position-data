var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('position', function() {

    var data = [];
    const validPosition = {
      "timestamp": 1519990621965,
      "vehicle_id": "WLQBNAL7EM14E3N",
      "latitude": 48.1167,
      "longitude": 11.54,
      "heading": 252,
      "session_id": "6bc6a660dfef4010ded079865f358e31"
    };
    const invalidPosition = {
      "timestamp": 1519990621965,
      "latitude": 48.1167,
      "longitude": 11.54,
      "heading": 252,
      "session_id": "6bc6a660dfef4010ded079865f358e31"
    };

    beforeEach(function() {

      data = [{
        "timestamp": 1519990621975,
        "vehicle_id": "WLQBNAL7EM14E3N",
        "session_id": "6bc6a660dfef4010ded079865f358e30",
        "lat": 48.1169,
        "lon": 11.55,
        "heading": 253
      }];

      server.set('data', data); 
    });

    describe('POST /position', function() {

      it('respond with 401 unauthorized', function(done) {

        request(server)
          .post('/position')
          .send(validPosition)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(401, done);
      });

      it('respond with 201 created', function(done) {

        request(server)
          .post('/position?api_key=1234')
          .send(validPosition)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201, done);
      });

      it('respond with 400 bad request', function(done) {

        request(server)
          .post('/position?api_key=1234')
          .send(invalidPosition)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400, done);
      });

    });

    // testing get a position endpoint by giving a non-existing vehicle id
    describe('GET /position/:vehicleId', function() {

      it('respond with json containing a single position', function(done) {

        request(server)
          .get('/position/WLQBNAL7EM14E3N?api_key=1234')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err,res){

            // timestamp should be the same as in data above
            res.body.session_id.should.equal('6bc6a660dfef4010ded079865f358e30');
            done();
          });
      });

      it('respond with json vehicle not found', function(done) {

        request(server)
          .get('/position/WLQBNAL7EM14E3H?api_key=1234')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404) 
          .expect('"Vehicle not found!"') 
          .end((err) => {
              if (err) return done(err);
              done();
          });
      });

    });

  });

});

