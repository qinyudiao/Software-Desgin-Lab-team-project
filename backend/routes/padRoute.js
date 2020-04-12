const express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let Pad = require('../models/padSchema.js');
let Location = require('../models/locationSchema.js');

cron.schedule('10 * * * * *', () => {
    console.log('running pads cron job');
    request('https://launchlibrary.net/1.4/pad/?limit=1', (err, res) => {
        // console.log('err: ', err, 'res: ', res);
        if(!err && res.statusCode === 200) {
            let responseObject = JSON.parse(res.body);
            padsArray = responseObject.pads;
            padsArray.forEach(pad => {
                Pad.findOne({ id: pad.id, changed: pad.changed }, (error, document) => {
                    if(error) {
                        console.log(error);
                    }
                    else if(document) {
                        console.log("pad already in database");
                    }
                    else {
                        console.log("new document");
                        pad.location = Location.findOne({ id: pad.locationid });
                        console.log(pad.location);
                        Pad.create(pad, (err) =>{
                            if(err) {
                                // console.log(err);
                            }
                            else {
                                console.log("pad saved to database");
                            }
                        });
                    }
                });
            })
        }
    });
});

module.exports = router;