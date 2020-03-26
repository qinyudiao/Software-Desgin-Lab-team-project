var express = require('express');
var router = express.Router();
var request = require('request');
const mongoose = require('mongoose');
const cron = require('node-cron');
let nodemailer = require('nodemailer')

// Handle next launch stuff
router.get('/', (req, res) =>{
    request('https://fdo.rocketlaunch.live/json/launches/next/5', (error, response, body) =>{
        if(!error && response.statusCode == 200){
            res.send(getLastLaunch(JSON.parse(response.body)));
        }
        else{
            console.log(error);
        }
    });
});

// In the JSON response, the next launch that will occur is the first launch
getLastLaunch = (recentLaunches) =>{
    let launch_descriiption = recentLaunches['result'][0]['launch_description'];
    let launch = {'launchDescription': launch_descriiption}
    return launch;
}

// Handle subscribers for next launches stuff
router.get('/subscribe', (req, res) =>{
    console.log('subscribe request');
});

// Mailer for cron job
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "everyrocketlaunch@gmail.com",
        pass: "everyrocketlaunch1!"
    }
});

// Send scheduled email using cron job
let job = cron.schedule('* 30 * * * *', () => {
    console.log("running cron");

}, {timezone: "America/Chicago"});

job.start();

module.exports = router;



