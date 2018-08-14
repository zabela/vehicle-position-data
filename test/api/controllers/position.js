var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('position', function() {

    describe('POST /position', function() {

      it('respond with 201 created', function(done) {

        let data = {
            "timestamp": 1519990621975,
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

      it('respond with json vehicle not found', function(done) {

        request(server)
          .get('/position/WLQBNAL7EM14E3H')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404) //expecting HTTP status code
          .expect('"vehicle not found"') // expecting content value
          .end((err) => {
              if (err) return done(err);
              done();
          });
      });

    });

  });

});

