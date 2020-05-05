const express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let Location = require('../models/locationSchema.js');

// cron.schedule('45 * 8 * * 0', () =>{
//     console.log('running locations cron job');
//     request('https://launchlibrary.net/1.4/location?limit=50', (err, res) => {
//         // console.log('err: ', err, 'res: ', res);
//         if(!err && res.statusCode === 200){
//             let responseObject = JSON.parse(res.body);
//             locationsArray = responseObject.locations;
//             // console.log('suc');
//             // console.log(launchesArray.length);
//             // console.log(launchesArray);
//             locationsArray.forEach(location => {
//                 Location.findOne({id: location.id, changed: location.changed}, (error, document) =>{
//                     if(error){
//                         console.log(error);
//                     }
//                     if(document){
//                         console.log("location already in database");
//                     }
//                     else{
//                         console.log("new document");
//                         Location.create(location, (err, result) =>{
//                             if(err){
//                                 console.log(err);
//                             }
//                             else{
//                                 console.log("location saved to database");
//                             }
//                         });
//                     }
//                 });
//             })
//         }
//     });
// });

// Query database to get all locations then send results to frontend
router.get('/', (req, res) =>{
    Location.find({}, async (err, response) =>{
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