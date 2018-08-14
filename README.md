# vehicle-position-data
A REST API that can receive, process and store vehicle movement information.

## Description

This is a web service that can receive vehicle position data. Data is defined by the following attributes:

* timestamp: long
* latitude: double
* longitude: double
* heading: integer
* session: string


## Instructions

* install all dependencies with
```
npm install
```
* start swagger editor
```
swagger project edit
```
* start node app
```
swagger project start
```

## Assumptions

* A position object is defined by:
    * timestamp: long
    * latitude: double
    * longitude: double
    * heading: integer
    * session: string
* A session object is defined by an array of positions
* A timestamp is an epoch timestamp
* Correct ordering or ordered by timestamp means that the timestamps are arranged from the most recent to the oldest