const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());

// Routes
var country = require('./routes/country');
var about = require('./routes/about');
var launch = require('./routes/launch');

app.use('/country', country); 
app.use('/about', about);
app.use('/launch', launch);


// MongoDB stuff
const uri = 'mongodb+srv://admin:admin@softwarelab-zbga3.mongodb.net/test?retryWrites=true&w=majority';
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



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));