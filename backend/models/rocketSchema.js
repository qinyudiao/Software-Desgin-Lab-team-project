let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Schema for rockets
let rocketSchema = Schema({
    "id": {
        type: Number,
        required: true
    },
    "name": {type: String},
    "configuration": {type: String},
    "family": {
        id: {type: Number},
        name: {type: String},
        agencies: {type: String}
    },
    "wikiURL": {type: String},
    "infoURLs": [String],
    "imageURL": {type: String},
    "changed": {type: String}
});

module.exports = mongoose.model('rockets', rocketSchema);