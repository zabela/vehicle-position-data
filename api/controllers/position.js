'use strict';

var util = require('util');

module.exports = {
    // get the last position of a certain vehicle
    getLastPosition:getLastPosition,
    // add a new vehicle position data
    addPosition:addPosition
};
  
function getLastPosition(req, res) {

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

    // return the first position (i.e. most recent)
    res.json(array[0]);
}

function addPosition(req, res) {

    // get the position
    var position = req.swagger.params.position.value;

    // get and add the vehicle id to the position

    // add to the db
    data.push(position);
    
    // just to check if it is there
    // to clearly see it use https://jsoneditoronline.org/
    //console.log(JSON.stringify(data));

    // return nice message
    res.json('Successfully added!');
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

