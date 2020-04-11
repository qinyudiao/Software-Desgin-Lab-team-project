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
    console.log("international WORKS");

    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = {
        action: "query",
        formatversion: "2",
        prop: "pageimages|pageterms",
        titles: "Frank De Winne",
        // titles: req.params.astronautId,
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    request(url, (error, response, body) =>{
        console.log(JSON.parse(response.body));
        let temp = JSON.parse(response.body);
        console.log(temp['query']['pages']);
        let image = temp['query']['pages'][0]['thumbnail']['source'];
        if(image != undefined){
            res.send({"image": image});
        }
        else{
            res.send({"image": "not available"});
        }
    });




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