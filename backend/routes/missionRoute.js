const express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let Mission = require('../models/missionSchema.js');
let Agency = require('../models/agencySchema.js');

function getUpdatedAgencies(mission) {
    return Promise.all(
      mission.agencies.map(async (agency) => {
        const foundAgency = await getAgency(agency);
        return foundAgency;
      })
    );
  }

async function getAgency(agency) {
    let result;
    await Agency.findOne({ id: agency.id }, (err, foundAgency) => {
        console.log('agency:', foundAgency);
        result = foundAgency;
    })
    console.log('result ->', result);
    return result;
}

async function getAgencies(mission) {
    return await getUpdatedAgencies(mission);
}

cron.schedule('39 * * * * 0', () => {
    console.log('running missions cron job');
    request('https://launchlibrary.net/1.4/mission/?limit=2000', (err, res) => {
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
                        console.log("new document", mission.id);
                        getAgencies(mission).then(async (agencies) => {
                            mission.agencies = await agencies;
                            Mission.create(mission, (err) =>{
                                if(err) {
                                    console.log(err);
                                }
                                else {
                                    console.log("mission saved to database");
                                }
                            });
                        })
                    }
                });
            }
        }
    });
});

module.exports = router;
