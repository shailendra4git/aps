const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');

/* Get Host List */
router.get('/list', (req, res, next) => {
    let options = { 
        method: 'GET',
        url: config.api_endpoint + '/host',
        headers: {
            'Authorization': req.cookies.auth,
            'Content-Type': 'application/json'
        },
        timeout: 30000
    };
    request(options, (error, response, body) => {
        let resObj = {};
        if (error){
            resObj = {
                statuscode: 555
            }
            res.send(resObj);
        } else {
            resObj = {
                statuscode: response.statusCode,
                body: JSON.parse(response.body)
            }
            res.send(resObj);
        }
    });
});

module.exports = router;
