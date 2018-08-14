'use strict';

var app = require('../../app');

module.exports = {
    _sortArrayByTimestamp:_sortArrayByTimestamp
};

// filters the array by the filter given
// and sorts it by timestamp: from the most recent to the oldest
function _sortArrayByTimestamp(req, filterKey, filterValue) {

    // get global variable with data
    var data = req.app.get('data');

    // filter the db entries based on the filterKey
    var array = data.filter(x => x[filterKey] === filterValue);

    // sort by the array from the most recent to the oldest
    array.sort(function(a, b) {
        a = new Date(a.timestamp);
        b = new Date(b.timestamp);
        return a>b ? -1 : a<b ? 1 : 0;
    });

    return array;
}
