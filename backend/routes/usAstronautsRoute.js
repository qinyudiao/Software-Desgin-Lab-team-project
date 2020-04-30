var express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let usAstronaut = require('../models/usAstronautSchema.js');

// At a periodic time update database with US astronaut information
cron.schedule('0 13 * 0 Sunday', () =>{
    console.log('running us astronaut cron job');
    request('https://raw.githubusercontent.com/ShawnVictor/demo/master/db.json', (err, res) =>{
        if(!err && res.statusCode === 200){
            let responseArray = JSON.parse(res.body);
            for(let i = 0; i < responseArray.length; i++){
                let convertedName = parseUSName(responseArray[i].Astronaut);
                responseArray[i].Astronaut = convertedName;
                usAstronaut.findOne({Astronaut: responseArray[i].Astronaut}, (error, document) =>{
                    if(error){
                        console.log(error);
                    }
                    if(document){
                        console.log("Astronaut already in database");
                    }
                    else{
                        getUSWikiInfo(responseArray[i]);
                    }
                });
            }
        }
    });
});

cleanName = (name) =>{
    let cleanNameArray = name.split(" ");
    for(let i = 0; i < cleanNameArray.length; i++){
        cleanNameArray[i] = cleanNameArray[i].replace(",", "");
        cleanNameArray[i] = cleanNameArray[i].replace(".", "");
    }
}

// convert name into firstname, lastname
parseUSName = (name) =>{
    let cleanNameArray = cleanName(name);
  
    // Take out blank spaces and initials since they mess up formation of full name
    let finalNameArray = []
    for(let i = 0; i < cleanNameArray.length; i++){
        if(cleanNameArray[i] !== '' && cleanNameArray[i].length > 1){
            finalNameArray.push(cleanNameArray[i]);
        }
    }

    let firstName = finalNameArray[1];
    let lastName = finalNameArray[0];
    let fullName  = '';
    if(finalNameArray.length > 2){
        let middleName = finalNameArray[2];
        fullName = firstName + ' ' + middleName + ' ' + lastName; // Might not need middle name
    }
    else{
        fullName = firstName + ' ' + lastName;
    }
    fullName = firstName + ' ' + lastName;
    return fullName;
}

createWikiObject = (results) =>{
    let wikiObject = '';
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

// pass astronaut into request for wikipedia api and then create astronaut based on results and store in database
getUSWikiInfo = (astronaut) =>{
    let url = "http://en.wikipedia.org/api/rest_v1/page/summary/" + astronaut.Astronaut;
    request(url, (req, res) =>{
        let results = JSON.parse(res.body);
        astronaut.wikiInfo = createWikiObject(results);
        usAstronaut.create(astronaut, (err, result) =>{
            if(err){
                console.log(err);
            }
            else{
                console.log("US astronaut saved to database");
            }
        });
    });
}

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
    usAstronaut.findOne({Astronaut: req.params.astronautId}, (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

module.exports = router;