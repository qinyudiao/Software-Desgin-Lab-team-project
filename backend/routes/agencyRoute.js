var express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let Agency = require('../models/agencySchema');

// cron.schedule('0 8 * * Sunday', () =>{
cron.schedule('0 8 * * Sunday', () =>{
    console.log('running agencies cron job');
    request('https://launchlibrary.net/1.4/agency?limit=500', (err, res) => { // api url is different, no '/' between 'agency' and '?limit'
        if(!err && res.statusCode === 200){
            let responseObject = JSON.parse(res.body);
            agenciesArray = responseObject.agencies;
            agenciesArray.forEach(agency => {
                Agency.findOne({id: agency.id, changed: agency.changed}, async (error, document) =>{
                    try{
                        if(error){
                            console.log(error);
                        }
                        else{
                            getWikiInfo(agency);
                        }
                    }
                    catch (err){
                        console.log(err);
                    }
             });
            });
        }
    });
});

getWikiInfo = (agency) =>{
    let url = "http://en.wikipedia.org/api/rest_v1/page/summary/" + agency.name;
    request(url, (req, response) =>{
        let results = JSON.parse(response.body);
        if(results.title !== 'Not found.'){
            let object = {'title': results.title, 'page': results.content_urls.desktop.page, 'extract': results.extract};
            agency.wikiInfo = object;
        }
        else{
            let object = {'title': 'Not found', 'page': 'Not found', 'extract': 'Not found'}; 
            agency.wikiInfo = object;
        }

        Agency.create(agency, (err, result) =>{
            if(err){
                console.log(err);
            }
            else{
                console.log("agency saved to database");
            }
        });
    });
}

// Query database to get all agencies then send results to frontend
router.get('/', (req, res) =>{
    Agency.find({}, (err, response) =>{
        if(err){
            console.log(err);
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.send(response);
        }
    });
});

// Take agency name and pass into Wikipedia api request
router.get('/:agencyId', (req, res) =>{
    let url = "http://en.wikipedia.org/api/rest_v1/page/summary/" + req.params.agencyId;
    request(url, (req, response) =>{
        let results = JSON.parse(response.body);
        res.send(results);
    });
});




module.exports = router;
