var express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');
let nodemailer = require('nodemailer');

let Subscriber = require('../models/subscriber.js');

// Send response to api to get next 5 launches then take the first one and send it back to frontend
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

// When a subscriber submits the form, email address gets sent here
// Check if address is already in database. If not, add it, otherwise send message that they are already subscribed
router.post('/subscribe', (req, res) =>{
    console.log(req.body);
    Subscriber.findOne({email: req.body.email}, (err, user) => {
        if(err){
            console.log(err);
        }
        if(user){
            console.log("Subscriber already in database");
            res.setHeader('Content-Type', 'application/json');
            res.send({message: "fail"});
        }
        else{
            Subscriber.create({email: req.body.email}, (err, result) =>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Saved new subscriber to database");
                    res.setHeader('Content-Type', 'application/json');
                    res.send({message: 'success'});
                }
            });
        }
    });
});

// Handles requests to unsubscribe from the launch email
// Search for the email in the database, if it exists delete the document, else send a message saying they aren't subscribed
router.post('/unsubscribe', (req, res) =>{
    console.log(req.body);
    Subscriber.findOne({email: req.body.email}, (err, user) =>{
        if(err){
            console.log(err);
        }
        if(user){
            console.log("Subscriber will be removed");
            Subscriber.deleteOne({email: req.body.email}, (err, result) =>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Subscriber deleted");
                    res.setHeader('Content-Type', 'application/json');
                    res.send({message: 'success'});
                }
            });
        }
        else{
            console.log("You are not subscribed")
            res.setHeader('Content-Type', 'application/json');
            res.send({message: 'fail'});
        }
    });
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
let job = cron.schedule('* 5 * * * *', () => {
    console.log("running cron");

}, {timezone: "America/Chicago"});

job.start();

module.exports = router;



