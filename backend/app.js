const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var https = require('https');
var http = require('http');

app.use(cors());

// Configure express to use body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
var country = require('./routes/countryRoute');
var about = require('./routes/aboutRoute');
var launch = require('./routes/launchRoute');
var landing = require('./routes/landingpageRoute');
var usAstronauts = require('./routes/usAstronautsRoute');
var internationalAstronauts = require('./routes/internationalAstronautsRoute');
var russianAstronauts = require('./routes/russianAstronautsRoute');
var agency = require('./routes/agencyRoute');
var rocket = require('./routes/rocketRoute');
var location = require('./routes/locationRoute');
var pad = require('./routes/padRoute');
var mission = require('./routes/missionRoute');

// Models
let Launch = require('./models/launchSchema');
let RussianAstronaut = require('./models/russianAstronautSchema');
let UsAstronaut = require('./models/usAstronautSchema');
let InternationalAstronaut = require('./models/internationalAstronautSchema');
let Agency = require('./models/agencySchema');

app.use('/landing', landing);
app.use('/country', country); 
app.use('/about', about);
app.use('/launch', launch);
app.use('/USAstronauts', usAstronauts);
app.use('/InternationalAstronauts', internationalAstronauts);
app.use('/RussianAstronauts', russianAstronauts);
app.use('/agency', agency);
app.use('/rocket', rocket);
app.use('/location', location);
app.use('/mission', mission);
app.use('/pad', pad);

// MongoDB stuff
const uri = 'mongodb+srv://admin:admin@softwarelab-zbga3.mongodb.net/SoftwareLab?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true });
let db = mongoose.connection;

// Check connection
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// Check for errors
db.on('error', function(err) {
    console.log(err);
});

// Create text index for collections so we can search all fields with one query for Google search functionality
let launchCollection = db.collection('launches');
let agencyCollection = db.collection('agencies');
let internationalAstronautCollection = db.collection('internationalastronauts');
let russianAstronautCollection = db.collection('russianastronauts');
let usAstronautCollection = db.collection('usastronauts');
launchCollection.createIndex({"$**": "text"});
agencyCollection.createIndex({"$**": "text"});
internationalAstronautCollection.createIndex({"$**": "text"});
russianAstronautCollection.createIndex({"$**": "text"});
usAstronautCollection.createIndex({"$**": "text"});

searchLaunches = (searchTerm) =>{
    return new Promise(async (resolve, reject) =>{
        try{
            Launch.find({
                $text:{
                    $search: searchTerm,
                    $caseSensitive: false
                }
            }, (err, res) =>{
                if(err){
                    console.log(err);
                }
                else{
                    resolve(res);
                }
            });
        }
        catch(err){
            console.log(err);
        }
    });
}

searchInternationalAstronauts = (searchTerm) =>{
    return new Promise(async (resolve, reject) =>{
        try{
            InternationalAstronaut.find({
                $text:{
                    $search: searchTerm,
                    $caseSensitive: false
                }
            }, (err, res) =>{
                if(err){
                    console.log(err);
                }
                else{
                    resolve(res);
                }
            });
        }
        catch(err){
            console.log(err);
        }
    });
}

searchRussianAstronauts = (searchTerm) =>{
    return new Promise(async (resolve, reject) =>{
        try{
            RussianAstronaut.find({
                $text:{
                    $search: searchTerm,
                    $caseSensitive: false
                }
            }, (err, res) =>{
                if(err){
                    console.log(err);
                }
                else{
                    resolve(res);
                }
            });
        }
        catch(err){
            console.log(err);
        }
    });
}

searchUsAstronauts = (searchTerm) =>{
    return new Promise(async (resolve, reject) =>{
        try{
            UsAstronaut.find({
                $text:{
                    $search: searchTerm,
                    $caseSensitive: false
                }
            }, (err, res) =>{
                if(err){
                    console.log(err);
                }
                else{
                    resolve(res);
                }
            });
        }
        catch(err){
            console.log(err);
        }
    });
}


searchAgencies = (searchTerm) =>{
    return new Promise(async (resolve, reject) =>{
        try{
            Agency.find({
                $text:{
                    $search: searchTerm,
                    $caseSensitive: false
                }
            }, (err, res) =>{
                if(err){
                    console.log(err);
                }
                else{
                    resolve(res);
                }
            });
        }
        catch(err){
            console.log(err);
        }
    });
}

doSearch = (searchTermArray) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let results = [];
            for(let i = 0; i < searchTermArray.length; i++){
                let launchesResult = await searchLaunches(searchTermArray[i]);
                let agenciesResult = await searchAgencies(searchTermArray[i]);
                let usAstronautsResult = await searchUsAstronauts(searchTermArray[i]);
                let russianAstronautsResult = await searchRussianAstronauts(searchTermArray[i]);
                let internationalAstronautsResult = await searchInternationalAstronauts(searchTermArray[i]);
                results.push(agenciesResult);
                results.push(launchesResult);
                results.push(usAstronautsResult);
                results.push(russianAstronautsResult);
                results.push(internationalAstronautsResult);
            }
            resolve(results);
        }
        catch(err){
            console.log(err);
        }
    });
}

// Handle Google like search
app.post('/search', async (req, res) =>{
    try{
        let search = req.body.search;
        let searchTermArray = search.split(' ');
        let searchResults = [];
        searchResults = await doSearch(searchTermArray);
        res.send({'response': searchResults});
    }
    catch(err){
        console.log(err);
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(app);

// httpServer.listen(80);
// httpsServer.listen(443);
