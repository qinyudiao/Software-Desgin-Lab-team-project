var express = require('express');
var app = express();
var cors = require('cors');
const got = require('got');

app.use(cors());

app.listen(4000, function(){
    console.log('Example app listening on port 4000!');
});

app.get('/', async (req, res) => {
    try{
        const response = await got('https://launchlibrary.net/1.4/location/1', 
            console.log(response.body))
        }
    catch(error){
        console.log(error);
    }
});