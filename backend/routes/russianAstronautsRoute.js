var express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let russianAstronaut = require('../models/russianAstronautSchema.js');

// At a periodic time update database with international astronaut information
cron.schedule('0 13 * * Sunday', () =>{
// cron.schedule('2 * * * * *', () => {
    console.log('running international astronaut cron job');
    request('https://raw.githubusercontent.com/ShawnVictor/demo/master/db3.json', (err, res) =>{
        if(!err && res.statusCode === 200){
            let responseArray = JSON.parse(res.body);
            for(let i = 0; i < responseArray.length; i++){
                russianAstronaut.findOne(responseArray[i], (error, document) =>{
                    if(error){
                        console.log(error);
                    }
                    if(document){
                        console.log("Russian Astronaut already in database");
                    }
                    else{
                        russianAstronaut.create(responseArray[i], (err, result) =>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("Russian Astronaut saved to database");
                            }
                        });
                    }
                });
            }
        }
    });
});

// Query database to get all Russian astronauts then send results to frontend
router.get('/', (req, res) =>{
    russianAstronaut.find({}, (err, response) =>{
        if(err){
            console.log(err);
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.send(response);
        }
    });
});

router.get('/:astronautId/:type', (req, res) =>{
    console.log("russian WORKS")
});

module.exports = router;