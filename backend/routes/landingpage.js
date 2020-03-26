var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', (req, res) =>{
    request('https://fdo.rocketlaunch.live/json/launches/next/5', (error, response, body) =>{
        if(!error && response.statusCode == 200){
            res.send(getLastLaunch(JSON.parse(response.body)));
        }
        else{
            console.log(error);
        }
    });
})

// In the JSON response, the next launch that will occur is the first launch
getLastLaunch = (recentLaunches) =>{
    let launch_descriiption = recentLaunches['result'][0]['launch_description'];
    let launch = {'launchDescription': launch_descriiption}
    return launch;
}

router.get('/subscribe', (req, res) =>{
    console.log('subscribe request');
})

module.exports = router;



