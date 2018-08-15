var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('position', function() {

    beforeEach(function() {

      var data = [{
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

      it('respond with 201 created', function(done) {

        let data = {
            "timestamp": 1519990621965,
            "latitude": 48.1167,
            "longitude": 11.54,
            "heading": 252,
            "session_id": "6bc6a660dfef4010ded079865f358e31"
          }

        request(server)
          .post('/position')
          .send(data)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err) => {
              if (err) return done(err);
              done();
          });
      });

    });

    // testing get a position endpoint by giving a non-existing vehicle id
    describe('GET /position/:vehicleId', function() {

      it('respond with json containing a single position', function(done) {

        request(server)
          .get('/position/WLQBNAL7EM14E3N')
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
          .get('/position/WLQBNAL7EM14E3H')
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

