const express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let Pad = require('../models/padSchema.js');
let Location = require('../models/locationSchema.js');
let Agency = require('../models/agencySchema.js');

cron.schedule('54 * 8 * * 0', () => {
    console.log('running pads cron job');
    request('https://launchlibrary.net/1.4/pad/?limit=500', (err, res) => {
        // console.log('err: ', err, 'res: ', res);
        if(!err && res.statusCode === 200) {
            let responseObject = JSON.parse(res.body);
            padsArray = responseObject.pads;
            padsArray.forEach(async pad => {
                await Pad.findOne({ id: pad.id, changed: pad.changed }, (error, document) => {
                    if(error) {
                        console.log(error);
                    }
                    else if(document) {
                        // console.log("pad already in database");
                    }
                    else {
                        console.log("new document", pad.id);
                        pad.agenciesReference = [];
                        Location.findOne({ id: pad.locationid }, (err, foundLocation) => {
                        })
                        .then((foundLocation) => {
                            // console.log('foundloc', foundLocation);
                            pad.countryCode = foundLocation !== null ? foundLocation.countrycode : 'UNK';
                            pad.location = foundLocation;
                            if(pad.agencies !== null && pad.agencies.length >= 1) {
                                Agency.findOne({ id: pad.agencies[0].id }, (err, foundAgency) => {
                                    pad.agenciesReference[0] = foundAgency
                                }).then(() => {
                                    if(pad.agencies.length >= 2) {
                                        Agency.findOne({ id: pad.agencies[1].id }, (err, foundAgency) => {
                                            pad.agenciesReference[1] = foundAgency
                                        }).then(() => {
                                            if(pad.agencies.length >= 3) {
                                                Agency.findOne({ id: pad.agencies[2].id }, (err, foundAgency) => {
                                                    pad.agenciesReference[2] = foundAgency
                                                }).then(() => {
                                                    if(pad.agencies.length >= 4) {
                                                        Agency.findOne({ id: pad.agencies[3].id }, (err, foundAgency) => {
                                                            pad.agenciesReference[3] = foundAgency
                                                        }).then(() => {
                                                            Pad.create(pad, (err) => {
                                                                if(err) {
                                                                    console.log(err);
                                                                }
                                                                else {
                                                                    console.log("pad saved to database");
                                                                }
                                                            });
                                                        })
                                                    } else {
                                                        Pad.create(pad, (err) => {
                                                            if(err) {
                                                                console.log(err);
                                                            }
                                                            else {
                                                                console.log("pad saved to database");
                                                            }
                                                        });
                                                    }   
                                                })
                                            } else {
                                                Pad.create(pad, (err) => {
                                                    if(err) {
                                                        console.log(err);
                                                    }
                                                    else {
                                                        console.log("pad saved to database");
                                                    }
                                                });
                                            }   
                                        })
                                    } else {
                                        Pad.create(pad, (err) => {
                                            if(err) {
                                                console.log(err);
                                            }
                                            else {
                                                console.log("pad saved to database");
                                            }
                                        });
                                    }    
                                })
                            } else {
                                Pad.create(pad, (err) => {
                                    if(err) {
                                        console.log(err);
                                    }
                                    else {
                                        console.log("pad saved to database");
                                    }
                                });
                            }              
                        })
                    }
                });
            })
        }
    });
});

// Query database to get all pads then send results to frontend
router.get('/', (req, res) =>{
    Pad.find({}, (err, response) =>{
        if(err){
            console.log(err);
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.send(response);
        }
    });
});


router.get('/ObjectId=:ObjectId', (req, res) =>{
    Pad.findById(req.params.ObjectId, (err, result) =>{
        console.log('debug pad.find', req.params.ObjectId);
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            res.send(result);
        }
    });
});

module.exports = router;
