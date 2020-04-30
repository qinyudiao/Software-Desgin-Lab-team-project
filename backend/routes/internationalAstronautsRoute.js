var express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let internationalAstronaut = require('../models/internationalAstronautSchema.js');

// At a periodic time update database with international astronaut information
cron.schedule('0 13 * 0 Sunday', () =>{
    console.log('running international astronaut cron job');
    request('https://raw.githubusercontent.com/ShawnVictor/demo/master/db4.json', (err, res) =>{
        if(!err && res.statusCode === 200){
            let responseArray = JSON.parse(res.body);
            for(let i = 0; i < responseArray.length; i++){
                let convertedName = parseInternationalName(responseArray[i].A);
                responseArray[i].A = convertedName;
                internationalAstronaut.findOne({A: responseArray[i].A}, (error, document) =>{
                    if(error){
                        console.log(error);
                    }
                    if(document){
                        console.log("International Astronaut already in database");
                    }
                    else{
                        getInternationalWikiInfo(responseArray[i]);
                    }
                });
            }
        }
    });
});

createWikiObject = (results) =>{
    let wikiObject = ''
    if(results.title !== 'Not found.'){
        if(results.thumbnail){
            wikiObject = {'title': results.title, 'page': results.content_urls.desktop.page, 'extract': results.extract, 'image': results.thumbnail.source};
        }
        else{
            wikiObject = {'title': results.title, 'page': results.content_urls.desktop.page, 'extract': results.extract, 'image': 'Not found'};
        }
    }
    else{
        wikiObject = {'title': 'Not found', 'page': 'Not found', 'extract': 'Not found', 'image': 'Not found'}; 
    }
    return wikiObject;
}

getInternationalWikiInfo = (astronaut) =>{
    let url = "http://en.wikipedia.org/api/rest_v1/page/summary/" + astronaut.A;
    request(url, (req, response) =>{
        let results = JSON.parse(response.body);
        astronaut.wikiInfo = createWikiObject(results);
        internationalAstronaut.create(astronaut, (err, result) =>{
            if(err){
                console.log(err);
            }
            else{
                console.log("international astronaut saved to database");
            }
        });
    });
}

cleanName = (name) =>{
    let cleanNameArray = name.split(" ");
    for(let i = 0; i < cleanNameArray.length; i++){
        cleanNameArray[i] = cleanNameArray[i].replace(",", "");
        cleanNameArray[i] = cleanNameArray[i].replace(".", "");
    }
}

parseInternationalName = (name) =>{
    let cleanNameArray = cleanName(name);

    // Take out blank spaces and initials since they mess up formation of full name
    let finalNameArray = []
    for(let i = 0; i < cleanNameArray.length; i++){
        if(cleanNameArray[i] !== '' && cleanNameArray[i].length > 1){
            finalNameArray.push(cleanNameArray[i]);
        }
    }

    // order of names in array is expected to be [middle name, last name, first name]
    let firstName = finalNameArray[finalNameArray.length - 1];
    let lastName = finalNameArray[finalNameArray.length - 2];
    let middleNames = []; // An array for names with multiple middle names
    if(finalNameArray.length > 2){
        middleNames = finalNameArray.slice(0, cleanNameArray.length - 2);
    }
    let middleName = ' ';
    for(let i = 0; i < middleNames.length; i++){ // Combine middle names into one string
        if(middleNames[i].length > 1){
            middleName += middleNames[i];
        }
    }

    return firstName + middleName + ' ' + lastName; // Create full name to pass into request
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
    internationalAstronaut.findOne({A: req.params.astronautId}, (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
});


module.exports = router;