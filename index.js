'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var express = require('express');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = 7777;
var swaggerUiDist = require('swagger-ui-dist');

// Create an express application
var app = express();

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, './swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.get('/docs', function(req, res) {
    var html = fs.readFileSync(path.join(__dirname, 'custom-swagger-ui.html'), 'utf8');
    res.send(html);
  });

  // Serve Swagger UI assets
  app.use('/swagger-ui', express.static(swaggerUiDist.getAbsoluteFSPath()));

  app.get('/swagger.json', function(req, res) {
    res.sendFile(path.join(__dirname, 'swagger.json'));
  });
  
  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});
