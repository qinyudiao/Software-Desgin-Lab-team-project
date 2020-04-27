const express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');

let Launch = require('../models/launchSchema.js');
let Agency = require('../models/agencySchema.js');
let Rocket = require('../models/rocketSchema.js');
let Location = require('../models/locationSchema.js');

// cron.schedule('35 13 8 * * 0', () =>{
// // cron.schedule('5 * * * * *', () =>{
//     console.log('running launches cron job');
    
//     request('https://launchlibrary.net/1.4/launch/?limit=3000', (err, res) =>{
//         if(!err && res.statusCode === 200){
//             let responseObject = JSON.parse(res.body);
//             launchesArray = responseObject.launches;
//             launchesArray.forEach(launch => {
//                 Launch.findOne({id: launch.id, changed: launch.changed}, (error, document) =>{
//                     if(error){
//                         console.log(error);
//                     }
//                     if(document){
//                         // console.log("launches already in database");
//                     }
//                     else{
//                         console.log("new document", launch.id);
//                         Location.findOne({ id: launch.location.id }, (err, foundLocation) => {
//                             // console.log('found location');
//                         })
//                         .then((foundLocation) => {
//                             launch.location = foundLocation;
//                             Rocket.findOne({ id: launch.rocket.id }, (err, foundRocket) => {
//                                 // console.log('found rocket');
//                             })
//                             .then((foundRocket) => {
//                                 launch.rocket = foundRocket;
//                                 Launch.create(launch, (err) => {
//                                     if(err) {
//                                         console.log(err);
//                                     }
//                                     else {
//                                         console.log(`Launch ${launch.id} saved to database`);
//                                     }
//                                 });
//                             })
//                         })
//                     }
//                 });
//             })
//         }
//     });
// });

// Query database to get all launches then send results to frontend
router.get('/', (req, res) =>{
    Launch.find({}, (err, response) =>{
        if(err){
            console.log(err);
        }
        else{
            // console.log(response);
            res.send(response);
        }
    });
});

// Query database to get total number of launches then send results to frontend
router.get('/total', (req, res) =>{
    Launch.countDocuments({}, (err, count) =>{
        if(err){
            console.log(err);
        }
        else{
             response = {count: count}
             res.send(response);
        }
    });
});

// cron.schedule('22 * 10 * * 0', () =>{
// cron.schedule('20 13 * * * *', () =>{
//     //  updateLocations();
//     // updateRockets();
//     updateAgencies();
// });

updateLocations = () =>{
    Launch.find({}, (err, res) =>{
        if(err){
            console.log("Could not find launches");
        }
        else{
            let launches = res;
            console.log("found launches");
            console.log(launches);
            launches.forEach(launch =>{
                if(launch.location){
                    Location.findOne({_id: launch.location}, (err, res) =>{
                        if(err){
                            console.log("could not find location");
                        }
                        else{
                            Launch.updateOne({id: launch.id}, {$set: {locationData: res}}, (err, res) =>{
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log("updated", launch.id);
                                }
                            })
                        }
                    });
                };
            });
        }
    });
}

updateRockets = () =>{
    Launch.find({}, (err, res) =>{
        if(err){
            console.log("Could not find launches");
        }
        else{
            let launches = res;
            console.log("found launches");
            // console.log(launches);
            launches.forEach(launch =>{
                if(launch.rocketData.imageURL == null && launch.rocket){
                    Rocket.findOne({_id: launch.rocket}, (err, foundRocket) =>{
                        if(err){
                            console.log("could not find rocket");
                        }
                        else{
                            // var rock = Rocket.findOne({_id: launch.rocket}, {});
                            Launch.updateOne({id: launch.id}, {$set: {rocketData: foundRocket}}, (err, res) =>{
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log("updated", launch.id);
                                }
                            })
							// var agencyString = JSON.stringify(rock.family.agencies);
							// var agencyArray = agencyString.split(',');
							// for(var i = 0; i < agencyArray.length; i++)
							// {
							// 	Agency.findOne({id: agencyArray[i]}, (err, res) =>{
							// 		if(err){
							// 			console.log("could not find agency");
							// 		}
							// 		else
							// 		{
							// 			Agency.updateOne({id: agencyArray[i]}, {$set: {agencies: res}}, (err, res) =>{
			                //                 if(err){
			                //                     console.log(err);
			                //                 }
			                //                 else{
			                //                     console.log("updated", launch.id);
			                //                 }
			                //             }
			                //             )
							// 		}
							// 	})
							// }
						}
                    });
                };
            });
        }
    });
}

updateAgencies = () =>{
	Launch.find({}, (err, res) =>{
        if(err){
            console.log("Could not find launches");
        }
        else{
            let launches = res;
            console.log("found launches");
            console.log(launches);
            launches.forEach(launch =>{
                if(launch.rocket){
                    Rocket.findOne({_id: launch.rocket}, (err, res) =>{
                        if(err){
                            console.log("could not find rocket");
                        }
                        else{
							var agencyString = res.
                            Launch.updateOne({id: launch.id}, {$set: {rocketData: res}}, (err, res) =>{
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log("updated", launch.id);
                                }
                            }
                            )}
                    });
                };
            });
        }
    });
}

router.get('/id=:launchId', (req, res) =>{
    Launch.findOne({name: req.params.launchId}, (err, result) =>{
        console.log(req.params.launchId);
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