var express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let usAstronaut = require('../models/usAstronautSchema.js');

// At a periodic time update database with US astronaut information
cron.schedule('0 13 * * Sunday', () =>{
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

router.get('/:astronautId/:type', (req, res) =>{
    let nameArray = req.params.astronautId.split(" ");

    // Take out extra punctuation like commas or periods
    for(let i = 0; i < nameArray.length; i++){
        nameArray[i] = nameArray[i].replace(",", ""); 
        nameArray[i] = nameArray[i].replace(".", "");
    }

    // Take out blank spaces and initials since they mess up formation of full name
    let finalNameArray = []
    for(let i = 0; i < nameArray.length; i++){
        if(nameArray[i] !== '' && nameArray[i].length > 1){
            finalNameArray.push(nameArray[i]);
        }
    }

    // order of names in array is expected to be [middle name, last name, first name]
    let firstName = finalNameArray[finalNameArray.length - 1];
    let lastName = finalNameArray[finalNameArray.length - 2];
    let middleNames = []; // An array for names with multiple middle names
    if(finalNameArray.length > 2){
        middleNames = finalNameArray.slice(0, nameArray.length - 2);
    }
    let middleName = ' ';
    for(let i = 0; i < middleNames.length; i++){ // Combine middle names into one string
        if(middleNames[i].length > 1){
            middleName += middleNames[i];
        }
    }
    let fullName = firstName + middleName + ' ' + lastName; // Create full name to pass into request
    let url = "http://en.wikipedia.org/api/rest_v1/page/summary/" + fullName;
    request(url, (req, response) =>{
        let results = JSON.parse(response.body);
        res.send(results);
    });
});

module.exports = router;