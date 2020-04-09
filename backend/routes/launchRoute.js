const express = require('express');
const app = express();
const moment = require('moment')
const cron = require('node-cron');

let Launch = require('../models/launchSchema.js');

cron.schedule('* * * * Thursday', () =>{
    console.log('running launches cron job');
    request('https://launchlibrary.net/1.4/launch/?limit=5000', (err, res) =>{
        if(!err && res.statusCode === 200){
            let responseArray = JSON.parse(res.body);
            for(let i = 0; i < responseArray.length; i++){
                Launch.findOne(responseArray[i], (error, document) =>{
                    if(error){
                        console.log(error);
                    }
                    if(document){
                        console.log("launches already in database");
                    }
                    else{
                        Launch.create(responseArray[i], (err, result) =>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("launches saved to database");
                            }
                        });
                    }
                } );
            }
        }
    });
});

// Query database to get all US astronauts then send results to frontend
router.get('/', (req, res) =>{
    Launch.find({}, (err, response) =>{
        if(err){
            console.log(err);
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.send(response);
        }
    });
});

module.exports = router;