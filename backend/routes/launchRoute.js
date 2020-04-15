const express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let Launch = require('../models/launchSchema.js');
let Agency = require('../models/agencySchema.js');
let Rocket = require('../models/rocketSchema.js');
let Location = require('../models/locationSchema.js');

cron.schedule('22 * 10 * * 1', () =>{
// cron.schedule('1 * * * * *', () =>{
    console.log('running launches cron job');
    for (let i = 0; i<2600; i++) {
        request('https://launchlibrary.net/1.4/launch/' + i, (err, res) =>{
            if(!err && res.statusCode === 200){
                let responseObject = JSON.parse(res.body);
                launchesArray = responseObject.launches;
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

// Query database to get all launches then send results to frontend
router.get('/', (req, res) =>{
    Launch.find({}, (err, response) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send(response);
        }
    });
});

cron.schedule('2 * * * * *', () =>{
    console.log("updating locations");
    // updateLocations();
    updateRockets();
});


// Mongoose sends a `updateOne({ _id: doc._id }, { $set: { name: 'foo' } })`
// to MongoDB.


updateLocations = () =>{
    Launch.find({}, (err, res) =>{
        if(err){
            console.log("Could not find launches");
        }
        else{
            let launches = res;
            console.log("found launches");
            console.log(launches);
            launches.forEach(launch =>{
                if(launch.location){
                    Location.findOne({_id: launch.location}, (err, res) =>{
                        if(err){
                            console.log("could not find location");
                        }
                        else{
                            Launch.updateOne({id: launch.id}, {$set: {locationData: res}}, (err, res) =>{
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log("updated", launch.id);
                                }
                            }
                            )}
                    });
                };
            });
        }
    });
}

updateRockets = () =>{
    Launch.find({}, (err, res) =>{
        if(err){
            console.log("Could not find launches");
        }
        else{
            let launches = res;
            console.log("found launches");
            console.log(launches);
            launches.forEach(launch =>{
                if(launch.rocket){
                    Rocket.findOne({_id: launch.rocket}, (err, res) =>{
                        if(err){
                            console.log("could not find rocket");
                        }
                        else{
                            Launch.updateOne({id: launch.id}, {$set: {rocketData: res}}, (err, res) =>{
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log("updated", launch.id);
                                }
                            }
                            )}
                    });
                };
            });
        }
    });
}

getExtraInfo = (launches) =>{
    return new Promise((resolve, reject) =>{
        let location = {};
        let rocket = {};
        for(let i = 0; i < launches.length; i++){
            if(launches.location){
                location = getLocation(launches[i]);
                launches[i].location = location;
            }
            if(launches[i].rocket){
                rocket = getRocket(launches[i]);
                launches[i].rocket = rocket;
            }
        }
    });
}

findLaunches = () =>{
    return new Promise((resolve, reject) =>{
        Launch.find({}, (err, response) =>{
            if(err){
                reject(err);
            }
            else{
                resolve(response);
            }
        });
    });
}

getLocation = (launch) =>{
    return new Promise((resolve, reject) =>{
        Location.findOne({_id: launch.location}, (err, res) =>{
            if(err){
                reject(err);
            }
            else{
                resolve(res);
            }
        });
    });
}

getRocket = (launch) =>{
    return new Promise((resolve, reject) =>{
        Rocket.findOne({_id: launch.rocket}, (err, res) =>{
            if(err){
                reject(err);
            }
            else{
                resolve(res);
            }
        });
    });
}

// const updateResponse = async (launch) => {
//     Rocket.findById(launch.rocket, (error, document) => {
//         if(document) {
//         }
//     })
//     .then(document => {
//         launch.rocket = document;
//         return launch;
//     });
//     return 0;
// }

module.exports = router;