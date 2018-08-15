'use strict';

const arrayhandler = require('../helpers/arrayhandler'); 

module.exports = {
    getLastPosition:getLastPosition,
    addPosition:addPosition
};
  
// get the last position of a certain vehicle
function getLastPosition(req, res) {

    // get the vehicle id
    var id = req.swagger.params.vehicleId.value;

    // get global variable with data
    var data = req.app.get('data');

    // check that vehicle exists
    // otherwise throw a 404
    if (!data.find(x => x.vehicle_id === id)) {

        // vehicle not found
        res.status(404).json('Vehicle not found!');
        return;
    } 

    // filters the array by "vehicle_id"
    // and sorts it by timestamp: from the most recent to the oldest
    var arr = arrayhandler._sortArrayByTimestamp(req, "vehicle_id", id);

    // return the first position (i.e. most recent)
    res.json(arr[0]);
}

// add a new vehicle position data
function addPosition(req, res) {

    // get the position
    var position = req.swagger.params.position.value;

    if (!position.timestamp || !position.vehicle_id || !position.lat || 
        !position.lon || !position.heading || !position.session_id) {
        res.status(400).json('Please provide valid a position!');
        return;
    }

    // get the data global variable and
    // add to the storage
    req.app.get('data').push(position);
    
    // just to check if it is there
    // to clearly see it use https://jsoneditoronline.org/
    //console.log(JSON.stringify(req.app.get('data')));

    // return nice message
    res.status(201).json('Successfully added!');
}

