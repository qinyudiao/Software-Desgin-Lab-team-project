// Router to handle country stuff

var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function (req, res){
    request('https://launchlibrary.net/1.4/agency', function(error, response, body){
        if(!error && response.statusCode == 200){
            res.send(response.body);
        }
    });
});

module.exports = router;




