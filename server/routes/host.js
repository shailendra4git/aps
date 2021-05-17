const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');

/* Get Region */
router.get('/region', (req, res, next) => {
    let options = { 
        method: 'GET',
        url: config.api_endpoint + '/region',
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

/* Get Location */
router.get('/:regionKey/location', (req, res, next) => {
    let options = { 
        method: 'GET',
        url: config.api_endpoint + '/region/' + req.params.regionKey + '/location',
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

/* Get Search */
router.get('/search/:query', (req, res, next) => {

    console.log(req.params.query);
    
    res.send([
        {name: 'A', value: 'a'},
        {name: 'B', value: 'b'},
        {name: 'C', value: 'c'},
        {name: 'D', value: 'd'},
        {name: 'E', value: 'e'},
        {name: 'F', value: 'f'}
    ]);
    
});

module.exports = router;
