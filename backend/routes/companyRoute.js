var express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let company = require('../models/companySchema.js');

// At a periodic time update database with company information
cron.schedule('* * * * Sunday', () =>{
// cron.schedule('2 * * * * *', () => {
    console.log('running company cron job');
    request('https://raw.githubusercontent.com/ShawnVictor/demo/master/launches.json', (err, res) =>{
        if(!err && res.statusCode === 200){
            console.log(JSON.parse(res.body));
            let responseArray = JSON.parse(res.body);
            for(let i = 0; i < responseArray.length; i++){
                company.findOne(responseArray[i], (error, document) =>{
                    if(error){
                        console.log(error);
                    }
                    if(document){
                        console.log("Company already in database");
                    }
                    else{
                        company.create(responseArray[i], (err, result) =>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("Company saved to database");
                            }
                        });
                    }
                });
            }
        }
    });
});

// Query database to get all companies then send results to frontend
router.get('/', (req, res) =>{
    company.find({}, (err, response) =>{
        if(err){
            console.log(err);
        }
        else{
            console.log(response);
            res.setHeader('Content-Type', 'application/json');
            res.send(response);
        }
    });
});

module.exports = router;