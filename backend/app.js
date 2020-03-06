var express = require('express');
var app = express();
var cors = require('cors');
var country = require('./routes/country.js');

app.use('/country', country); 
app.use(cors());

app.listen(4000, function(){
    console.log('Example app listening on port 4000!');
});

app.get('/', (req, res) => {
    res.send("Hello World!");
});