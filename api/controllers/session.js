'use strict';

const arrayhandler = require('../helpers/arrayhandler');

module.exports = {
    getSession:getSession,
    getSessions:getSessions
};

// get a single session as an ordered list of the received positions by timestamp
function getSession(req, res) {

    // get the session id
    var id = req.swagger.params.sessionId.value;

    // get global variable with data
    var data = req.app.get('data');

    // check that session exists
    // otherwise throw a 404
    if (!data.find(x => x.session_id === id)) {

        // session not found
        res.status(404).json('session not found');
        return;
    }

    // filters the array by "session_id"
    // and sorts it by timestamp: from the most recent to the oldest
    var arr = arrayhandler._sortArrayByTimestamp(req, "session_id", id);

    // return array
    res.json(arr);
}

// get all sessions of a vehicle in correct ordering
function getSessions(req, res) {

    // get the vehicle id
    var id = req.swagger.params.vehicleId.value;

    // get global variable with data
    var data = req.app.get('data');

    // check that vehicle exists
    // otherwise throw a 404
    if (!data.find(x => x.vehicle_id === id)) {

        // vehicle not found
        res.status(404).json('vehicle not found');
        return;
    }

    // filters the array by "vehicle_id"
    // and sorts it by timestamp: from the most recent to the oldest
    var arr = arrayhandler._sortArrayByTimestamp(req, "vehicle_id", id);

    // return array
    res.json(arr);
}
