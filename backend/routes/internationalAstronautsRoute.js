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
                internationalAstronaut.findOne(responseArray[i], (error, document) =>{
                    if(error){
                        console.log(error);
                    }
                    if(document){
                        console.log("International Astronaut already in database");
                    }
                    else{
                        internationalAstronaut.create(responseArray[i], (err, result) =>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("International Astronaut saved to database");
                            }
                        });
                    }
                });
            }
        }
    });
});

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
    for(let i = 0; i < nameArray.length; i++){
        nameArray[i] = nameArray[i].replace(",", "");
    }
    console.log(nameArray);
    let firstName = nameArray[nameArray.length - 1];
    let lastName = nameArray[nameArray.length - 2];
    let middleNames = [];
    if(nameArray.length > 2){
        middleNames = nameArray.slice(0, nameArray.length - 2);
    }
    let middleName = '';
    for(let i = 0; i < middleNames.length; i++){
        middleName += middleNames[i];
    }
    let fullName = firstName + ' ' + middleName + ' ' + lastName;
    console.log(fullName);
    let url = "http://en.wikipedia.org/api/rest_v1/page/summary/" + fullName;
    request(url, (req, res) =>{
        console.log(JSON.parse(res.body));
    });
    // // console.log(req.params.astronautId);

    // var url = "https://en.wikipedia.org/w/api.php"; 
    // var params = {
    //     action: "query",
    //     formatversion: "2",
    //     prop: "pageimages|pageterms",
    //     titles: "Frank De Winne",
    //     // titles: req.params.astronautId,
    //     format: "json"
    // };

    // url = url + "?origin=*";
    // Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    // request(url, (error, response, body) =>{
    //     if(error){
    //         console.log(error);
    //     }
    //     else{
    //         let result = JSON.parse(response.body);
    //         if(result['query']['pages'][0]['missing']){ // Check if result is valid
    //             console.log("missing");
    //             res.send({"image": "none"});
    //         }
    //         else{
    //             let image = result['query']['pages'][0]['missing'];
    //             console.log(image);
    //             res.send({"image": image});
    //         }

    //     }




// fetch(url)
//     .then(function(response){return response.json();})
//     .then(function(response) {
//         var pages = response.query.pages;
//         for (var page in pages) {
//             for (var img of pages[page].images) {
//                 console.log(img.title);
//             }
//         }
//     })
//     .catch(function(error){console.log(error);});
});


module.exports = router;