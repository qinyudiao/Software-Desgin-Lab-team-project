const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for launchSchema
const padSchema = Schema({
    "id": {
        type: Number,
        required: true
    },
    "name": {
        type: String,
        required: true
    },
    "countryCode": {type: String},
    "mapURL": {type: String},
    "padType": {type: Number}, // 0 for launch, 1 for landing
    "retired": {type: Number},
    "infoURL": {type: String},
    "wikiURL": {type: String},
    "infoURLs": [String],
    "latitude": {type: Number},
    "longitude": {type: Number},
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    locationid: {type: Number},
    agenciesReference: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Agency'
        }
    ],
    "agencies": [
        {
            "id": {type: Number},
            "name": {type: String},
            "abbrev": {type: String},
            "countryCode": {type: String},
            "type": {type: Number},
            "wikiURL": {type: String},
            "infoURLs": [String]
        }
    ],
    "changed": {type: String}
});

module.exports = mongoose.model('Pad', padSchema);