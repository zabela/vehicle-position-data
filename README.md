# vehicle-position-data
A REST API that can receive, process and store vehicle movement information.

## Description and considerations

This is a web service, written in JavaScript, that can receive vehicle position data. This REST interface is designed for communication with the vehicles and communicates via HTTP. 
Position data is defined by the following attributes:

* timestamp: long (represented in unix epoch: https://www.epochconverter.com/)
* session identifier: string
* vehicle identifier: string
* latitude: double
* longitude: double
* heading: integer

This REST web-service is capable of receiving one position per request. The position data is uploaded for a certain vehicle with identifier vehicle_id. Concurrent uploads by multiple vehicles are supported. 

Persistent storage of these positions is not addressed. Instead, for the sake of simplicity, a global variable is used as internal storage solution. As future extension, one could integrate it with a sql database solution, like postgres. 

The web-service also provides APIs to:
* get all sessions of a vehicle by timestamps (arranged from the most recent to the oldest)
* get a single session as an ordered list of the received positions by timestamp (arranged from the most recent to the oldest)
* get the last position of a certain vehicle

A session is defined by an array of position data objects.

For simplicity, these endpoints are protected by a basic authentication method: application programming interface key (API key). Another possible improvement would be using an oauth2 solution, in which an authorization server would come into play. Due to the authentication method chosen and also for clarity, the vehicle identifier is provided in the request body. 

Documentation about the URLs to retrieve the data is provided via Swagger UI (https://swagger.io/). This application can be easily deployable and runnable with the following instructions.

## Instructions

* install all dependencies with
```
npm install
```
* start node app
```
swagger project start
```
* test node app
```
swagger project test
```
* inject data in form of a shell script using CURL
```
cd data
sh addData.sh
```