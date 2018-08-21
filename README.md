# vehicle-position-data
A REST API that can receive, process and store vehicle movement information.

## Description and considerations

This is a web service, written in JavaScript, that can receive vehicle position data. This REST interface is designed for communication with the vehicles and communicates via HTTP. 
Position data is defined by the following attributes:

* timestamp: long (represented in [Unix Epoch](https://www.epochconverter.com/)))
* session identifier: string
* vehicle identifier: string
* latitude: double
* longitude: double
* heading: integer

This REST web-service is capable of receiving one position per request. The position data is uploaded for a certain vehicle with identifier vehicle_id. Concurrent uploads by multiple vehicles are supported. 

Persistent storage of these positions is not addressed. Instead, for the sake of simplicity, a global variable is used as internal storage solution. As future extension, one could integrate it with a time-series database database solution, like [InfluxDB](https://en.wikipedia.org/wiki/InfluxDB), depending on the end goal. 

The web-service also provides APIs to:
* get all sessions of a vehicle by timestamps (arranged from the most recent to the oldest)
* get a single session as an ordered list of the received positions by timestamp (arranged from the most recent to the oldest)
* get the last position of a certain vehicle

A session is defined by an array of position data objects.

For simplicity, these endpoints are protected by a basic authentication method: application programming interface key ([API key](https://en.wikipedia.org/wiki/Application_programming_interface_key)). For ease, a table (hardcoded array) is provided, where vehicles need their own API key instead of all sharing the same one. That is definitely not advised for real productive solutions. Also bear in mind that API keys without HTTPS are not secure at all (["API key-based authentication is only considered secure if used together with other security mechanisms such as HTTPS/SSL"](https://swagger.io/docs/specification/authentication/api-keys/)). 
Thus, another important improvement would be opting for an oauth2 solution, in which an authorization server would come into play. Due to the authentication method chosen and also for clarity, the vehicle identifier is provided in the request body. 

Documentation about the URLs to retrieve the data is provided via [Swagger UI](https://swagger.io/). This application can be easily deployable and runnable with the following instructions.

## Instructions

1. Install all dependencies with:
```
npm install
```
2. Start node app:
```
npm start
```
* Documentation can be seen under [this URL](http://127.0.0.1:10010/api-docs/#/) (**note:** port `10010` might differ).
* Authenticatication keys for 3 vehicles are provided: `1234`, `5678` and `9101`.

3. Inject data by running the following shell script:
```
cd data
sh addData.sh
```
4. Test node app:
```
npm test
```
