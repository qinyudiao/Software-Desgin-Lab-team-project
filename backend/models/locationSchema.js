let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Schema for locations
let locationSchema = Schema({
    "id": {
        type: Number,
        required: true
    },
    "name": {type: String},
    "countrycode": {type: String},
    "wikiURL": {type: String},
    "infoURLs": [String],
    "imageURL": {type: String},
    "changed": {type: String}
});

module.exports = mongoose.model('Location', locationSchema);