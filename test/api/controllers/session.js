var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('session', function() {

    beforeEach(function() {

      var data = [{
        "timestamp": 1519990621975,
        "vehicle_id": "WLQBNAL7EM14E3N",
        "session_id": "6bc6a660dfef4010ded079865f358e30",
        "lat": 48.1167,
        "lon": 11.54,
        "heading": 252
      },
      {
        "timestamp": 1519990625885,
        "vehicle_id": "WLQBNAL7EM14E3N",
        "session_id": "ef0f515c3b19e177fb67a5b51b736d71",
        "lat": 48.1167,
        "lon": 11.5397,
        "heading": 291
      },
      {
        "timestamp": 1520106409654,
        "vehicle_id": "IRVQ5IQLEQKY7LR",
        "session_id": "ef0f515c3b19e177fb67a5b51b736d71",
        "lat": 48.1488,
        "lon": 11.5515,
        "heading": 107
      }];

      server.set('data', data); 
    });

    describe('GET /session/:sessionId', function() {

      it('respond with json containing a single session', function(done) {

        request(server)
          .get('/session/ef0f515c3b19e177fb67a5b51b736d71?api_key=1234')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err,res){

            // there should be two elements
            // with session id ef0f515c3b19e177fb67a5b51b736d71
            // according to data object above
            res.body.length.should.equal(2);
            done();
          });
      });

      it('respond with json session not found', function(done) {

        request(server)
          .get('/session/6bc6a660dfef4010ded079865f358e88?api_key=1234')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404) 
          .expect('"Session not found!"') 
          .end((err) => {
              if (err) return done(err);
              done();
          });
      });

    });

    describe('GET /sessions/:vehicleId', function() {

      it('respond with json containing a list of all sessions', function(done) {

        request(server)
          .get('/sessions/WLQBNAL7EM14E3N?api_key=1234')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err,res){

            // there should be two elements
            // with vehicle id WLQBNAL7EM14E3N
            // according to data object above
            res.body.length.should.equal(2);
            done();
          });
      });

      it('respond with json vehicle not found', function(done) {

        request(server)
          .get('/sessions/WLQBNAL7EM14E3H?api_key=1234')
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

