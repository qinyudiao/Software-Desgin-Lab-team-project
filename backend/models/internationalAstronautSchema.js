let mongoose = require('mongoose');

// Schema for internationalastronaut
let internationalAstronautSchema = mongoose.Schema({
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
    H:{
        type: String
    },
    I:{
        type: String
    },
    J:{
        type: String
    },
    K:{
        type: String
    },
    "wikiInfo":{
        "title":{type: String},
        "page":{type: String},
        "extract":{type: String},
        "image":{type: String}
    }
});

module.exports = mongoose.model('internationalAstronauts', internationalAstronautSchema);