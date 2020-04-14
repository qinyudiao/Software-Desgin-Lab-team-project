var express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let internationalAstronaut = require('../models/internationalAstronautSchema.js');

// At a periodic time update database with international astronaut information
cron.schedule('0 13 * * Sunday', () =>{
// cron.schedule('2 * * * * *', () => {
    console.log('running international astronaut cron job');
    request('https://raw.githubusercontent.com/ShawnVictor/demo/master/db4.json', (err, res) =>{
        if(!err && res.statusCode === 200){
            let responseArray = JSON.parse(res.body);
            for(let i = 0; i < responseArray.length; i++){
                internationalAstronaut.findOne({A: responseArray[i].A}, (error, document) =>{
                    if(error){
                        console.log(error);
                    }
                    if(document){
                        console.log("International Astronaut already in database");
                    }
                    else{
                        // console.log(responseArray[i]);
                        getWikiInfo(responseArray[i]);
                    }
                });
            }
        }
    });
});

getWikiInfo = (astronaut) =>{
    let url = "http://en.wikipedia.org/api/rest_v1/page/summary/" + astronaut.name;
    request(url, (req, respose) =>{
        let results = JSON.parse(responseb.body);
        if(results.title !== 'Not found.'){
            let object = '';
            if(results.thumbnail){
                object = {'title': results.title, 'page': results.content_urls.desktop.page, 'extract': results.extract, 'image': results.thumbnail.source};
            }
            else{
                object = {'title': results.title, 'page': results.content_urls.desktop.page, 'extract': results.extract, 'image': 'Not found'};
            }
            agency.wikiInfo = object;
            console.log(astronaut)
            // internationalAstronaut.create(astronaut, (err, result) =>{
            //     if(err){
            //         console.log(err);
            //     }
            //     else{
            //         console.log("international astronaut saved to database");
            //     }
            // });
        }
    });
}

// Query database to get all International astronauts then send results to frontend
router.get('/', (req, res) =>{
    internationalAstronaut.find({}, (err, response) =>{
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