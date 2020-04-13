const express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let Launch = require('../models/launchSchema.js');
let Agency = require('../models/agencySchema.js');
let Rocket = require('../models/rocketSchema.js');


cron.schedule('20 50 * * * 0', () =>{
    console.log('running launches cron job');
    request('https://launchlibrary.net/1.4/launch/?limit=5000', (err, res) =>{
        // console.log('err: ', err, 'res: ', res);
        if(!err && res.statusCode === 200){
            let responseObject = JSON.parse(res.body);
            launchesArray = responseObject.launches;
            // console.log('suc');
            // console.log(launchesArray.length);
            // console.log(launchesArray);
            launchesArray.forEach(launch => {
                /* Add referenced pad documents first */
                pads = launch.location.pads;
                pads.forEach( pad => {
                    Agency.findOne({id: launch.id, changed: launch.changed}, (error, document) =>{
                        if(error){
                            console.log(error);
                        }
                        if(document){
                            console.log("launches already in database");
                        }
                        else{
                            console.log("new document");
                            Launch.create(launch, (err, result) =>{
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log("launches saved to database");
                                }
                            });
                        }
                    });
                });

                /* Add referenced agency documents first */
                Rocket.findOne({id: launch.id, changed: launch.changed}, (error, document) =>{
                    if(error){
                        console.log(error);
                    }
                    if(document){
                        console.log("launches already in database");
                    }
                    else{
                        console.log("new document");
                        Launch.create(launch, (err, result) =>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("launches saved to database");
                            }
                        });
                    }
                });

                Launch.findOne({id: launch.id, changed: launch.changed}, (error, document) =>{
                    if(error){
                        console.log(error);
                    }
                    if(document){
                        console.log("launches already in database");
                    }
                    else{
                        console.log("new document");
                        Launch.create(launch, (err, result) =>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("launches saved to database");
                            }
                        });
                    }
                });
            })
        }
    });
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