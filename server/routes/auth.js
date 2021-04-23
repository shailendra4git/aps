const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');

/* Login */
router.post('/', (req, res, next) => {
    let authorization = 'Basic ' + new Buffer(req.body.username+":"+req.body.password).toString('base64');
    let options = { 
        method: 'GET',
        url: config.api_endpoint,
        headers: {
            'Authorization': authorization
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
            if(response.statusCode === 200){
                const cookieParams = {
                    httpOnly: true
                };
        
                res.cookie('auth', authorization, cookieParams);
        
                resObj = {
                    statuscode: response.statusCode,
                    message: response.body
                }
                res.send(resObj);
            } else {          
                resObj = {
                    statuscode: response.statusCode,
                    message: response.body
                }
                res.send(resObj);
            }
        }
    });
});

module.exports = router;