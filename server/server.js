'use strict';

const app = require('./app');
const config = require('./config');

const port = config.app.port;

console.log('App is listening on port ' + port);

console.log('SSP API Endpoint ' + config.api_endpoint);

app.listen(port);