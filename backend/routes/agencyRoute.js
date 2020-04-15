var express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let Agency = require('../models/agencySchema');

cron.schedule('0 13 * * Sunday', () =>{
// cron.schedule('2 * * * * *', () => {
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
                        getWikiInfo(agency);
                    }
                });
            });
        }
    });
});

// Send agency name into wikipedia request and add result to database
getWikiInfo = (agency) =>{
    let searchTerm = '';
    if(agency.wikiURL){
        let temp = agency.wikiURL.split('/');
        searchTerm = temp[temp.length - 1];
    }
    else{
        searchTerm = agency.name;
    }
    let url = "http://en.wikipedia.org/api/rest_v1/page/summary/" + searchTerm;
    request(url, (req, response) =>{
        let results = JSON.parse(response.body);
        if(results.title !== 'Not found.'){
            let object = '';
            if(results.thumbnail){
                object = {'title': results.title, 'page': results.content_urls.desktop.page, 'extract': results.extract, 'image': results.thumbnail.source};
            }
            else{
                object = {'title': results.title, 'page': results.content_urls.desktop.page, 'extract': results.extract, 'image': 'Not found'};
            }
            agency.wikiInfo = object;
        }
        else{
            let object = {'title': 'Not found', 'page': 'Not found', 'extract': 'Not found', 'image': 'Not found'}; 
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

// Search for agency name in database and return result
router.get('/:agencyId', (req, res) =>{
    Agency.findOne({name: req.params.agencyId}, (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});




module.exports = router;
