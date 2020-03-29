var express = require('express');
var router = express.Router();
var request = require('request');
const cron = require('node-cron');
let nodemailer = require('nodemailer');

let Subscriber = require('../models/subscriberSchema.js');

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

// Send a request to get the next 5 launches for the cron job
getLaunches = () =>{
    request('https://fdo.rocketlaunch.live/json/launches/next/5', (error, response, body) =>{
        if(!error && response.statusCode == 200){
            let launches = JSON.parse(response.body);
            return launches;
        }
        else{
            console.log(error);
        }
    })
    .then(console.log('hi'));
}

// Query database for all email addresses and for each address send an email with the launch
// information as the body of the email
sendEmails = (emailBody) =>{
    Subscriber.find({}, (err, res) =>{
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
            for(let i = 0; i < res.length; i++){
                let mailOptions = ({
                    from: "everyrocketlaunch.com",
                    to: res[i]['email'],
                    subject: "Weekly Update About Upcoming Launches",
                    text: emailBody
                });

                transporter.sendMail(mailOptions, (err) =>{
                    if(err){
                        throw err;
                    }
                    else{
                        console.log("Email sent");
                    }
                });
            }
        }
    });
}

// Take information from launch request and convert to a usable string
processInformation = (info) =>{
    let infoArray = info['result'];
    let infoString = 'Here are the next five upcoming launches:\n\n';
    for(let i = 0; i < infoArray.length; i++){
        infoString += [i + 1] + ') ' + infoArray[i]['launch_description'] + '\n\n';
    }
    return infoString;
}

// Send scheduled email using cron job
// NOTE: set 1 hour before actual time
cron.schedule('0 14 * * Sunday', function(){
    console.log("running cron");
    request('https://fdo.rocketlaunch.live/json/launches/next/5', (error, response) =>{
        if(!error && response.statusCode == 200){
            let launches = JSON.parse(response.body);
            let emailBodyString = processInformation(launches);
            sendEmails(emailBodyString);
        }
        else{
            console.log(error);
        }
    })
}, {timezone: "America/Chicago"});

module.exports = router;



