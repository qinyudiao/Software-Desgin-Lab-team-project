var express = require('express');
var router = express.Router();
var request = require('request');

let usAstronaut = require('../models/usAstronautSchema.js');

router.get('/', (req, res) =>{
    request('https://raw.githubusercontent.com/ShawnVictor/demo/master/db.json', (error, response) =>{
        if(!error && response.statusCode == 200){
            console.log(JSON.parse(response.body));
            let responseArray = JSON.parse(response.body);
            for(let i = 0; i < responseArray.length; i++){
                usAstronaut.findOne(responseArray[i], (err, document) =>{
                    if(err){
                        console.log(err);
                    }
                    if(document){
                        console.log("Astronaut already in database");
                    }
                    else{
                        usAstronaut.create(responseArray[i], (err, result) =>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("Adding astronaut to database");
                            }
                        });
                    }
                }
            )};
        }
        else{
            console.log(error);
        }
    });
});

module.exports = router;