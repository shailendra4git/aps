'use strict';

let config = {};

config.app = {
    port: process.env.PORT || 4000,
    session_secret: process.env.SESSION_SECRET || 'aps-edge'
}

config.api_endpoint = process.env.API_ENDPOINT || 'http://35.178.0.199:8080';

module.exports = config;
