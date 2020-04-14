let mongoose = require('mongoose');

// Schema for Russian Astronauts
let russianAstronautSchema = mongoose.Schema({
    A:{
        type: String,
        required: true
    },
    B:{
        type: String
    },
    C:{
        type: String
    },
    D:{
        type: String
    },
    E:{
        type: String
    },
    F:{
        type: String
    },
    G:{
        type: String
    },
    "wikiInfo":{
        "title":{type: String},
        "page":{type: String},
        "extract":{type: String},
        "image":{type: String}
    }
});

module.exports = mongoose.model('russianastronauts', russianAstronautSchema);