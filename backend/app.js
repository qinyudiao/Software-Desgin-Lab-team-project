const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(cors());

// Configure express to use body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
var country = require('./routes/country');
var about = require('./routes/about');
var launch = require('./routes/launch');
var landing = require('./routes/landingpage');

app.use('/landing', landing);
app.use('/country', country); 
app.use('/about', about);
app.use('/launch', launch);

let Subscriber = require('./models/subscriber.js');

// MongoDB stuff
const uri = 'mongodb+srv://admin:admin@softwarelab-zbga3.mongodb.net/SoftwareLab?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true });
let db = mongoose.connection;

// Check connection
db.once('open', function() {
    console.log('Connected to MongoDB');
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        console.log(names); // [{ name: 'dbname.myCollection' }]
        module.exports.Collection = names;
    });
    Subscriber.create({email: 'test'}, (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            console.log('added');
        }
    });
});

// Check for errors
db.on('error', function(err) {
    console.log(err);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));