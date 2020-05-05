var express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');
var parseName = require('./parseAstronautNames.js');

let russianAstronaut = require('../models/russianAstronautSchema.js');

// At a periodic time update database with international astronaut information
// cron.schedule('0 13 * * Sunday', () =>{
//     console.log('running russian astronaut cron job');
//     request('https://raw.githubusercontent.com/ShawnVictor/demo/master/db3.json', (err, res) =>{
//         if(!err && res.statusCode === 200){
//             let responseArray = JSON.parse(res.body);
//             for(let i = 0; i < responseArray.length; i++){
//                 let convertedName = lowerCase(parseName(responseArray[i].A));
//                 responseArray[i].A = convertedName;
//                 russianAstronaut.findOne({A: responseArray[i].A}, (error, document) =>{
//                     if(error){
//                         console.log(error);
//                     }
//                     if(document){
//                         console.log("Russian Astronaut already in database");
//                     }
//                     else{
//                         getRussianWikiInfo(responseArray[i]);
//                     }
//                 });
//             }
//         }
//     });
// });

// lowercase all letters except for first letter in words
lowerCase = (name) =>{
    convertedName = "";
    name = name.split(" ")
    for(let i = 0; i < name.length; i++){
        convertedName += name[i].charAt(0).toUpperCase() + name[i].slice(1).toLowerCase() + " ";
    }
    return convertedName;
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
getRussianWikiInfo = (astronaut) =>{
    let url = "http://en.wikipedia.org/api/rest_v1/page/summary/" + astronaut.A;
    request(url, (req, res) =>{
        let results = JSON.parse(res.body);
        astronaut.wikiInfo = createWikiObject(results);
        russianAstronaut.create(astronaut, (err, result) =>{
            if(err){
                console.log(err);
            }
            else{
                console.log("Russian astronaut saved to database");
            }
        });
    });
}


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

// Send specified astronaut info to instance page
router.get('/:astronautId/:type', (req, res) =>{
    russianAstronaut.findOne({A: req.params.astronautId}, (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

module.exports = router;