var express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let Agency = require('../models/agencySchema');

cron.schedule('50 * 8 * * 0', () =>{
    console.log('running agencies cron job');
    request('https://launchlibrary.net/1.4/agency?limit=500', (err, res) => { // api url is different, no '/' between 'agency' and '?limit'
        if(!err && res.statusCode === 200){
            let responseObject = JSON.parse(res.body);
            agenciesArray = responseObject.agencies;
            agenciesArray.forEach(agency => {
                Agency.findOne({id: agency.id, changed: agency.changed}, (error, document) =>{
                    if(error){
                        console.log(error);
                    }
                    if(document){
                        console.log("agency already in database");
                    }
                    else{
                        console.log("new document");
                        Agency.create(agency, (err, result) =>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("agency saved to database");
                            }
                        });
                    }
                });
            })
        }
    });
});


// Query database to get all agencies then send results to frontend
router.get('/', (req, res) =>{
    Agency.find({}, (err, response) =>{
        if(err){
            console.log(err);
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.send(response);
        }
    });
});

// Take agency name and pass into Wikipedia api request
router.get('/:agencyId', (req, res) =>{
    let url = "http://en.wikipedia.org/api/rest_v1/page/summary/" + req.params.agencyId;
    request(url, (req, response) =>{
        let results = JSON.parse(response.body);
        res.send(results);
    });
});




module.exports = router;
