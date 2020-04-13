const express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let Mission = require('../models/missionSchema.js');
let Agency = require('../models/agencySchema.js');

function getUpdatedAgencies(mission) {
    if(mission.agencies !== null) {
        return Promise.all(
            mission.agencies.map(async (agency) => {
                const foundAgency = await getAgency(agency);
                return await foundAgency;
            })
        );
    } else {
        return null;
    }
  }

async function getAgency(agency) {
    let result;
    await Agency.findOne({ id: agency.id }, (err, foundAgency) => {
        // console.log('agency:', foundAgency);
        result = foundAgency;
    })
    // console.log('result ->', result);
    return result;
}

async function getAgencies(mission) {
    return await getUpdatedAgencies(mission);
}

async function getMissionCopy(mission, agencies){
    let copy = mission;
    copy.agencies = agencies;
    return await copy;
}

cron.schedule('35 * 9 * * 0', () => {
    console.log('running missions cron job');
    for (let i = 1; i<1500; i++) {
        request(`https://launchlibrary.net/1.4/mission/?id=${i}`, (err, res) => {
            // console.log('err: ', err, 'res: ', res);
            if(!err && res.statusCode === 200) {
                let responseObject = JSON.parse(res.body);
                missionsArray = responseObject.missions;
                for (const mission of missionsArray) {
                    Mission.findOne({ id: mission.id, changed: mission.changed }, (error, document) => {
                        if(error) {
                            console.log(error);
                        }
                        else if(document) {
                            console.log("mission already in database");
                        }
                        else {
                            console.log('new document', mission.id);
                            if(mission.agencies !== null && mission.agencies.length >= 1) {
                                Agency.findOne({ id: mission.agencies[0].id }, (err, foundAgency) => {
                                    mission.agencies[0] = foundAgency
                                }).then(() => {
                                    if(mission.agencies.length >= 2) {
                                        Agency.findOne({ id: mission.agencies[1].id }, (err, foundAgency) => {
                                            mission.agencies[1] = foundAgency
                                        }).then(() => {
                                            if(mission.agencies.length >= 3) {
                                                Agency.findOne({ id: mission.agencies[2].id }, (err, foundAgency) => {
                                                    mission.agencies[2] = foundAgency
                                                }).then(() => {
                                                    if(mission.agencies.length >= 4) {
                                                        Agency.findOne({ id: mission.agencies[3].id }, (err, foundAgency) => {
                                                            mission.agencies[3] = foundAgency
                                                        }).then(() => {
                                                            Mission.create(mission, (err) => {
                                                                if(err) {
                                                                    console.log(err);
                                                                }
                                                                else {
                                                                    console.log("mission saved to database");
                                                                }
                                                            });
                                                        })
                                                    } else {
                                                        Mission.create(mission, (err) => {
                                                            if(err) {
                                                                console.log(err);
                                                            }
                                                            else {
                                                                console.log("mission saved to database");
                                                            }
                                                        });
                                                    }   
                                                })
                                            } else {
                                                Mission.create(mission, (err) => {
                                                    if(err) {
                                                        console.log(err);
                                                    }
                                                    else {
                                                        console.log("mission saved to database");
                                                    }
                                                });
                                            }   
                                        })
                                    } else {
                                        Mission.create(mission, (err) => {
                                            if(err) {
                                                console.log(err);
                                            }
                                            else {
                                                console.log("mission saved to database");
                                            }
                                        });
                                    }    
                                })
                            } else {
                                Mission.create(mission, (err) => {
                                    if(err) {
                                        console.log(err);
                                    }
                                    else {
                                        console.log("mission saved to database");
                                    }
                                });
                            }
                            // console.log("new document", mission.id);
                            // getAgencies(mission).then(async (agencies) => {
                            //     getMissionCopy(mission, await agencies).then(async (copy) => {
                            //         Mission.create(await copy, (err) => {
                            //             if(err) {
                            //                 console.log(err);
                            //             }
                            //             else {
                            //                 console.log("mission saved to database");
                            //             }
                            //         })
                            //     })
                            // })
                        }
                    });
                }
            }
        });
    }
});

module.exports = router;
