const express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let Launch = require('../models/launchSchema.js');
let Agency = require('../models/agencySchema.js');
let Rocket = require('../models/rocketSchema.js');
let Location = require('../models/locationSchema.js');

cron.schedule('22 * 10 * * 1', () =>{
// cron.schedule('5 * * * * *', () =>{
    console.log('running launches cron job');
    for (let i = 0; i<2600; i++) {
    // for(let i = 0; i < 200; i++){
    // for(let i = 200; i < 400; i++){
    // for(let i = 400; i < 600; i++){
    // for(let i = 600; i < 800; i++){
    // for(let i = 800; i < 1000; i++){
    // for(let i = 1000; i < 1200; i++){
    // for(let i = 1200; i < 1400; i++){
    // for(let i = 1400; i < 1600; i++){
    // for(let i = 1600; i < 1800; i++){
    // for(let i = 1800; i < 2000; i++){
    // for(let i = 2000; i < 2200; i++){
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
    testSearch();
    Launch.find({}, (err, response) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send(response);
        }
    });
});

cron.schedule('22 * 10 * * 1', () =>{
// cron.schedule('8 * * * * *', () =>{
    // updateLocations();
    updateRockets();
});

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

router.get('/:launchId', (req, res) =>{
    Launch.findOne({name: req.params.launchId}, (err, result) =>{
        console.log(req.params.launchId);
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            res.send(result);
        }
    });
});

testSearch = () =>{
    Launch.find({
        $text:{
            $search: 'soyuz',
            $caseSensitive: false,
        }
    }, (err, res) =>{
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
        }
    });
}

module.exports = router;