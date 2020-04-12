const express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let Agency = require('../models/agencySchema.js');

cron.schedule('10 * * * * Monday', () =>{
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

// Query database to get all  then send results to frontend
// router.get('/', (req, res) =>{
//     Agency.find({}, (err, response) =>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.setHeader('Content-Type', 'application/json');
//             res.send(response);
//         }
//     });
// });

module.exports = router;