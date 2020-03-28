var express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let usAstronaut = require('../models/usAstronautSchema.js');

// At a periodic time update database with US astronaut information
cron.schedule('* * * * Sunday', () =>{
    console.log('running us astronaut cron job');
    request('https://raw.githubusercontent.com/ShawnVictor/demo/master/db.json', (err, res) =>{
        if(!err && res.statusCode === 200){
            let responseArray = JSON.parse(res.body);
            for(let i = 0; i < responseArray.length; i++){
                usAstronaut.findOne(responseArray[i], (error, document) =>{
                    if(error){
                        console.log(error);
                    }
                    if(document){
                        console.log("Astronaut already in database");
                    }
                    else{
                        usAstronaut.create(responseArray[i], (err, result) =>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("Astronaut saved to database");
                            }
                        });
                    }
                } );
            }
        }
    });
});

// Query database to get all US astronauts then send results to frontend
router.get('/', (req, res) =>{
    usAstronaut.find({}, (err, response) =>{
        if(err){
            console.log(err);
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.send(response);
        }
    });
});

module.exports = router;