const express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let Launch = require('../models/launchSchema.js');
let Agency = require('../models/agencySchema.js');
let Rocket = require('../models/rocketSchema.js');
let Location = require('../models/locationSchema.js');


cron.schedule('22 * 10 * * 1', () =>{
    console.log('running launches cron job');
    for (let i = 2200; i<2600; i++) {
        request(`https://launchlibrary.net/1.4/launch/?id=${i}`, (err, res) =>{
            // console.log('err: ', err, 'res: ', res);
            if(!err && res.statusCode === 200){
                let responseObject = JSON.parse(res.body);
                launchesArray = responseObject.launches;
                // console.log('suc');
                // console.log(launchesArray.length);
                // console.log(launchesArray);
                launchesArray.forEach(launch => {
                    Launch.findOne({id: launch.id, changed: launch.changed}, (error, document) =>{
                        if(error){
                            console.log(error);
                        }
                        if(document){
                            // console.log("launches already in database");
                        }
                        else{
                            console.log("new document", launch.id);
                            Location.findOne({ id: launch.location.id }, (err, foundLocation) => {
                                // console.log('found location');
                            })
                            .then((foundLocation) => {
                                launch.location = foundLocation;
                                Agency.findOne({ id: launch.lsp.id }, (err, foundAgency) => {
                                    // console.log('found agency');
                                })
                                .then((foundAgency) => {
                                    launch.lsp = foundAgency;
                                    Rocket.findOne({ id: launch.rocket.id }, (err, foundRocket) => {
                                        // console.log('found rocket');
                                    })
                                    .then((foundRocket) => {
                                        launch.rocket = foundRocket;
                                        Launch.create(launch, (err) => {
                                            if(err) {
                                                console.log(err);
                                            }
                                            else {
                                                console.log(`Launch ${launch.id} saved to database`);
                                            }
                                        });
                                    })
                                })
                            })
                        }
                    });
                })
            }
        });
    }
});

// Query database to get all US astronauts then send results to frontend
// router.get('/', (req, res) =>{
//     Launch.find({}, (err, response) =>{
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