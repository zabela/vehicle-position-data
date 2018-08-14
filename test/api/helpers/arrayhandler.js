var should = require('should');
var request = require('supertest');
var app = require('../../../app');

describe('helpers', function() {

  describe('arrayhandler', function() {

    var arrayhandler = require('../../../api/helpers/arrayhandler');
    var data; 
    var req = {};

    beforeEach(function() {
      
      data = [{
        "timestamp": 1519990621975,
        "vehicle_id": "WLQBNAL7EM14E3N", // GMT: Friday, March 2, 2018 11:37:01.975 AM
        "session_id": "6bc6a660dfef4010ded079865f358e30",
        "lat": 48.1167,
        "lon": 11.54,
        "heading": 252
      },
      {
        "timestamp": 1519990625885, // Friday, March 2, 2018 11:37:05.885 AM
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
      app.set('data', data); 
      req.app = app; 

    });

    it('should filter the array and sort it by timestamp: from the most recent to the oldest', function(done) {

      var array = arrayhandler._sortArrayByTimestamp(req, 'vehicle_id', 'WLQBNAL7EM14E3N');
      
      array.length.should.equal(2);
      array[0].timestamp.should.equal(1519990625885);
      done();
        
    });

  });

});