'use strict';

let config = {};

config.app = {
    port: process.env.PORT || 3000,
    session_secret: process.env.SESSION_SECRET || 'aps-edge'
}

config.api_endpoint = process.env.API_ENDPOINT || 'http://35.176.137.123:8080';

module.exports = config;
