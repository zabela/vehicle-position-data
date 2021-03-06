'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();

// these variables represent what needs
// to be stored in a database solution in the future
// (i.e. the data and the API keys - here only one used for sake of simplicity)
var data = [];
var apiKeys = ['1234', '5678', '9101'];

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

// important note: API keys without HTTPS are not secure at all 
// (https://swagger.io/docs/specification/authentication/api-keys/).
config.swaggerSecurityHandlers = {
  api_key: function (req, authOrSecDef, scopesOrApiKey, cb) {

    if (!scopesOrApiKey) {
      // no authentication provided
      var err = new Error('Please provide authentication!');
      err.statusCode=401;
      cb(err);

    } else if (apiKeys.indexOf(scopesOrApiKey) != -1) {
      // all good
      cb();
    } else {
      // wrong authentication provided
      var err = new Error('Please provide valid authentication!');
      err.statusCode=401;
      cb(err);
    }
  }
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // set global variable with position data
  app.set('data', data);

  // to visualize the API
  console.log('try this:\nhttp://127.0.0.1:' + port + '/api-docs/#/ (in the browser)');

});



