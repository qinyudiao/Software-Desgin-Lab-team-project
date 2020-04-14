const express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let Rocket = require('../models/rocketSchema.js');

cron.schedule('30 * 8 * * Sunday', () =>{
    console.log('running agencies cron job');
    request('https://launchlibrary.net/1.4/rocket/?limit=508', (err, res) => {
        // console.log('err: ', err, 'res: ', res);
        if(!err && res.statusCode === 200){
            let responseObject = JSON.parse(res.body);
            rocketsArray = responseObject.rockets;
            // console.log('suc');
            // console.log(launchesArray.length);
            // console.log(launchesArray);
            rocketsArray.forEach(rocket => {
                Rocket.findOne({id: rocket.id, changed: rocket.changed}, (error, document) =>{
                    if(error){
                        console.log(error);
                    }
                    if(document){
                        console.log("rocket already in database");
                    }
                    else{
                        console.log("new document");
                        Rocket.create(rocket, (err, result) =>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("rocket saved to database");
                            }
                        });
                    }
                });
            })
        }
    });
});

// Query database to get all rockets then send results to frontend
router.get('/', (req, res) =>{
    Rocket.find({}, async (err, response) =>{
        if(err){
            console.log(err);
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.send(response);
        }
    });
});

// search for rocket by ObjectID
router.get('/:ObjectId', (req, res) =>{
    Rocket.findById(req.params.ObjectId, (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

module.exports = router;