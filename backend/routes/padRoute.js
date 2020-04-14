const express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let Pad = require('../models/padSchema.js');
let Location = require('../models/locationSchema.js');
let Agency = require('../models/agencySchema.js');

// function getUpdatedAgencies(pad) {
//     return Promise.all(
//       pad.agencies.map(async (agency) => {
//         const foundAgency = await getAgency(agency);
//         return foundAgency;
//       })
//     );
//   }

// async function getAgency(agency) {
//     let result;
//     await Agency.findOne({ id: agency.id }, (err, foundAgency) => {
//         console.log('agency:', foundAgency);
//         result = foundAgency;
//     })
//     console.log('result ->', result);
//     return result;
// }

// async function getAgencies(pad) {
//     return await getUpdatedAgencies(pad);
//     // agencies().then(() => {
//     //     console.log('creating', padToAdd);
//     //     Pad.create(padToAdd, (err) =>{
//     //     if(err) {
//     //         // console.log(err);
//     //     }
//     //     else {
//     //         console.log("pad saved to database");
//     //     }
//     // });
//     // })
// }

cron.schedule('00 * 8 * * 0', () => {
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
                        Location.findOne({ id: pad.locationid }, (err, foundLocation) => {
                        })
                        .then((foundLocation) => {
                            pad.location = foundLocation;
                            if(pad.agencies !== null && pad.agencies.length >= 1) {
                                Agency.findOne({ id: pad.agencies[0].id }, (err, foundAgency) => {
                                    pad.agencies[0] = foundAgency
                                }).then(() => {
                                    if(pad.agencies.length >= 2) {
                                        Agency.findOne({ id: pad.agencies[1].id }, (err, foundAgency) => {
                                            pad.agencies[1] = foundAgency
                                        }).then(() => {
                                            if(pad.agencies.length >= 3) {
                                                Agency.findOne({ id: pad.agencies[2].id }, (err, foundAgency) => {
                                                    pad.agencies[2] = foundAgency
                                                }).then(() => {
                                                    if(pad.agencies.length >= 4) {
                                                        Agency.findOne({ id: pad.agencies[3].id }, (err, foundAgency) => {
                                                            pad.agencies[3] = foundAgency
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

module.exports = router;
