'use strict';

var util = require('util');

module.exports = {
    // get a single session as an ordered list of the received positions by timestamp
    getSession:getSession,
    // get all sessions of a vehicle in correct ordering
    getSessions:getSessions
};

function getSession(req, res) {

    // get the session id
    var id = req.swagger.params.sessionId.value;

    // filter the db entries based on the session id
    var array = data.filter(x => x.session_id === id);

    // sort by the array from the most recent to the oldest
    array.sort(function(a, b) {
        a = new Date(a.timestamp);
        b = new Date(b.timestamp);
        return a>b ? -1 : a<b ? 1 : 0;
    });

    // return array
    res.json(array);
}

function getSessions(req, res) {

    // get the vehicle id
    var id = req.swagger.params.vehicleId.value;

    // filter the db entries based on the vehicle id
    var array = data.filter(x => x.vehicle_id === id);

    // sort by the array from the most recent to the oldest
    array.sort(function(a, b) {
        a = new Date(a.timestamp);
        b = new Date(b.timestamp);
        return a>b ? -1 : a<b ? 1 : 0;
    });

    // return array
    res.json(array);
}

const data = [
    {
      "timestamp": 1519990621975, // 02/03/2018, 12:37:01
      "vehicle_id": "WLQBNAL7EM14E3N",
      "session_id": "6bc6a660dfef4010ded079865f358e30",
      "lat": 48.1167,
      "lon": 11.54,
      "heading": 252
    },
    {
      "timestamp": 1519990625885, // 02/03/2018, 12:37:05
      "vehicle_id": "WLQBNAL7EM14E3N",
      "session_id": "6bc6a660dfef4010ded079865f358e30",
      "lat": 48.1167,
      "lon": 11.5397,
      "heading": 291
    },
    {
      "timestamp": 1519990629975, // 02/03/2018, 12:37:09
      "vehicle_id": "WLQBNAL7EM14E3N",
      "session_id": "6bc6a660dfef4010ded079865f358e30",
      "lat": 48.1168,
      "lon": 11.5394,
      "heading": 291
    },
    {
      "timestamp": 1519990870975, // 02/03/2018, 12:41:10
      "vehicle_id": "WLQBNAL7EM14E3N",
      "session_id": "6bc6a660dfef4010ded079865f358e30",
      "lat": 48.1167,
      "lon": 11.54,
      "heading": 222
    },
    {
      "timestamp": 1519990873975, // 02/03/2018, 12:41:13
      "vehicle_id": "WLQBNAL7EM14E3N",
      "session_id": "6bc6a660dfef4010ded079865f358e30",
      "lat": 48.1167,
      "lon": 11.5399,
      "heading": 292
    },
    {
      "timestamp": 1519991001975, // 02/03/2018, 12:43:21
      "vehicle_id": "WLQBNAL7EM14E3N",
      "session_id": "6bc6a660dfef4010ded079865f358e30",
      "lat": 48.1183,
      "lon": 11.5398,
      "heading": 90
    },
    {
      "timestamp": 1519991006975, // 02/03/2018, 12:43:26
      "vehicle_id": "WLQBNAL7EM14E3N",
      "session_id": "6bc6a660dfef4010ded079865f358e30",
      "lat": 48.1183,
      "lon": 11.5404,
      "heading": 90
    },
    {
      "timestamp": 1520106405654, // 03/03/2018, 20:46:45
      "vehicle_id": "IRVQ5IQLEQKY7LR",
      "session_id": "ef0f515c3b19e177fb67a5b51b736d71",
      "lat": 48.149,
      "lon": 11.5508,
      "heading": 106
    }];

