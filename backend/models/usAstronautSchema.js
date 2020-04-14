let mongoose = require('mongoose')

// Schema for usastronaut
let usAstronautSchema = mongoose.Schema({
    Astronaut:{
        type: String,
        required: true
    },
    'Selection Year':{
        type: String
    },
    Group:{
        type: String
    },
    '# Flights':{
        type: String,
    },
    Status:{
        type: String
    },
    'Military or civilian':{
        type: String
    },
    Gender:{
        type: String,
    },
    'If military include details':{
        type: String
    },
    'Date of birth':{
        type: String
    },
    'Job':{
        type: String
    },
    'Missions flown':{
        type: String
    },
    'Cumulative hours of space flight time':{
        type: String
    },
    "wikiInfo":{
        "title":{type: String},
        "page":{type: String},
        "extract":{type: String},
        "image":{type: String}
    }
});

module.exports = mongoose.model('usAstronauts', usAstronautSchema);