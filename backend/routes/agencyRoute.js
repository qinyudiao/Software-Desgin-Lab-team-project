var express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let agency = require('../models/agencySchema');

// At a periodic time update database with agency information
// cron.schedule('* 1 * * * Sunday', () =>{
//     getData();
// });

getData = () =>{
    console.log('getting agency data from api');
    request('https://launchlibrary.net/1.4/agency?limit=500', (err, res) =>{
        if(!err && res.statusCode === 200){
            let responseArray = JSON.parse(res.body);
            for(let i = 0; i < responseArray.length; i++){
                agency.findOne(responseArray[i], (error, document) =>{
                    if(error){
                        console.log(error);
                    }
                    if(document){
                        console.log("Agency already in database");
                    }
                    else{
                        responseArray[i]['A'] = lowerCase(responseArray[i]['A']);
                        agency.create(responseArray[i], (err, result) =>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("Agency saved to database");
                            }
                        });
                    }
                });
            }
        }
        else{
            console.log(err);
        }
        console.log("got data");
    });
}

lowerCase = (name) =>{
    convertedName = "";
    name = name.split(" ")
    for(let i = 0; i < name.length; i++){
        convertedName += name[i].charAt(0).toUpperCase() + name[i].slice(1).toLowerCase() + " ";
    }
    return convertedName;
}

// Query database to get all agencies then send results to frontend
router.get('/', (req, res) =>{
    getData();
    agency.find({}, (err, response) =>{
        if(err){
            console.log(err);
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.send(response);
        }
    });
    console.log("gets here");
});

router.get('/:agencyId', (req, res) =>{
    let agency = req.params.agencyId;
    console.log(agency);
    let url = "http://en.wikipedia.org/api/rest_v1/page/summary/" + agency;
    request(url, (req, response) =>{
        let results = JSON.parse(response.body);
        res.send(results);
    });
});

cron.schedule('10 * 8 * * Sunday', () =>{
    console.log('running agencies cron job');
    request('https://launchlibrary.net/1.4/agency?limit=500', (err, res) => { // api url is different, no '/' between 'agency' and '?limit'
        if(!err && res.statusCode === 200){
            let responseObject = JSON.parse(res.body);
            agenciesArray = responseObject.agencies;
            agenciesArray.forEach(agency => {
                Agency.findOne({id: agency.id, changed: agency.changed}, (error, document) =>{
                    if(error){
                        console.log(error);
                    }
                    if(document){
                        console.log("agency already in database");
                    }
                    else{
                        console.log("new document");
                        Agency.create(agency, (err, result) =>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("agency saved to database");
                            }
                        });
                    }
                });
            })
        }
    });
});

module.exports = router;
